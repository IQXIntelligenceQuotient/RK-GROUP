import { Plus, Minus } from 'lucide-react';
import { faqs } from '../../data/faqs';
export default function FAQ(){return <div className="faq-list">{faqs.map((faq,index)=><details key={faq.question} name="rk-faq" open={index===0}><summary><span className="faq-number">{String(index+1).padStart(2,'0')}</span><h3>{faq.question}</h3><span className="faq-toggle"><Plus className="faq-plus" size={18}/><Minus className="faq-minus" size={18}/></span></summary><p>{faq.answer.replace(/\n*---\s*$/,'')}</p></details>)}</div>;}
