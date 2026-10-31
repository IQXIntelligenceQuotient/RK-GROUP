import {images} from '../src/data/images.js';
import {origin,xml,save} from './config.mjs';
await save('image-sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">'+images.map(i=>'<url><loc>'+xml(origin+i.page)+'</loc><image:image><image:loc>'+xml(origin+i.src)+'</image:loc><image:title>'+xml(i.title)+'</image:title><image:caption>'+xml(i.caption||i.alt)+'</image:caption></image:image></url>').join('')+'</urlset>');
