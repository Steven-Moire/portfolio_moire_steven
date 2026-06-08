(function () {
  const CONSENT_KEY = 'cookie-consent';
  const GA_ID = 'G-PGQSZBFZZ4';

  function loadGA() {
    if (globalThis.gtag) return;
    const s = document.createElement('script');
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    s.async = true;
    document.head.appendChild(s);
    globalThis.dataLayer = globalThis.dataLayer || [];
    globalThis.gtag = function () { globalThis.dataLayer.push(arguments); };
    globalThis.gtag('js', new Date());
    globalThis.gtag('config', GA_ID, { anonymize_ip: true });
  }

  function hideBanner() {
    const b = document.getElementById('cookie-banner');
    if (b) b.remove();
  }

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'true');
    loadGA();
    hideBanner();
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'false');
    hideBanner();
  }

  function showBanner() {
    const isFr = (document.documentElement.dataset.lang || 'en') === 'fr';

    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.style.cssText = [
      'position:fixed;bottom:0;left:0;right:0;',
      'padding:.75rem 1.5rem;display:flex;align-items:center;',
      'justify-content:space-between;flex-wrap:wrap;gap:.5rem;',
      'z-index:10000;font-size:.82rem;',
      'background:var(--main-bg,#1e1e2e);',
      'border-top:1px solid rgba(128,128,128,.3);'
    ].join('');

    const text = document.createElement('span');
    text.textContent = isFr
      ? '🍪 Ce site utilise Google Analytics pour mesurer l\'audience (données anonymisées).'
      : '🍪 This site uses Google Analytics to measure traffic (anonymised data).';

    const btnBase = 'padding:.35rem .9rem;border-radius:5px;cursor:pointer;' +
      'font-size:.78rem;font-weight:700;border:none;margin-left:.4rem;';

    const acceptBtn = document.createElement('button');
    acceptBtn.textContent = isFr ? 'Accepter' : 'Accept';
    acceptBtn.style.cssText = btnBase + 'background:#3d8eff;color:#fff;';
    acceptBtn.addEventListener('click', accept);

    const declineBtn = document.createElement('button');
    declineBtn.textContent = isFr ? 'Refuser' : 'Decline';
    declineBtn.style.cssText = btnBase + 'background:transparent;color:inherit;opacity:.65;';
    declineBtn.addEventListener('click', decline);

    const actions = document.createElement('div');
    actions.style.cssText = 'display:flex;align-items:center;flex-shrink:0;';
    actions.appendChild(acceptBtn);
    actions.appendChild(declineBtn);

    banner.appendChild(text);
    banner.appendChild(actions);
    document.body.appendChild(banner);
  }

  function init() {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === 'true') {
      loadGA();
    } else if (consent === null) {
      showBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
