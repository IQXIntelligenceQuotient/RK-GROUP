import { createServer } from 'vite';
import { readFile,writeFile,mkdir } from 'node:fs/promises';
import { routes } from '../src/data/routes.js';
import { origin } from './config.mjs';
const server=await createServer({optimizeDeps:{noDiscovery:true,include:[]},server:{middlewareMode:true},appType:'custom'});
try{const {render}=await server.ssrLoadModule('/src/entry-server.jsx');const template=(await readFile('dist/index.html','utf8')).replace(/<title>.*?<\/title>/s,'');for(const page of [...routes,{path:'/404',title:'Page not found | RK Group',description:'The requested page could not be found.'}]){const {body,head}=render(page.path,page,origin);const target=page.path==='/'?'dist/index.html':page.path==='/404'?'dist/404.html':'dist'+page.path+'/index.html';await mkdir(target.slice(0,target.lastIndexOf('/')),{recursive:true});await writeFile(target,template.replace('<!--app-head-->',head).replace('<!--app-html-->',body));console.log('Prerendered '+page.path);}}finally{await server.close();}

