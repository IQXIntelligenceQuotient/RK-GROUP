import { useState } from 'react';
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { services } from '../../data/services';
import PolicyDialog from '../common/PolicyDialog';
export default function QuoteForm({requestedService,onServiceChange}){
 const [preview,setPreview]=useState('');const [policy,setPolicy]=useState(false);
 function prepareQuote(event){event.preventDefault();const data=new FormData(event.currentTarget);const values=[...data.entries()].filter(([,value])=>String(value).trim());setPreview('Hello RK Group, I would like to request a quotation.\n\n'+values.map(([name,value])=>`${name}: ${String(value).trim()}`).join('\n'));}
 return <div className="quote-form-panel"><div className="form-heading"><span className="form-icon"><MessageCircle size={22}/></span><div><h3>Your Requirements</h3><p>A few details. A more useful conversation.</p></div></div><form onSubmit={prepareQuote} onChange={()=>setPreview('')}><div className="form-grid">
 <label>Full Name <span>*</span><input name="Name" autoComplete="name" placeholder="Your full name" required maxLength={100}/></label>
 <label>Company / Organisation<input name="Company" autoComplete="organization" placeholder="Your organisation" maxLength={150}/></label>
 <label>Phone / WhatsApp Number <span>*</span><input name="Phone" type="tel" autoComplete="tel" placeholder="03XX XXXXXXX" required maxLength={30} minLength={7} title="Enter a valid telephone number."/></label>
 <label>Email Address<input name="Email" type="email" autoComplete="email" placeholder="you@company.com" maxLength={200}/></label>
 <label className="full-field">Required Product or Service <span>*</span><select name="Required service" value={requestedService} onChange={event=>onServiceChange(event.target.value)} required><option value="">Select a product or service</option>{services.map(service=><option key={service.title}>{service.title}</option>)}<option>Other / I need advice</option></select></label>
 <label>Facility / Business Type<select name="Facility type" defaultValue=""><option value="">Select facility type</option>{['Industrial facility','Hospital / Healthcare','Corporate office','Housing society','Shopping mall / Retail','Commercial building','Institution','Other'].map(type=><option key={type}>{type}</option>)}</select></label>
 <label>Location <span>*</span><input name="Location" autoComplete="address-level2" placeholder="Area / city" required maxLength={200}/></label>
 <label className="full-field">Quantity or Service Requirements<input name="Quantity or scope" placeholder="e.g. quantities, area or service frequency" maxLength={350}/></label>
 <label className="full-field">Preferred Timeframe<select name="Timeframe" defaultValue=""><option value="">When do you need it?</option><option>As soon as available</option><option>Within 1–2 weeks</option><option>Within a month</option><option>Planning / exploring options</option></select></label>
 <label className="full-field">Additional Details<textarea name="Additional details" rows="3" placeholder="Tell us a little more about your requirements…" maxLength={1000}/></label>
 </div><p className="form-privacy">Your information will be used to review and respond to your enquiry, in accordance with the website's <button type="button" onClick={()=>setPolicy(true)}>Privacy Policy</button>.</p><button className="button button-primary submit-quote" type="submit">Request My Quotation <ArrowUpRight size={18}/></button><p className="form-helper">Prepares your enquiry for WhatsApp. You review and send it there.</p></form>
 {preview&&<div className="quote-preview" role="status"><h4><Check size={17}/> Your enquiry is ready</h4><p>Review your details below, then open WhatsApp to send your request to RK Group.</p><pre>{preview}</pre><a href={`https://wa.me/923274230030?text=${encodeURIComponent(preview)}`} target="_blank" rel="noreferrer" className="button button-primary">Continue to WhatsApp <MessageCircle size={18}/></a><p>Nothing has been sent yet. Prefer to call? <a href="tel:+923274230030">0327-4230030</a></p></div>}
 <noscript><p>To request a quotation, call <a href="tel:+923274230030">0327-4230030</a> or <a href="https://wa.me/923274230030">contact RK Group on WhatsApp</a>.</p></noscript>
 {policy&&<PolicyDialog type="privacy" onClose={()=>setPolicy(false)}/>}</div>;
}
