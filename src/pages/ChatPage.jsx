import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import ApiKeyModal from '../components/ApiKeyModal';
import { useChat } from '../hooks/useChat';

export default function ChatPage() {
  const { conversations, activeConversation, setActiveId, newChat, sendUserMessage, loading } = useChat();
  const [apiKey, setApiKey] = useState(localStorage.getItem('oc_api_key') || '');
  const bottomRef = useRef(null);

  const handleSaveKey = (key) => {
    localStorage.setItem('oc_api_key', key);
    setApiKey(key);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  return (
    <div className="flex h-screen bg-[#1a1a2e]">
      {!apiKey && <ApiKeyModal onSave={handleSaveKey} />}
      <Sidebar
        conversations={conversations}
        activeId={activeConversation?.id}
        onSelect={setActiveId}
        onNew={newChat}
      />
      <div className="flex-1 flex flex-col">
        <div className="px-6 py-4 border-b border-[#0f3460] text-white font-semibold text-lg">
          {activeConversation?.title || 'New Chat'}
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {activeConversation?.messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="text-5xl mb-4">✦</div>
              <p className="text-xl font-semibold text-gray-400">How can I help you today?</p>
            </div>
          )}
          {activeConversation?.messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="w-8 h-8 rounded-full bg-[#e94560] flex items-center justify-center text-white text-xs font-bold mr-2">A</div>
              <div className="bg-[#16213e] px-4 py-3 rounded-2xl rounded-tl-sm text-gray-400 text-sm">Thinking...</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <ChatInput onSend={(msg) => sendUserMessage(msg, apiKey)} loading={loading} />
      </div>
    </div>
  );
}
