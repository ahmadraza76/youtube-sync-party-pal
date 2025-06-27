
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ChatMessage from '@/components/ChatMessage';
import { ChatMessageType, Room } from '@/types';

interface ChatSectionProps {
  currentRoom: Room;
  chatMessages: ChatMessageType[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  onSendMessage: () => void;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  username: string;
}

const ChatSection = ({ 
  currentRoom, 
  chatMessages, 
  newMessage, 
  setNewMessage, 
  onSendMessage,
  chatContainerRef,
  username 
}: ChatSectionProps) => {
  return (
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
          onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
          className="flex-1 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-500"
        />
        <Button 
          onClick={onSendMessage} 
          disabled={!newMessage.trim()}
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-red-600 transition-all disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default ChatSection;
