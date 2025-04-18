(function () {
  'use strict';

  function showMessage(msg) {
    const banner = document.createElement('div');
    banner.innerText = msg;
    Object.assign(banner.style, {
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      backgroundColor: '#181818',
      color: '#00ff99',
      padding: '12px 20px',
      borderRadius: '12px',
      fontSize: '14px',
      zIndex: '999999',
      fontFamily: 'monospace',
      boxShadow: '0 0 12px #00ff99'
    });
    document.body.appendChild(banner);
    setTimeout(() => banner.remove(), 5000);
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === 1) {
          if (node.innerText?.match(/anúncio|ad break|publicidade/i)) {
            node.style.display = 'none';
            showMessage('🛡️ Anúncio detectado e bloqueado! Curte a live 😎');
          }
        }
      }
    }
  });

  const waitForBody = setInterval(() => {
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
      console.log('✅ Twitch AdBlocker BR está rodando');
      clearInterval(waitForBody);
    }
  }, 500);
})();
