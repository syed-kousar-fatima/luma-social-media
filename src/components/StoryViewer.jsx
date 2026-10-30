import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiX } from 'react-icons/fi';
import Avatar from './Avatar';

const STORY_DURATION = 7000;

export default function StoryViewer({ stories, initialStoryIndex, initialItemIndex = 0, onClose }) {
  const viewableStories = useMemo(() => stories.filter((story) => story.items?.length), [stories]);
  const initialGroup = Math.max(0, viewableStories.findIndex((story) => story.id === stories[initialStoryIndex]?.id));
  const [cursor, setCursor] = useState({ group: initialGroup, item: initialItemIndex });
  const [progress, setProgress] = useState(0);
  const story = viewableStories[cursor.group];
  const item = story?.items[cursor.item];

  const move = useCallback((direction) => {
    setProgress(0);
    const currentStory = viewableStories[cursor.group];
    if (!currentStory) return;
    if (direction > 0) {
      if (cursor.item < currentStory.items.length - 1) setCursor({ ...cursor, item: cursor.item + 1 });
      else if (cursor.group < viewableStories.length - 1) setCursor({ group: cursor.group + 1, item: 0 });
      else onClose();
      return;
    }
    if (cursor.item > 0) setCursor({ ...cursor, item: cursor.item - 1 });
    else if (cursor.group > 0) {
      const previousGroup = cursor.group - 1;
      setCursor({ group: previousGroup, item: viewableStories[previousGroup].items.length - 1 });
    }
  }, [cursor, onClose, viewableStories]);

  useEffect(() => {
    if (!item) return undefined;
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const nextProgress = Math.min(((Date.now() - startedAt) / STORY_DURATION) * 100, 100);
      setProgress(nextProgress);
      if (nextProgress >= 100) {
        window.clearInterval(timer);
        move(1);
      }
    }, 80);
    return () => window.clearInterval(timer);
  }, [cursor.group, cursor.item, item, move]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'ArrowLeft') move(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move, onClose]);

  if (!story || !item) return null;
  const isVideo = item.type === 'video' || /\.(mp4|webm|mov)(?:[?#].*)?$/i.test(item.media);

  return <div className="story-viewer-backdrop" role="dialog" aria-modal="true" aria-label={`${story.name}'s story`} onClick={onClose}>
    <button className="story-viewer-close" onClick={onClose} aria-label="Close story"><FiX /></button>
    <div className="story-viewer-card" onClick={(event) => event.stopPropagation()}>
      <div className="story-progress-list">{story.items.map((storyItem, index) => <span className="story-progress-track" key={storyItem.id}><i style={{ width: `${index < cursor.item ? 100 : index === cursor.item ? progress : 0}%` }} /></span>)}</div>
      <header className="story-viewer-header"><Avatar src={story.avatar} name={story.name} size="sm" /><span><strong>{story.name}</strong><small>{item.time || 'Just now'}</small></span></header>
      <div className="story-viewer-media">
        {isVideo
          ? <video key={item.id} src={item.media} autoPlay muted loop playsInline aria-label={`${story.name}'s story`} />
          : <img key={item.id} src={item.media} alt={item.caption || `${story.name}'s story`} />}
        <button className="story-hit-area story-hit-previous" onClick={() => move(-1)} aria-label="Previous story" />
        <button className="story-hit-area story-hit-next" onClick={() => move(1)} aria-label="Next story" />
        {item.caption && <p className="story-viewer-caption">{item.caption}</p>}
      </div>
      <div className="story-viewer-footer"><span>Shared with your circle</span><span>✦</span></div>
    </div>
  </div>;
}
