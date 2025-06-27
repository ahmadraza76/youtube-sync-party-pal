
import { Youtube } from 'lucide-react';
import RoomCard from '@/components/RoomCard';
import { Room } from '@/types';

interface HomeViewProps {
  rooms: Room[];
  onJoinRoom: (room: Room) => void;
}

const HomeView = ({ rooms, onJoinRoom }: HomeViewProps) => {
  return (
    <>
      <div className="mb-8">
        <div className="rounded-2xl overflow-hidden relative pt-[56.25%] mb-4 bg-black shadow-xl border border-gray-800">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="text-center">
              <Youtube className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg font-medium">Join a room to start watching</p>
              <p className="text-gray-500 text-sm mt-2">Select any room below to join the party</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-white">Available Rooms ({rooms.length})</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {rooms.map((room) => (
            <RoomCard 
              key={room.id} 
              room={room} 
              onClick={() => onJoinRoom(room)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeView;
