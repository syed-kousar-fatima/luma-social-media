import { useState } from 'react';
import { FiArrowUpRight, FiPlus, FiSmile, FiUserPlus } from 'react-icons/fi';
import { people } from '../data/mockData';
import Avatar from '../components/Avatar';
import PostCard from '../components/PostCard';
import StoryRail from '../components/StoryRail';

export default function FeedPage({ user, posts, stories, onLike, onComment, onCreate, onAddStory, onViewStory, onShareStory, onExplore, uploadNotice }) {
  const [draft, setDraft] = useState('');
  const [following, setFollowing] = useState({});
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date()).toUpperCase();
  return <div className="feed-page">
    <div className="welcome-strip"><div><span className="eyebrow">{today}</span><h1>A little inspiration, <em>{user.name.split(' ')[0]}.</em></h1><p>Good things happen when you show up as you.</p></div><span className="welcome-sparkle">✳</span></div>
    <StoryRail stories={stories} onAddStory={onAddStory} onViewStory={onViewStory} uploadNotice={uploadNotice} />
    <section className="composer-card"><Avatar src={user.avatar} name={user.name} size="md" /><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Share a little something..." aria-label="Write a post" onKeyDown={(event) => { if (event.key === 'Enter' && draft.trim()) { onCreate(draft); setDraft(''); } }} /><button className="composer-emoji" aria-label="Add emoji"><FiSmile /></button><button className="composer-submit" onClick={() => { if (draft.trim()) { onCreate(draft); setDraft(''); } }}><FiPlus /><span>Post</span></button></section>
    <section className="home-discover"><div><span className="eyebrow">A LITTLE INSPIRATION</span><strong>Trending in your circle</strong></div><div className="home-trend-list">{['#littleescapes', '#slowmornings', '#weekendnotes'].map((tag) => <button key={tag} onClick={() => onExplore(tag.slice(1))}>{tag}<span>↗</span></button>)}</div></section>
    <div className="feed-heading"><div><span className="eyebrow">YOUR DAILY DOSE</span><h2>For you <span>✦</span></h2></div><button className="text-button">Latest <FiArrowUpRight /></button></div>
    <div className="post-list">{posts.map((post) => <PostCard key={post.id} post={post} onLike={onLike} onComment={onComment} onShareStory={onShareStory} />)}</div>
    <section className="home-people-panel">
      <div className="home-people-heading"><div><span className="eyebrow">GOOD PEOPLE, GOOD ENERGY</span><h2>Find your next favorite</h2></div><button className="text-button" onClick={onExplore}>Explore all <FiArrowUpRight /></button></div>
      <div className="home-people-list">{people.slice(0, 3).map((person) => <article className="home-person-card" key={person.id}><Avatar src={person.avatar} name={person.name} size="md" /><span><strong>{person.name}</strong><small>@{person.handle}</small></span><button className={following[person.id] ? 'following' : ''} onClick={() => setFollowing((current) => ({ ...current, [person.id]: !current[person.id] }))} aria-label={`${following[person.id] ? 'Unfollow' : 'Follow'} ${person.name}`}>{following[person.id] ? 'Following' : <FiUserPlus />}</button></article>)}</div>
    </section>
    <button className="load-more">You’re all caught up <span>✦</span></button>
  </div>;
}
