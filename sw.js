const CACHE_NAME='aud-v7-6-cache';
const ASSETS=['./','./index.html','./manifest.json','./script.js','./sw.js'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{caches.open(CACHE_NAME).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>caches.match('./index.html')));return;}e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)));});
