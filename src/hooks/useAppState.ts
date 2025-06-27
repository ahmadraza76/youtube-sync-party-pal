
import { useState } from 'react';

export const useAppState = () => {
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [showAdBanner, setShowAdBanner] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return {
    isAdminPanelOpen,
    setIsAdminPanelOpen,
    showAdBanner,
    setShowAdBanner,
    showSearch,
    setShowSearch,
    showUsers,
    setShowUsers,
    showSettings,
    setShowSettings
  };
};
