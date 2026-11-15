import express from 'express';
import { Catalog } from './domain.js';
import { authorized,wrap,errors } from './common.js';

export function createApp(options: any={}) {
 const app=express();app.use(express.json({limit:'16kb'}));
 const repository=undefined;const service=new Catalog();
 app.get('/health/live',(_req,res)=>res.json({status:'ok'}));
 app.get('/health',wrap(async(_req,res)=>{res.json({status:'ready'});}));
 app.get('/products',wrap((req,res)=>res.json(service.list(req.query))));
 app.use(errors);return {app,close:()=>repository?.close()??Promise.resolve()};
}
