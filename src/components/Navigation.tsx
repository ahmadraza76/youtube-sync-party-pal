
import { Button } from '@/components/ui/button';
import { Home, Search, Plus, Users, Settings } from 'lucide-react';

interface NavigationProps {
  currentRoom: any;
}

const Navigation = ({ currentRoom }: NavigationProps) => {
  return (
    <nav className="bg-gray-900/80 border-t border-gray-800 p-3 backdrop-blur-lg">
      <div className="flex justify-around items-center">
        <Button className="p-3 text-gray-400 hover:text-white rounded-full hover:bg-gray-800/50 bg-transparent transition-all">
          <Home className="w-5 h-5" />
        </Button>
        <Button className="p-3 text-gray-400 hover:text-white rounded-full hover:bg-gray-800/50 bg-transparent transition-all">
          <Search className="w-5 h-5" />
        </Button>
        <Button 
          onClick={() => currentRoom ? {} : {}}
          className="p-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-pink-500/30 transition-all"
        >
          <Plus className="w-5 h-5" />
        </Button>
        <Button className="p-3 text-gray-400 hover:text-white rounded-full hover:bg-gray-800/50 bg-transparent transition-all">
          <Users className="w-5 h-5" />
        </Button>
        <Button className="p-3 text-gray-400 hover:text-white rounded-full hover:bg-gray-800/50 bg-transparent transition-all">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
