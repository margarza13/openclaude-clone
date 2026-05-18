import React, { useState } from 'react';

function conversationToMarkdown(conversation) {
  const lines = [];
  lines.push(`# ${conversation.title || 'Chat Export'}`);
  lines.push(`_Exported on ${new Date().toLocaleString()}_`);
  lines.push('');
  lines.push('---');
  lines.push('');

  for (const msg of conversation.messages) {
    if (msg.role === 'user') {
      lines.push('### 🧑 You');
    } else {
      lines.push('### 🤖 Assistant');
    }
    lines.push('');
    lines.push(msg.content);
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  return lines.join('\n');
}

export default function ExportButton({ conversation }) {
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    if (!conversation?.messages?.length) return;

    const md = conversationToMarkdown(conversation);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(conversation.title || 'chat').replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);

    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  const isEmpty = !conversation?.messages?.length;

  return (
    <button
      onClick={handleExport}
      disabled={isEmpty}
      title={isEmpty ? 'No messages to export' : 'Export as Markdown'}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f3460] hover:bg-[#0f3460]/80 text-white text-sm transition disabled:opacity-30 disabled:cursor-not-allowed"
    >
      {exported ? '✓ Exported!' : '↓ Export'}
    </button>
  );
}
