import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [volume, setVolume] = useState(50);

  // Jah Prayzher - Mhandu Yenhamo YouTube ID
  const musicTrack = {
    title: "Jah Prayzher - Mhandu Yenhamo",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual Jah Prayzher video ID
    artist: "Jah Prayzher"
  };

  // Auto-play after first user interaction (browser policy compliance)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        // Show music selection modal after first interaction
        setTimeout(() => {
          setShowMusicModal(true);
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
        setAudioError(false);
      } catch (error) {
        console.log('Audio autoplay blocked by browser policy or file not found');
        setAudioError(true);
        setIsPlaying(false);
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
      setShowMusicModal(true);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const openYouTubeMusic = (youtubeId: string) => {
    // Open YouTube music in a new tab
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
    setIsPlaying(true);
    setShowMusicModal(false);
  };

  return (
    <>
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
              onClick={() => setShowMusicModal(true)}
              className="text-white hover:text-primary hover:bg-white/10 rounded-full p-2"
            >
              <Music className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Audio indicator */}
        {isPlaying && (
          <div className="bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1 border border-primary/30">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs text-white font-medium">Music Playing</span>
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

      {/* Music Selection Modal */}
      <Dialog open={showMusicModal} onOpenChange={setShowMusicModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Choose Background Music
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Select your preferred background music to enhance your browsing experience
            </p>
            
            <div className="space-y-3">
              {musicOptions.map((music, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{music.title}</h4>
                      <p className="text-sm text-muted-foreground">{music.description}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => openYouTubeMusic(music.youtubeId)}
                      className="ml-3"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Play
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-center gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowMusicModal(false)}
                  className="flex-1"
                >
                  Maybe Later
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    window.open('https://www.youtube.com/results?search_query=relaxing+background+music', '_blank');
                    setShowMusicModal(false);
                  }}
                  className="flex-1"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Browse More
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}