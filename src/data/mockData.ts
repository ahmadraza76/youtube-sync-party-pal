
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
  maxViewers: number;
  totalWatchTime: number;
  isPublic: boolean;
  password?: string;
}

interface User {
  id: string;
  username: string;
  avatar: string;
  isHost: boolean;
  joinedAt: Date;
  isOnline: boolean;
  totalWatchTime: number;
  roomsJoined: number;
  isPremium: boolean;
  preferences: {
    theme: 'dark' | 'light';
    notifications: boolean;
    autoplay: boolean;
  };
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  isHost?: boolean;
  timestamp: Date;
  roomId?: number;
  messageType: 'text' | 'system' | 'video' | 'emoji';
  reactions?: { emoji: string; count: number; users: string[] }[];
}

interface Video {
  id: string;
  title: string;
  videoId: string;
  duration: string;
  thumbnail: string;
  addedBy: string;
  addedAt: Date;
  votes: number;
  views: number;
  category: string;
}

interface UserSession {
  userId: string;
  roomId: number;
  joinedAt: Date;
  isActive: boolean;
  watchTime: number;
  lastSeen: Date;
}

interface RoomStats {
  roomId: number;
  totalUsers: number;
  peakViewers: number;
  totalVideosPlayed: number;
  averageWatchTime: number;
  lastActivity: Date;
}

// Enhanced mock data for rooms
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
    tags: ['music', 'chill', 'relax'],
    maxViewers: 25,
    totalWatchTime: 15420,
    isPublic: true
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
    tags: ['gaming', 'live', 'streams'],
    maxViewers: 18,
    totalWatchTime: 8900,
    isPublic: true
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
    tags: ['movies', 'classic', 'entertainment'],
    maxViewers: 45,
    totalWatchTime: 32100,
    isPublic: true
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
    tags: ['study', 'lofi', 'focus'],
    maxViewers: 12,
    totalWatchTime: 6780,
    isPublic: true
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
    tags: ['comedy', 'funny', 'entertainment'],
    maxViewers: 28,
    totalWatchTime: 18600,
    isPublic: true
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
    tags: ['tech', 'tutorial', 'learning'],
    maxViewers: 15,
    totalWatchTime: 9200,
    isPublic: true
  }
];

// Enhanced mock users data
export const mockUsers: User[] = [
  { 
    id: '1', 
    username: 'MusicLover99', 
    avatar: '🎵', 
    isHost: true, 
    joinedAt: new Date(), 
    isOnline: true,
    totalWatchTime: 15420,
    roomsJoined: 12,
    isPremium: true,
    preferences: { theme: 'dark', notifications: true, autoplay: true }
  },
  { 
    id: '2', 
    username: 'GameMaster', 
    avatar: '🎮', 
    isHost: true, 
    joinedAt: new Date(), 
    isOnline: true,
    totalWatchTime: 8900,
    roomsJoined: 8,
    isPremium: false,
    preferences: { theme: 'dark', notifications: false, autoplay: true }
  },
  { 
    id: '3', 
    username: 'CinemaFan', 
    avatar: '🎬', 
    isHost: true, 
    joinedAt: new Date(), 
    isOnline: true,
    totalWatchTime: 32100,
    roomsJoined: 25,
    isPremium: true,
    preferences: { theme: 'dark', notifications: true, autoplay: false }
  },
  { 
    id: '4', 
    username: 'StudyBuddy', 
    avatar: '📚', 
    isHost: true, 
    joinedAt: new Date(), 
    isOnline: true,
    totalWatchTime: 6780,
    roomsJoined: 5,
    isPremium: false,
    preferences: { theme: 'light', notifications: true, autoplay: true }
  },
  { 
    id: '5', 
    username: 'MovieFan22', 
    avatar: '🍿', 
    isHost: false, 
    joinedAt: new Date(), 
    isOnline: true,
    totalWatchTime: 4200,
    roomsJoined: 15,
    isPremium: false,
    preferences: { theme: 'dark', notifications: false, autoplay: true }
  },
  { 
    id: '6', 
    username: 'ChillVibes', 
    avatar: '😎', 
    isHost: false, 
    joinedAt: new Date(), 
    isOnline: true,
    totalWatchTime: 7800,
    roomsJoined: 20,
    isPremium: true,
    preferences: { theme: 'dark', notifications: true, autoplay: true }
  },
  { 
    id: '7', 
    username: 'TechGuru', 
    avatar: '💻', 
    isHost: true, 
    joinedAt: new Date(), 
    isOnline: false,
    totalWatchTime: 9200,
    roomsJoined: 10,
    isPremium: false,
    preferences: { theme: 'light', notifications: false, autoplay: false }
  }
];

// Enhanced mock chat messages
export const mockChatMessages: ChatMessage[] = [
  { 
    id: '1', 
    user: 'System', 
    message: 'Welcome to YouTube Party!', 
    timestamp: new Date(Date.now() - 1000000), 
    roomId: 1,
    messageType: 'system'
  },
  { 
    id: '2', 
    user: 'MusicLover99', 
    message: 'Hey everyone! Welcome to my music room!', 
    isHost: true, 
    timestamp: new Date(Date.now() - 900000), 
    roomId: 1,
    messageType: 'text',
    reactions: [{ emoji: '👋', count: 3, users: ['MovieFan22', 'ChillVibes', 'StudyBuddy'] }]
  },
  { 
    id: '3', 
    user: 'MovieFan22', 
    message: 'Love this playlist! 🎵', 
    timestamp: new Date(Date.now() - 800000), 
    roomId: 1,
    messageType: 'text'
  },
  { 
    id: '4', 
    user: 'ChillVibes', 
    message: 'Perfect for studying', 
    timestamp: new Date(Date.now() - 700000), 
    roomId: 1,
    messageType: 'text'
  },
  { 
    id: '5', 
    user: 'System', 
    message: 'Welcome to Gaming Streamers!', 
    timestamp: new Date(Date.now() - 600000), 
    roomId: 2,
    messageType: 'system'
  },
  { 
    id: '6', 
    user: 'GameMaster', 
    message: 'Ready for some epic gameplay!', 
    isHost: true, 
    timestamp: new Date(Date.now() - 500000), 
    roomId: 2,
    messageType: 'text'
  }
];

