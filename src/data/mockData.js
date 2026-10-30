export const people = [
  { id: 'mila', name: 'Mila Chen', handle: 'milachen', avatar: 'https://i.pinimg.com/736x/0f/bd/b8/0fbdb837f796dcb763a69affcdc74fa4.jpg', following: false },
  { id: 'leo', name: 'Leo Park', handle: 'leopark', avatar: 'https://i.pinimg.com/736x/3d/93/a5/3d93a5eaac7de157c7a4ab2dff25ecb2.jpg', following: true },
  { id: 'amara', name: 'Amara Okafor', handle: 'amara.o', avatar: 'https://i.pinimg.com/736x/ca/52/dd/ca52dd9b275fcb53b8d7b48e39332e96.jpg', following: false },
  { id: 'noah', name: 'Noah Williams', handle: 'noahw', avatar: 'https://i.pinimg.com/736x/7a/6a/95/7a6a9556e31f21d92f8b6c099f5ca123.jpg', following: false },
  { id: 'sofia', name: 'Sofia Reyes', handle: 'sofia.reyes', avatar: 'https://i.pinimg.com/1200x/cb/0c/f4/cb0cf4daea4cedb333b61294ea8e67f6.jpg', following: true },
  { id: 'kai', name: 'Kai Nakamura', handle: 'kainak', avatar: 'https://i.pinimg.com/736x/c8/41/1b/c8411b0abbf8b54bdc474350532dd32e.jpg', following: false },
];

export const stories = [
  { id: 'you', name: 'Your story', avatar: '', own: true },
  { id: 'story-mila', name: 'Mila', avatar: people[0].avatar, seen: false, items: [{ id: 'mila-story-1', media: 'https://i.pinimg.com/736x/5d/42/65/5d4265d43af39604b994f48805580f4b.jpg', caption: 'Ocean air, clear mind 🌊', time: '18 min' }] },
  { id: 'story-leo', name: 'Leo', avatar: people[1].avatar, seen: false, items: [{ id: 'leo-story-1', media: 'https://i.pinimg.com/736x/5d/9c/6b/5d9c6bf1b4bb7520bc9a7e0baad5d850.jpg', caption: 'A slow start to Sunday ☕', time: '32 min' }] },
  { id: 'story-amara', name: 'Amara', avatar: people[2].avatar, seen: true, items: [{ id: 'amara-story-1', media: 'https://i.pinimg.com/1200x/98/d8/3c/98d83cc43c7d316cfd4401943ce7b907.jpg', caption: 'Taking the scenic route 🌿', time: '1 hr' }] },
  { id: 'story-sofia', name: 'Sofia', avatar: people[4].avatar, seen: false, items: [{ id: 'sofia-story-1', media: 'https://i.pinimg.com/1200x/ed/19/c6/ed19c609d952c16bbffda732e3b9cfec.jpg', caption: 'Wish you were here ✨', time: '2 hrs' }] },
  { id: 'story-kai', name: 'Kai', avatar: people[5].avatar, seen: true, items: [{ id: 'kai-story-1', media: 'https://i.pinimg.com/736x/1e/6f/ec/1e6fec3d5420c3c5f327866de72555d4.jpg', caption: 'A night worth remembering 🌙', time: '3 hrs' }] },
  { id: 'story-noah', name: 'Noah', avatar: people[3].avatar, seen: false, items: [{ id: 'noah-story-1', media: 'https://i.pinimg.com/1200x/57/f8/75/57f8752b5dbfebcabf56b7661eae71d8.jpg', caption: 'Out here for a while 🏔️', time: '4 hrs' }] },
];

