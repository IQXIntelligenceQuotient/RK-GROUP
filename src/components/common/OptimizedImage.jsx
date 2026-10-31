import variants from '../../data/imageVariants.json';
const base=import.meta.env.BASE_URL;
const publicUrl=path=>base+path.replace(/^\//,'');
export default function OptimizedImage({src,alt,width,height,priority=false,sizes,...props}){
 const key=base!=='/'&&src.startsWith(base)?'/'+src.slice(base.length):src;
 const image=variants[key];
 const hint=sizes||(key.includes('/decor/')?'(max-width: 900px) 110px, 280px':key.includes('/services/')?'(max-width: 360px) 90vw, (max-width: 1049px) 44vw, 250px':key.includes('/sectors/')?'(max-width: 360px) 90vw, (max-width: 650px) 45vw, 440px':key.includes('/brand/')?'(max-width: 650px) 200px, 290px':'(max-width: 650px) 95vw, 700px');
 const list=image?.variants;
 return <img src={list?publicUrl(list[list.length-1].src):src} srcSet={list?.map(v=>`${publicUrl(v.src)} ${v.width}w`).join(', ')} sizes={list?hint:undefined} alt={alt} width={image?.width||width} height={image?.height||height} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding="async" {...props}/>;
}
