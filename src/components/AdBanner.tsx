
import { X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdBannerProps {
  onClose: () => void;
  inRoom?: boolean;
}

const AdBanner = ({ onClose, inRoom = false }: AdBannerProps) => {
  const adContent = {
    sponsor: "AdSterra",
    title: "Premium YouTube Experience",
    description: "Upgrade to Premium for ad-free viewing and exclusive features",
    ctaText: "Learn More"
  };

  const handleAdClick = () => {
    // Simulate ad click tracking
    console.log('Ad clicked:', adContent.title);
    // In real app, this would track analytics
  };

  return (
    <div className={`${inRoom 
      ? 'bg-gray-800 border border-gray-700 rounded-lg p-3 mb-4' 
      : 'bg-gray-100 p-3 border-b border-gray-200'
    } flex justify-between items-center`}>
      <div className="flex items-center space-x-3 flex-1">
        <div className={`${inRoom ? 'bg-yellow-500' : 'bg-yellow-500'} text-white p-1 rounded flex-shrink-0`}>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${inRoom ? 'text-white' : 'text-gray-800'}`}>
            Sponsored by {adContent.sponsor}
          </p>
          {inRoom && (
            <p className="text-xs text-gray-400 truncate">
              {adContent.description}
            </p>
          )}
        </div>
        <Button
          onClick={handleAdClick}
          className={`${inRoom 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
          } text-xs px-3 py-1 rounded flex items-center space-x-1`}
        >
          <span>{inRoom ? adContent.ctaText : "Visit"}</span>
          <ExternalLink className="w-3 h-3" />
        </Button>
      </div>
      <Button 
        onClick={onClose}
        className={`${inRoom 
          ? 'text-gray-400 hover:text-white bg-transparent hover:bg-gray-700' 
          : 'text-gray-500 bg-transparent hover:bg-gray-200'
        } text-xs px-2 py-1 ml-2`}
      >
        <X className="w-3 h-3 mr-1" />
        {inRoom ? "Hide" : "Skip Ad"}
      </Button>
    </div>
  );
};

export default AdBanner;
