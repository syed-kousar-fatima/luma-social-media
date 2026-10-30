import { useEffect, useMemo, useRef, useState } from 'react';
import { FiArrowUpRight, FiBell, FiLogOut, FiMenu, FiSearch, FiX } from 'react-icons/fi';
import { initialPosts, people, stories as initialStories } from '../data/mockData';
import Avatar from '../components/Avatar';
import Brand from '../components/Brand';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';
import FeedPage from './FeedPage';
import ExplorePage from './ExplorePage';
import ActivityPage from './ActivityPage';
import MessagesPage from './MessagesPage';
import ProfilePage from './ProfilePage';
import StoryViewer from '../components/StoryViewer';

export default function SocialApp({ user, onSignOut }) {
  const [active, setActive] = useState('home');
  const [posts, setPosts] = useState(initialPosts);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [storyData, setStoryData] = useState(() => initialStories.map((story) => story.own ? { ...story, name: user.name, avatar: user.avatar, items: [] } : story));
  const [storyViewerIndex, setStoryViewerIndex] = useState(null);
  const [storyViewerItemIndex, setStoryViewerItemIndex] = useState(0);
  const [storyUploadNotice, setStoryUploadNotice] = useState('');
  const [profile, setProfile] = useState(user);
  const storyObjectUrls = useRef(new Set());
  const navigate = (page) => { setActive(page); setShowMobileMenu(false); };
  const title = useMemo(() => ({ home: 'Your home', explore: 'Explore', notifications: 'Activity', messages: 'Messages', profile: 'Your profile' }[active]), [active]);
  const createPost = () => { setShowMobileMenu(false); setShowCreate(true); };
  useEffect(() => () => storyObjectUrls.current.forEach((url) => URL.revokeObjectURL(url)), []);
  const likePost = (id) => setPosts((current) => current.map((post) => post.id === id ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) } : post));
  const addComment = (id) => setPosts((current) => current.map((post) => post.id === id ? { ...post, comments: post.comments + 1 } : post));
  const addStory = (file) => {
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setStoryUploadNotice('Choose an image or video file to add to your story.');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setStoryUploadNotice('This file is over 25 MB. Choose a smaller image or video.');
      return;
    }
    setStoryUploadNotice('');
    const media = URL.createObjectURL(file);
    storyObjectUrls.current.add(media);
    const storyItem = { id: `story-${Date.now()}`, media, type: file.type.startsWith('video/') ? 'video' : 'image', caption: '', time: 'Just now' };
    setStoryViewerItemIndex(storyData.find((story) => story.own)?.items.length || 0);
    setStoryData((current) => current.map((story) => story.own ? { ...story, items: [...story.items, storyItem] } : story));
    setStoryViewerIndex(0);
  };
  const viewStory = (index) => {
    const selectedStory = storyData[index];
    setStoryViewerItemIndex(selectedStory?.own ? Math.max(0, selectedStory.items.length - 1) : 0);
    setStoryData((current) => current.map((story, storyIndex) => storyIndex === index ? { ...story, seen: true } : story));
    setStoryViewerIndex(index);
  };
  const sharePostToStory = (post) => {
    const media = post.video || post.image;
    const storyItem = { id: `shared-${post.id}-${Date.now()}`, media, type: post.video ? 'video' : 'image', caption: post.caption, time: 'Just now' };
    setStoryViewerItemIndex(storyData.find((story) => story.own)?.items.length || 0);
    setStoryData((current) => current.map((story) => story.own ? { ...story, items: [...story.items, storyItem] } : story));
    setStoryViewerIndex(0);
  };
  const addPost = (caption, mediaUrl = '') => {
    const sampleImage = `https://images.unsplash.com/photo-${['1500530855697-b586d89ba3ee', '1470770841072-f978cf4d019e', '1518837695005-2083093ee35b'][posts.length % 3]}?w=1200&auto=format&fit=crop&q=85`;
    const isVideo = /\.(mp4|webm|mov)(?:[?#].*)?$/i.test(mediaUrl);
    const nextPost = { id: `post-${Date.now()}`, personId: 'you', name: profile.name, handle: profile.handle, avatar: profile.avatar, time: 'just now', caption, location: '', image: mediaUrl && !isVideo ? mediaUrl : sampleImage, video: isVideo ? mediaUrl : undefined, likes: 0, comments: 0, liked: false, tags: ['myday'] };
    setPosts((current) => [nextPost, ...current]);
    setActive('home');
    setShowCreate(false);
  };

  return <div className="app-shell">
    <Sidebar active={active} onNavigate={navigate} user={profile} onCreate={createPost} onSignOut={onSignOut} />
    <div className="app-main">
      <header className="topbar"><button className="mobile-menu-toggle" aria-label={showMobileMenu ? 'Close menu' : 'Open menu'} onClick={() => setShowMobileMenu(!showMobileMenu)}>{showMobileMenu ? <FiX /> : <FiMenu />}</button><div className="topbar-mobile-brand"><Brand /></div><div className="topbar-context"><span className="eyebrow">{title}</span><span className="topbar-context-dot">/</span><span>{new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date())}</span></div><label className="top-search"><FiSearch /><input value={searchQuery} placeholder="Search anything..." aria-label="Search" onChange={(event) => setSearchQuery(event.target.value)} onFocus={() => navigate('explore')} /><kbd>⌘ K</kbd></label><div className="topbar-actions"><button className="top-icon" onClick={() => navigate('notifications')} aria-label="Notifications"><FiBell /><i /></button><button className="top-avatar" onClick={() => navigate('profile')} aria-label="Open profile"><Avatar name={profile.name} src={profile.avatar} size="sm" /></button></div></header>
      <main className={`content-layout ${active !== 'home' ? 'content-layout-single' : ''}`}><div className="primary-content">
        {active === 'home' && <FeedPage user={profile} posts={posts} stories={storyData} uploadNotice={storyUploadNotice} onLike={likePost} onComment={addComment} onCreate={addPost} onAddStory={addStory} onViewStory={viewStory} onShareStory={sharePostToStory} onExplore={(query = '') => { setSearchQuery(query); navigate('explore'); }} />}
        {active === 'explore' && <ExplorePage posts={posts} query={searchQuery} onQueryChange={setSearchQuery} />}
        {active === 'notifications' && <ActivityPage />}
        {active === 'messages' && <MessagesPage />}
        {active === 'profile' && <ProfilePage user={profile} posts={posts} onEdit={() => setShowEdit(true)} />}
      </div>
      {active === 'home' && <aside className="right-rail">
        <section className="daily-card"><span className="eyebrow">A THOUGHT FOR TODAY</span><span className="quote-mark">“</span><p>Be where your feet are.</p><span className="quote-byline">A LITTLE REMINDER <i>✦</i></span><div className="daily-art" /></section>
        <section className="suggestion-panel"><div className="section-heading"><div><span className="eyebrow">GOOD PEOPLE</span><h2>Find your circle</h2></div><button className="icon-button" onClick={() => navigate('explore')} aria-label="Explore people"><FiArrowUpRight /></button></div>
          {people.slice(0, 4).map((person) => <div className="suggestion-person" key={person.id}><Avatar src={person.avatar} name={person.name} size="sm" /><span><strong>{person.name}</strong><small>@{person.handle}</small></span><button aria-label={`Follow ${person.name}`}><span>+</span></button></div>)}
          <button className="see-suggestions" onClick={() => navigate('explore')}>Find more people <FiArrowUpRight /></button>
        </section><div className="footer-links"><span>About</span><span>Guidelines</span><span>Privacy</span><span>© 2025 Luma</span></div>
      </aside>}</main>
    </div>
    {showMobileMenu && <div className="mobile-menu-backdrop" onClick={() => setShowMobileMenu(false)}><nav className="mobile-menu-drawer" onClick={(event) => event.stopPropagation()}><div className="mobile-menu-head"><Brand /><button className="icon-button" onClick={() => setShowMobileMenu(false)} aria-label="Close menu"><FiX /></button></div>{[['home', 'Home'], ['explore', 'Explore'], ['notifications', 'Notifications'], ['messages', 'Messages'], ['profile', 'Profile']].map(([page, label]) => <button key={page} className={active === page ? 'active' : ''} onClick={() => navigate(page)}>{label}<FiArrowUpRight /></button>)}<button className="mobile-menu-signout" onClick={onSignOut}><FiLogOut /> Sign out</button></nav></div>}
    <MobileNav active={active} onNavigate={navigate} onCreate={createPost} />
    {storyViewerIndex !== null && <StoryViewer stories={storyData} initialStoryIndex={storyViewerIndex} initialItemIndex={storyViewerItemIndex} onClose={() => setStoryViewerIndex(null)} />}
    {showCreate && <div className="modal-backdrop" onClick={() => setShowCreate(false)}><form className="edit-modal create-modal" onClick={(event) => event.stopPropagation()} onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const caption = String(data.get('caption')).trim(); if (caption) addPost(caption, String(data.get('media')).trim()); }}><span className="eyebrow">A MOMENT WORTH KEEPING</span><h2>Create a post</h2><label>What’s on your mind?<textarea name="caption" rows="4" placeholder="Share a little something..." required /></label><label>Image or video URL <span className="optional-label">optional · supports image, MP4, WebM</span><input name="media" type="url" placeholder="https://..." /></label><div className="modal-actions"><button type="button" className="outline-button" onClick={() => setShowCreate(false)}>Cancel</button><button className="auth-submit">Share post <FiArrowUpRight /></button></div></form></div>}
    {showEdit && <div className="modal-backdrop" onClick={() => setShowEdit(false)}><form className="edit-modal" onClick={(event) => event.stopPropagation()} onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const next = { ...profile, name: String(data.get('name')).trim() || profile.name, handle: String(data.get('handle')).trim().replace(/^@/, '') || profile.handle }; setProfile(next); const storage = localStorage.getItem('luma-auth') ? localStorage : sessionStorage; storage.setItem('luma-auth', JSON.stringify(next)); setShowEdit(false); }}><span className="eyebrow">MAKE IT YOURS</span><h2>Edit profile</h2><label>Name<input name="name" defaultValue={profile.name} /></label><label>Username<input name="handle" defaultValue={profile.handle} /></label><div className="modal-actions"><button type="button" className="outline-button" onClick={() => setShowEdit(false)}>Cancel</button><button className="auth-submit">Save changes <FiArrowUpRight /></button></div></form></div>}
  </div>;
}
