
interface Room {
  id: number;
  name: string;
  category: string;
  viewers: number;
  videoId: string;
  hostName: string;
  isLive: boolean;
  description: string;
  createdAt: Date;
  tags: string[];
}

interface User {
  id: string;
  username: string;
  avatar: string;
  isHost: boolean;
  joinedAt: Date;
  isOnline: boolean;
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  isHost?: boolean;
  timestamp: Date;
  roomId?: number;
}

interface Video {
  id: string;
  title: string;
  videoId: string;
  duration: string;
  thumbnail: string;
  addedBy: string;
  addedAt: Date;
}

// Mock data for rooms
export const mockRooms: Room[] = [
  {
    id: 1,
    name: "Chill Music Vibes",
    category: "Pop, Rock, Hip Hop",
    viewers: 12,
    videoId: "5qap5aO4i9A",
    hostName: "MusicLover99",
    isLive: true,
    description: "Best chill music for relaxing and studying",
    createdAt: new Date('2024-01-15'),
    tags: ['music', 'chill', 'relax']
  },
  {
    id: 2,
    name: "Gaming Streamers",
    category: "Live Gameplay",
    viewers: 8,
    videoId: "dQw4w9WgXcQ",
    hostName: "GameMaster",
    isLive: true,
    description: "Latest gaming videos and live streams",
    createdAt: new Date('2024-01-16'),
    tags: ['gaming', 'live', 'streams']
  },
  {
    id: 3,
    name: "Movie Night",
    category: "Classic Films",
    viewers: 24,
    videoId: "9bZkp7q19f0",
    hostName: "CinemaFan",
    isLive: true,
    description: "Watch classic movies together",
    createdAt: new Date('2024-01-17'),
    tags: ['movies', 'classic', 'entertainment']
  },
  {
    id: 4,
    name: "Study Focus",
    category: "Lofi Beats",
    viewers: 5,
    videoId: "jfKfPfyJRdk",
    hostName: "StudyBuddy",
    isLive: true,
    description: "Lofi beats for productive study sessions",
    createdAt: new Date('2024-01-18'),
    tags: ['study', 'lofi', 'focus']
  },
  {
    id: 5,
    name: "Comedy Central",
    category: "Stand-up Comedy",
    viewers: 15,
    videoId: "wpV-gGA4PSk",
    hostName: "LaughMaster",
    isLive: true,
    description: "Best comedy videos and stand-up shows",
    createdAt: new Date('2024-01-19'),
    tags: ['comedy', 'funny', 'entertainment']
  },
  {
    id: 6,
    name: "Tech Talks",
    category: "Technology",
    viewers: 7,
    videoId: "QH2-TGUlwu4",
    hostName: "TechGuru",
    isLive: false,
    description: "Latest technology trends and tutorials",
    createdAt: new Date('2024-01-20'),
    tags: ['tech', 'tutorial', 'learning']
  }
];

// Mock users data
export const mockUsers: User[] = [
  { id: '1', username: 'MusicLover99', avatar: '🎵', isHost: true, joinedAt: new Date(), isOnline: true },
  { id: '2', username: 'GameMaster', avatar: '🎮', isHost: true, joinedAt: new Date(), isOnline: true },
  { id: '3', username: 'CinemaFan', avatar: '🎬', isHost: true, joinedAt: new Date(), isOnline: true },
  { id: '4', username: 'StudyBuddy', avatar: '📚', isHost: true, joinedAt: new Date(), isOnline: true },
  { id: '5', username: 'MovieFan22', avatar: '🍿', isHost: false, joinedAt: new Date(), isOnline: true },
  { id: '6', username: 'ChillVibes', avatar: '😎', isHost: false, joinedAt: new Date(), isOnline: true },
  { id: '7', username: 'TechGuru', avatar: '💻', isHost: true, joinedAt: new Date(), isOnline: false },
];

// Mock chat messages
export const mockChatMessages: ChatMessage[] = [
  { id: '1', user: 'System', message: 'Welcome to YouTube Party!', timestamp: new Date(Date.now() - 1000000), roomId: 1 },
  { id: '2', user: 'MusicLover99', message: 'Hey everyone! Welcome to my music room!', isHost: true, timestamp: new Date(Date.now() - 900000), roomId: 1 },
  { id: '3', user: 'MovieFan22', message: 'Love this playlist! 🎵', timestamp: new Date(Date.now() - 800000), roomId: 1 },
  { id: '4', user: 'ChillVibes', message: 'Perfect for studying', timestamp: new Date(Date.now() - 700000), roomId: 1 },
  { id: '5', user: 'System', message: 'Welcome to Gaming Streamers!', timestamp: new Date(Date.now() - 600000), roomId: 2 },
  { id: '6', user: 'GameMaster', message: 'Ready for some epic gameplay!', isHost: true, timestamp: new Date(Date.now() - 500000), roomId: 2 },
];

// Mock videos data
export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Lofi Hip Hop - Beats to Relax/Study to',
    videoId: '5qap5aO4i9A',
    duration: '1:30:25',
    thumbnail: 'https://img.youtube.com/vi/5qap5aO4i9A/maxresdefault.jpg',
    addedBy: 'MusicLover99',
    addedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Epic Gaming Montage 2024',
    videoId: 'dQw4w9WgXcQ',
    duration: '10:42',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    addedBy: 'GameMaster',
    addedAt: new Date('2024-01-16')
  },
  {
    id: '3',
    title: 'Classic Movie Scenes Compilation',
    videoId: '9bZkp7q19f0',
    duration: '25:30',
    thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
    addedBy: 'CinemaFan',
    addedAt: new Date('2024-01-17')
  }
];

// Helper functions
export const getRoomById = (id: number): Room | undefined => {
  return mockRooms.find(room => room.id === id);
};

export const getChatMessagesByRoom = (roomId: number): ChatMessage[] => {
  return mockChatMessages.filter(msg => msg.roomId === roomId);
};

export const getUserByUsername = (username: string): User | undefined => {
  return mockUsers.find(user => user.username === username);
};

export const addNewRoom = (roomData: Omit<Room, 'id' | 'createdAt'>): Room => {
  const newRoom: Room = {
    ...roomData,
    id: Math.max(...mockRooms.map(r => r.id)) + 1,
    createdAt: new Date()
  };
  mockRooms.push(newRoom);
  return newRoom;
};

export const addNewVideo = (videoData: Omit<Video, 'id' | 'addedAt'>): Video => {
  const newVideo: Video = {
    ...videoData,
    id: Date.now().toString(),
    addedAt: new Date()
  };
  mockVideos.push(newVideo);
  return newVideo;
};

export const addChatMessage = (messageData: Omit<ChatMessage, 'id' | 'timestamp'>): ChatMessage => {
  const newMessage: ChatMessage = {
    ...messageData,
    id: Date.now().toString(),
    timestamp: new Date()
  };
  mockChatMessages.push(newMessage);
  return newMessage;
};
