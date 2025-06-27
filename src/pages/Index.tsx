
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
import { addNewVideo } from '@/data/mockData';

const Index = () => {
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [showAdBanner, setShowAdBanner] = useState(true);

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
      <Navigation currentRoom={currentRoom} />
    </div>
  );
};

export default Index;
