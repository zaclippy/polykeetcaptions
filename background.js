let queue = [];
let processing = false;
const RATE_LIMIT_MS = 1000; // one request per second

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.type === 'translate') {
    queue.push({text: message.text, sendResponse});
    processQueue();
    return true; // keep channel open
  }
});

async function processQueue() {
  if (processing || queue.length === 0) return;
  processing = true;
  const {text, sendResponse} = queue.shift();
  try {
    const translation = await translateText(text);
    sendResponse({translation});
  } catch (err) {
    console.error('Translation error', err);
    sendResponse({error: err.message});
  } finally {
    setTimeout(() => {
      processing = false;
      processQueue();
    }, RATE_LIMIT_MS);
  }
}

async function translateText(text) {
  const {apiKey} = await chrome.storage.sync.get(['apiKey']);
  if (!apiKey) throw new Error('Missing API key');
  const body = {
    model: 'openai/gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Translate the following Hindi sentence to English: ${text}`
      }
    ]
  };
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}
