
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Share, Users, Home, Search, Plus, Settings, User, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AdminPanel from '@/components/AdminPanel';
import RoomCard from '@/components/RoomCard';
import ChatMessage from '@/components/ChatMessage';
import AdBanner from '@/components/AdBanner';
import VideoLinkInput from '@/components/VideoLinkInput';
import { 
  mockRooms, 
  mockChatMessages, 
  mockUsers,
  getRoomById, 
  getChatMessagesByRoom, 
  addChatMessage,
  addNewVideo
} from '@/data/mockData';

interface Room {
  id: number;
  name: string;
  category: string;
  viewers: number;
  videoId: string;
  hostName?: string;
  isLive?: boolean;
  description?: string;
}

interface ChatMessageType {
  id: string;
  user: string;
  message: string;
  isHost?: boolean;
  timestamp: Date;
}

const Index = () => {
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isVideoLinkInputOpen, setIsVideoLinkInputOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showAdBanner, setShowAdBanner] = useState(true);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const username = `User${Math.floor(Math.random() * 1000)}`;

  useEffect(() => {
    // Initialize with sample messages
    setChatMessages(mockChatMessages.slice(0, 3));
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const joinRoom = (room: Room) => {
    setCurrentRoom(room);
    const embedUrl = `https://www.youtube.com/embed/${room.videoId}?autoplay=1&enablejsapi=1&origin=${window.location.origin}`;
    setCurrentVideoUrl(embedUrl);
    setIsPlaying(true);
    
    // Load room-specific chat messages
    const roomMessages = getChatMessagesByRoom(room.id);
    if (roomMessages.length > 0) {
      setChatMessages(roomMessages);
    } else {
      // Add welcome message if no existing messages
      const welcomeMessage: ChatMessageType = {
        id: Date.now().toString(),
        user: 'System',
        message: `You joined ${room.name}`,
        timestamp: new Date()
      };
      setChatMessages([welcomeMessage]);
    }

    // Update room viewer count
    setRooms(prev => prev.map(r => 
      r.id === room.id ? { ...r, viewers: r.viewers + 1 } : r
    ));
  };

  const togglePlayPause = () => {
    if (iframeRef.current && currentRoom) {
      const iframe = iframeRef.current;
      const newUrl = isPlaying 
        ? `https://www.youtube.com/embed/${currentRoom.videoId}?autoplay=0&enablejsapi=1&origin=${window.location.origin}`
        : `https://www.youtube.com/embed/${currentRoom.videoId}?autoplay=1&enablejsapi=1&origin=${window.location.origin}`;
      
      iframe.src = newUrl;
      setIsPlaying(!isPlaying);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() && currentRoom) {
      const message: ChatMessageType = {
        id: Date.now().toString(),
        user: username,
        message: newMessage.trim(),
        timestamp: new Date()
      };
      
      // Add to local state
      setChatMessages(prev => [...prev, message]);
      
      // Add to mock data
      addChatMessage({
        user: username,
        message: newMessage.trim(),
        roomId: currentRoom.id
      });
      
      setNewMessage('');

      // Simulate host/user responses
      setTimeout(() => {
        const responses = [
          "Great point!", 
          "I agree!", 
          "Let's watch that next!", 
          "Thanks for joining!",
          "Nice choice! 👍",
          "Love this video!",
          "What should we watch after this?"
        ];
        const response: ChatMessageType = {
          id: (Date.now() + 1).toString(),
          user: currentRoom.hostName || 'Host',
          message: responses[Math.floor(Math.random() * responses.length)],
          isHost: true,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, response]);
        
        // Add to mock data
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

  const handleAddVideo = (videoId: string, title: string) => {
    // Add new video to mock data
    const newVideo = addNewVideo({
      title,
      videoId,
      duration: 'N/A',
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      addedBy: username
    });

    // Create a new room with this video
    const newRoom: Room = {
      id: Math.max(...rooms.map(r => r.id)) + 1,
      name: title,
      category: 'User Added',
      viewers: 1,
      videoId: videoId,
      hostName: username,
      isLive: true,
      description: `Added by ${username}`
    };

    setRooms(prev => [...prev, newRoom]);
    
    // Auto-join the new room
    joinRoom(newRoom);

    // Show success message
    const successMessage: ChatMessageType = {
      id: Date.now().toString(),
      user: 'System',
      message: `✅ Video "${title}" added successfully! Now playing...`,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, successMessage]);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 min-h-screen flex flex-col border-l border-r border-gray-700">
      <AdminPanel isOpen={isAdminPanelOpen} onClose={() => setIsAdminPanelOpen(false)} />
      
      {isVideoLinkInputOpen && (
        <VideoLinkInput
          onAddVideo={handleAddVideo}
          onClose={() => setIsVideoLinkInputOpen(false)}
        />
      )}

      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-950 text-white p-4 shadow-lg border-b border-gray-800">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Youtube className="text-red-600 w-8 h-8" />
            <h1 className="font-bold text-2xl bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              YouTube Party
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setIsAdminPanelOpen(true)}
              className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-red-500/30 transition-all"
            >
              Admin Panel
            </Button>
            <Button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Ad Banner */}
      {showAdBanner && (
        <AdBanner onClose={() => setShowAdBanner(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        {/* Current Video */}
        <div className="mb-8">
          <div className="rounded-2xl overflow-hidden relative pt-[56.25%] mb-4 bg-black shadow-xl border border-gray-800">
            <div className="absolute inset-0">
              {currentRoom && currentVideoUrl ? (
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
                    <p className="text-gray-400 text-lg font-medium">Join a room to start watching</p>
                    <p className="text-gray-500 text-sm mt-2">Select any room below or add your own video</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="font-bold text-lg text-white">
                {currentRoom ? currentRoom.name : "Join a room to start watching"}
              </h2>
              <p className="text-gray-400 text-sm">
                {currentRoom ? `${currentRoom.viewers} viewers • Live chat active • Host: ${currentRoom.hostName || 'Host'}` : "0 viewers • Select a room to join"}
              </p>
            </div>
            <Button onClick={shareRoom} className="bg-black text-white p-2 rounded-full hover:bg-gray-700 transition-colors">
              <Share className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex space-x-2 mb-4">
            <Button
              onClick={togglePlayPause}
              disabled={!currentRoom}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center space-x-2 font-medium transition-all ${
                currentRoom 
                  ? (isPlaying ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white')
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isPlaying ? 'Pause Video' : 'Play Video'}</span>
            </Button>
          </div>

          <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {currentRoom ? currentRoom.name.charAt(0) : 'H'}
              </div>
              <span className="font-medium text-white">
                {currentRoom ? `${currentRoom.hostName || 'Host'}` : 'Room Host'}
              </span>
            </div>
            <Button className="bg-black text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-800 transition-colors">
              Follow
            </Button>
          </div>
        </div>

        {/* Room Selection */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg text-white">Available Rooms ({rooms.length})</h3>
            <Button 
              onClick={() => setIsVideoLinkInputOpen(true)}
              className="text-blue-400 text-sm font-medium bg-transparent hover:bg-gray-700 px-3 py-1 rounded-lg border border-blue-400 hover:border-blue-300"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Video
            </Button>
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

        {/* Chat Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
              Live Chat
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">{currentRoom ? currentRoom.viewers : mockUsers.filter(u => u.isOnline).length} online</span>
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
              placeholder={currentRoom ? "Type a message..." : "Join a room to chat..."}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              disabled={!currentRoom}
              className="flex-1 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-500 disabled:opacity-50"
            />
            <Button 
              onClick={sendMessage} 
              disabled={!currentRoom || !newMessage.trim()}
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-red-600 transition-all disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </Button>
          </div>
        </div>
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
            onClick={() => setIsVideoLinkInputOpen(true)}
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
