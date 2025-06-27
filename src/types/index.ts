
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

export interface ChatMessageType {
  id: string;
  user: string;
  message: string;
  isHost?: boolean;
  timestamp: Date;
}

export interface Video {
  id: string;
  title: string;
  videoId: string;
  duration: string;
  addedBy: string;
  addedAt: Date;
}
