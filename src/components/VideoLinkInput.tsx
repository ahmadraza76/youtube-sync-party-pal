
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface VideoLinkInputProps {
  onAddVideo: (videoId: string, title: string) => void;
  onClose: () => void;
}

const VideoLinkInput = ({ onAddVideo, onClose }: VideoLinkInputProps) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleSubmit = () => {
    if (!videoUrl.trim() || !videoTitle.trim()) return;

    const videoId = extractVideoId(videoUrl.trim());
    if (!videoId) {
      alert('Please enter a valid YouTube URL or video ID');
      return;
    }

    onAddVideo(videoId, videoTitle.trim());
    setVideoUrl('');
    setVideoTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Add YouTube Video</h3>
          <Button
            onClick={onClose}
            className="bg-transparent hover:bg-gray-700 p-2 rounded-full"
          >
            <X className="w-5 h-5 text-gray-400" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Video Title
            </label>
            <Input
              type="text"
              placeholder="Enter video title..."
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              YouTube URL or Video ID
            </label>
            <Input
              type="text"
              placeholder="https://youtube.com/watch?v=... or video ID"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            <p className="text-xs text-gray-500 mt-1">
              Paste YouTube URL or just the video ID
            </p>
          </div>

          <div className="flex space-x-3 pt-2">
            <Button
              onClick={handleSubmit}
              disabled={!videoUrl.trim() || !videoTitle.trim()}
              className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Video
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLinkInput;
