import React, { useState, useRef, useEffect } from 'react';

const MODELS = [
  { id: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku', desc: 'Fast & lightweight' },
  { id: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet', desc: 'Balanced & smart' },
  { id: 'claude-3-opus-20240229', label: 'Claude 3 Opus', desc: 'Most powerful' },
];

export default function ModelSelector({ model, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = MODELS.find(m => m.id === model) || MODELS[1];

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0f3460] hover:bg-[#0f3460]/80 text-white text-sm transition"
      >
        <span className="w-2 h-2 rounded-full bg-[#e94560]" />
        <span>{selected.label}</span>
        <span className="text-gray-400 text-xs">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="absolute top-10 left-0 z-50 w-56 bg-[#16213e] border border-[#0f3460] rounded-xl shadow-2xl overflow-hidden">
          {MODELS.map(m => (
            <button
              key={m.id}
              onClick={() => { onChange(m.id); setOpen(false); }}
              className={`w-full text-left px-4 py-3 flex flex-col gap-0.5 hover:bg-[#0f3460]/60 transition ${
                m.id === model ? 'bg-[#0f3460]' : ''
              }`}
            >
              <span className="text-white text-sm font-medium">{m.label}</span>
              <span className="text-gray-400 text-xs">{m.desc}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
