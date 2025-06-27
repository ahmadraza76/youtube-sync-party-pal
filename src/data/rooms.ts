
import { Room } from './types';

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

export const getRoomById = (id: number): Room | undefined => {
  return mockRooms.find(room => room.id === id);
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
