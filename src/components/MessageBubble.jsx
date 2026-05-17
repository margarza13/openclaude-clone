import React from 'react';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#e94560] flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0">
          A
        </div>
      )}
      <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
        isUser ? 'bg-[#0f3460] text-white rounded-tr-sm' : 'bg-[#16213e] text-gray-200 rounded-tl-sm'
      }`}>
        {message.content}
      </div>
    </div>
  );
}
