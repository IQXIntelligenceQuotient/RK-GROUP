import { cn } from '../../utils/cn';
export default function Button({to,children,className,...props}) {return <a href={to} className={cn('inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-4',className)} {...props}>{children}</a>;}
