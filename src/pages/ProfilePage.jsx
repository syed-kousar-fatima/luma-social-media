import { useState } from 'react';
import { FiArrowUpRight, FiEdit2, FiGrid, FiHeart, FiMapPin, FiMoreHorizontal } from 'react-icons/fi';
import { exploreImages } from '../data/mockData';
import Avatar from '../components/Avatar';

export default function ProfilePage({ user, posts, onEdit }) {
  const [tab, setTab] = useState('posts');
  return <div className="page-content profile-page">
    <div className="profile-topline"><span className="eyebrow">YOUR LITTLE CORNER OF LUMA</span><button className="icon-button"><FiMoreHorizontal /></button></div>
    <section className="profile-hero"><div className="profile-avatar-wrap"><Avatar src={user.avatar} name={user.name} size="profile" /></div><div className="profile-info"><div className="profile-name-row"><div><h1>{user.name}<span className="verified">✦</span></h1><span>@{user.handle}</span></div><button className="edit-profile-button" onClick={onEdit}><FiEdit2 /> Edit profile</button></div><p>Collecting little moments and the places that make them. Here for the stories, staying for the people. ✨</p><div className="profile-location"><FiMapPin /> Portland, Oregon <span>·</span> Joined October 2025</div><div className="profile-stats"><span><strong>{posts.length + 18}</strong> posts</span><span><strong>2,481</strong> followers</span><span><strong>684</strong> following</span></div></div></section>
    <div className="profile-tabs"><button className={tab === 'posts' ? 'active' : ''} onClick={() => setTab('posts')}><FiGrid /> Posts</button><button className={tab === 'saved' ? 'active' : ''} onClick={() => setTab('saved')}><FiHeart /> Saved</button><span>MADE WITH A LITTLE HEART <i>✦</i></span></div>
    {tab === 'posts' ? <div className="profile-grid">{[...posts.map((post) => post.image), ...exploreImages.slice(3, 8)].map((image, index) => <button key={`${image}-${index}`} className="profile-tile"><img src={image} alt={`Post ${index + 1}`} loading="lazy" /><span><FiHeart /> {['2.8k', '1.2k', '3.9k'][index % 3]} <FiArrowUpRight /></span></button>)}</div> : <div className="saved-empty"><span>♡</span><h2>Keep the good ones close.</h2><p>Posts you save will live here, just for you.</p></div>}
  </div>;
}
