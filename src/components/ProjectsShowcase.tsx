import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import InvestmentModal from '@/components/InvestmentModal';
import SignInModal from '@/components/SignInModal';
import RegisterModal from '@/components/RegisterModal';
import { 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Users, 
  DollarSign,
  ArrowRight,
  Filter,
  Star,
  X
} from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Harare Heights Residential",
    location: "Harare Central",
    image: "/lovable-uploads/b440c6a5-131b-4704-b39b-769befa15d89.png",
    status: "Active",
    type: "Residential",
    targetAmount: "$2,500,000",
    currentAmount: "$1,700,000",
    fundedPercentage: 68,
    investors: 145,
    expectedReturns: "18-25%",
    timeframe: "18 months",
    minInvestment: "$500",
    rating: 4.8,
    highlights: ["Prime Location", "Luxury Amenities", "High ROI"],
    completionDate: "Q4 2025",
    description: "Premium residential complex featuring 120 luxury apartments with modern amenities including swimming pool, gym, and 24/7 security."
  },
  {
    id: 2,
    title: "Victoria Falls Gateway",
    location: "Victoria Falls",
    image: "/lovable-uploads/b440c6a5-131b-4704-b39b-769befa15d89.png",
    status: "Active",
    type: "Mixed-Use",
    targetAmount: "$6,800,000",
    currentAmount: "$3,060,000",
    fundedPercentage: 45,
    investors: 89,
    expectedReturns: "22-28%",
    timeframe: "24 months",
    minInvestment: "$1,000",
    rating: 4.9,
    highlights: ["Tourism Hub", "Multiple Revenue Streams", "Government Support"],
    completionDate: "Q2 2026",
    description: "Mixed-use development combining retail, hospitality, and residential spaces in Zimbabwe's premier tourist destination."
  },
  {
    id: 3,
    title: "Bulawayo Business Park",
    location: "Bulawayo",
    image: "/lovable-uploads/b440c6a5-131b-4704-b39b-769befa15d89.png",
    status: "Completed",
    type: "Commercial",
    targetAmount: "$4,200,000",
    currentAmount: "$4,200,000",
    fundedPercentage: 100,
    investors: 203,
    expectedReturns: "16-22%",
    timeframe: "Completed",
    minInvestment: "$750",
    rating: 4.7,
    highlights: ["100% Leased", "Corporate Tenants", "Stable Returns"],
    completionDate: "Completed Q1 2024",
    description: "Modern office complex housing multiple international and local businesses with long-term lease agreements."
  },
  {
    id: 4,
    title: "Gweru Innovation Center",
    location: "Gweru",
    image: "/lovable-uploads/b440c6a5-131b-4704-b39b-769befa15d89.png",
    status: "Upcoming",
    type: "Commercial",
    targetAmount: "$3,500,000",
    currentAmount: "$0",
    fundedPercentage: 0,
    investors: 0,
    expectedReturns: "20-26%",
    timeframe: "20 months",
    minInvestment: "$250",
    rating: 0,
    highlights: ["Tech Hub", "University Partnership", "Growing Market"],
    completionDate: "Q3 2026",
    description: "Technology and innovation center designed to support Zimbabwe's growing tech sector with flexible office spaces and co-working areas."
  }
];

const statusColors = {
  Active: "bg-success text-success-foreground",
  Completed: "bg-info text-info-foreground",
  Upcoming: "bg-warning text-warning-foreground"
};

const typeColors = {
  Residential: "bg-primary/10 text-primary",
  Commercial: "bg-info/10 text-info",
  "Mixed-Use": "bg-warning/10 text-warning"
};

