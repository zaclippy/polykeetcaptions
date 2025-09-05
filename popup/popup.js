document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('enabled');
  chrome.storage.sync.get(['enabled'], res => {
    checkbox.checked = res.enabled !== false;
  });
  checkbox.addEventListener('change', () => {
    chrome.storage.sync.set({enabled: checkbox.checked});
  });
});
