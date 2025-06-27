
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
    console.log('Home button clicked');
    if (onGoHome) {
      onGoHome();
    }
  };

  const handleSearchClick = () => {
    console.log('Search button clicked');
    if (onOpenSearch) {
      onOpenSearch();
    }
  };

  const handleCreateClick = () => {
    console.log('Create room button clicked');
    if (onCreateRoom) {
      onCreateRoom();
    }
  };

  const handleUsersClick = () => {
    console.log('Users button clicked');
    if (onOpenUsers) {
      onOpenUsers();
    }
  };

  const handleSettingsClick = () => {
    console.log('Settings button clicked');
    if (onOpenSettings) {
      onOpenSettings();
    }
  };

  return (
    <nav className="bg-gray-900/80 border-t border-gray-800 p-3 backdrop-blur-lg">
      <div className="flex justify-around items-center">
        <Button 
          onClick={handleHomeClick}
          className="p-3 text-gray-400 hover:text-white rounded-full hover:bg-gray-800/50 bg-transparent transition-all"
        >
          <Home className="w-5 h-5" />
        </Button>
        <Button 
          onClick={handleSearchClick}
          className="p-3 text-gray-400 hover:text-white rounded-full hover:bg-gray-800/50 bg-transparent transition-all"
        >
          <Search className="w-5 h-5" />
        </Button>
        <Button 
          onClick={handleCreateClick}
          className="p-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-pink-500/30 transition-all"
        >
          <Plus className="w-5 h-5" />
        </Button>
        <Button 
          onClick={handleUsersClick}
          className="p-3 text-gray-400 hover:text-white rounded-full hover:bg-gray-800/50 bg-transparent transition-all"
        >
          <Users className="w-5 h-5" />
        </Button>
        <Button 
          onClick={handleSettingsClick}
          className="p-3 text-gray-400 hover:text-white rounded-full hover:bg-gray-800/50 bg-transparent transition-all"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
