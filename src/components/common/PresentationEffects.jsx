import { useEffect } from 'react';
export default function PresentationEffects(){
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  const word=document.querySelector('.hero-emphasis');
  const hero=document.querySelector('.hero');
  if(!hero)return;
  const animations=[];let observer;let frame=0;let heroTop=0;let range=1;
  const measure=()=>{heroTop=hero.getBoundingClientRect().top+window.scrollY;range=Math.max(180,hero.offsetHeight*.55);};
  const paint=()=>{frame=0;if(word)word.style.setProperty('--word-fill',`${Math.min(100,Math.max(0,(window.scrollY-heroTop)/range*100))}%`);};
  const scroll=()=>{if(!frame)frame=requestAnimationFrame(paint);};
  const animate=(el,delay=0,scale=false)=>{if(!el||media.matches)return;animations.push(el.animate([{opacity:.15,transform:`translateY(${innerWidth<700?12:20}px) scale(${scale?.985:1})`},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:600,delay,easing:'cubic-bezier(.22,1,.36,1)'}));};
  const start=()=>{
   if(media.matches){word?.classList.remove('scroll-colour-word');return;}
   word?.classList.add('scroll-colour-word');measure();paint();
   document.querySelectorAll('.hero-copy>.eyebrow,.hero h1,.hero-description,.hero .button-row>a,.hero-sectors a').forEach((el,i)=>animate(el,Math.min(i*75,350)));
   const photo=document.querySelector('.hero-photo');if(photo)animations.push(photo.animate([{opacity:.5,transform:'scale(1.04)'},{opacity:1,transform:'scale(1)'}],{duration:650,easing:'ease-out'}));
   document.querySelectorAll('.hero-benefits>div').forEach((el,i)=>animate(el,i*75));
   const selector='.section-heading>div,.section-heading>p,.about-copy,.about-visual,.about-feature-grid>div,.service-card,.advice-card,.sector-grid article,.approach-intro,.approach-items article,.process-grid article,.vision-photo,.vision-copy,.quote-copy,.quote-form-panel,.faq-intro,.faq-list details,.contact-banner-copy,.contact-action-panel,.footer-grid>div,.footer-bottom';
   observer=new IntersectionObserver(entries=>{entries.forEach(({target,isIntersecting})=>{if(!isIntersecting)return;const index=[...target.parentElement.children].indexOf(target);animate(target,Math.min(index%5*70,280),target.matches('.service-card,.about-visual,.vision-photo'));target.classList.add('has-entered');observer.unobserve(target);});},{threshold:.1});
   document.querySelectorAll(selector).forEach(el=>observer.observe(el));
  };
  start();window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',measure);
  const change=()=>{animations.forEach(a=>a.cancel());observer?.disconnect();if(media.matches){word?.classList.remove('scroll-colour-word');}else start();};media.addEventListener('change',change);
  return()=>{observer?.disconnect();animations.forEach(a=>a.cancel());cancelAnimationFrame(frame);word?.classList.remove('scroll-colour-word');window.removeEventListener('scroll',scroll);window.removeEventListener('resize',measure);media.removeEventListener('change',change);};
 },[]);return null;
}

