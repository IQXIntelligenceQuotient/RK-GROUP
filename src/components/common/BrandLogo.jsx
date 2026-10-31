import OptimizedImage from './OptimizedImage';
export default function BrandLogo({ className = '', footer = false }) {
  return (
    <OptimizedImage
      src={footer ? "/images/brand/rk-group-footer-transparent.webp" : "/images/brand/rk-group-combined-logo.webp"}
      alt="RK Group — Cleaning, Hygiene & Waste Management Solutions"
      width="1000"
      height="563"
      className={`brand-logo ${className}`}
      priority decoding="async"
    />
  );
}
