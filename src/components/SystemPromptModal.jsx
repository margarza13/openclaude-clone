import React, { useState } from 'react';

const PRESETS = [
  { label: '✦ Default', value: '' },
  { label: '🧑‍💻 Developer', value: 'You are an expert software engineer. Be concise and technical. Prefer code examples over lengthy explanations.' },
  { label: '✍️ Writer', value: 'You are a creative writing assistant. Help with storytelling, prose, and narrative structure. Be imaginative and expressive.' },
  { label: '🎓 Teacher', value: 'You are a patient and clear teacher. Break down complex topics into simple explanations. Use examples and analogies.' },
  { label: '📊 Analyst', value: 'You are a sharp analytical thinker. Provide structured, data-driven responses. Use bullet points and clear reasoning.' },
];

export default function SystemPromptModal({ systemPrompt, onSave, onClose }) {
  const [value, setValue] = useState(systemPrompt || '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="bg-[#16213e] border border-[#0f3460] rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="px-5 py-4 border-b border-[#0f3460] flex items-center justify-between">
          <h2 className="text-white font-semibold text-base">System Prompt</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition text-xl leading-none">✕</button>
        </div>

        <div className="p-5 space-y-4">
          {/* Presets */}
          <div>
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Presets</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map(p => (
                <button
                  key={p.label}
                  onClick={() => setValue(p.value)}
                  className="px-3 py-1.5 rounded-lg bg-[#0f3460] hover:bg-[#0f3460]/70 text-white text-xs transition"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text area */}
          <div>
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Custom prompt</p>
            <textarea
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="e.g. You are a helpful assistant that always responds in pirate speak..."
              rows={5}
              className="w-full bg-[#0a0a1a] border border-[#0f3460] rounded-xl px-4 py-3 text-white text-sm resize-none outline-none placeholder-gray-700 focus:border-[#e94560] transition"
            />
            <p className="text-xs text-gray-600 mt-1">Leave blank to use the default Claude behavior.</p>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-[#0f3460] flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-gray-400 hover:text-white text-sm transition">
            Cancel
          </button>
          <button
            onClick={() => { onSave(value); onClose(); }}
            className="px-4 py-2 rounded-xl bg-[#e94560] hover:bg-[#e94560]/80 text-white text-sm font-medium transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
