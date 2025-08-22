import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play after first user interaction (browser policy compliance)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        // Auto-start background music after first interaction
        setTimeout(() => {
          playAudio();
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

  const playAudio = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Audio autoplay blocked by browser policy');
      }
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* Audio Element - Add your music file in public folder */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/background-music.mp3" type="audio/mpeg" />
        <source src="/background-music.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      {/* Floating Audio Controls */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-2 shadow-lg">
          <div className="flex items-center space-x-2">
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
          </div>
        </div>
        
        {/* Audio indicator */}
        {isPlaying && (
          <div className="bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1 border border-primary/30">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs text-white font-medium">Playing</span>
            </div>
          </div>
        )}
      </div>

      {/* Welcome Audio Notice (shows once) */}
      {!hasInteracted && (
        <div className="fixed top-24 right-6 z-50 bg-primary/90 backdrop-blur-sm rounded-lg p-4 max-w-sm border border-primary/20 shadow-lg animate-fade-in">
          <div className="flex items-start space-x-3">
            <Volume2 className="w-5 h-5 text-white mt-0.5" />
            <div className="text-white">
              <p className="text-sm font-medium">Enhanced Experience</p>
              <p className="text-xs opacity-90 mt-1">
                Click anywhere to enable background music for an immersive experience
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}