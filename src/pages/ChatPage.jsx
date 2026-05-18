import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import ApiKeyModal from '../components/ApiKeyModal';
import ModelSelector from '../components/ModelSelector';
import ExportButton from '../components/ExportButton';
import { useChat } from '../hooks/useChat';

export default function ChatPage() {
  const { conversations, activeConversation, setActiveId, newChat, sendUserMessage, loading, model, setModel } = useChat();
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
        {/* Header */}
        <div className="px-6 py-3 border-b border-[#0f3460] flex items-center justify-between gap-3">
          <span className="text-white font-semibold text-lg truncate flex-1">
            {activeConversation?.title || 'New Chat'}
          </span>
          <div className="flex items-center gap-2 flex-shrink-0">
            <ExportButton conversation={activeConversation} />
            <ModelSelector model={model} onChange={setModel} />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {activeConversation?.messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="text-5xl mb-4">✦</div>
              <p className="text-xl font-semibold text-gray-400">How can I help you today?</p>
              <p className="text-sm text-gray-600 mt-1">
                Using {model.includes('haiku') ? 'Claude 3 Haiku' : model.includes('opus') ? 'Claude 3 Opus' : 'Claude 3.5 Sonnet'}
              </p>
            </div>
          )}
          {activeConversation?.messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {loading && activeConversation?.messages[activeConversation.messages.length - 1]?.content === '' && (
            <div className="flex justify-start mb-4">
              <div className="w-8 h-8 rounded-full bg-[#e94560] flex items-center justify-center text-white text-xs font-bold mr-2">A</div>
              <div className="bg-[#16213e] px-4 py-3 rounded-2xl rounded-tl-sm text-gray-400 text-sm animate-pulse">Thinking...</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <ChatInput onSend={(msg) => sendUserMessage(msg, apiKey)} loading={loading} />
      </div>
    </div>
  );
}
