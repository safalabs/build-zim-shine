import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import SignInModal from './SignInModal';
import RegisterModal from './RegisterModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/33827882-4e4b-4ea3-80f5-fd87c43d40cf.png" 
              alt="Visionary Property Development Logo"
              className="w-12 h-12 object-contain hover:scale-105 transition-transform duration-200"
            />
            <div className="space-y-1">
              <div className={`text-lg font-bold transition-colors ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}>
                Visionary
              </div>
              <div className={`text-xs transition-colors ${
                isScrolled ? 'text-muted-foreground' : 'text-gray-300'
              }`}>
                Property Development
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#platform" 
              className={`transition-colors hover:text-primary ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('platform')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Platform
            </a>
            <div className="relative group">
              <button className={`flex items-center space-x-1 transition-colors hover:text-primary ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}>
                <span>Projects</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <a 
                  href="#projects" 
                  className="block px-4 py-3 text-sm hover:bg-gray-50 text-foreground border-b border-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    // Scroll to projects section and trigger Active filter
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    // Trigger filter change after scroll
                    setTimeout(() => {
                      const filterButton = document.querySelector('[data-filter="Active"]') as HTMLButtonElement;
                      filterButton?.click();
                    }, 500);
                  }}
                >
                  Active Projects
                </a>
                <a 
                  href="#projects" 
                  className="block px-4 py-3 text-sm hover:bg-gray-50 text-foreground border-b border-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    // Scroll to projects section and trigger Completed filter
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    // Trigger filter change after scroll
                    setTimeout(() => {
                      const filterButton = document.querySelector('[data-filter="Completed"]') as HTMLButtonElement;
                      filterButton?.click();
                    }, 500);
                  }}
                >
                  Completed Projects
                </a>
                <a 
                  href="#projects" 
                  className="block px-4 py-3 text-sm hover:bg-gray-50 text-foreground"
                  onClick={(e) => {
                    e.preventDefault();
                    // Scroll to projects section and trigger Upcoming filter
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    // Trigger filter change after scroll
                    setTimeout(() => {
                      const filterButton = document.querySelector('[data-filter="Upcoming"]') as HTMLButtonElement;
                      filterButton?.click();
                    }, 500);
                  }}
                >
                  Upcoming Projects
                </a>
              </div>
            </div>
            <a 
              href="#about" 
              className={`transition-colors hover:text-primary ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About
            </a>
            <a 
              href="#contact" 
              className={`transition-colors hover:text-primary ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => setIsSignInModalOpen(true)}
              className={`transition-colors ${
                isScrolled 
                  ? 'text-foreground hover:text-primary' 
                  : 'text-white hover:text-primary hover:bg-white/10'
              }`}
            >
              Sign In
            </Button>
            <Button onClick={() => setIsRegisterModalOpen(true)} className="bg-primary hover:bg-primary-dark text-white">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-6 py-4 space-y-4">
              <a 
                href="#platform" 
                className="block text-foreground hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('platform')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
              >
                Platform
              </a>
              <div>
                <button 
                  onClick={() => setIsMobileProjectsOpen(!isMobileProjectsOpen)}
                  className="flex items-center justify-between w-full text-foreground hover:text-primary transition-colors"
                >
                  <span>Projects</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMobileProjectsOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileProjectsOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    <a 
                      href="#projects" 
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                        setTimeout(() => {
                          const filterButton = document.querySelector('[data-filter="Active"]') as HTMLButtonElement;
                          filterButton?.click();
                        }, 500);
                        setIsMobileMenuOpen(false);
                        setIsMobileProjectsOpen(false);
                      }}
                    >
                      Active Projects
                    </a>
                    <a 
                      href="#projects" 
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                        setTimeout(() => {
                          const filterButton = document.querySelector('[data-filter="Completed"]') as HTMLButtonElement;
                          filterButton?.click();
                        }, 500);
                        setIsMobileMenuOpen(false);
                        setIsMobileProjectsOpen(false);
                      }}
                    >
                      Completed Projects
                    </a>
                    <a 
                      href="#projects" 
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                        setTimeout(() => {
                          const filterButton = document.querySelector('[data-filter="Upcoming"]') as HTMLButtonElement;
                          filterButton?.click();
                        }, 500);
                        setIsMobileMenuOpen(false);
                        setIsMobileProjectsOpen(false);
                      }}
                    >
                      Upcoming Projects
                    </a>
                  </div>
                )}
              </div>
              <a 
                href="#about" 
                className="block text-foreground hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
              >
                About
              </a>
              <a 
                href="#contact" 
                className="block text-foreground hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
              >
                Contact
              </a>
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setIsSignInModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start text-foreground"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => {
                    setIsRegisterModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-primary hover:bg-primary-dark text-white"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)}
        onSwitchToRegister={() => {
          setIsSignInModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToSignIn={() => {
          setIsRegisterModalOpen(false);
          setIsSignInModalOpen(true);
        }}
      />
    </nav>
  );
}