import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sendMessageStreaming } from '../api/claude';

export function useChat() {
  const [conversations, setConversations] = useState([
    { id: uuidv4(), title: 'New Chat', messages: [] }
  ]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState('claude-3-5-sonnet-20241022');
  const [systemPrompt, setSystemPrompt] = useState('');

  const activeConversation = conversations.find(c => c.id === activeId) || conversations[0];

  const newChat = useCallback(() => {
    const id = uuidv4();
    setConversations(prev => [{ id, title: 'New Chat', messages: [] }, ...prev]);
    setActiveId(id);
  }, []);

  const sendUserMessage = useCallback(async (content, apiKey) => {
    const userMsg = { id: uuidv4(), role: 'user', content };
    const assistantMsgId = uuidv4();
    const currentConvId = activeId || conversations[0].id;

    setConversations(prev => prev.map(c =>
      c.id === currentConvId
        ? {
            ...c,
            title: c.messages.length === 0 ? content.slice(0, 30) : c.title,
            messages: [
              ...c.messages,
              userMsg,
              { id: assistantMsgId, role: 'assistant', content: '' }
            ]
          }
        : c
    ));

    setLoading(true);

    try {
      const allMessages = [...activeConversation.messages, userMsg];
      await sendMessageStreaming(allMessages, apiKey, (streamedText) => {
        setConversations(prev => prev.map(c =>
          c.id === currentConvId
            ? {
                ...c,
                messages: c.messages.map(m =>
                  m.id === assistantMsgId ? { ...m, content: streamedText } : m
                )
              }
            : c
        ));
      }, model, systemPrompt);
    } catch (e) {
      console.error('Streaming error:', e);
      setConversations(prev => prev.map(c =>
        c.id === currentConvId
          ? {
              ...c,
              messages: c.messages.map(m =>
                m.id === assistantMsgId
                  ? { ...m, content: `⚠️ Error: ${e.message}` }
                  : m
              )
            }
          : c
      ));
    } finally {
      setLoading(false);
    }
  }, [activeConversation, activeId, conversations, model, systemPrompt]);

  return {
    conversations, activeConversation, setActiveId, newChat,
    sendUserMessage, loading,
    model, setModel,
    systemPrompt, setSystemPrompt
  };
}
