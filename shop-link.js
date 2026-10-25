// Public BASE storefront URL only. Do not put API tokens here.
const BASE_SHOP_URL = ''; // Example after shop verification: 'https://example.base.shop/'
document.addEventListener('DOMContentLoaded', () => {
  const link = document.getElementById('baseStoreLink');
  const status = document.getElementById('baseStoreStatus');
  if (!link || !status) return;
  if (!BASE_SHOP_URL) return; // Coming Soon until BASE has been opened and verified
  try {
    const url = new URL(BASE_SHOP_URL);
    if (url.protocol !== 'https:' || !/\.(?:base\.shop|thebase\.in)$/.test(url.hostname)) {
      console.warn('BASE URL must be an HTTPS BASE storefront URL'); return;
    }
    link.href = url.href;
    link.classList.remove('hidden');
    status.textContent = 'Shop purchases and checkout take place on BASE. Prices, inventory and shipping are shown there.';
  } catch { console.warn('Invalid BASE URL'); }
});
