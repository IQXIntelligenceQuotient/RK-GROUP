import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig(({mode})=>{
 const env=loadEnv(mode,process.cwd(),'');
 const url=process.env.VITE_SITE_URL||env.VITE_SITE_URL||'https://iqxintelligencequotient.github.io/RK-GROUP/';
 const base=mode==='production'?new URL(url).pathname.replace(/\/?$/,'/'):'/';
 return {base,plugins:[{name:'public-subpath',enforce:'pre',transform(code,id){if(!id.replaceAll('\\','/').includes('/src/')||!/\.[jt]sx?$/.test(id)||base==='/')return;return code.replace(/(["'`])\/(images\/|icons\/|favicon\.|site\.webmanifest|sitemap\.xml|og-image\.|#)/g,(_,q,p)=>q+base+p).replace(/href="\/"/g,'href="'+base+'"').replace(/href:'\/'/g,"href:'"+base+"'").replace(/\['Home','\/'\]/g,"['Home','"+base+"']");}},react(),tailwindcss()]};
});
