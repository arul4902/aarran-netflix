import { Episode, Profile } from '../types';

export const STORY_DATA = {
  mother: 'Yamini',
  son: 'Aarran',
  dedication: 'Dedicated to her son Aarran',
  coreQuote: 'My purpose in life is him.',
  subQuote: 'A lifetime of little moments, finally in one place.',
  birthdayMonth: 'December',
  birthdayTitle: 'Our Birthday Month',
  birthdayTagline: 'One month. Two birthdays. Our story.',
  nickname: {
    motherToSon: 'My lil egg',
    sonToMother: 'My lil egg',
    together: "We are each other's lil eggs. 🥚❤️🥚"
  },
  favourites: [
    { title: 'Watching Movies Together', icon: 'Film' },
    { title: 'Travelling to Places Together', icon: 'Compass' }
  ],
  archiveStatement: {
    main: 'Not everything made it to social media.',
    sub: 'But everything made it into my heart.',
    closure: 'I couldn’t post every moment then. So I’m keeping them all here now.'
  },
  soundtrack: {
    title: 'Never Grow Up',
    artist: 'Taylor Swift',
    album: 'A Mother’s Soundtrack',
    file: '/assets/Tay_Swift_-_Never_Grow_Up_(mp3.pm).mp3'
  }
};

export const PROFILES: Profile[] = [
  {
    id: 'yamini',
    name: 'YAMINI',
    subtitle: 'Mom’s Perspective',
    avatarAssetId: 'big-heart-hero',
    accent: '#E50914',
    role: 'yamini'
  },
  {
    id: 'aarran',
    name: 'AARRAN',
    subtitle: 'The Star',
    avatarAssetId: 'royal-sherwani',
    accent: '#E50914',
    role: 'aarran'
  },
  {
    id: 'lil-eggs',
    name: 'LIL EGGS 🥚❤️',
    subtitle: 'Enter Full Story',
    avatarAssetId: 'kurti-pout',
    accent: '#E50914',
    role: 'both'
  },
  {
    id: 'memories',
    name: 'MEMORIES',
    subtitle: 'The Vault',
    avatarAssetId: 'day-1',
    accent: '#808080',
    role: 'archive'
  }
];

export const EPISODES: Episode[] = [
  {
    id: 'ep-01',
    epNumber: 'EP 01',
    title: 'THE LITTLE YEARS',
    subtitle: 'Before the memories became too many to count',
    description: 'The earliest whispers of life, from Day 1 in the world to first milestones and dino suits.',
    thumbnailAssetId: 'day-1',
    progressPercent: 100,
    duration: '2016 — Infancy',
    category: 'EARLY_MEMORIES'
  },
  {
    id: 'ep-02',
    epNumber: 'EP 02',
    title: 'MOM & ME',
    subtitle: 'My purpose in life is him',
    description: 'An unbroken bond held close through every laughter, hug, and quiet bedtime story.',
    thumbnailAssetId: 'big-heart-hero',
    progressPercent: 100,
    duration: 'Forever Bound',
    category: 'MOM_AND_ME'
  },
  {
    id: 'ep-03',
    epNumber: 'EP 03',
    title: 'OUR LITTLE WORLD',
    subtitle: 'Dressing up, playtime and sweet traditions',
    description: 'From Little Lord Krishna with his flute to traditional silk mundus and royal jackets.',
    thumbnailAssetId: 'little-krishna',
    progressPercent: 100,
    duration: 'Traditions',
    category: 'EARLY_MEMORIES'
  },
  {
    id: 'ep-04',
    epNumber: 'EP 04',
    title: 'BIRTHDAY MONTH',
    subtitle: 'December candles & Spider-Man dreams',
    description: 'One month. Two birthdays. Celebrating turning 5 and making wishes that light up the night.',
    thumbnailAssetId: 'turns-5-spiderman',
    progressPercent: 100,
    duration: 'December Magic',
    category: 'BIRTHDAY'
  },
  {
    id: 'ep-05',
    epNumber: 'EP 05',
    title: 'MOVIE NIGHTS',
    subtitle: 'Our favourite kind of night',
    description: 'Blankets, snacks, and laughing out loud together watching our favourite movie stories.',
    thumbnailAssetId: 'video-movie-night',
    progressPercent: 100,
    duration: 'Now Playing',
    category: 'MOVIE_TIME'
  },
  {
    id: 'ep-06',
    epNumber: 'EP 06',
    title: 'PLACES WE WENT',
    subtitle: 'From the replica tower to the real Eiffel in Paris',
    description: 'Different places, same favourite company. From sandy ocean shores to the top of Paris.',
    thumbnailAssetId: 'real-eiffel',
    progressPercent: 100,
    duration: 'Adventures',
    category: 'TRAVEL'
  },
  {
    id: 'ep-07',
    epNumber: 'EP 07',
    title: 'LIL EGGS',
    subtitle: 'Each other’s inside joke',
    description: '“I used to call him my lil egg... then he started calling me the same. Now we’re each other’s lil eggs.”',
    thumbnailAssetId: 'mischief-mustache',
    progressPercent: 100,
    duration: 'Pure Playfulness',
    category: 'CANDID'
  },
  {
    id: 'ep-08',
    epNumber: 'EP 08',
    title: 'GROWING UP',
    subtitle: 'Somewhere between raising him...',
    description: 'The honest meltdowns, bicycle milestones, dessert mustaches, and fast-forward moments.',
    thumbnailAssetId: 'lion-smile',
    progressPercent: 100,
    duration: 'Childhood Chapters',
    category: 'CANDID'
  },
  {
    id: 'ep-09',
    epNumber: 'EP 09',
    title: 'TEEN',
    subtitle: 'Next chapter currently being written',
    description: 'Some episodes can’t be streamed yet. They haven’t happened. See you in the next season, Aarran.',
    thumbnailAssetId: 'kurti-pout',
    progressPercent: 0,
    duration: 'Buffering 99%',
    category: 'PORTRAIT',
    locked: true,
    lockReason: 'This chapter is still being lived'
  }
];
