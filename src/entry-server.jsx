import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import SEO from './components/seo/SEO';
import { faqs } from './data/faqs';
export function render(url,page,origin){
 const canonical=new URL(url,origin).href;
 const organization={'@type':'Organization','@id':origin+'/#organization',name:'RK Group',url:origin+'/',description:'Cleaning, Hygiene & Waste Management Solutions in Lahore.',logo:origin+'/images/brand/rk-group-combined-logo.webp',telephone:'+923274230030',address:{'@type':'PostalAddress',streetAddress:'17-B, Central Park Housing Site, 32-km Ferozpur Road',addressLocality:'Lahore',addressRegion:'Punjab',addressCountry:'PK'},contactPoint:[{'@type':'ContactPoint',telephone:'+923274230030',contactType:'customer enquiries'},{'@type':'ContactPoint',telephone:'+923064721021',contactType:'customer enquiries'}]};
 const graph=[organization,{'@type':'WebSite','@id':origin+'/#website',name:'RK Group',url:origin+'/',publisher:{'@id':origin+'/#organization'}},{'@type':'WebPage',name:page.title,description:page.description,url:canonical,isPartOf:{'@id':origin+'/#website'},about:{'@id':origin+'/#organization'}}];
 if(url==='/')graph.push({'@type':'FAQPage',mainEntity:faqs.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))},{'@type':'ImageObject',contentUrl:origin+'/images/home/green-commercial-building.webp',caption:'Illustrative commercial facility photography',width:1600,height:1067});
 return {body:renderToString(<StaticRouter location={url}><App/></StaticRouter>),head:renderToStaticMarkup(<SEO {...page} canonical={canonical} ogImage={origin+'/og-image.jpg'} robots={origin.includes('example.com')||url==='/404'?'noindex, follow':'index, follow'} jsonLd={{'@context':'https://schema.org','@graph':graph}}/>)};
}
