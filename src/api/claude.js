// Adapter for AI API calls (Anthropic or OpenAI)
export async function sendMessage(messages, apiKey) {
  // Example using Anthropic Claude API
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: messages.map(m => ({ role: m.role, content: m.content }))
    })
  });

  if (!response.ok) throw new Error('API request failed');
  const data = await response.json();
  return data.content[0].text;
}
