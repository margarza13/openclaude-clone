import React, { useState } from 'react';

export default function ApiKeyModal({ onSave }) {
  const [key, setKey] = useState('');
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#16213e] rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-white text-xl font-bold mb-2">Enter your API Key</h2>
        <p className="text-gray-400 text-sm mb-4">Your key is stored only in your browser session and never sent to any server other than Anthropic.</p>
        <input
          type="password"
          className="w-full bg-[#0f3460] text-white px-4 py-3 rounded-xl outline-none mb-4 text-sm"
          placeholder="sk-ant-..."
          value={key}
          onChange={e => setKey(e.target.value)}
        />
        <button
          onClick={() => key.trim() && onSave(key.trim())}
          className="w-full py-3 bg-[#e94560] text-white rounded-xl font-semibold hover:opacity-90 transition"
        >
          Start Chatting
        </button>
      </div>
    </div>
  );
}