export const initialPosts = [
  {
    id: 'post-1', personId: 'mila', name: people[0].name, handle: people[0].handle, avatar: people[0].avatar,
    time: '18 min ago', location: 'Big Sur, California', caption: 'Somewhere between the ocean and the sky, everything just makes sense. Keeping this little moment forever. ✨',
    image: 'https://i.pinimg.com/736x/e4/d0/6d/e4d06d02010511569ed627be0b788d5b.jpg', likes: 2841, comments: 38, liked: false, tags: ['slowdays', 'california']
  },
  {
    id: 'post-2', personId: 'leo', name: people[1].name, handle: people[1].handle, avatar: people[1].avatar,
    time: '1 hr ago', location: 'Brooklyn, New York', caption: 'A little Sunday ritual: good coffee, no plans, and the kind of light that makes you stay a while. ☕',
    image: 'https://i.pinimg.com/1200x/77/59/79/7759791e7f5bf8feb60b6015b088492d.jpg', likes: 1264, comments: 21, liked: true, tags: ['weekend', 'coffee']
  },
  {
    id: 'post-3', personId: 'amara', name: people[2].name, handle: people[2].handle, avatar: people[2].avatar,
    time: '3 hrs ago', location: 'Kyoto, Japan', caption: 'Took the long way home. Always take the long way home. 🌿',
    image: 'https://i.pinimg.com/736x/45/dc/db/45dcdb27eff1754ef91f2f7c131c3f00.jpg', likes: 3928, comments: 64, liked: false, tags: ['travel', 'kyoto']
  },
  {
    id: 'post-4', personId: 'sofia', name: people[4].name, handle: people[4].handle, avatar: people[4].avatar,
    time: '5 hrs ago', location: 'Dolomites, Italy', caption: 'A few seconds from a weekend I wish I could replay. 🏔️',
    image: 'https://i.pinimg.com/736x/e8/d4/da/e8d4da26fed85a640381ada3dad09e1e.jpg', video: 'https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4', likes: 876, comments: 17, liked: false, tags: ['weekend', 'outdoors']
  },
  {
    id: 'post-5', personId: 'kai', name: people[5].name, handle: people[5].handle, avatar: people[5].avatar,
    time: 'Yesterday', location: 'Mount Rainier, Washington', caption: 'A reminder to get outside, even if it is just for a little while. 🌲',
    image: 'https://i.pinimg.com/1200x/2d/26/7b/2d267bf208f6f84680a4fea843d400f3.jpg', likes: 1542, comments: 29, liked: false, tags: ['outdoors', 'freshair']
  },
  {
    id: 'post-6', personId: 'noah', name: people[3].name, handle: people[3].handle, avatar: people[3].avatar,
    time: 'Yesterday', location: 'Lisbon, Portugal', caption: 'Golden hour found us again. No notes, just grateful. ☀️',
    image: 'https://i.pinimg.com/736x/b4/47/73/b447737215284df5b6a54f556c1b1a07.jpg', likes: 973, comments: 14, liked: false, tags: ['goldenhour', 'travel']
  }
];

export const initialChats = [
  { id: 'mila', name: 'Mila Chen', avatar: people[0].avatar, online: true, unread: 2, time: '2m', messages: [{ from: 'them', text: 'This place is so dreamy 😭', time: '10:24' }, { from: 'me', text: 'Right? Adding it to our list ✨', time: '10:26' }, { from: 'them', text: 'We have to go before summer ends!', time: '10:28' }] },
  { id: 'leo', name: 'Leo Park', avatar: people[1].avatar, online: true, unread: 0, time: '18m', messages: [{ from: 'them', text: 'Sent you the playlist 🎧', time: '10:02' }, { from: 'me', text: 'Already listening. So good!', time: '10:10' }] },
  { id: 'amara', name: 'Amara Okafor', avatar: people[2].avatar, online: false, unread: 0, time: '1h', messages: [{ from: 'me', text: 'Your photos are incredible!', time: '09:15' }, { from: 'them', text: 'You are too kind 💛', time: '09:20' }] },
  { id: 'sofia', name: 'Sofia Reyes', avatar: people[4].avatar, online: true, unread: 0, time: '3h', messages: [{ from: 'them', text: 'Coffee this weekend?', time: 'Yesterday' }] },
  { id: 'kai', name: 'Kai Nakamura', avatar: people[5].avatar, online: false, unread: 0, time: '1d', messages: [{ from: 'them', text: 'Thanks for the recommendation!', time: 'Yesterday' }] },
  { id: 'noah', name: 'Noah Williams', avatar: people[3].avatar, online: false, unread: 0, time: '2d', messages: [{ from: 'me', text: 'See you at the gallery!', time: 'Monday' }] },
];

export const notifications = [
  { id: 1, person: people[0], type: 'liked your photo', time: '2 min ago', image: initialPosts[0].image, fresh: true },
  { id: 2, person: people[1], type: 'started following you', time: '18 min ago', fresh: true },
  { id: 3, person: people[4], type: 'commented: “This is everything ✨”', time: '1 hr ago', image: initialPosts[1].image, fresh: true },
  { id: 4, person: people[2], type: 'and 12 others liked your photo', time: '3 hrs ago', image: initialPosts[2].image },
  { id: 5, person: people[5], type: 'mentioned you in a comment', time: 'Yesterday' },
];

export const exploreImages = [
  'https://i.pinimg.com/736x/c9/ce/00/c9ce001e0f5d5ed684a66e61ad14c4bc.jpg',
  'https://i.pinimg.com/736x/c2/da/06/c2da06a5f38647350cba7017f19ad92a.jpg',
  'https://i.pinimg.com/736x/d3/62/9b/d3629b00c30c3986685ca6af8da58320.jpg',
  'https://i.pinimg.com/1200x/93/0d/fd/930dfd65e897a51fbe160af06279f34c.jpg',
  'https://i.pinimg.com/736x/02/59/69/0259699a168aea21ba838cd4873a1fdc.jpg',
  'https://i.pinimg.com/736x/1f/e5/02/1fe50249f78c2570a95c10af2821c793.jpg',
  'https://i.pinimg.com/736x/99/4b/32/994b3270feaae646eb6e34219ba9e698.jpg',
  'https://i.pinimg.com/736x/3d/9f/40/3d9f40f8c206a7a4b18c41067ca228c4.jpg',
  'https://i.pinimg.com/736x/1c/27/d2/1c27d2639c7e7606abc1737154d85a55.jpg',
];