// Enhanced mock videos data
export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Lofi Hip Hop - Beats to Relax/Study to',
    videoId: '5qap5aO4i9A',
    duration: '1:30:25',
    thumbnail: 'https://img.youtube.com/vi/5qap5aO4i9A/maxresdefault.jpg',
    addedBy: 'MusicLover99',
    addedAt: new Date('2024-01-15'),
    votes: 42,
    views: 1250,
    category: 'Music'
  },
  {
    id: '2',
    title: 'Epic Gaming Montage 2024',
    videoId: 'dQw4w9WgXcQ',
    duration: '10:42',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    addedBy: 'GameMaster',
    addedAt: new Date('2024-01-16'),
    votes: 28,
    views: 890,
    category: 'Gaming'
  },
  {
    id: '3',
    title: 'Classic Movie Scenes Compilation',
    videoId: '9bZkp7q19f0',
    duration: '25:30',
    thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
    addedBy: 'CinemaFan',
    addedAt: new Date('2024-01-17'),
    votes: 67,
    views: 2100,
    category: 'Movies'
  }
];

// Mock user sessions
export const mockUserSessions: UserSession[] = [
  {
    userId: '1',
    roomId: 1,
    joinedAt: new Date(Date.now() - 3600000),
    isActive: true,
    watchTime: 3600,
    lastSeen: new Date()
  },
  {
    userId: '2',
    roomId: 2,
    joinedAt: new Date(Date.now() - 1800000),
    isActive: true,
    watchTime: 1800,
    lastSeen: new Date()
  }
];

// Mock room statistics
export const mockRoomStats: RoomStats[] = [
  {
    roomId: 1,
    totalUsers: 45,
    peakViewers: 25,
    totalVideosPlayed: 120,
    averageWatchTime: 1800,
    lastActivity: new Date()
  },
  {
    roomId: 2,
    totalUsers: 32,
    peakViewers: 18,
    totalVideosPlayed: 85,
    averageWatchTime: 1200,
    lastActivity: new Date()
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

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getRoomStats = (roomId: number): RoomStats | undefined => {
  return mockRoomStats.find(stats => stats.roomId === roomId);
};

export const getUserSessions = (userId: string): UserSession[] => {
  return mockUserSessions.filter(session => session.userId === userId);
};

export const getActiveUsersInRoom = (roomId: number): UserSession[] => {
  return mockUserSessions.filter(session => 
    session.roomId === roomId && session.isActive
  );
};

export const addNewRoom = (roomData: Omit<Room, 'id' | 'createdAt' | 'maxViewers' | 'totalWatchTime'>): Room => {
  const newRoom: Room = {
    ...roomData,
    id: Math.max(...mockRooms.map(r => r.id)) + 1,
    createdAt: new Date(),
    maxViewers: roomData.viewers,
    totalWatchTime: 0
  };
  mockRooms.push(newRoom);
  return newRoom;
};

export const addNewVideo = (videoData: Omit<Video, 'id' | 'addedAt' | 'votes' | 'views'>): Video => {
  const newVideo: Video = {
    ...videoData,
    id: Date.now().toString(),
    addedAt: new Date(),
    votes: 0,
    views: 0
  };
  mockVideos.push(newVideo);
  return newVideo;
};

export const addChatMessage = (messageData: Omit<ChatMessage, 'id' | 'timestamp' | 'messageType'>): ChatMessage => {
  const newMessage: ChatMessage = {
    ...messageData,
    id: Date.now().toString(),
    timestamp: new Date(),
    messageType: 'text'
  };
  mockChatMessages.push(newMessage);
  return newMessage;
};

export const updateRoomViewers = (roomId: number, increment: boolean): void => {
  const roomIndex = mockRooms.findIndex(room => room.id === roomId);
  if (roomIndex !== -1) {
    mockRooms[roomIndex].viewers += increment ? 1 : -1;
    mockRooms[roomIndex].viewers = Math.max(0, mockRooms[roomIndex].viewers);
    
    // Update max viewers if needed
    if (increment && mockRooms[roomIndex].viewers > mockRooms[roomIndex].maxViewers) {
      mockRooms[roomIndex].maxViewers = mockRooms[roomIndex].viewers;
    }
  }
};

export const addUserSession = (userId: string, roomId: number): UserSession => {
  const session: UserSession = {
    userId,
    roomId,
    joinedAt: new Date(),
    isActive: true,
    watchTime: 0,
    lastSeen: new Date()
  };
  mockUserSessions.push(session);
  return session;
};

export const updateUserSession = (userId: string, roomId: number, isActive: boolean): void => {
  const sessionIndex = mockUserSessions.findIndex(
    session => session.userId === userId && session.roomId === roomId
  );
  if (sessionIndex !== -1) {
    mockUserSessions[sessionIndex].isActive = isActive;
    mockUserSessions[sessionIndex].lastSeen = new Date();
  }
};
