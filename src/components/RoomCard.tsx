
import { Users, Youtube } from 'lucide-react';

interface Room {
  id: number;
  name: string;
  category: string;
  viewers: number;
  videoId: string;
}

interface RoomCardProps {
  room: Room;
  onClick: () => void;
}

const RoomCard = ({ room, onClick }: RoomCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden hover:border-pink-600 transition-all cursor-pointer group shadow-lg"
    >
      <div className="relative pt-[56.25%]">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
          <Youtube className="w-8 h-8 text-gray-500 group-hover:text-pink-500 transition-colors" />
        </div>
        <div className="absolute bottom-3 left-3 bg-black bg-opacity-80 text-white text-xs px-3 py-1 rounded-full flex items-center">
          <Users className="w-3 h-3 mr-1.5 text-pink-400" />
          {room.viewers} online
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-sm truncate text-white group-hover:text-pink-400 transition-colors">
          {room.name}
        </h4>
        <p className="text-gray-400 text-xs truncate mt-1">{room.category}</p>
      </div>
    </div>
  );
};

export default RoomCard;
