(() => {
  const mq = window.matchMedia('(min-width: 761px)');
  if (!mq.matches) return;

  const header = document.querySelector('.header');
  const cart = document.querySelector('#cart');

  const sticky = document.createElement('div');
  sticky.className = 'desktopBuy';
  sticky.innerHTML = `
    <div>
      <strong>THE TRIO</strong>
      <span>299 SEK</span>
    </div>
    <button type="button" data-add="trinity" data-open>ADD</button>
  `;
  document.body.appendChild(sticky);

  const updateHeader = () => {
    header?.classList.toggle('compact', window.scrollY > 96);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const updateOverlayState = () => {
    const cartOpen = cart && !cart.hidden;
    document.body.classList.toggle('desktopOverlayOpen', Boolean(cartOpen));
  };

  const observer = new MutationObserver(updateOverlayState);
  if (cart) observer.observe(cart, { attributes: true, attributeFilter: ['hidden'] });
  updateOverlayState();
})();
