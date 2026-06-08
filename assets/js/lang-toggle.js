(function () {
  var LANG_KEY = 'portfolio-lang';

  /* Inject CSS once — works even when the <style> in _layouts/post.html isn't present */
  function injectCSS() {
    if (document.getElementById('lang-toggle-css')) return;
    var style = document.createElement('style');
    style.id = 'lang-toggle-css';
    style.textContent = [
      '.lang-block{display:none}',
      '.lang-block.lang-en{display:block}',
      'html[data-lang="fr"] .lang-block.lang-en{display:none}',
      'html[data-lang="fr"] .lang-block.lang-fr{display:block}',
      '#lang-toggle-btn{position:fixed;bottom:2rem;right:2rem;padding:.35rem .85rem;',
      'border:1.5px solid currentColor;border-radius:6px;background:transparent;',
      'cursor:pointer;font-size:.78rem;font-weight:700;letter-spacing:.1em;',
      'opacity:.55;transition:opacity .15s;z-index:999}',
      '#lang-toggle-btn:hover{opacity:1}'
    ].join('');
    document.head.appendChild(style);
  }

  function setLang(lang) {
    document.documentElement.dataset.lang = lang;
    localStorage.setItem(LANG_KEY, lang);
    var btn = document.getElementById('lang-toggle-btn');
    if (btn) btn.textContent = lang === 'en' ? 'FR' : 'EN';
  }

  function injectButton() {
    if (document.getElementById('lang-toggle-btn')) return;
    injectCSS();
    var lang = document.documentElement.dataset.lang || 'en';
    var btn = document.createElement('button');
    btn.id = 'lang-toggle-btn';
    btn.textContent = lang === 'en' ? 'FR' : 'EN';
    btn.title = 'Switch language / Changer de langue';
    btn.addEventListener('click', function () {
      setLang((document.documentElement.dataset.lang || 'en') === 'en' ? 'fr' : 'en');
    });
    document.body.appendChild(btn);
  }

  /* Set lang before render to prevent flash */
  document.documentElement.dataset.lang = localStorage.getItem(LANG_KEY) || 'en';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectButton);
  } else {
    injectButton();
  }
})();
