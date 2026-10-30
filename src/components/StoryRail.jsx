import { useRef } from 'react';
import { FiPlus } from 'react-icons/fi';
import Avatar from './Avatar';

export default function StoryRail({ stories, onAddStory, onViewStory, uploadNotice }) {
  const uploadInput = useRef(null);
  const handleUpload = (event) => {
    const [file] = event.target.files || [];
    if (file) onAddStory(file);
    event.target.value = '';
  };
  return <section className="stories-card">
    <div className="section-heading"><div><span className="eyebrow">YOUR CIRCLE</span><h2>Stories <span className="live-dot" /></h2></div><span className="story-hint">Little moments, shared today</span></div>
    <div className="story-list">{stories.map((story, index) => <div className="story-item-wrap" key={story.id}>
      {story.own
        ? <button className="story-item" onClick={() => uploadInput.current?.click()} aria-label="Upload a story">
          <span className="story-ring story-own"><span className="story-add"><FiPlus /></span></span><span className="story-name">Your story</span>
        </button>
        : <button className="story-item" onClick={() => onViewStory(index)} aria-label={`View ${story.name}'s story`}>
          <span className={`story-ring ${story.seen ? 'seen' : ''}`}><Avatar src={story.avatar} name={story.name} size="story" /></span><span className="story-name">{story.name}</span>
        </button>}
      {story.own && story.items?.length > 0 && <button className="own-story-preview" onClick={() => onViewStory(index)} aria-label="View your uploaded story">{story.items[story.items.length - 1].type === 'video' ? <video src={story.items[story.items.length - 1].media} muted playsInline /> : <img src={story.items[story.items.length - 1].media} alt="" />}<span>View</span></button>}
    </div>)}</div>
    <input ref={uploadInput} className="story-upload-input" type="file" accept="image/*,video/*" onChange={handleUpload} />
    {uploadNotice && <p className="story-upload-notice" role="status">{uploadNotice}</p>}
  </section>;
}
