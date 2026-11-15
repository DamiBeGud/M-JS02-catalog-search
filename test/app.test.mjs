import {test} from 'node:test';import assert from 'node:assert/strict';import {once} from 'node:events';
import {createApp} from '../dist/app.js';
import {Problem} from '../dist/common.js';
test('HTTP domain behavior, boundaries and conflicts',async()=>{

const runtime=createApp({token:'synthetic-unit-token',});const server=runtime.app.listen(0,'127.0.0.1');
try{await once(server,'listening');const base=`http://127.0.0.1:${server.address().port}`;
const request=(method,path,body,auth=true)=>fetch(base+path,{method,headers:{'Content-Type':'application/json',...(auth?{Authorization:'Bearer synthetic-unit-token'}:{})},...(body===undefined?{}:{body:JSON.stringify(body)})});
assert.equal((await request('GET','/health/live')).status,200);
const r=await request('GET','/products?category=office&minPriceCents=100&maxPriceCents=1000');const data=await r.json();assert.deepEqual(data.items.map(x=>x.id),['p1','p4']);
assert.deepEqual((await (await request('GET','/products?offset=100')).json()).items,[]);
assert.equal((await request('GET','/products?minPriceCents=1000&maxPriceCents=100')).status,400);
}finally{if(server.listening){server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}await runtime.close();}
});
