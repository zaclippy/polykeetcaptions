document.getElementById('save').addEventListener('click', () => {
  const apiKey = document.getElementById('apiKey').value;
  chrome.storage.sync.set({apiKey}, () => {
    const status = document.getElementById('status');
    status.textContent = 'Saved';
    setTimeout(() => status.textContent = '', 1000);
  });
});

chrome.storage.sync.get(['apiKey'], res => {
  if (res.apiKey) document.getElementById('apiKey').value = res.apiKey;
});
