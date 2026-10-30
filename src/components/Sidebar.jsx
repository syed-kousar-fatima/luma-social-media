import { FiBell, FiCompass, FiHome, FiLogOut, FiMessageCircle, FiPlusSquare, FiUser } from 'react-icons/fi';
import Brand from './Brand';
import Avatar from './Avatar';

const links = [
  { id: 'home', label: 'Home', icon: FiHome },
  { id: 'explore', label: 'Explore', icon: FiCompass },
  { id: 'notifications', label: 'Notifications', icon: FiBell, badge: '3' },
  { id: 'messages', label: 'Messages', icon: FiMessageCircle, badge: '2' },
  { id: 'profile', label: 'Profile', icon: FiUser },
];

export default function Sidebar({ active, onNavigate, user, onCreate, onSignOut }) {
  return <aside className="sidebar">
    <Brand />
    <span className="sidebar-label">MENU</span>
    <nav className="side-nav">
      {links.map(({ id, label, icon: Icon, badge }) => <button key={id} className={`nav-link ${active === id ? 'active' : ''}`} onClick={() => onNavigate(id)}>
        <Icon /><span>{label}</span>{badge && <b>{badge}</b>}
      </button>)}
    </nav>
    <button className="create-button" onClick={onCreate}><FiPlusSquare /><span>Create post</span><span className="shortcut">⌘ N</span></button>
    <div className="sidebar-bottom">
      <button className="sidebar-user" onClick={() => onNavigate('profile')}>
        <Avatar name={user.name} src={user.avatar} size="sm" />
        <span><strong>{user.name}</strong><small>@{user.handle}</small></span>
        <i className="user-more">···</i>
      </button>
      <button className="logout-button" onClick={onSignOut}><FiLogOut /> Sign out</button>
    </div>
  </aside>;
}
