import { useState } from 'react';
import { FiBookmark, FiHeart, FiMessageCircle, FiMoreHorizontal, FiSend } from 'react-icons/fi';
import Avatar from './Avatar';

const formatLikes = (count) => count >= 1000 ? `${(count / 1000).toFixed(1).replace('.0', '')}k` : count;

export default function PostCard({ post, onLike, onComment, onShareStory }) {
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const submitComment = (event) => {
    event.preventDefault();
    if (!comment.trim()) return;
    onComment(post.id, comment.trim());
    setComment('');
    setShowComments(true);
  };
  return <article className="post-card">
    <header className="post-header">
      <Avatar src={post.avatar} name={post.name} size="md" />
      <div className="post-person"><strong>{post.name}<span className="verified">✦</span></strong><span>@{post.handle} <i>·</i> {post.time}</span></div>
      <button className="icon-button post-more" aria-label="More post options"><FiMoreHorizontal /></button>
    </header>
    {post.location && <div className="post-location"><span>⌖</span> {post.location}</div>}
    <p className="post-caption">{post.caption}</p>
    <div className="post-image-wrap">{post.video
      ? <video className="post-image post-video" src={post.video} poster={post.image} controls playsInline preload="none" aria-label={`Video by ${post.name}`} />
      : <img className="post-image" src={post.image} alt={post.caption} loading="lazy" />}</div>
    <div className="post-actions">
      <div className="post-action-group">
        <button className={`post-action ${post.liked ? 'liked' : ''}`} aria-label={post.liked ? 'Unlike post' : 'Like post'} onClick={() => onLike(post.id)}><FiHeart /><span>{formatLikes(post.likes)}</span></button>
        <button className="post-action" aria-label="View comments" onClick={() => setShowComments(!showComments)}><FiMessageCircle /><span>{post.comments}</span></button>
        <button className="post-action share-action" aria-label="Share post" onClick={() => setShowShareOptions(!showShareOptions)}><FiSend /><span>Share</span></button>
      </div>
      <button className={`icon-button save-button ${saved ? 'saved' : ''}`} aria-label="Save post" onClick={() => setSaved(!saved)}><FiBookmark /></button>
    </div>
    {showShareOptions && <div className="share-story-options"><span>Share this moment</span><button onClick={() => { onShareStory(post); setShowShareOptions(false); }}><FiSend /> Add to your story</button></div>}
    {post.tags?.length > 0 && <div className="post-tags">{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>}
    {showComments && <div className="comments-preview"><span>{post.comments} comments</span><p><strong>sofia.reyes</strong> This is such a beautiful moment ✨</p></div>}
    <form className="comment-form" onSubmit={submitComment}><input value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Add a comment..." aria-label="Add a comment" /><button type="submit" disabled={!comment.trim()}>Post</button></form>
  </article>;
}
