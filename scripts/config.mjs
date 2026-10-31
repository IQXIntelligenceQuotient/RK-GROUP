import { loadEnv } from 'vite';
const env=loadEnv('production',process.cwd(),'');
export const origin=(process.env.VITE_SITE_URL||env.VITE_SITE_URL||'https://example.com').replace(/\/$/,'');
export const stamp=new Date().toISOString().slice(0,10);
export const xml=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
export async function save(name,value){const fs=await import('node:fs/promises');await fs.mkdir('public',{recursive:true});await fs.writeFile('public/'+name,value);try{await fs.access('dist');await fs.writeFile('dist/'+name,value);}catch{ /* Generated before first build. */ }}
