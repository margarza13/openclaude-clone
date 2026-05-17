import React from 'react';

// Simple markdown renderer
function renderMarkdown(text) {
  const lines = text.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <div key={i} className="my-3 rounded-xl overflow-hidden bg-[#0a0a1a] border border-[#0f3460]">
          {lang && (
            <div className="px-4 py-1 text-xs text-gray-400 bg-[#0f3460]/50 border-b border-[#0f3460]">
              {lang}
            </div>
          )}
          <pre className="px-4 py-3 text-sm text-green-300 overflow-x-auto">
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      );
      i++;
      continue;
    }

    // Heading 1
    if (line.startsWith('# ')) {
      elements.push(<h1 key={i} className="text-xl font-bold text-white mt-4 mb-2">{inlineMarkdown(line.slice(2))}</h1>);
      i++; continue;
    }

    // Heading 2
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-lg font-bold text-white mt-3 mb-1">{inlineMarkdown(line.slice(3))}</h2>);
      i++; continue;
    }

    // Heading 3
    if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-base font-semibold text-white mt-2 mb-1">{inlineMarkdown(line.slice(4))}</h3>);
      i++; continue;
    }

    // Unordered list
    if (line.match(/^[-*] /)) {
      const listItems = [];
      while (i < lines.length && lines[i].match(/^[-*] /)) {
        listItems.push(<li key={i} className="ml-4 list-disc">{inlineMarkdown(lines[i].slice(2))}</li>);
        i++;
      }
      elements.push(<ul key={`ul-${i}`} className="my-2 space-y-1 text-sm">{listItems}</ul>);
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\. /)) {
      const listItems = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        listItems.push(<li key={i} className="ml-4 list-decimal">{inlineMarkdown(lines[i].replace(/^\d+\. /, ''))}</li>);
        i++;
      }
      elements.push(<ol key={`ol-${i}`} className="my-2 space-y-1 text-sm">{listItems}</ol>);
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="border-l-4 border-[#e94560] pl-4 my-2 text-gray-400 italic text-sm">
          {inlineMarkdown(line.slice(2))}
        </blockquote>
      );
      i++; continue;
    }

    // Horizontal rule
    if (line.match(/^---+$/)) {
      elements.push(<hr key={i} className="border-[#0f3460] my-3" />);
      i++; continue;
    }

    // Empty line
    if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
      i++; continue;
    }

    // Regular paragraph
    elements.push(<p key={i} className="text-sm leading-relaxed">{inlineMarkdown(line)}</p>);
    i++;
  }

  return elements;
}

function inlineMarkdown(text) {
  // Split by inline code first, then process bold/italic
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={idx} className="bg-[#0a0a1a] text-green-300 px-1.5 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
    }
    // Bold + italic
    const boldItalic = part.split(/(\*\*\*[^*]+\*\*\*)/g).map((s, i) => {
      if (s.startsWith('***') && s.endsWith('***')) {
        return <strong key={i}><em>{s.slice(3, -3)}</em></strong>;
      }
      // Bold
      const bold = s.split(/(\*\*[^*]+\*\*)/g).map((b, j) => {
        if (b.startsWith('**') && b.endsWith('**')) {
          return <strong key={j} className="font-bold text-white">{b.slice(2, -2)}</strong>;
        }
        // Italic
        const italic = b.split(/(\*[^*]+\*)/g).map((it, k) => {
          if (it.startsWith('*') && it.endsWith('*')) {
            return <em key={k} className="italic">{it.slice(1, -1)}</em>;
          }
          return it;
        });
        return italic;
      });
      return bold;
    });
    return boldItalic;
  });
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#e94560] flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 mt-1">
          A
        </div>
      )}
      <div className={`max-w-[75%] px-4 py-3 rounded-2xl ${
        isUser
          ? 'bg-[#0f3460] text-white rounded-tr-sm text-sm leading-relaxed whitespace-pre-wrap'
          : 'bg-[#16213e] text-gray-200 rounded-tl-sm'
      }`}>
        {isUser ? message.content : renderMarkdown(message.content)}
      </div>
    </div>
  );
}
