
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Share, Users, Home, Search, Plus, Settings, User, Youtube, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AdminPanel from '@/components/AdminPanel';
import RoomCard from '@/components/RoomCard';
import ChatMessage from '@/components/ChatMessage';
import AdBanner from '@/components/AdBanner';
import RoomVideoManager from '@/components/RoomVideoManager';
import { 
  mockRooms, 
  mockChatMessages, 
  mockUsers,
  getRoomById, 
  getChatMessagesByRoom, 
  addChatMessage,
  addNewVideo,
  updateRoomViewers,
  addUserSession,
  updateUserSession,
  getUserById,
  getRoomStats
} from '@/data/mockData';

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

interface ChatMessageType {
  id: string;
  user: string;
  message: string;
  isHost?: boolean;
  timestamp: Date;
}

interface Video {
  id: string;
  title: string;
  videoId: string;
  duration: string;
  addedBy: string;
  addedAt: Date;
}

const Index = () => {
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showAdBanner, setShowAdBanner] = useState(true);
  const [showRoomAd, setShowRoomAd] = useState(true);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [videoQueue, setVideoQueue] = useState<Video[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Generate random user
  const username = `User${Math.floor(Math.random() * 1000)}`;
  const currentUser = getUserById('1') || mockUsers[0]; // Default to first user

  useEffect(() => {
    setChatMessages(mockChatMessages.slice(0, 3));
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

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
    setShowRoomAd(true); // Show ad when entering room
    
    // Set initial video from room
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
    
    // Load room-specific chat messages
    const roomMessages = getChatMessagesByRoom(room.id);
    if (roomMessages.length > 0) {
      setChatMessages(roomMessages);
    } else {
      const welcomeMessage: ChatMessageType = {
        id: Date.now().toString(),
        user: 'System',
        message: `Welcome to ${room.name}! 🎬`,
        timestamp: new Date()
      };
      setChatMessages([welcomeMessage]);
    }

    // Update room viewer count and add user session
    updateRoomViewers(room.id, true);
    addUserSession(currentUser.id, room.id);
    setRooms(prev => prev.map(r => 
      r.id === room.id ? { ...r, viewers: r.viewers + 1 } : r
    ));

    // Show room stats
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
    setChatMessages([]);
    setShowRoomAd(false);
  };

  const togglePlayPause = () => {
    if (iframeRef.current && currentVideo) {
      const iframe = iframeRef.current;
      const newUrl = isPlaying 
        ? `https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=0&enablejsapi=1&origin=${window.location.origin}`
        : `https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1&enablejsapi=1&origin=${window.location.origin}`;
      
      iframe.src = newUrl;
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoSelect = (video: Video) => {
    // Move current video to queue if exists
    if (currentVideo) {
      setVideoQueue(prev => [currentVideo, ...prev.filter(v => v.id !== video.id)]);
    }
    
    // Set new current video
    setCurrentVideo(video);
    const embedUrl = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&enablejsapi=1&origin=${window.location.origin}`;
    setCurrentVideoUrl(embedUrl);
    setIsPlaying(true);
    
    // Remove from queue
    setVideoQueue(prev => prev.filter(v => v.id !== video.id));
    
    // Add chat message
    const playMessage: ChatMessageType = {
      id: Date.now().toString(),
      user: 'System',
      message: `🎵 Now playing: ${video.title}`,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, playMessage]);
  };

  const handleVideoAdd = (videoId: string, title: string) => {
    const newVideo: Video = {
      id: Date.now().toString(),
      title,
      videoId,
      duration: 'N/A',
      addedBy: username,
      addedAt: new Date()
    };

    // Add to queue
    setVideoQueue(prev => [...prev, newVideo]);
    
    // Add to mock data with category
    addNewVideo({
      title,
      videoId,
      duration: 'N/A',
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      addedBy: username,
      category: currentRoom?.category || 'General'
    });

    // Show success message
    const successMessage: ChatMessageType = {
      id: (Date.now() + 1).toString(),
      user: 'System',
      message: `✅ "${title}" added to queue by ${username}`,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, successMessage]);
  };

  const handleVideoRemove = (videoId: string) => {
    setVideoQueue(prev => prev.filter(v => v.id !== videoId));
    
    const removeMessage: ChatMessageType = {
      id: Date.now().toString(),
      user: 'System',
      message: `🗑️ Video removed from queue`,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, removeMessage]);
  };

  const sendMessage = () => {
    if (newMessage.trim() && currentRoom) {
      const message: ChatMessageType = {
        id: Date.now().toString(),
        user: username,
        message: newMessage.trim(),
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, message]);
      addChatMessage({
        user: username,
        message: newMessage.trim(),
        roomId: currentRoom.id
      });
      
      setNewMessage('');

      // Simulate responses with enhanced logic
      setTimeout(() => {
        const responses = [
          "Great choice!", 
          "Love this video!",
          "Thanks for adding!", 
          "What's next?",
          "Nice one! 👍",
          "Let's watch this!",
          "Good addition to the queue!",
          "This is awesome! 🔥",
          "Perfect timing!",
          "Can't wait to see this!"
        ];
        const response: ChatMessageType = {
          id: (Date.now() + 1).toString(),
          user: currentRoom.hostName || 'Host',
          message: responses[Math.floor(Math.random() * responses.length)],
          isHost: true,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, response]);
        
        addChatMessage({
          user: currentRoom.hostName || 'Host',
          message: response.message,
          isHost: true,
          roomId: currentRoom.id
        });
      }, 1000 + Math.random() * 2000);
    }
  };

  const shareRoom = () => {
    if (currentRoom) {
      const shareUrl = `${window.location.origin}?room=${currentRoom.id}`;
      navigator.clipboard.writeText(shareUrl);
      
      const shareMessage: ChatMessageType = {
        id: Date.now().toString(),
        user: 'System',
        message: 'Room link copied to clipboard! 📋',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, shareMessage]);
    }
  };

  const isHost = currentRoom?.hostName === username;

  return (
    <div className="max-w-md mx-auto bg-gray-800 min-h-screen flex flex-col border-l border-r border-gray-700">
      <AdminPanel isOpen={isAdminPanelOpen} onClose={() => setIsAdminPanelOpen(false)} />

      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-950 text-white p-4 shadow-lg border-b border-gray-800">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {currentRoom && (
              <Button
                onClick={leaveRoom}
                className="bg-transparent hover:bg-gray-700 p-2 rounded-full mr-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <Youtube className="text-red-600 w-8 h-8" />
            <h1 className="font-bold text-xl bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              {currentRoom ? currentRoom.name : "YouTube Party"}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setIsAdminPanelOpen(true)}
              className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-red-500/30 transition-all"
            >
              Admin
            </Button>
            <Button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Ad Banner - Top Level */}
      {showAdBanner && !currentRoom && (
        <AdBanner onClose={() => setShowAdBanner(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        {currentRoom ? (
          // Inside Room View
          <>
            {/* Room Ad Banner */}
            {showRoomAd && (
              <AdBanner 
                onClose={() => setShowRoomAd(false)} 
                inRoom={true}
              />
            )}

            {/* Current Video Player */}
            <div className="mb-6">
              <div className="rounded-2xl overflow-hidden relative pt-[56.25%] mb-4 bg-black shadow-xl border border-gray-800">
                <div className="absolute inset-0">
                  {currentVideo && currentVideoUrl ? (
                    <iframe
                      ref={iframeRef}
                      src={currentVideoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="YouTube Video Player"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                      <div className="text-center">
                        <Youtube className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg font-medium">No video playing</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="font-bold text-lg text-white">
                    {currentVideo ? currentVideo.title : "No video selected"}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {currentRoom.viewers} viewers • Live • Host: {currentRoom.hostName || 'Host'}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Peak: {currentRoom.maxViewers} viewers • Total watch time: {Math.floor(currentRoom.totalWatchTime / 60)} minutes
                  </p>
                </div>
                <Button onClick={shareRoom} className="bg-black text-white p-2 rounded-full hover:bg-gray-700">
                  <Share className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex space-x-2 mb-4">
                <Button
                  onClick={togglePlayPause}
                  disabled={!currentVideo}
                  className={`flex-1 py-3 rounded-lg flex items-center justify-center space-x-2 font-medium transition-all ${
                    currentVideo 
                      ? (isPlaying ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white')
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </Button>
              </div>
            </div>

            {/* Room Video Manager */}
            <RoomVideoManager
              roomId={currentRoom.id}
              currentVideo={currentVideo}
              videoQueue={videoQueue}
              onVideoSelect={handleVideoSelect}
              onVideoAdd={handleVideoAdd}
              onVideoRemove={handleVideoRemove}
              isHost={isHost}
              username={username}
            />

            {/* Chat Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                  Live Chat
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400">{currentRoom.viewers} online</span>
                </div>
              </div>

              <div
                ref={chatContainerRef}
                className="bg-gray-800/50 rounded-2xl p-4 h-72 overflow-y-auto mb-4 border border-gray-700 backdrop-blur-sm"
              >
                <div className="space-y-3">
                  {chatMessages.map((message) => (
                    <ChatMessage key={message.id} message={message} currentUser={username} />
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-500"
                />
                <Button 
                  onClick={sendMessage} 
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-red-600 transition-all disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </Button>
              </div>
            </div>
          </>
        ) : (
          // Room Selection View
          <>
            <div className="mb-8">
              <div className="rounded-2xl overflow-hidden relative pt-[56.25%] mb-4 bg-black shadow-xl border border-gray-800">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                  <div className="text-center">
                    <Youtube className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg font-medium">Join a room to start watching</p>
                    <p className="text-gray-500 text-sm mt-2">Select any room below to join the party</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-white">Available Rooms ({rooms.length})</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {rooms.map((room) => (
                  <RoomCard 
                    key={room.id} 
                    room={room} 
                    onClick={() => joinRoom(room)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-gray-900/80 border-t border-gray-800 p-3 backdrop-blur-lg">
        <div className="flex justify-around items-center">
          <Button className="p-3 text-gray-400 hover:text-white rounded-full hover:bg-gray-800/50 bg-transparent transition-all">
            <Home className="w-5 h-5" />
          </Button>
          <Button className="p-3 text-gray-400 hover:text-white rounded-full hover:bg-gray-800/50 bg-transparent transition-all">
            <Search className="w-5 h-5" />
          </Button>
          <Button 
            onClick={() => currentRoom ? {} : {}}
            className="p-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-pink-500/30 transition-all"
          >
            <Plus className="w-5 h-5" />
          </Button>
          <Button className="p-3 text-gray-400 hover:text-white rounded-full hover:bg-gray-800/50 bg-transparent transition-all">
            <Users className="w-5 h-5" />
          </Button>
          <Button className="p-3 text-gray-400 hover:text-white rounded-full hover:bg-gray-800/50 bg-transparent transition-all">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
