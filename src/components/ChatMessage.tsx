
interface ChatMessage {
  id: string;
  user: string;
  message: string;
  isHost?: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: ChatMessage;
  currentUser: string;
}

const ChatMessage = ({ message, currentUser }: ChatMessageProps) => {
  const isCurrentUser = message.user === currentUser;
  const isSystemMessage = message.user === 'System';

  if (isSystemMessage) {
    return (
      <div className="text-center">
        <p className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
          {message.message}
        </p>
      </div>
    );
  }

  if (isCurrentUser) {
    return (
      <div className="text-right">
        <div className="inline-block max-w-xs">
          <p className="text-sm bg-black text-white p-2 rounded-lg inline-block">
            {message.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-start space-x-2">
        <div className={`w-6 h-6 rounded-full mt-1 flex items-center justify-center text-white text-xs font-bold ${
          message.isHost ? 'bg-red-500' : 'bg-blue-500'
        }`}>
          {message.isHost ? 'H' : message.user.charAt(0)}
        </div>
        <div>
          <p className={`font-medium text-sm ${message.isHost ? 'text-red-400' : 'text-white'}`}>
            {message.user}
          </p>
          <p className={`text-sm p-2 rounded-lg inline-block ${
            message.isHost ? 'bg-white text-gray-800' : 'bg-gray-600 text-white'
          }`}>
            {message.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
