import { useState } from 'react';
import { ArrowLeft, Youtube, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminPanel from '@/components/AdminPanel';
import AdBanner from '@/components/AdBanner';
import HomeView from '@/components/HomeView';
import RoomView from '@/components/RoomView';
import Navigation from '@/components/Navigation';
import { useRoomState } from '@/hooks/useRoomState';
import { useChatState } from '@/hooks/useChatState';
import { ChatMessageType, Video } from '@/types';
import { addNewVideo } from '@/data';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [showAdBanner, setShowAdBanner] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  const {
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
  } = useRoomState();

  const {
    chatMessages,
    newMessage,
    setNewMessage,
    chatContainerRef,
    loadRoomChat,
    addMessage,
    clearChat
  } = useChatState();

  const handleJoinRoom = (room: any) => {
    joinRoom(room);
    loadRoomChat(room.id, room.name);
  };

  const handleLeaveRoom = () => {
    leaveRoom();
    clearChat();
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
    addMessage(successMessage, currentRoom?.id);
  };

  const sendMessage = () => {
    if (newMessage.trim() && currentRoom) {
      const message: ChatMessageType = {
        id: Date.now().toString(),
        user: username,
        message: newMessage.trim(),
        timestamp: new Date()
      };
      
      addMessage(message, currentRoom.id);
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
        addMessage(response, currentRoom.id);
      }, 1000 + Math.random() * 2000);
    }
  };

  // Navigation handlers
  const handleGoHome = () => {
    if (currentRoom) {
      handleLeaveRoom();
    }
    toast({
      title: "Home",
      description: "Navigated to home page",
    });
  };

  const handleOpenSearch = () => {
    setShowSearch(!showSearch);
    toast({
      title: "Search",
      description: showSearch ? "Search closed" : "Search opened",
    });
  };

  const handleCreateRoom = () => {
    toast({
      title: "Create Room",
      description: "Room creation feature coming soon!",
    });
  };

  const handleOpenUsers = () => {
    setShowUsers(!showUsers);
    toast({
      title: "Users",
      description: showUsers ? "Users panel closed" : "Users panel opened",
    });
  };

  const handleOpenSettings = () => {
    setShowSettings(!showSettings);
    toast({
      title: "Settings",
      description: showSettings ? "Settings closed" : "Settings opened",
    });
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 min-h-screen flex flex-col border-l border-r border-gray-700">
      <AdminPanel isOpen={isAdminPanelOpen} onClose={() => setIsAdminPanelOpen(false)} />

      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-950 text-white p-4 shadow-lg border-b border-gray-800">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {currentRoom && (
              <Button
                onClick={handleLeaveRoom}
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

      {/* Search Panel */}
      {showSearch && (
        <div className="bg-gray-700 p-4 border-b border-gray-600">
          <h3 className="text-white font-medium mb-2">Search Rooms</h3>
          <input 
            type="text" 
            placeholder="Search for rooms..." 
            className="w-full p-2 rounded bg-gray-600 text-white placeholder-gray-400"
          />
        </div>
      )}

      {/* Users Panel */}
      {showUsers && (
        <div className="bg-gray-700 p-4 border-b border-gray-600">
          <h3 className="text-white font-medium mb-2">Online Users</h3>
          <div className="text-gray-300">
            <p>• {username} (You)</p>
            <p>• User123</p>
            <p>• MovieFan456</p>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-gray-700 p-4 border-b border-gray-600">
          <h3 className="text-white font-medium mb-2">Settings</h3>
          <div className="space-y-2">
            <button className="block w-full text-left p-2 text-gray-300 hover:bg-gray-600 rounded">
              Profile Settings
            </button>
            <button className="block w-full text-left p-2 text-gray-300 hover:bg-gray-600 rounded">
              Notifications
            </button>
            <button className="block w-full text-left p-2 text-gray-300 hover:bg-gray-600 rounded">
              Privacy
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        {currentRoom ? (
          <RoomView
            currentRoom={currentRoom}
            currentVideo={currentVideo}
            videoQueue={videoQueue}
            currentVideoUrl={currentVideoUrl}
            setCurrentVideoUrl={setCurrentVideoUrl}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            showRoomAd={showRoomAd}
            setShowRoomAd={setShowRoomAd}
            chatMessages={chatMessages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            chatContainerRef={chatContainerRef}
            username={username}
            onVideoSelect={handleVideoSelect}
            onVideoRemove={handleVideoRemove}
            onSendMessage={sendMessage}
            onAddMessage={addMessage}
          />
        ) : (
          <HomeView rooms={rooms} onJoinRoom={handleJoinRoom} />
        )}
      </main>

      {/* Bottom Navigation */}
      <Navigation 
        currentRoom={currentRoom}
        onCreateRoom={handleCreateRoom}
        onGoHome={handleGoHome}
        onOpenSearch={handleOpenSearch}
        onOpenUsers={handleOpenUsers}
        onOpenSettings={handleOpenSettings}
      />
    </div>
  );
};

export default Index;
