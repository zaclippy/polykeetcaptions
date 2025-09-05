let enabled = true;
chrome.storage.sync.get(['enabled'], res => {
  if (res.enabled === false) enabled = false;
});
chrome.storage.onChanged.addListener(changes => {
  if (changes.enabled) enabled = changes.enabled.newValue;
});

const observer = new MutationObserver(() => {
  if (!enabled) return;
  document.querySelectorAll('.ytp-caption-segment').forEach(seg => {
    if (seg.dataset.pkProcessed) return;
    const original = seg.innerText;
    const hinglish = toHinglish(original);
    seg.textContent = hinglish;
    seg.dataset.pkProcessed = 'true';
    chrome.runtime.sendMessage({type: 'translate', text: original}, res => {
      if (res && res.translation) {
        seg.dataset.translation = res.translation;
        seg.classList.add('pk-tooltip');
      }
    });
  });
});

function start() {
  const player = document.body;
  observer.observe(player, {childList: true, subtree: true});
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
