import { routes } from '../src/data/routes.js';
import {origin,stamp,xml,save} from './config.mjs';
await save('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(r=>'<url><loc>'+xml(origin+r.path)+'</loc><lastmod>'+stamp+'</lastmod><changefreq>monthly</changefreq><priority>'+(r.path==='/'?'1.00':'0.80')+'</priority></url>').join('')+'</urlset>');
await save('sitemap-index.xml','<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['sitemap.xml','image-sitemap.xml'].map(f=>'<sitemap><loc>'+xml(origin+'/'+f)+'</loc><lastmod>'+stamp+'</lastmod></sitemap>').join('')+'</sitemapindex>');
await save('robots.txt','User-agent: *\nAllow: /\n'+['admin','private','test','staging','drafts'].map(p=>'Disallow: /'+p+'/').join('\n')+'\n'+['sitemap-index.xml','sitemap.xml','image-sitemap.xml'].map(f=>'Sitemap: '+origin+'/'+f).join('\n')+'\n');
