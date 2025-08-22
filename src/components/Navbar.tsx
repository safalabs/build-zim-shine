import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <a href="#active" className="block px-4 py-3 text-sm hover:bg-gray-50 text-foreground">Active Projects</a>
                <a href="#completed" className="block px-4 py-3 text-sm hover:bg-gray-50 text-foreground">Completed Projects</a>
                <a href="#upcoming" className="block px-4 py-3 text-sm hover:bg-gray-50 text-foreground">Upcoming Projects</a>
              </div>
            </div>
            <a 
              href="#about" 
              className={`transition-colors hover:text-primary ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              About
            </a>
            <a 
              href="#contact" 
              className={`transition-colors hover:text-primary ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              Contact
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className={`transition-colors ${
                isScrolled 
                  ? 'text-foreground hover:text-primary' 
                  : 'text-white hover:text-primary hover:bg-white/10'
              }`}
            >
              Sign In
            </Button>
            <Button className="bg-primary hover:bg-primary-dark text-white">
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
              <a href="#platform" className="block text-foreground hover:text-primary transition-colors">
                Platform
              </a>
              <a href="#projects" className="block text-foreground hover:text-primary transition-colors">
                Projects
              </a>
              <a href="#about" className="block text-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#contact" className="block text-foreground hover:text-primary transition-colors">
                Contact
              </a>
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Button variant="ghost" className="w-full justify-start text-foreground">
                  Sign In
                </Button>
                <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}