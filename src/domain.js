import { Problem } from './common.js';
const products = Object.freeze([
 { id:'p1', name:'Notebook', category:'office', priceCents:500 },
 { id:'p2', name:'Desk lamp', category:'office', priceCents:2500 },
 { id:'p3', name:'Mug', category:'home', priceCents:1200 },
 { id:'p4', name:'Pen', category:'office', priceCents:150 },
 { id:'p5', name:'Bowl', category:'home', priceCents:700 }
].map(Object.freeze));
function queryInt(value, fallback, max) {
  if (value === undefined) return fallback;
  if (typeof value !== 'string' || !/^\d+$/.test(value)) throw new Problem(400,'invalid_query');
  const n=Number(value); if (!Number.isSafeInteger(n)||n>max) throw new Problem(400,'invalid_query'); return n;
}
export class Catalog {
  list(q) {
    const min=queryInt(q.minPriceCents,0,1000000), max=queryInt(q.maxPriceCents,1000000,1000000);
    const offset=queryInt(q.offset,0,1000), limit=queryInt(q.limit,10,50);
    if (min>max||limit<1||(q.category!==undefined&&typeof q.category!=='string')) throw new Problem(400,'invalid_range');
    const all=products.filter(p => p.priceCents>=min&&p.priceCents<=max&&(q.category===undefined||p.category===q.category));
    return { items:all.slice(offset,offset+limit), total:all.length, offset, limit };
  }
}
