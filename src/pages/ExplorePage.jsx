import { useMemo, useState } from 'react';
import { FiArrowUpRight, FiSearch, FiUserPlus } from 'react-icons/fi';
import { exploreImages, people } from '../data/mockData';
import Avatar from '../components/Avatar';

export default function ExplorePage({ posts, query, onQueryChange }) {
  const [followed, setFollowed] = useState({});
  const filtered = useMemo(() => people.filter((person) => `${person.name} ${person.handle}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const matchingPosts = useMemo(() => posts.filter((post) => `${post.caption} ${post.handle} ${post.tags?.join(' ') || ''}`.toLowerCase().includes(query.toLowerCase())), [posts, query]);
  return <div className="page-content explore-page">
    <div className="page-title"><div><span className="eyebrow">FIND YOUR NEXT FAVORITE</span><h1>Explore <span>the good stuff.</span></h1><p>Fresh perspectives, new corners of the world, your kind of people.</p></div></div>
    <label className="explore-search"><FiSearch /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search people, places, or ideas..." /><kbd>⌘ K</kbd></label>
    {query && <section className="search-results">
      <span className="eyebrow">PEOPLE ({filtered.length})</span>
      {filtered.length ? filtered.map((person) => <div className="search-person" key={person.id}><Avatar src={person.avatar} name={person.name} size="md" /><div><strong>{person.name}</strong><small>@{person.handle}</small></div><button className="outline-button" onClick={() => setFollowed({ ...followed, [person.id]: !followed[person.id] })}>{followed[person.id] ? 'Following' : 'Follow'}</button></div>) : <p className="empty-note">No people found.</p>}
      <span className="eyebrow search-post-label">POSTS ({matchingPosts.length})</span>
      {matchingPosts.length ? matchingPosts.map((post) => <div className="search-post" key={post.id}><img src={post.image} alt="" /><div><strong>{post.name}</strong><p>{post.caption}</p></div></div>) : <p className="empty-note">No matching posts.</p>}
    </section>}
    <div className="explore-section-title"><div><span className="eyebrow">THE COMMUNITY IS TALKING ABOUT</span><h2>Trending now <span>↗</span></h2></div><button className="text-button">See all <FiArrowUpRight /></button></div>
    <div className="trend-pills">{['#slowmornings', '#littleescapes', '#theartofliving', '#weekendnotes', '#madeofmoments'].map((tag, index) => <button key={tag}><span>0{index + 1}</span>{tag}<FiArrowUpRight /></button>)}</div>
    <div className="explore-section-title suggested-title"><div><span className="eyebrow">A GOOD PLACE TO START</span><h2>People to know</h2></div></div>
    <div className="suggested-grid">{people.slice(0, 4).map((person, index) => <article className="suggested-card" key={person.id}><div className="suggested-cover" style={{ backgroundImage: `url(${exploreImages[index]})` }} /><Avatar src={person.avatar} name={person.name} size="lg" /><strong>{person.name}</strong><span>@{person.handle}</span><p>{['Collecting places & little moments.', 'Photographer, coffee enthusiast.', 'Finding beauty in the everyday.', 'Mostly outdoors, always curious.'][index]}</p><button className={followed[person.id] ? 'following-button' : 'follow-button'} onClick={() => setFollowed({ ...followed, [person.id]: !followed[person.id] })}>{followed[person.id] ? 'Following' : <><FiUserPlus /> Follow</>}</button></article>)}</div>
    <div className="explore-mosaic">{exploreImages.map((src, index) => <img key={src} src={src} alt={`Community inspiration ${index + 1}`} loading="lazy" />)}</div>
  </div>;
}
