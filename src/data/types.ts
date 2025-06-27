
export interface Room {
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

export interface User {
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

export interface ChatMessage {
  id: string;
  user: string;
  message: string;
  isHost?: boolean;
  timestamp: Date;
  roomId?: number;
  messageType: 'text' | 'system' | 'video' | 'emoji';
  reactions?: { emoji: string; count: number; users: string[] }[];
}

export interface Video {
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

export interface UserSession {
  userId: string;
  roomId: number;
  joinedAt: Date;
  isActive: boolean;
  watchTime: number;
  lastSeen: Date;
}

export interface RoomStats {
  roomId: number;
  totalUsers: number;
  peakViewers: number;
  totalVideosPlayed: number;
  averageWatchTime: number;
  lastActivity: Date;
}
