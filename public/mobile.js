(() => {
  const mq = window.matchMedia('(max-width: 760px)');
  if (!mq.matches) return;

  const header = document.querySelector('.header');
  const cart = document.querySelector('#cart');
  const mobileMenu = document.querySelector('#mobileMenu');

  const sticky = document.createElement('div');
  sticky.className = 'mobileBuy';
  sticky.innerHTML = `
    <div>
      <strong>THE TRIO</strong>
      <span>299 SEK</span>
    </div>
    <button type="button" data-add="trinity" data-open>ADD</button>
  `;
  document.body.appendChild(sticky);

  const updateHeader = () => {
    header?.classList.toggle('compact', window.scrollY > 80);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const updateOverlayState = () => {
    const cartOpen = cart && !cart.hidden;
    const menuOpen = mobileMenu && !mobileMenu.hidden;
    document.body.classList.toggle('mobileOverlayOpen', Boolean(cartOpen || menuOpen));
  };

  const observer = new MutationObserver(updateOverlayState);
  if (cart) observer.observe(cart, { attributes: true, attributeFilter: ['hidden'] });
  if (mobileMenu) observer.observe(mobileMenu, { attributes: true, attributeFilter: ['hidden'] });
  updateOverlayState();

  document.querySelectorAll('.grid, .recipeGrid, .howGrid').forEach((rail) => {
    rail.addEventListener('touchstart', () => rail.classList.add('isTouching'), { passive: true });
    rail.addEventListener('touchend', () => rail.classList.remove('isTouching'), { passive: true });
  });
})();
