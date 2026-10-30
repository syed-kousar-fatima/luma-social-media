import { useMemo, useState } from 'react';
import { FiArrowLeft, FiMoreHorizontal, FiPhone, FiPlus, FiSearch, FiSend, FiSmile, FiVideo } from 'react-icons/fi';
import { initialChats } from '../data/mockData';
import Avatar from '../components/Avatar';

export default function MessagesPage() {
  const [chats, setChats] = useState(initialChats);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const selected = chats.find((chat) => chat.id === selectedId) || chats[0];
  const filtered = useMemo(() => chats.filter((chat) => chat.name.toLowerCase().includes(query.toLowerCase())), [chats, query]);
  const send = (event) => {
    event.preventDefault();
    if (!message.trim()) return;
    const newMessage = { from: 'me', text: message.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChats((current) => current.map((chat) => chat.id === selected.id ? { ...chat, messages: [...chat.messages, newMessage], time: 'now' } : chat));
    setMessage('');
  };
  return <div className="messages-page">
    <div className="messages-title"><div><span className="eyebrow">YOUR PEOPLE, ONE MESSAGE AWAY</span><h1>Messages<span>.</span></h1></div><button className="icon-button"><FiPlus /></button></div>
    <div className="messages-shell">
      <aside className={`chat-list ${selectedId ? 'chat-list-selected' : ''}`}><div className="chat-search"><FiSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search conversations..." /></div>
        <div className="chat-list-label">MESSAGES <span>{chats.length}</span></div>
        <div className="chat-list-items">{filtered.map((chat) => { const last = chat.messages[chat.messages.length - 1]; return <button key={chat.id} className={`chat-preview ${selectedId === chat.id ? 'selected' : ''}`} onClick={() => setSelectedId(chat.id)}><Avatar src={chat.avatar} name={chat.name} size="md" online={chat.online} /><span className="chat-preview-copy"><strong>{chat.name}</strong><small>{last?.text}</small></span><span className="chat-preview-meta"><small>{chat.time}</small>{chat.unread > 0 && <i>{chat.unread}</i>}</span></button>; })}</div>
      </aside>
      <section className={`chat-window ${!selectedId ? 'chat-window-hidden' : ''}`}><header className="chat-header"><button className="chat-back icon-button" onClick={() => setSelectedId(null)} aria-label="Back to conversations"><FiArrowLeft /></button><Avatar src={selected.avatar} name={selected.name} size="sm" online={selected.online} /><div className="chat-header-person"><strong>{selected.name}</strong><span>{selected.online ? 'Active now' : 'Last seen recently'}</span></div><div className="chat-header-actions"><button className="icon-button" aria-label="Voice call"><FiPhone /></button><button className="icon-button" aria-label="Video call"><FiVideo /></button><button className="icon-button" aria-label="More options"><FiMoreHorizontal /></button></div></header>
        <div className="chat-date"><span>TODAY</span></div><div className="chat-messages">{selected.messages.map((item, index) => <div className={`message-row ${item.from === 'me' ? 'message-mine' : ''}`} key={`${selected.id}-${index}`}><div className="message-bubble">{item.text}<small>{item.time}</small></div></div>)}</div>
        <form className="message-composer" onSubmit={send}><button type="button" className="icon-button message-emoji" aria-label="Add emoji"><FiSmile /></button><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder={`Message ${selected.name.split(' ')[0]}...`} aria-label="Write a message" /><button className="send-message" type="submit" disabled={!message.trim()} aria-label="Send message"><FiSend /></button></form>
      </section>
    </div>
  </div>;
}
