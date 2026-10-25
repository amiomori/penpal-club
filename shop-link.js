// After creating and verifying your BASE shop, replace the empty string with its real HTTPS URL.
const BASE_SHOP_URL = '';
if(/^https:\/\//.test(BASE_SHOP_URL)){
 const a=document.getElementById('baseStoreLink');a.href=BASE_SHOP_URL;a.classList.remove('hidden');
 document.getElementById('baseStoreStatus').textContent='Shop checkout is hosted securely by BASE. Product availability and prices are confirmed there.';
}
