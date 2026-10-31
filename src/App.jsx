import FloatingActions from './components/common/FloatingActions';
import PresentationEffects from './components/common/PresentationEffects';
import BackgroundTools from './components/common/BackgroundTools';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';
export default function App(){return <><a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:bg-white focus:p-4">Skip to content</a><Header/><main id="main"><BackgroundTools/><PresentationEffects/><AppRoutes/></main><Footer/><FloatingActions/></>;}
