
import { User } from './types';

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

export const getUserByUsername = (username: string): User | undefined => {
  return mockUsers.find(user => user.username === username);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};
