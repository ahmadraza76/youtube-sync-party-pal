import AdBanner from '@/components/AdBanner';
import VideoPlayer from '@/components/VideoPlayer';
import RoomVideoManager from '@/components/RoomVideoManager';
import ChatSection from '@/components/ChatSection';
import { Room, Video, ChatMessageType } from '@/types';
import { addNewVideo } from '@/data';

interface RoomViewProps {
  currentRoom: Room;
  currentVideo: Video | null;
  videoQueue: Video[];
  currentVideoUrl: string;
  setCurrentVideoUrl: (url: string) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  showRoomAd: boolean;
  setShowRoomAd: (show: boolean) => void;
  chatMessages: ChatMessageType[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  username: string;
  onVideoSelect: (video: Video) => void;
  onVideoRemove: (videoId: string) => void;
  onSendMessage: () => void;
  onAddMessage: (message: ChatMessageType, roomId?: number) => void;
}

const RoomView = ({
  currentRoom,
  currentVideo,
  videoQueue,
  currentVideoUrl,
  setCurrentVideoUrl,
  isPlaying,
  setIsPlaying,
  showRoomAd,
  setShowRoomAd,
  chatMessages,
  newMessage,
  setNewMessage,
  chatContainerRef,
  username,
  onVideoSelect,
  onVideoRemove,
  onSendMessage,
  onAddMessage
}: RoomViewProps) => {
  const isHost = currentRoom?.hostName === username;

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
      onAddMessage(shareMessage, currentRoom.id);
    }
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
    onAddMessage(successMessage, currentRoom.id);

    return newVideo;
  };

  return (
    <>
      {/* Room Ad Banner */}
      {showRoomAd && (
        <AdBanner 
          onClose={() => setShowRoomAd(false)} 
          inRoom={true}
        />
      )}

      {/* Current Video Player */}
      <VideoPlayer
        currentRoom={currentRoom}
        currentVideo={currentVideo}
        currentVideoUrl={currentVideoUrl}
        setCurrentVideoUrl={setCurrentVideoUrl}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onShare={shareRoom}
      />

      {/* Room Video Manager */}
      <RoomVideoManager
        roomId={currentRoom.id}
        currentVideo={currentVideo}
        videoQueue={videoQueue}
        onVideoSelect={onVideoSelect}
        onVideoAdd={handleVideoAdd}
        onVideoRemove={onVideoRemove}
        isHost={isHost}
        username={username}
      />

      {/* Chat Section */}
      <ChatSection
        currentRoom={currentRoom}
        chatMessages={chatMessages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        onSendMessage={onSendMessage}
        chatContainerRef={chatContainerRef}
        username={username}
      />
    </>
  );
};

export default RoomView;
