import React, { useEffect, useRef } from 'react';

function CodeBlock({ lang, code }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const highlight = () => { if (window.hljs) window.hljs.highlightElement(ref.current); };
    if (window.hljs) {
      highlight();
    } else {
      if (!document.getElementById('hljs-css')) {
        const link = document.createElement('link');
        link.id = 'hljs-css';
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css';
        document.head.appendChild(link);
      }
      if (!document.getElementById('hljs-script')) {
        const script = document.createElement('script');
        script.id = 'hljs-script';
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
        script.onload = highlight;
        document.head.appendChild(script);
      } else {
        document.getElementById('hljs-script').addEventListener('load', highlight);
      }
    }
  }, [code]);

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-[#0f3460]">
      <div className="flex items-center justify-between px-3 md:px-4 py-1.5 bg-[#0f3460]/70 border-b border-[#0f3460]">
        <span className="text-xs text-gray-400 font-mono">{lang || 'code'}</span>
        <CopyButton text={code} />
      </div>
      <pre className="m-0 rounded-b-xl overflow-x-auto text-xs md:text-sm">
        <code ref={ref} className={lang ? `language-${lang}` : ''}>{code}</code>
      </pre>
    </div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="text-xs text-gray-400 hover:text-white transition px-2 py-0.5 rounded bg-[#0a0a1a]/50 hover:bg-[#0a0a1a]"
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}

function inlineMarkdown(text) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <code key={idx} className="bg-[#0a0a1a] text-green-300 px-1.5 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
    }
    return part.split(/(\*\*\*[^*]+\*\*\*)/g).map((s, i) => {
      if (s.startsWith('***') && s.endsWith('***')) return <strong key={i}><em>{s.slice(3, -3)}</em></strong>;
      return s.split(/(\*\*[^*]+\*\*)/g).map((b, j) => {
        if (b.startsWith('**') && b.endsWith('**')) return <strong key={j} className="font-bold text-white">{b.slice(2, -2)}</strong>;
        return b.split(/(\*[^*]+\*)/g).map((it, k) => {
          if (it.startsWith('*') && it.endsWith('*') && it.length > 2) return <em key={k} className="italic">{it.slice(1, -1)}</em>;
          return it;
        });
      });
    });
  });
}

function renderMarkdown(text) {
  const lines = text.split('\n');
  const elements = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) { codeLines.push(lines[i]); i++; }
      elements.push(<CodeBlock key={`code-${i}`} lang={lang} code={codeLines.join('\n')} />);
      i++; continue;
    }
    if (line.startsWith('### ')) { elements.push(<h3 key={i} className="text-base font-semibold text-white mt-3 mb-1">{inlineMarkdown(line.slice(4))}</h3>); i++; continue; }
    if (line.startsWith('## ')) { elements.push(<h2 key={i} className="text-lg font-bold text-white mt-4 mb-1">{inlineMarkdown(line.slice(3))}</h2>); i++; continue; }
    if (line.startsWith('# ')) { elements.push(<h1 key={i} className="text-xl font-bold text-white mt-4 mb-2">{inlineMarkdown(line.slice(2))}</h1>); i++; continue; }
    if (line.match(/^[-*] /)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^[-*] /)) { items.push(<li key={i} className="ml-4 list-disc">{inlineMarkdown(lines[i].slice(2))}</li>); i++; }
      elements.push(<ul key={`ul-${i}`} className="my-2 space-y-1 text-sm pl-2">{items}</ul>); continue;
    }
    if (line.match(/^\d+\. /)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) { items.push(<li key={i} className="ml-4 list-decimal">{inlineMarkdown(lines[i].replace(/^\d+\. /, ''))}</li>); i++; }
      elements.push(<ol key={`ol-${i}`} className="my-2 space-y-1 text-sm pl-2">{items}</ol>); continue;
    }
    if (line.startsWith('> ')) { elements.push(<blockquote key={i} className="border-l-4 border-[#e94560] pl-4 my-2 text-gray-400 italic text-sm">{inlineMarkdown(line.slice(2))}</blockquote>); i++; continue; }
    if (line.match(/^---+$/)) { elements.push(<hr key={i} className="border-[#0f3460] my-3" />); i++; continue; }
    if (line.trim() === '') { elements.push(<div key={i} className="h-2" />); i++; continue; }
    elements.push(<p key={i} className="text-sm leading-relaxed">{inlineMarkdown(line)}</p>);
    i++;
  }
  return elements;
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#e94560] flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 mt-1">
          A
        </div>
      )}
      <div className={`max-w-[85%] md:max-w-[75%] px-3 md:px-4 py-3 rounded-2xl ${
        isUser
          ? 'bg-[#0f3460] text-white rounded-tr-sm text-sm leading-relaxed whitespace-pre-wrap'
          : 'bg-[#16213e] text-gray-200 rounded-tl-sm'
      }`}>
        {isUser ? message.content : renderMarkdown(message.content)}
      </div>
    </div>
  );
}
