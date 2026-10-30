import { getInitials } from '../utils/validation';

export default function Avatar({ src, name, size = 'md', online = false, className = '' }) {
  return <span className={`avatar avatar-${size} ${className}`}>
    {src ? <img src={src} alt={name || ''} /> : <span className="avatar-fallback">{getInitials(name)}</span>}
    {online && <i className="online-dot" />}
  </span>;
}
