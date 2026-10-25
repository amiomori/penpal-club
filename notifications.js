/* Notifications are written by database triggers, not the browser. */
document.addEventListener('DOMContentLoaded',async()=>{
 const db=window.penpalClient;if(!db)return;
 const header=document.querySelector('header');if(!header)return;
 const bell=document.createElement('a');bell.href='club.html#notifications';bell.className='pc-bell';bell.setAttribute('aria-label','Notifications');bell.innerHTML='🔔 <span class="pc-count" hidden>0</span>';header.append(bell);
 const {data:{user}}=await db.auth.getUser();if(!user){bell.href='member.html';return}
 const root=document.getElementById('pc-notifications');
 async function refresh(){
  const {data,error}=await db.from('member_notifications').select('id,kind,title,body,target_url,created_at,read_at').eq('user_id',user.id).order('created_at',{ascending:false}).limit(60);
  if(error){if(root)root.textContent='Notifications unavailable: '+error.message;return}
  const count=data.filter(n=>!n.read_at).length;const badge=bell.querySelector('.pc-count');badge.hidden=!count;badge.textContent=count>99?'99+':String(count);
  if(!root)return;root.replaceChildren();const h=document.createElement('h2');h.textContent='🔔 Notifications';root.append(h);
  if(!data.length){const p=document.createElement('p');p.textContent='No notifications yet.';root.append(p);return}
  for(const n of data){const item=document.createElement('div');item.className='pc-notification-item';item.dataset.unread=String(!n.read_at);
   const a=document.createElement('a');a.textContent=n.title;a.href=['club.html','admin.html','member.html'].includes(n.target_url)?n.target_url:'club.html';
   const body=document.createElement('div');body.textContent=n.body;
   const time=document.createElement('time');time.dateTime=n.created_at;time.textContent=new Date(n.created_at).toLocaleString();item.append(a,body,time);
   if(!n.read_at){const btn=document.createElement('button');btn.type='button';btn.textContent='Mark as read';btn.onclick=async()=>{btn.disabled=true;const {error}=await db.rpc('mark_penpal_notification_read',{p_id:n.id});if(error){btn.disabled=false;alert(error.message)}else await refresh()};item.append(btn)}root.append(item);
  }
 }
 await refresh();document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});
});
