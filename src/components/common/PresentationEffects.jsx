import { useEffect } from 'react';
const EASE='cubic-bezier(.22,1,.36,1)';
const SELECTOR=[
 '.section-heading>div','.section-heading>p','.service-card','.advice-card',
 '.about-visual','.about-copy>.eyebrow','.about-copy>h2','.about-copy>p','.about-copy>.text-link','.about-feature-grid>div',
 '.centered-heading>.eyebrow','.centered-heading>h2','.centered-heading>p','.sector-grid article','.approach-intro','.approach-items article','.process-grid article',
 '.vision-photo','.vision-copy>.eyebrow','.vision-copy>h2','.vision-copy>p','.vision-copy>.integrated-cleaning-illustration','.vision-pledge',
 '.quote-copy','.quote-form-panel','.faq-intro','.faq-list','.contact-banner-copy','.contact-action-panel','.footer-grid>div','.footer-bottom'
].join(',');
export default function PresentationEffects(){useEffect(()=>{
 const media=window.matchMedia('(prefers-reduced-motion: reduce)');
 const revealed=new WeakSet();const running=new Map();let observer;let frame=0;let previousY=window.scrollY;let heroRange=400;let jumpUntil=0;
 const word=document.querySelector('.hero-emphasis');const hero=document.querySelector('.hero');
 const measure=()=>{heroRange=Math.max(220,(hero?.offsetHeight||800)*.5);};
 const finishAll=()=>{for(const animation of running.values())animation.cancel();running.clear();};
 const paint=()=>{frame=0;if(!media.matches)word?.style.setProperty('--word-fill',`${Math.min(100,Math.max(0,window.scrollY/heroRange*100))}%`);};
 const scroll=()=>{const y=window.scrollY;if(Math.abs(y-previousY)>innerHeight*.55){finishAll();jumpUntil=performance.now()+200;}previousY=y;if(!frame)frame=requestAnimationFrame(paint);};
 const tokens=el=>el.matches('.about-visual,.vision-photo')?{duration:900,y:0,scale:1.035}:el.matches('.service-card,.sector-grid article,.approach-items article,.process-grid article,.advice-card')?{duration:760,y:24,scale:.985}:el.matches('h2,.section-heading>div')?{duration:720,y:22,scale:1}:el.matches('.about-feature-grid>div')?{duration:500,y:10,scale:1}:el.matches('.quote-form-panel,.contact-action-panel')?{duration:620,y:12,scale:1}:{duration:650,y:14,scale:1};
 const mark=el=>{revealed.add(el);el.classList.add('has-entered');observer?.unobserve(el);};
 const animate=(el,delay)=>{el.dataset.motionPlayed='true';const t=tokens(el);const mobile=innerWidth<700;const a=el.animate([{opacity:0,translate:`0 ${mobile?t.y*.6:t.y}px`,scale:String(t.scale)},{opacity:1,translate:'0 0',scale:'1'}],{duration:t.duration,delay,easing:EASE,fill:'backwards'});running.set(el,a);const clean=()=>{if(running.get(el)===a)running.delete(el);};a.onfinish=clean;a.oncancel=clean;};
 const setup=()=>{
  observer?.disconnect();finishAll();measure();
  if(media.matches){word?.classList.remove('scroll-colour-word');return;}
  word?.classList.add('scroll-colour-word');paint();
  observer=new IntersectionObserver(entries=>{
   const groups=new Map();for(const entry of entries){if(!entry.isIntersecting||revealed.has(entry.target))continue;const el=entry.target;const rect=entry.boundingClientRect;mark(el);
    // If a fast jump/anchor already brought the content into view, leave it visible.
    if(rect.bottom<0||(performance.now()<jumpUntil&&rect.top<innerHeight*.9))continue;
    if(!groups.has(el.parentElement))groups.set(el.parentElement,[]);groups.get(el.parentElement).push(el);
   }
   for(const group of groups.values()){group.sort((a,b)=>a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1);group.forEach((el,i)=>animate(el,Math.min(i*(innerWidth<700?75:110),440)));}
  },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  const pending=[...document.querySelectorAll(SELECTOR)].filter(el=>!revealed.has(el)).map(el=>({el,top:el.getBoundingClientRect().top}));
  for(const {el,top} of pending){if(top<innerHeight)mark(el);else observer.observe(el);}
 };
 setup();
 // Above-fold content is already painted by SSG: keep it fully readable while
 // adding a short, non-hiding entrance on an initial top-of-page visit only.
 if(!media.matches&&window.scrollY<30){
  const initial=[...document.querySelectorAll('.hero-copy>.eyebrow,.hero-copy>h1,.hero-description,.hero .button-row>a,.hero-sectors a')];
  initial.forEach((el,i)=>{const a=el.animate([{opacity:1,translate:'0 8px'},{opacity:1,translate:'0 0'}],{duration:720,delay:Math.min(i*75,300),easing:EASE,fill:'backwards'});running.set(el,a);a.onfinish=a.oncancel=()=>{if(running.get(el)===a)running.delete(el);};});
  const photo=document.querySelector('.hero-photo');if(photo){const a=photo.animate([{opacity:.9,scale:'1.035'},{opacity:1,scale:'1'}],{duration:900,easing:EASE});running.set(photo,a);a.onfinish=a.oncancel=()=>{if(running.get(photo)===a)running.delete(photo);};}
 }
 window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',measure);media.addEventListener('change',setup);
 return()=>{observer?.disconnect();finishAll();cancelAnimationFrame(frame);word?.classList.remove('scroll-colour-word');word?.style.removeProperty('--word-fill');window.removeEventListener('scroll',scroll);window.removeEventListener('resize',measure);media.removeEventListener('change',setup);};
 },[]);return null;}
