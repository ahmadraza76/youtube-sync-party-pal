
import { UserSession, RoomStats } from './types';

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
