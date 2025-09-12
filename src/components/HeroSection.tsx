import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Play, TrendingUp, Users, DollarSign, X } from 'lucide-react';
import heroProject1 from '@/assets/hero-project-1.jpg';
import heroProject2 from '@/assets/hero-project-2.jpg';
import heroProject3 from '@/assets/hero-project-3.jpg';

const heroSlides = [
  {
    id: 1,
    image: heroProject1,
    title: "Luxury Residential Complex",
    subtitle: "Harare Central District",
    description: "Premium residential units with modern amenities and sustainable design",
    investment: "$2.5M",
    funded: "68%",
    investors: 145
  },
  {
    id: 2,
    image: heroProject2,
    title: "Commercial Office Hub",
    subtitle: "Bulawayo Business Park",
    description: "State-of-the-art office spaces designed for the future of work",
    investment: "$4.2M",
    funded: "82%",
    investors: 203
  },
  {
    id: 3,
    image: heroProject3,
    title: "Mixed-Use Development",
    subtitle: "Victoria Falls Gateway",
    description: "Combining retail, residential, and hospitality in one vibrant location",
    investment: "$6.8M",
    funded: "45%",
    investors: 89
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const handleStartInvesting = () => {
    // Scroll to the projects section to show investment opportunities
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentProject = heroSlides[currentSlide];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-primary/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Live Investment Opportunity</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Invest in
                  <span className="block text-primary">Zimbabwe's Future</span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed">
                  Join Africa's largest construction consortium in revolutionizing property development 
                  through equity-based crowdfunding. Build wealth while building communities.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary-dark text-white px-8 py-4 text-lg"
                  onClick={handleStartInvesting}
                >
                  Start Investing
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
                  onClick={() => setShowDemoModal(true)}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">$50M+</div>
                  <div className="text-sm text-gray-300">Total Investment</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">2500+</div>
                  <div className="text-sm text-gray-300">Active Investors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">25%</div>
                  <div className="text-sm text-gray-300">Avg. Returns</div>
                </div>
              </div>
            </div>

            {/* Right Content - Project Card */}
            <div className="lg:justify-self-end">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover-lift">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Featured Project</span>
                    <div className="flex space-x-2">
                      {heroSlides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentSlide ? 'bg-primary' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white">{currentProject.title}</h3>
                    <p className="text-primary font-medium">{currentProject.subtitle}</p>
                    <p className="text-gray-300">{currentProject.description}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-lg mb-2 mx-auto">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-lg font-bold text-white">{currentProject.investment}</div>
                      <div className="text-xs text-gray-400">Target</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-10 h-10 bg-success/20 rounded-lg mb-2 mx-auto">
                        <TrendingUp className="w-5 h-5 text-success" />
                      </div>
                      <div className="text-lg font-bold text-white">{currentProject.funded}</div>
                      <div className="text-xs text-gray-400">Funded</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-10 h-10 bg-info/20 rounded-lg mb-2 mx-auto">
                        <Users className="w-5 h-5 text-info" />
                      </div>
                      <div className="text-lg font-bold text-white">{currentProject.investors}</div>
                      <div className="text-xs text-gray-400">Investors</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Funding Progress</span>
                      <span className="text-white font-medium">{currentProject.funded}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full transition-all duration-1000"
                        style={{ width: currentProject.funded }}
                      />
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary-dark text-white py-3">
                    View Project Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-full p-3 transition-all"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-full p-3 transition-all"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Autoplay Control */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-full p-2 transition-all"
        >
          <Play className={`w-4 h-4 text-white ${isAutoPlaying ? 'opacity-50' : 'opacity-100'}`} />
        </button>
      </div>

      {/* Demo Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Platform Demo - Visionary Property Development
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
            {/* YouTube Video Embed */}
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/3JZ_D3ELwOQ?autoplay=1&rel=0&modestbranding=1" 
              title="Property Investment Platform Demo"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Duration: 3:45 | Learn about investment opportunities, platform features, and success stories
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline"
                onClick={() => setShowDemoModal(false)}
              >
                Close Demo
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => {
                  setShowDemoModal(false);
                  // Navigate to projects section
                  setTimeout(() => {
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }}
              >
                Start Investing
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}