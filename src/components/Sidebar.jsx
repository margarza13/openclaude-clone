import React from 'react';

export default function Sidebar({ conversations, activeId, onSelect, onNew }) {
  return (
    <div className="w-64 bg-[#16213e] flex flex-col h-full p-3 gap-2">
      <button
        onClick={onNew}
        className="w-full py-2 px-4 rounded-lg bg-[#e94560] text-white font-semibold hover:opacity-90 transition"
      >
        + New Chat
      </button>
      <div className="flex-1 overflow-y-auto mt-2 flex flex-col gap-1">
        {conversations.map(c => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`text-left px-3 py-2 rounded-lg text-sm truncate transition ${
              c.id === activeId ? 'bg-[#0f3460] text-white' : 'text-gray-400 hover:bg-[#0f3460]/50'
            }`}
          >
            {c.title || 'New Chat'}
          </button>
        ))}
      </div>
    </div>
  );
}
