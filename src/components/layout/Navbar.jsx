import { navigation } from '../../data/navigation';
export default function Navbar({onNavigate}){return <nav aria-label="Main navigation">{navigation.map(item=><a key={item.href} href={item.href} onClick={onNavigate}>{item.label}</a>)}</nav>;}
