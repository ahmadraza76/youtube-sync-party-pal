
import { X, Users, Ban, Volume, Settings as SettingsIcon, BarChart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel = ({ isOpen, onClose }: AdminPanelProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-red-500" />
            Admin Dashboard
          </h1>
          <Button onClick={onClose} className="bg-white text-black px-4 py-2 rounded-lg font-medium">
            <X className="w-4 h-4 mr-2" />
            Close
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Room Management */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Room Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Current Rooms</label>
                <Select>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select a room" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="room1">Public Room #1 (15 users)</SelectItem>
                    <SelectItem value="room2">Private Room #2 (3 users)</SelectItem>
                    <SelectItem value="room3">VIP Room (8 users)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                End Selected Room
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Create New Room
              </Button>
            </CardContent>
          </Card>
          
          {/* User Management */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Ban className="w-5 h-5 text-yellow-400" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Search Users</label>
                <Input 
                  type="text" 
                  className="bg-gray-700 border-gray-600 text-white" 
                  placeholder="Username or ID" 
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Ban User</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Mute User</span>
                <Switch />
              </div>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                View All Users
              </Button>
            </CardContent>
          </Card>
          
          {/* Ad Management */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Volume className="w-5 h-5 text-green-400" />
                Ad Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Ad Type</label>
                <Select>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select ad type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="banner">Banner Ad</SelectItem>
                    <SelectItem value="video">Video Ad</SelectItem>
                    <SelectItem value="popup">Popup Ad</SelectItem>
                    <SelectItem value="sponsored">Sponsored Room</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Ad Content</label>
                <Input 
                  type="text" 
                  className="bg-gray-700 border-gray-600 text-white" 
                  placeholder="Ad title or URL" 
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Duration (seconds)</label>
                <Input 
                  type="number" 
                  className="bg-gray-700 border-gray-600 text-white" 
                  defaultValue={30}
                />
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  Schedule Ad
                </Button>
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                  View Stats
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Analytics */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart className="w-5 h-5 text-purple-400" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-gray-400">Total Users Online</p>
                <p className="text-2xl font-bold text-white">1,248</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-gray-400">Active Rooms</p>
                <p className="text-2xl font-bold text-white">47</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-gray-400">Ad Revenue Today</p>
                <p className="text-2xl font-bold text-white">$324.78</p>
              </div>
            </CardContent>
          </Card>
          
          {/* System Settings */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <SettingsIcon className="w-5 h-5 text-gray-400" />
                System Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Maintenance Mode</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">New User Signups</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Advertisements</span>
                <Switch defaultChecked />
              </div>
              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                Save Settings
              </Button>
            </CardContent>
          </Card>
          
          {/* Ad Preview */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Ad Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="bg-gray-700 h-32 flex items-center justify-center">
                  <p className="text-gray-400">Ad Banner Preview</p>
                </div>
                <div className="p-3">
                  <p className="text-white font-medium">Sponsored by AdSterra</p>
                  <p className="text-gray-400 text-sm">Try our premium ad network for maximum revenue</p>
                  <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded">
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
