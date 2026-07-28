let deferredPrompt = null;

function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;
}

function dismissedRecently() {
  const ts = localStorage.getItem('installPromptDismissedAt');
  if (!ts) return false;
  return Date.now() - Number(ts) < 7 * 24 * 60 * 60 * 1000;
}

function markDismissed() {
  localStorage.setItem('installPromptDismissedAt', String(Date.now()));
}

function createBanner(text, buttonText, onAction) {
  const banner = document.createElement('div');
  banner.setAttribute('id', 'pwa-install-banner');
  banner.style.cssText = `
    position: fixed; left: 12px; right: 12px; bottom: 222px; z-index: 9999;
    background: #211e1e; color: #fffdfa; border-radius: 12px;
    padding: 14px 16px; display: flex; align-items: center; gap: 12px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.35); font-family: 'Roboto', sans-serif;
  `;

  const span = document.createElement('span');
  span.textContent = text;
  span.style.cssText = 'flex: 1; font-size: 14px; line-height: 1.4;';

  const actionBtn = document.createElement('button');
  actionBtn.textContent = buttonText;
  actionBtn.style.cssText = `
    background: linear-gradient(92deg, #b16a12 4.34%, #d28f2c 38.72%, #deaa5e 66.5%, #aa640d 97.51%);
    color: #211e1e; border: none; border-radius: 8px; padding: 8px 14px;
    font-size: 13px; font-weight: 600; cursor: pointer; white-space: nowrap;
  `;
  actionBtn.addEventListener('click', onAction);

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕';
  closeBtn.setAttribute('aria-label', 'Закрити');
  closeBtn.style.cssText = 'background: none; border: none; color: #d9d9d9; font-size: 16px; cursor: pointer; padding: 4px;';
  closeBtn.addEventListener('click', () => {
    banner.remove();
    markDismissed();
  });

  banner.appendChild(span);
  banner.appendChild(actionBtn);
  banner.appendChild(closeBtn);
  document.body.appendChild(banner);
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;

  if (isStandalone() || dismissedRecently()) return;

  createBanner('Встановіть застосунок "Ваш адвокат" — швидкий доступ з головного екрана', 'Встановити', async () => {
    document.getElementById('pwa-install-banner')?.remove();
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  });
});

window.addEventListener('appinstalled', () => {
  document.getElementById('pwa-install-banner')?.remove();
});

if (isIos() && !isStandalone() && !dismissedRecently()) {
  window.addEventListener('load', () => {
    createBanner('Щоб встановити застосунок: натисніть "Поділитися" внизу браузера → "На екран Домой"', 'Зрозуміло', () => {
      document.getElementById('pwa-install-banner')?.remove();
      markDismissed();
    });
  });
}