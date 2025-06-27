
interface AppSidePanelsProps {
  showSearch: boolean;
  showUsers: boolean;
  showSettings: boolean;
  username: string;
}

const AppSidePanels = ({ showSearch, showUsers, showSettings, username }: AppSidePanelsProps) => {
  return (
    <>
      {/* Search Panel */}
      {showSearch && (
        <div className="bg-gray-700 p-4 border-b border-gray-600">
          <h3 className="text-white font-medium mb-2">Search Rooms</h3>
          <input 
            type="text" 
            placeholder="Search for rooms..." 
            className="w-full p-2 rounded bg-gray-600 text-white placeholder-gray-400"
          />
        </div>
      )}

      {/* Users Panel */}
      {showUsers && (
        <div className="bg-gray-700 p-4 border-b border-gray-600">
          <h3 className="text-white font-medium mb-2">Online Users</h3>
          <div className="text-gray-300">
            <p>• {username} (You)</p>
            <p>• User123</p>
            <p>• MovieFan456</p>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-gray-700 p-4 border-b border-gray-600">
          <h3 className="text-white font-medium mb-2">Settings</h3>
          <div className="space-y-2">
            <button className="block w-full text-left p-2 text-gray-300 hover:bg-gray-600 rounded">
              Profile Settings
            </button>
            <button className="block w-full text-left p-2 text-gray-300 hover:bg-gray-600 rounded">
              Notifications
            </button>
            <button className="block w-full text-left p-2 text-gray-300 hover:bg-gray-600 rounded">
              Privacy
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AppSidePanels;
