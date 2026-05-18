// Adapter for AI API calls (Anthropic Claude API) with streaming support

export async function sendMessage(messages, apiKey, model = 'claude-3-5-sonnet-20241022') {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      messages: messages.map(m => ({ role: m.role, content: m.content }))
    })
  });

  if (!response.ok) throw new Error('API request failed');
  const data = await response.json();
  return data.content[0].text;
}

export async function sendMessageStreaming(messages, apiKey, onChunk, model = 'claude-3-5-sonnet-20241022') {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-calls': 'true'
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      stream: true,
      messages: messages.map(m => ({ role: m.role, content: m.content }))
    })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.error?.message || 'API request failed');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split('\n').filter(l => l.startsWith('data: '));

    for (const line of lines) {
      const data = line.slice(6).trim();
      if (data === '[DONE]') continue;
      try {
        const parsed = JSON.parse(data);
        if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
          fullText += parsed.delta.text;
          onChunk(fullText);
        }
      } catch (_) {}
    }
  }

  return fullText;
}
