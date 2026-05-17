import React, { useState } from 'react';

export default function ChatInput({ onSend, loading }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || loading) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4 border-t border-[#0f3460]">
      <textarea
        className="flex-1 bg-[#0f3460] text-white rounded-xl px-4 py-3 resize-none text-sm outline-none placeholder-gray-500 max-h-40"
        rows={1}
        placeholder="Message Super A..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleSubmit(e); }}
      />
      <button
        type="submit"
        disabled={loading || !text.trim()}
        className="px-4 py-3 bg-[#e94560] text-white rounded-xl font-semibold disabled:opacity-40 hover:opacity-90 transition"
      >
        {loading ? '...' : '↑'}
      </button>
    </form>
  );
}
