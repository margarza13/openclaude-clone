import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sendMessage } from '../api/claude';

export function useChat() {
  const [conversations, setConversations] = useState([{ id: uuidv4(), title: 'New Chat', messages: [] }]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(false);

  const activeConversation = conversations.find(c => c.id === activeId) || conversations[0];

  const newChat = useCallback(() => {
    const id = uuidv4();
    setConversations(prev => [{ id, title: 'New Chat', messages: [] }, ...prev]);
    setActiveId(id);
  }, []);

  const sendUserMessage = useCallback(async (content, apiKey) => {
    const userMsg = { id: uuidv4(), role: 'user', content };
    setConversations(prev => prev.map(c =>
      c.id === activeConversation.id
        ? { ...c, messages: [...c.messages, userMsg], title: c.messages.length === 0 ? content.slice(0, 30) : c.title }
        : c
    ));
    setLoading(true);
    try {
      const allMessages = [...activeConversation.messages, userMsg];
      const reply = await sendMessage(allMessages, apiKey);
      const assistantMsg = { id: uuidv4(), role: 'assistant', content: reply };
      setConversations(prev => prev.map(c =>
        c.id === activeConversation.id ? { ...c, messages: [...c.messages, userMsg, assistantMsg] } : c
      ));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [activeConversation]);

  return { conversations, activeConversation, setActiveId, newChat, sendUserMessage, loading };
}
