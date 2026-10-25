(()=>{
 const langs=['ja','en','de','fr','es'];const nav={
 en:['Home','My Letters','Shop','Contact','Account','Notifications','Coming Soon','Letterkeeper’s desk','Privacy Policy','Terms of Use','My letter journey','Sign in'],
 ja:['ホーム','マイレター','ショップ','お問い合わせ','アカウント','通知','近日公開','手紙の管理デスク','プライバシーポリシー','利用規約','手紙の旅','ログイン'],
 de:['Startseite','Meine Briefe','Shop','Kontakt','Konto','Benachrichtigungen','Demnächst','Briefverwaltung','Datenschutz','Nutzungsbedingungen','Meine Briefreise','Anmelden'],
 fr:['Accueil','Mes lettres','Boutique','Contact','Compte','Notifications','Bientôt disponible','Gestion des lettres','Confidentialité','Conditions d’utilisation','Le parcours de ma lettre','Connexion'],
 es:['Inicio','Mis cartas','Tienda','Contacto','Cuenta','Notificaciones','Próximamente','Gestión de cartas','Privacidad','Condiciones de uso','El viaje de mi carta','Iniciar sesión']};
 const original=nav.en;let lang=localStorage.getItem('penpal-lang');if(!langs.includes(lang)){const browser=(navigator.language||'en').slice(0,2);lang=langs.includes(browser)?browser:'en';localStorage.setItem('penpal-lang',lang)}
 function apply(){document.documentElement.lang=lang;document.querySelectorAll('[data-v4-i18n]').forEach(el=>{const i=Number(el.dataset.v4I18n);el.textContent=nav[lang][i]});const sel=document.getElementById('pc-language');if(sel)sel.value=lang;const old=document.getElementById('lang');if(old&&[...old.options].some(o=>o.value===lang))old.value=lang;}
 document.addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('header');if(header){let sel=document.getElementById('pc-language');if(!sel){sel=document.createElement('select');sel.id='pc-language';sel.setAttribute('aria-label','Language / 言語');sel.innerHTML='<option value="ja">日本語</option><option value="en">English</option><option value="de">Deutsch</option><option value="fr">Français</option><option value="es">Español</option>';header.append(sel)}sel.value=lang;sel.onchange=()=>{lang=sel.value;localStorage.setItem('penpal-lang',lang);location.reload()};}
  const paths={'index.html':0,'club.html':1,'shop.html':2,'contact.html':3,'member.html':4};document.querySelectorAll('header a[href]').forEach(a=>{let href=a.getAttribute('href');if(Object.prototype.hasOwnProperty.call(paths,href)&&!a.classList.contains('brand')&&!a.querySelector('strong')){a.dataset.v4I18n=paths[href]}});
  document.querySelectorAll('a[href="privacy.html"]').forEach(a=>a.dataset.v4I18n='8');document.querySelectorAll('a[href="terms.html"]').forEach(a=>a.dataset.v4I18n='9');
  if(location.pathname.endsWith('/shop.html'))document.querySelectorAll('.shop-grid article span').forEach(el=>el.dataset.v4I18n='6');
  if(location.pathname.endsWith('/admin.html')){const h=document.querySelector('main h1');if(h)h.dataset.v4I18n='7'}
  apply();
 });
 window.pcLanguage=()=>lang;
})();