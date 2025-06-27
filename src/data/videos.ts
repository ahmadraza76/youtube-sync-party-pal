
import { Video } from './types';

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
