const CACHE_NAME='aud-v7-4-cache';
const ASSETS=['./','./index.html','./manifest.json'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{const req=event.request;if(req.mode==='navigate'||req.url.endsWith('/index.html')){event.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE_NAME).then(cache=>cache.put('./index.html',copy));return res;}).catch(()=>caches.match('./index.html')));return;}event.respondWith(caches.match(req).then(cached=>cached||fetch(req)));});
