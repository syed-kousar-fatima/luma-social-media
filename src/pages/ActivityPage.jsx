import { FiArrowUpRight, FiHeart, FiMessageCircle, FiUserPlus } from 'react-icons/fi';
import { notifications } from '../data/mockData';
import Avatar from '../components/Avatar';

export default function ActivityPage() {
  return <div className="page-content activity-page">
    <div className="page-title"><div><span className="eyebrow">YOUR COMMUNITY, SHOWING UP</span><h1>Good things <span>happen here.</span></h1><p>A little love from the people in your corner.</p></div><span className="activity-count">3 new</span></div>
    <section className="activity-panel"><div className="activity-panel-head"><span className="eyebrow">TODAY</span><button className="text-button">Mark all as read <FiArrowUpRight /></button></div>
      {notifications.map((item) => <article className={`activity-item ${item.fresh ? 'activity-fresh' : ''}`} key={item.id}><div className="activity-avatar"><Avatar src={item.person.avatar} name={item.person.name} size="md" /><span className={`activity-icon activity-${item.type.includes('follow') ? 'follow' : item.type.includes('comment') ? 'comment' : 'like'}`}>{item.type.includes('follow') ? <FiUserPlus /> : item.type.includes('comment') ? <FiMessageCircle /> : <FiHeart />}</span></div><div className="activity-copy"><p><strong>{item.person.name}</strong> {item.type}</p><span>{item.time}</span></div>{item.image ? <img className="activity-thumb" src={item.image} alt="" /> : <button className="outline-button small-outline">Follow back</button>}</article>)}
    </section>
    <div className="activity-note"><span>✦</span><p>You’re all caught up.<br /><small>Go make something worth sharing.</small></p></div>
  </div>;
}
