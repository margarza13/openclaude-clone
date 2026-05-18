import React from 'react';

export default function Sidebar({ conversations, activeId, onSelect, onNew, systemPrompt, onOpenSystemPrompt }) {
  return (
    <div className="w-64 h-full bg-[#16213e] border-r border-[#0f3460] flex flex-col">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-[#0f3460] flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-[#e94560] flex items-center justify-center text-white text-sm font-bold">A</div>
        <span className="text-white font-bold text-base tracking-wide">OpenClaude</span>
      </div>

      {/* New chat button */}
      <div className="p-3 space-y-2">
        <button
          onClick={onNew}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#0f3460] hover:bg-[#0f3460]/80 text-white text-sm font-medium transition"
        >
          <span className="text-lg leading-none">+</span>
          New Chat
        </button>

        {/* System prompt button in sidebar (visible on mobile too) */}
        <button
          onClick={onOpenSystemPrompt}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-gray-400 hover:bg-[#0f3460]/40 hover:text-white text-sm transition"
        >
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${systemPrompt ? 'bg-green-400' : 'bg-gray-600'}`} />
          <span className="truncate">{systemPrompt ? 'Edit System Prompt' : 'Set System Prompt'}</span>
        </button>
      </div>

      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
        <p className="text-xs text-gray-600 px-3 pt-1 pb-2 uppercase tracking-wider">Conversations</p>
        {conversations.length === 0 && (
          <p className="text-gray-600 text-xs text-center mt-4 px-4">No conversations yet</p>
        )}
        {conversations.map(c => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition truncate ${
              c.id === activeId
                ? 'bg-[#0f3460] text-white'
                : 'text-gray-400 hover:bg-[#0f3460]/40 hover:text-white'
            }`}
          >
            {c.title || 'New Chat'}
          </button>
        ))}
      </div>
    </div>
  );
}
