(() => {
  const cfg = window.PENPAL_CONFIG || {};
  const ready = /^https:\/\//.test(cfg.supabaseUrl || '') && !String(cfg.supabaseAnonKey).startsWith('PASTE_');
  window.penpalConfigured = ready;
  window.penpalClient = ready && window.supabase ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}) : null;
})();
