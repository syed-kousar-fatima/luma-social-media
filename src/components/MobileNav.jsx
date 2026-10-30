import { FiBell, FiCompass, FiHome, FiMessageCircle, FiPlus, FiUser } from 'react-icons/fi';
const items = [
  ['home', FiHome, 'Home'], ['explore', FiCompass, 'Explore'], ['create', FiPlus, 'Create'],
  ['notifications', FiBell, 'Activity'], ['messages', FiMessageCircle, 'Messages'], ['profile', FiUser, 'Profile'],
];
export default function MobileNav({ active, onNavigate, onCreate }) {
  return <nav className="mobile-nav" aria-label="Mobile navigation">{items.map(([id, Icon, label]) =>
    <button key={id} className={`${active === id ? 'active' : ''} ${id === 'create' ? 'mobile-create' : ''}`} aria-label={label} onClick={() => id === 'create' ? onCreate() : onNavigate(id)}><Icon /></button>
  )}</nav>;
}
