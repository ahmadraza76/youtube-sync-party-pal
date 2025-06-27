
import { useRef } from 'react';
import { Play, Pause, Share, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Room, Video } from '@/types';

interface VideoPlayerProps {
  currentRoom: Room;
  currentVideo: Video | null;
  currentVideoUrl: string;
  setCurrentVideoUrl: (url: string) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  onShare: () => void;
}

const VideoPlayer = ({ 
  currentRoom, 
  currentVideo, 
  currentVideoUrl, 
  setCurrentVideoUrl,
  isPlaying, 
  setIsPlaying,
  onShare 
}: VideoPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const togglePlayPause = () => {
    if (iframeRef.current && currentVideo) {
      const iframe = iframeRef.current;
      const newUrl = isPlaying 
        ? `https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=0&enablejsapi=1&origin=${window.location.origin}`
        : `https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1&enablejsapi=1&origin=${window.location.origin}`;
      
      iframe.src = newUrl;
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="mb-6">
      <div className="rounded-2xl overflow-hidden relative pt-[56.25%] mb-4 bg-black shadow-xl border border-gray-800">
        <div className="absolute inset-0">
          {currentVideo && currentVideoUrl ? (
            <iframe
              ref={iframeRef}
              src={currentVideoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube Video Player"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
              <div className="text-center">
                <Youtube className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg font-medium">No video playing</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="font-bold text-lg text-white">
            {currentVideo ? currentVideo.title : "No video selected"}
          </h2>
          <p className="text-gray-400 text-sm">
            {currentRoom.viewers} viewers • Live • Host: {currentRoom.hostName || 'Host'}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Peak: {currentRoom.maxViewers} viewers • Total watch time: {Math.floor(currentRoom.totalWatchTime / 60)} minutes
          </p>
        </div>
        <Button onClick={onShare} className="bg-black text-white p-2 rounded-full hover:bg-gray-700">
          <Share className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex space-x-2 mb-4">
        <Button
          onClick={togglePlayPause}
          disabled={!currentVideo}
          className={`flex-1 py-3 rounded-lg flex items-center justify-center space-x-2 font-medium transition-all ${
            currentVideo 
              ? (isPlaying ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white')
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </Button>
      </div>
    </div>
  );
};

export default VideoPlayer;
