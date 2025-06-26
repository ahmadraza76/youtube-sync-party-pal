
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdBannerProps {
  onClose: () => void;
}

const AdBanner = ({ onClose }: AdBannerProps) => {
  return (
    <div className="bg-gray-100 p-3 border-b border-gray-200 flex justify-between items-center">
      <div className="flex items-center">
        <div className="bg-yellow-500 text-white p-1 rounded mr-2">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-800">Sponsored by AdSterra</p>
      </div>
      <Button 
        onClick={onClose}
        className="text-gray-500 text-xs bg-transparent hover:bg-gray-200 px-2 py-1"
      >
        <X className="w-3 h-3 mr-1" />
        Skip Ad
      </Button>
    </div>
  );
};

export default AdBanner;
