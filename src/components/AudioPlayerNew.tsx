import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  // Jah Prayzher - Mhandu Yenhamo YouTube ID (replace with actual video ID)
  const musicTrack = {
    title: "Jah Prayzher - Mhandu Yenhamo",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual Jah Prayzher video ID
    artist: "Jah Prayzher"
  };

  // Auto-show player after first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setTimeout(() => {
          setShowPlayer(true);
        }, 1000);
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!showPlayer) {
      setShowPlayer(true);
      setIsMinimized(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const togglePlayer = () => {
    setShowPlayer(!showPlayer);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Floating Audio Controls */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
        {/* Embedded YouTube Player */}
        {showPlayer && (
          <div className={`bg-black/90 backdrop-blur-lg border border-white/20 rounded-lg shadow-2xl transition-all duration-300 ${
            isMinimized ? 'w-80 h-20' : 'w-96 h-64'
          }`}>
            {!isMinimized && (
              <div className="w-full h-48 rounded-t-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${musicTrack.youtubeId}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&start=0&loop=1&playlist=${musicTrack.youtubeId}`}
                  title={musicTrack.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            )}
            
            {/* Player Controls */}
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={togglePlay}
                  className="text-white hover:text-primary hover:bg-white/10 rounded-full p-2"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleMute}
                  className="text-white hover:text-primary hover:bg-white/10 rounded-full p-2"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
                
                <div className="text-white">
                  <p className="text-xs font-medium truncate max-w-32">{musicTrack.title}</p>
                  <p className="text-xs text-gray-300 truncate max-w-32">{musicTrack.artist}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleMinimize}
                  className="text-white hover:text-primary hover:bg-white/10 rounded-full p-1"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-3 h-3" />
                  ) : (
                    <Minimize2 className="w-3 h-3" />
                  )}
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={togglePlayer}
                  className="text-white hover:text-red-400 hover:bg-white/10 rounded-full p-1"
                >
                  ✕
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Control Button */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-2 shadow-lg">
          <Button
            size="sm"
            variant="ghost"
            onClick={togglePlayer}
            className="text-white hover:text-primary hover:bg-white/10 rounded-full p-2"
          >
            <Music className="w-4 h-4" />
          </Button>
        </div>

        {/* Playing Indicator */}
        {isPlaying && showPlayer && (
          <div className="bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1 border border-primary/30">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs text-white font-medium">Now Playing</span>
            </div>
          </div>
        )}
      </div>

      {/* Welcome Music Notice */}
      {!hasInteracted && (
        <div className="fixed top-24 right-6 z-50 bg-primary/90 backdrop-blur-sm rounded-lg p-4 max-w-sm border border-primary/20 shadow-lg animate-fade-in">
          <div className="flex items-start space-x-3">
            <Music className="w-5 h-5 text-white mt-0.5" />
            <div className="text-white">
              <p className="text-sm font-medium">🎵 Jah Prayzher - Mhandu Yenhamo</p>
              <p className="text-xs opacity-90 mt-1">
                Click anywhere to enable this beautiful Zimbabwean music for your experience
              </p>
            </div>
          </div>
        </div>
      )}

      {/* First Time Music Prompt */}
      {hasInteracted && !showPlayer && (
        <div className="fixed bottom-24 right-6 z-50 bg-green-600/90 backdrop-blur-sm rounded-lg p-4 max-w-sm border border-green-500/20 shadow-lg">
          <div className="flex items-start space-x-3">
            <Music className="w-5 h-5 text-white mt-0.5" />
            <div className="text-white">
              <p className="text-sm font-medium">🎵 Play Mhandu Yenhamo?</p>
              <p className="text-xs opacity-90 mt-1 mb-3">
                Enjoy this beautiful track by Jah Prayzher while browsing
              </p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="bg-white text-green-600 hover:bg-white/90"
                  onClick={() => {
                    setShowPlayer(true);
                    setIsPlaying(true);
                    setIsMinimized(false);
                  }}
                >
                  ▶️ Play Now
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => setHasInteracted(false)}
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
