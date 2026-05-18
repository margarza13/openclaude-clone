import React, { useState, useRef } from 'react';

export default function ChatInput({ onSend, loading }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim() || loading) return;
    onSend(value.trim());
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
    }
  };

  return (
    <div className="px-3 md:px-6 py-3 md:py-4 border-t border-[#0f3460]">
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 bg-[#16213e] border border-[#0f3460] rounded-2xl px-3 md:px-4 py-2 md:py-3 focus-within:border-[#e94560] transition"
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Message Claude..."
          rows={1}
          className="flex-1 bg-transparent text-white text-sm resize-none outline-none placeholder-gray-600 leading-relaxed"
          style={{ maxHeight: '160px' }}
        />
        <button
          type="submit"
          disabled={!value.trim() || loading}
          className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#e94560] hover:bg-[#e94560]/80 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path fill="white" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </form>
      <p className="text-center text-xs text-gray-700 mt-2">Shift+Enter for new line · Enter to send</p>
    </div>
  );
}
