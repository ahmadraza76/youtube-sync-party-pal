
import { Button } from '@/components/ui/button';
import { Home, Search, Plus, Users, Settings } from 'lucide-react';

interface NavigationProps {
  currentRoom: any;
  onCreateRoom?: () => void;
  onGoHome?: () => void;
  onOpenSearch?: () => void;
  onOpenUsers?: () => void;
  onOpenSettings?: () => void;
}

const Navigation = ({ 
  currentRoom, 
  onCreateRoom,
  onGoHome,
  onOpenSearch,
  onOpenUsers,
  onOpenSettings
}: NavigationProps) => {
  const handleHomeClick = () => {
    console.log('🏠 Home button clicked');
    if (onGoHome) {
      onGoHome();
    }
  };

  const handleSearchClick = () => {
    console.log('🔍 Search button clicked');
    if (onOpenSearch) {
      onOpenSearch();
    }
  };

  const handleCreateClick = () => {
    console.log('➕ Create room button clicked');
    if (onCreateRoom) {
      onCreateRoom();
    }
  };

  const handleUsersClick = () => {
    console.log('👥 Users button clicked');
    if (onOpenUsers) {
      onOpenUsers();
    }
  };

  const handleSettingsClick = () => {
    console.log('⚙️ Settings button clicked');
    if (onOpenSettings) {
      onOpenSettings();
    }
  };

  return (
    <nav className="bg-gray-900/90 border-t border-gray-700 p-3 backdrop-blur-lg shadow-lg">
      <div className="flex justify-around items-center">
        {/* 🏠 Home Button */}
        <Button 
          onClick={handleHomeClick}
          className="flex flex-col items-center p-3 text-gray-400 hover:text-white rounded-xl hover:bg-gray-800/60 bg-transparent transition-all space-y-1 min-h-[60px]"
        >
          <Home className="w-5 h-5" />
          <span className="text-xs font-medium">Home</span>
        </Button>

        {/* 🔍 Search Button */}
        <Button 
          onClick={handleSearchClick}
          className="flex flex-col items-center p-3 text-gray-400 hover:text-blue-400 rounded-xl hover:bg-gray-800/60 bg-transparent transition-all space-y-1 min-h-[60px]"
        >
          <Search className="w-5 h-5" />
          <span className="text-xs font-medium">Search</span>
        </Button>

        {/* ➕ Create Room Button - Central highlighted button */}
        <Button 
          onClick={handleCreateClick}
          className="flex flex-col items-center p-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl shadow-lg hover:shadow-pink-500/30 hover:from-pink-600 hover:to-red-600 transition-all space-y-1 min-h-[60px] transform hover:scale-105"
        >
          <Plus className="w-6 h-6" />
          <span className="text-xs font-bold">Create</span>
        </Button>

        {/* 👥 Users Button */}
        <Button 
          onClick={handleUsersClick}
          className="flex flex-col items-center p-3 text-gray-400 hover:text-pink-400 rounded-xl hover:bg-gray-800/60 bg-transparent transition-all space-y-1 min-h-[60px]"
        >
          <Users className="w-5 h-5" />
          <span className="text-xs font-medium">Users</span>
        </Button>

        {/* ⚙️ Settings Button */}
        <Button 
          onClick={handleSettingsClick}
          className="flex flex-col items-center p-3 text-gray-400 hover:text-orange-400 rounded-xl hover:bg-gray-800/60 bg-transparent transition-all space-y-1 min-h-[60px]"
        >
          <Settings className="w-5 h-5" />
          <span className="text-xs font-medium">Settings</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
