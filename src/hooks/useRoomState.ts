
import { useState, useEffect } from 'react';
import { Room, Video } from '@/types';
import { 
  mockRooms, 
  updateRoomViewers,
  addUserSession,
  updateUserSession,
  getUserById,
  getRoomStats,
  mockUsers
} from '@/data/mockData';

export const useRoomState = () => {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [videoQueue, setVideoQueue] = useState<Video[]>([]);
  const [showRoomAd, setShowRoomAd] = useState(true);

  const currentUser = getUserById('1') || mockUsers[0];
  const username = `User${Math.floor(Math.random() * 1000)}`;

  // Auto-hide room ad after 10 seconds
  useEffect(() => {
    if (currentRoom && showRoomAd) {
      const timer = setTimeout(() => {
        setShowRoomAd(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [currentRoom, showRoomAd]);

  const joinRoom = (room: Room) => {
    setCurrentRoom(room);
    setShowRoomAd(true);
    
    const initialVideo: Video = {
      id: '1',
      title: room.name,
      videoId: room.videoId,
      duration: 'N/A',
      addedBy: room.hostName || 'Host',
      addedAt: new Date()
    };
    
    setCurrentVideo(initialVideo);
    const embedUrl = `https://www.youtube.com/embed/${room.videoId}?autoplay=1&enablejsapi=1&origin=${window.location.origin}`;
    setCurrentVideoUrl(embedUrl);
    setIsPlaying(true);

    updateRoomViewers(room.id, true);
    addUserSession(currentUser.id, room.id);
    setRooms(prev => prev.map(r => 
      r.id === room.id ? { ...r, viewers: r.viewers + 1 } : r
    ));

    const stats = getRoomStats(room.id);
    if (stats) {
      console.log(`Room stats for ${room.name}:`, stats);
    }
  };

  const leaveRoom = () => {
    if (currentRoom) {
      updateRoomViewers(currentRoom.id, false);
      updateUserSession(currentUser.id, currentRoom.id, false);
      setRooms(prev => prev.map(r => 
        r.id === currentRoom.id ? { ...r, viewers: Math.max(0, r.viewers - 1) } : r
      ));
    }
    setCurrentRoom(null);
    setCurrentVideo(null);
    setVideoQueue([]);
    setCurrentVideoUrl('');
    setIsPlaying(false);
    setShowRoomAd(false);
  };

  const handleVideoSelect = (video: Video) => {
    if (currentVideo) {
      setVideoQueue(prev => [currentVideo, ...prev.filter(v => v.id !== video.id)]);
    }
    
    setCurrentVideo(video);
    const embedUrl = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&enablejsapi=1&origin=${window.location.origin}`;
    setCurrentVideoUrl(embedUrl);
    setIsPlaying(true);
    
    setVideoQueue(prev => prev.filter(v => v.id !== video.id));
  };

  const handleVideoRemove = (videoId: string) => {
    setVideoQueue(prev => prev.filter(v => v.id !== videoId));
  };

  return {
    currentRoom,
    isPlaying,
    setIsPlaying,
    currentVideoUrl,
    setCurrentVideoUrl,
    rooms,
    currentVideo,
    videoQueue,
    setVideoQueue,
    showRoomAd,
    setShowRoomAd,
    username,
    joinRoom,
    leaveRoom,
    handleVideoSelect,
    handleVideoRemove
  };
};
