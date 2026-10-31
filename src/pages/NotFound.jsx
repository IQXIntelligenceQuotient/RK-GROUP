import { Link } from 'react-router-dom';
export default function NotFound(){return <section className="mx-auto max-w-4xl px-6 py-28"><h1 className="text-4xl font-semibold">Page not found</h1><p className="my-6">This address does not have a page.</p><Link to="/" className="underline">Return home</Link></section>;}
