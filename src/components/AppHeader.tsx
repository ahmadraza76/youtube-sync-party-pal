
import { ArrowLeft, Youtube, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Room } from '@/types';

interface AppHeaderProps {
  currentRoom: Room | null;
  onLeaveRoom: () => void;
  onOpenAdminPanel: () => void;
}

const AppHeader = ({ currentRoom, onLeaveRoom, onOpenAdminPanel }: AppHeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-950 text-white p-4 shadow-lg border-b border-gray-800">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {currentRoom && (
            <Button
              onClick={onLeaveRoom}
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
            onClick={onOpenAdminPanel}
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
  );
};

export default AppHeader;
