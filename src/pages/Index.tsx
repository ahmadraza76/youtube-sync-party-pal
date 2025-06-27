
import AdminPanel from '@/components/AdminPanel';
import AdBanner from '@/components/AdBanner';
import HomeView from '@/components/HomeView';
import RoomView from '@/components/RoomView';
import Navigation from '@/components/Navigation';
import AppHeader from '@/components/AppHeader';
import AppSidePanels from '@/components/AppSidePanels';
import { useRoomState } from '@/hooks/useRoomState';
import { useChatState } from '@/hooks/useChatState';
import { useAppState } from '@/hooks/useAppState';
import { useMessageHandlers } from '@/hooks/useMessageHandlers';
import { useNavigationHandlers } from '@/hooks/useNavigationHandlers';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const appState = useAppState();
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

  const messageHandlers = useMessageHandlers({
    currentRoom,
    username,
    videoQueue,
    setVideoQueue,
    addMessage,
    newMessage,
    setNewMessage
  });

  const handleJoinRoom = (room: any) => {
    joinRoom(room);
    loadRoomChat(room.id, room.name);
  };

  const handleLeaveRoom = () => {
    leaveRoom();
    clearChat();
  };

  const navigationHandlers = useNavigationHandlers({
    currentRoom,
    handleLeaveRoom,
    showSearch: appState.showSearch,
    setShowSearch: appState.setShowSearch,
    showUsers: appState.showUsers,
    setShowUsers: appState.setShowUsers,
    showSettings: appState.showSettings,
    setShowSettings: appState.setShowSettings,
    showCreateRoom: appState.showCreateRoom,
    setShowCreateRoom: appState.setShowCreateRoom
  });

  const handleRoomCreate = (roomName: string, category: string) => {
    toast({
      title: "🎉 Room Created!",
      description: `${roomName} in ${category} category has been created successfully`,
    });
    appState.setShowCreateRoom(false);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 min-h-screen flex flex-col border-l border-r border-gray-700">
      <AdminPanel 
        isOpen={appState.isAdminPanelOpen} 
        onClose={() => appState.setIsAdminPanelOpen(false)} 
      />

      <AppHeader 
        currentRoom={currentRoom}
        onLeaveRoom={handleLeaveRoom}
        onOpenAdminPanel={() => appState.setIsAdminPanelOpen(true)}
      />

      {/* Ad Banner - Top Level */}
      {appState.showAdBanner && !currentRoom && (
        <AdBanner onClose={() => appState.setShowAdBanner(false)} />
      )}

      <AppSidePanels 
        showSearch={appState.showSearch}
        showUsers={appState.showUsers}
        showSettings={appState.showSettings}
        showCreateRoom={appState.showCreateRoom}
        username={username}
        onRoomCreate={handleRoomCreate}
      />

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
            onSendMessage={messageHandlers.sendMessage}
            onAddMessage={addMessage}
          />
        ) : (
          <HomeView rooms={rooms} onJoinRoom={handleJoinRoom} />
        )}
      </main>

      {/* Bottom Navigation */}
      <Navigation 
        currentRoom={currentRoom}
        onCreateRoom={navigationHandlers.handleCreateRoom}
        onGoHome={navigationHandlers.handleGoHome}
        onOpenSearch={navigationHandlers.handleOpenSearch}
        onOpenUsers={navigationHandlers.handleOpenUsers}
        onOpenSettings={navigationHandlers.handleOpenSettings}
      />
    </div>
  );
};

export default Index;
