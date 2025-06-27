
import { useToast } from '@/hooks/use-toast';

interface UseNavigationHandlersProps {
  currentRoom: any;
  handleLeaveRoom: () => void;
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
  showUsers: boolean;
  setShowUsers: (show: boolean) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  showCreateRoom: boolean;
  setShowCreateRoom: (show: boolean) => void;
}

export const useNavigationHandlers = ({
  currentRoom,
  handleLeaveRoom,
  showSearch,
  setShowSearch,
  showUsers,
  setShowUsers,
  showSettings,
  setShowSettings,
  showCreateRoom,
  setShowCreateRoom
}: UseNavigationHandlersProps) => {
  const { toast } = useToast();

  const handleGoHome = () => {
    if (currentRoom) {
      handleLeaveRoom();
    }
    // Close all panels when going home
    setShowSearch(false);
    setShowUsers(false);
    setShowSettings(false);
    setShowCreateRoom(false);
    toast({
      title: "🏠 Home",
      description: "Welcome back to home page",
    });
  };

  const handleOpenSearch = () => {
    // Close other panels first
    setShowUsers(false);
    setShowSettings(false);
    setShowCreateRoom(false);
    setShowSearch(!showSearch);
    toast({
      title: "🔍 Search",
      description: showSearch ? "Search panel closed" : "Search rooms and content",
    });
  };

  const handleCreateRoom = () => {
    // Close other panels first
    setShowSearch(false);
    setShowUsers(false);
    setShowSettings(false);
    setShowCreateRoom(!showCreateRoom);
    toast({
      title: "➕ Create Room",
      description: showCreateRoom ? "Create panel closed" : "Create your own room",
    });
  };

  const handleOpenUsers = () => {
    // Close other panels first
    setShowSearch(false);
    setShowSettings(false);
    setShowCreateRoom(false);
    setShowUsers(!showUsers);
    toast({
      title: "👥 Users",
      description: showUsers ? "Users panel closed" : "View online users",
    });
  };

  const handleOpenSettings = () => {
    // Close other panels first
    setShowSearch(false);
    setShowUsers(false);
    setShowCreateRoom(false);
    setShowSettings(!showSettings);
    toast({
      title: "⚙️ Settings",
      description: showSettings ? "Settings closed" : "Configure your preferences",
    });
  };

  return {
    handleGoHome,
    handleOpenSearch,
    handleCreateRoom,
    handleOpenUsers,
    handleOpenSettings
  };
};
