export default function Brand({ compact = false }) {
  return <a className={`brand ${compact ? 'brand-compact' : ''}`} href="#" aria-label="Luma home">
    <span className="brand-symbol"><span /></span>
    {!compact && <span className="brand-word">luma<span>.</span></span>}
  </a>;
}
