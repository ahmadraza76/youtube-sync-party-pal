
import { useState, useEffect, useRef } from 'react';
import { ChatMessageType } from '@/types';
import { 
  mockChatMessages, 
  getChatMessagesByRoom, 
  addChatMessage 
} from '@/data/mockData';

export const useChatState = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatMessages(mockChatMessages.slice(0, 3));
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const loadRoomChat = (roomId: number, roomName: string) => {
    const roomMessages = getChatMessagesByRoom(roomId);
    if (roomMessages.length > 0) {
      setChatMessages(roomMessages);
    } else {
      const welcomeMessage: ChatMessageType = {
        id: Date.now().toString(),
        user: 'System',
        message: `Welcome to ${roomName}! 🎬`,
        timestamp: new Date()
      };
      setChatMessages([welcomeMessage]);
    }
  };

  const addMessage = (message: ChatMessageType, roomId?: number) => {
    setChatMessages(prev => [...prev, message]);
    if (roomId) {
      addChatMessage({
        user: message.user,
        message: message.message,
        isHost: message.isHost,
        roomId
      });
    }
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  return {
    chatMessages,
    setChatMessages,
    newMessage,
    setNewMessage,
    chatContainerRef,
    loadRoomChat,
    addMessage,
    clearChat
  };
};
