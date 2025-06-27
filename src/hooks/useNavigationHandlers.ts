
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
}

export const useNavigationHandlers = ({
  currentRoom,
  handleLeaveRoom,
  showSearch,
  setShowSearch,
  showUsers,
  setShowUsers,
  showSettings,
  setShowSettings
}: UseNavigationHandlersProps) => {
  const { toast } = useToast();

  const handleGoHome = () => {
    if (currentRoom) {
      handleLeaveRoom();
    }
    toast({
      title: "Home",
      description: "Navigated to home page",
    });
  };

  const handleOpenSearch = () => {
    setShowSearch(!showSearch);
    toast({
      title: "Search",
      description: showSearch ? "Search closed" : "Search opened",
    });
  };

  const handleCreateRoom = () => {
    toast({
      title: "Create Room",
      description: "Room creation feature coming soon!",
    });
  };

  const handleOpenUsers = () => {
    setShowUsers(!showUsers);
    toast({
      title: "Users",
      description: showUsers ? "Users panel closed" : "Users panel opened",
    });
  };

  const handleOpenSettings = () => {
    setShowSettings(!showSettings);
    toast({
      title: "Settings",
      description: showSettings ? "Settings closed" : "Settings opened",
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
