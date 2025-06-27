
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Users, Settings } from 'lucide-react';

interface AppSidePanelsProps {
  showSearch: boolean;
  showUsers: boolean;
  showSettings: boolean;
  showCreateRoom: boolean;
  username: string;
  onRoomCreate?: (roomName: string, category: string) => void;
}

const AppSidePanels = ({ 
  showSearch, 
  showUsers, 
  showSettings, 
  showCreateRoom,
  username,
  onRoomCreate 
}: AppSidePanelsProps) => {
  const handleCreateRoom = () => {
    const roomName = prompt("Enter room name:");
    const category = prompt("Enter room category:");
    if (roomName && category && onRoomCreate) {
      onRoomCreate(roomName, category);
    }
  };

  return (
    <>
      {/* Search Panel */}
      {showSearch && (
        <div className="bg-gray-700 p-4 border-b border-gray-600 animate-slide-in-right">
          <div className="flex items-center mb-3">
            <Search className="w-5 h-5 text-blue-400 mr-2" />
            <h3 className="text-white font-medium">🔍 Search Rooms</h3>
          </div>
          <Input 
            type="text" 
            placeholder="Search for rooms, content..." 
            className="w-full p-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 border-gray-500 focus:border-blue-400"
          />
          <div className="mt-3 space-y-2">
            <p className="text-gray-300 text-sm">Recent searches:</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-600 text-gray-300 px-3 py-1 rounded-full text-sm">Music</span>
              <span className="bg-gray-600 text-gray-300 px-3 py-1 rounded-full text-sm">Gaming</span>
            </div>
          </div>
        </div>
      )}

      {/* Create Room Panel */}
      {showCreateRoom && (
        <div className="bg-gray-700 p-4 border-b border-gray-600 animate-slide-in-right">
          <div className="flex items-center mb-3">
            <Plus className="w-5 h-5 text-green-400 mr-2" />
            <h3 className="text-white font-medium">➕ Create New Room</h3>
          </div>
          <div className="space-y-3">
            <Input 
              type="text" 
              placeholder="Room name..." 
              className="w-full p-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 border-gray-500"
            />
            <Input 
              type="text" 
              placeholder="Category (Music, Gaming, etc.)" 
              className="w-full p-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 border-gray-500"
            />
            <Button 
              onClick={handleCreateRoom}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all"
            >
              Create Room
            </Button>
          </div>
        </div>
      )}

      {/* Users Panel */}
      {showUsers && (
        <div className="bg-gray-700 p-4 border-b border-gray-600 animate-slide-in-right">
          <div className="flex items-center mb-3">
            <Users className="w-5 h-5 text-pink-400 mr-2" />
            <h3 className="text-white font-medium">👥 Online Users</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 p-2 bg-gray-600 rounded-lg">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {username.charAt(0)}
              </div>
              <span className="text-white">{username} (You)</span>
              <div className="w-2 h-2 bg-green-400 rounded-full ml-auto"></div>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-gray-600 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">M</div>
              <span className="text-gray-300">MusicLover99</span>
              <div className="w-2 h-2 bg-green-400 rounded-full ml-auto"></div>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-gray-600 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">G</div>
              <span className="text-gray-300">GameMaster</span>
              <div className="w-2 h-2 bg-green-400 rounded-full ml-auto"></div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-gray-700 p-4 border-b border-gray-600 animate-slide-in-right">
          <div className="flex items-center mb-3">
            <Settings className="w-5 h-5 text-orange-400 mr-2" />
            <h3 className="text-white font-medium">⚙️ Settings</h3>
          </div>
          <div className="space-y-2">
            <Button className="w-full text-left p-3 text-gray-300 hover:bg-gray-600 rounded-lg bg-transparent justify-start">
              👤 Profile Settings
            </Button>
            <Button className="w-full text-left p-3 text-gray-300 hover:bg-gray-600 rounded-lg bg-transparent justify-start">
              🔔 Notifications
            </Button>
            <Button className="w-full text-left p-3 text-gray-300 hover:bg-gray-600 rounded-lg bg-transparent justify-start">
              🔒 Privacy & Security
            </Button>
            <Button className="w-full text-left p-3 text-gray-300 hover:bg-gray-600 rounded-lg bg-transparent justify-start">
              🎨 Theme Preferences
            </Button>
            <Button className="w-full text-left p-3 text-gray-300 hover:bg-gray-600 rounded-lg bg-transparent justify-start">
              ℹ️ About & Help
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AppSidePanels;
