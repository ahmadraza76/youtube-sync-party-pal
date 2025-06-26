
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Play, Trash2, Clock } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  videoId: string;
  duration: string;
  addedBy: string;
  addedAt: Date;
}

interface RoomVideoManagerProps {
  roomId: number;
  currentVideo: Video | null;
  videoQueue: Video[];
  onVideoSelect: (video: Video) => void;
  onVideoAdd: (videoId: string, title: string) => void;
  onVideoRemove: (videoId: string) => void;
  isHost: boolean;
  username: string;
}

const RoomVideoManager = ({
  roomId,
  currentVideo,
  videoQueue,
  onVideoSelect,
  onVideoAdd,
  onVideoRemove,
  isHost,
  username
}: RoomVideoManagerProps) => {
  const [showAddVideo, setShowAddVideo] = useState(false);
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

  const handleAddVideo = () => {
    if (!videoUrl.trim() || !videoTitle.trim()) return;

    const videoId = extractVideoId(videoUrl.trim());
    if (!videoId) {
      alert('Please enter a valid YouTube URL or video ID');
      return;
    }

    onVideoAdd(videoId, videoTitle.trim());
    setVideoUrl('');
    setVideoTitle('');
    setShowAddVideo(false);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">Room Playlist</h3>
        <Button
          onClick={() => setShowAddVideo(!showAddVideo)}
          className="bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm px-3 py-1 rounded-lg hover:from-red-700 hover:to-pink-700"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Video
        </Button>
      </div>

      {showAddVideo && (
        <div className="bg-gray-700 rounded-lg p-4 mb-4 border border-gray-600">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Video Title
              </label>
              <Input
                type="text"
                placeholder="Enter video title..."
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                YouTube URL or Video ID
              </label>
              <Input
                type="text"
                placeholder="https://youtube.com/watch?v=... or video ID"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleAddVideo}
                disabled={!videoUrl.trim() || !videoTitle.trim()}
                className="bg-green-600 hover:bg-green-700 text-white flex-1"
              >
                Add to Queue
              </Button>
              <Button
                onClick={() => setShowAddVideo(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Current Playing */}
      {currentVideo && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-green-400 mb-2 flex items-center">
            <Play className="w-4 h-4 mr-1" />
            Now Playing
          </h4>
          <div className="bg-gray-700 rounded-lg p-3 border-l-4 border-green-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-white text-sm">{currentVideo.title}</p>
                <p className="text-xs text-gray-400">Added by {currentVideo.addedBy}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Queue */}
      {videoQueue.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-blue-400 mb-2 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Up Next ({videoQueue.length})
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {videoQueue.map((video, index) => (
              <div key={video.id} className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm">{video.title}</p>
                    <p className="text-xs text-gray-400">Added by {video.addedBy}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">#{index + 1}</span>
                    <Button
                      onClick={() => onVideoSelect(video)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded"
                    >
                      Play Now
                    </Button>
                    {(isHost || video.addedBy === username) && (
                      <Button
                        onClick={() => onVideoRemove(video.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-1 rounded"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {videoQueue.length === 0 && !currentVideo && (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <p className="text-gray-400">No videos in queue</p>
          <p className="text-gray-500 text-sm">Add some videos to get started!</p>
        </div>
      )}
    </div>
  );
};

export default RoomVideoManager;