export default function ProjectsShowcase() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
  const [selectedInvestmentProject, setSelectedInvestmentProject] = useState(null);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const filters = ['All', 'Active', 'Completed', 'Upcoming'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.status === filter);

  return (
    <section id="projects" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Investment
            <span className="text-primary block">Opportunities</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Explore our portfolio of carefully vetted property development projects 
            across Zimbabwe's most promising locations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-2 shadow-md">
            <div className="flex space-x-2">
              {filters.map((filterOption) => (
                <button
                  key={filterOption}
                  data-filter={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-6 py-2 rounded-md transition-all ${
                    filter === filterOption
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-gray-50'
                  }`}
                >
                  {filterOption}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover-lift bg-white border-0 shadow-lg">
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  <Badge className={statusColors[project.status]}>
                    {project.status}
                  </Badge>
                  <Badge className={typeColors[project.type]}>
                    {project.type}
                  </Badge>
                </div>
                {project.rating > 0 && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <span className="text-sm font-medium">{project.rating}</span>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-6">
                {/* Title and Location */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-muted-foreground">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span className="text-xs">Target</span>
                    </div>
                    <div className="font-semibold">{project.targetAmount}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-muted-foreground">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-xs">Expected Returns</span>
                    </div>
                    <div className="font-semibold">{project.expectedReturns}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-muted-foreground">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-xs">Investors</span>
                    </div>
                    <div className="font-semibold">{project.investors}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-xs">Timeline</span>
                    </div>
                    <div className="font-semibold">{project.timeframe}</div>
                  </div>
                </div>

                {/* Funding Progress */}
                {project.status !== 'Upcoming' && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Funding Progress</span>
                      <span className="font-medium">{project.fundedPercentage}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.fundedPercentage}%` }}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {project.currentAmount} raised of {project.targetAmount}
                    </div>
                  </div>
                )}

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((highlight, index) => (
                    <span 
                      key={index}
                      className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary-dark text-white"
                    disabled={project.status === 'Completed'}
                    onClick={() => {
                      setSelectedInvestmentProject(project);
                      setIsInvestmentModalOpen(true);
                    }}
                  >
                    {project.status === 'Upcoming' ? 'Pre-Register' : 
                     project.status === 'Completed' ? 'View Returns' : 'Invest Now'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="px-4"
                    onClick={() => {
                      setSelectedProject(project);
                      setIsProjectModalOpen(true);
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Investing?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of investors building wealth through Zimbabwe's property development sector. 
            Start with as little as $100 and watch your investment grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-dark text-white px-8"
              onClick={() => {
                setFilter('All');
                // Scroll to top of projects section
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Browse All Projects
            </Button>
            <Button size="lg" variant="outline">
              Download Investment Guide
            </Button>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      <Dialog open={isProjectModalOpen} onOpenChange={setIsProjectModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Project Image */}
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={statusColors[selectedProject.status]}>
                      {selectedProject.status}
                    </Badge>
                    <Badge className={typeColors[selectedProject.type]}>
                      {selectedProject.type}
                    </Badge>
                  </div>
                </div>

                {/* Project Details Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Project Overview</h3>
                    <p className="text-muted-foreground mb-4">{selectedProject.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedProject.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedProject.completionDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{selectedProject.rating > 0 ? `${selectedProject.rating}/5 Rating` : 'New Project'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Investment Details</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Target Amount:</span>
                        <span className="font-semibold">{selectedProject.targetAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Amount:</span>
                        <span className="font-semibold">{selectedProject.currentAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expected Returns:</span>
                        <span className="font-semibold text-success">{selectedProject.expectedReturns}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Minimum Investment:</span>
                        <span className="font-semibold">{selectedProject.minInvestment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Investors:</span>
                        <span className="font-semibold">{selectedProject.investors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Timeline:</span>
                        <span className="font-semibold">{selectedProject.timeframe}</span>
                      </div>
                    </div>

                    {/* Funding Progress */}
                    {selectedProject.status !== 'Upcoming' && (
                      <div className="mt-6 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Funding Progress</span>
                          <span className="font-medium">{selectedProject.fundedPercentage}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-3">
                          <div 
                            className="bg-gradient-primary h-3 rounded-full transition-all duration-500"
                            style={{ width: `${selectedProject.fundedPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Highlights */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Key Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.highlights.map((highlight, index) => (
                      <span 
                        key={index}
                        className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4 border-t">
                  <Button 
                    size="lg"
                    className="flex-1 bg-primary hover:bg-primary-dark text-white"
                    disabled={selectedProject.status === 'Completed'}
                    onClick={() => {
                      setSelectedInvestmentProject(selectedProject);
                      setIsInvestmentModalOpen(true);
                      setIsProjectModalOpen(false);
                    }}
                  >
                    {selectedProject.status === 'Upcoming' ? 'Pre-Register Interest' : 
                     selectedProject.status === 'Completed' ? 'View Returns Report' : 'Invest Now'}
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                  >
                    Download Prospectus
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Investment Modal */}
      <InvestmentModal
        isOpen={isInvestmentModalOpen}
        onClose={() => setIsInvestmentModalOpen(false)}
        project={selectedInvestmentProject}
        onSwitchToSignIn={() => {
          setIsInvestmentModalOpen(false);
          setIsSignInModalOpen(true);
        }}
      />

      {/* Sign In Modal */}
      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)}
        onSwitchToRegister={() => {
          setIsSignInModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />
      
      {/* Register Modal */}
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToSignIn={() => {
          setIsRegisterModalOpen(false);
          setIsSignInModalOpen(true);
        }}
      />
    </section>
  );
}