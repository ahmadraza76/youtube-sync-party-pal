
import { ChatMessage } from './types';

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

export const getChatMessagesByRoom = (roomId: number): ChatMessage[] => {
  return mockChatMessages.filter(msg => msg.roomId === roomId);
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
