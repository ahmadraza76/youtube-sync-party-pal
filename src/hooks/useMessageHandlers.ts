
import { ChatMessageType, Video } from '@/types';
import { addNewVideo } from '@/data';

interface UseMessageHandlersProps {
  currentRoom: any;
  username: string;
  videoQueue: Video[];
  setVideoQueue: (queue: Video[] | ((prev: Video[]) => Video[])) => void;
  addMessage: (message: ChatMessageType, roomId?: number) => void;
  newMessage: string;
  setNewMessage: (message: string) => void;
}

export const useMessageHandlers = ({
  currentRoom,
  username,
  videoQueue,
  setVideoQueue,
  addMessage,
  newMessage,
  setNewMessage
}: UseMessageHandlersProps) => {
  
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

  return {
    handleVideoAdd,
    sendMessage
  };
};
