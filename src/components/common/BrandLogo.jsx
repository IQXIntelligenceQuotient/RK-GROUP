export default function BrandLogo({ className = '' }) {
  return (
    <img
      src="/images/brand/rk-group-combined-logo.webp"
      alt="RK Group — Cleaning, Hygiene & Waste Management Solutions"
      width="1000"
      height="563"
      className={`brand-logo ${className}`}
      decoding="async"
    />
  );
}
