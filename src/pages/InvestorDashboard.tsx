import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  TrendingUp, 
  DollarSign, 
  Building2, 
  FileText, 
  Calendar,
  User,
  LogOut,
  ArrowLeft,
  Camera,
  Trophy,
  Star,
  MapPin,
  Phone,
  Mail,
  Edit,
  Upload,
  Award,
  CheckCircle,
  Clock,
  Target,
  Play,
  Download,
  Lock,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfileSidebar from '@/components/ProfileSidebar';
import KYCProgress from '@/components/KYCProgress';
import DocumentUpload from '@/components/DocumentUpload';

const InvestorDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showGoalDialog, setShowGoalDialog] = useState(false);
  const [showEditProfileDialog, setShowEditProfileDialog] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [newGoal, setNewGoal] = useState({ title: '', description: '', targetDate: '' });
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, updateKycStatus, logout } = useAuth();
  const [profileData, setProfileData] = useState({
    name: 'Kudzai M.',
    email: 'kudzai.m@gmail.com',
    phone: '+263 772 123 456',
    address: '78 Kaguvi St, Harare, Zimbabwe',
    bio: 'Experienced investor focused on property development and sustainable growth.'
  });

  const handleSignOut = () => {
    // You can add any cleanup logic here (like clearing auth tokens)
    navigate('/');
  };

  const handleProfileUpdate = () => {
    setIsEditingProfile(false);
    // Here you would typically save to backend
    console.log('Profile updated:', profileData);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setUploadedFiles(fileArray);
      console.log('Files selected:', fileArray);
    }
  };

  const handleUploadCancel = () => {
    setUploadedFiles([]);
    setShowUploadDialog(false);
  };

  const handleUploadComplete = () => {
    // Handle the actual upload logic here
    console.log('Uploading files:', uploadedFiles);
    // You can add API call here
    setUploadedFiles([]);
    setShowUploadDialog(false);
  };

  const handleSetNewGoal = () => {
    // Handle setting new goal logic here
    console.log('New goal set:', newGoal);
    // You can add API call here to save the goal
    
    // Reset the form
    setNewGoal({ title: '', description: '', targetDate: '' });
    setShowGoalDialog(false);
  };

  const investments = [
    {
      id: 1,
      projectName: "Marina View Apartments",
      investmentAmount: 50000,
      currentValue: 58750,
      roi: 17.5,
      status: "Active",
      startDate: "2024-01-15",
      expectedCompletion: "2025-06-30"
    },
    {
      id: 2,
      projectName: "Downtown Commercial Plaza",
      investmentAmount: 75000,
      currentValue: 82125,
      roi: 9.5,
      status: "Active",
      startDate: "2023-09-20",
      expectedCompletion: "2024-12-15"
    },
    {
      id: 3,
      projectName: "Luxury Residential Complex",
      investmentAmount: 100000,
      currentValue: 112000,
      roi: 12.0,
      status: "Completed",
      startDate: "2023-03-10",
      expectedCompletion: "2024-08-30"
    }
  ];

  const payouts = [
    { id: 1, date: "2024-09-15", amount: 2750, project: "Marina View Apartments", type: "Quarterly Return" },
    { id: 2, date: "2024-08-20", amount: 3125, project: "Downtown Commercial Plaza", type: "Quarterly Return" },
    { id: 3, date: "2024-08-30", amount: 12000, project: "Luxury Residential Complex", type: "Project Completion" },
    { id: 4, date: "2024-06-15", amount: 2500, project: "Marina View Apartments", type: "Quarterly Return" }
  ];

  const totalInvestment = investments.reduce((sum, inv) => sum + inv.investmentAmount, 0);
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalROI = ((totalCurrentValue - totalInvestment) / totalInvestment) * 100;
  const totalPayouts = payouts.reduce((sum, payout) => sum + payout.amount, 0);

  if (showProfile) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => setShowProfile(false)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Visionary
              </h1>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        <div className="flex">
          <ProfileSidebar activeTab={activeProfileTab} onTabChange={setActiveProfileTab} />
          
          <div className="flex-1 p-8 bg-gray-50/50">
            {activeProfileTab === 'profile' && (
              <div className="space-y-8">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-12 translate-y-12"></div>
                  
                  <div className="flex items-start gap-6 relative z-10">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center overflow-hidden border-4 border-white/30">
                      <img 
                        src="/lovable-uploads/bf08ddbc-7373-4c24-a7fb-b1311c6dc9e1.png"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
                      <p className="text-white/80 mb-4">Premium Investor • Member since 2024</p>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4" />
                          <span>Gold Tier</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          <span>3 Active Projects</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          <span>4.9 Rating</span>
                        </div>
                      </div>
                    </div>
                    
                    <Dialog open={showEditProfileDialog} onOpenChange={setShowEditProfileDialog}>
                      <DialogTrigger asChild>
                        <Button className="bg-white/20 hover:bg-white/30 border-white/30">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={profileData.name}
                              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                              id="address"
                              value={profileData.address}
                              onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                              id="bio"
                              value={profileData.bio}
                              onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                              rows={3}
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setShowEditProfileDialog(false)}>
                              Cancel
                            </Button>
                            <Button onClick={() => {
                              handleProfileUpdate();
                              setShowEditProfileDialog(false);
                            }}>
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600 font-medium">Total Invested</p>
                        <p className="text-2xl font-bold text-green-700">$225,000</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Portfolio Value</p>
                        <p className="text-2xl font-bold text-blue-700">$252,875</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-purple-600 font-medium">Total Returns</p>
                        <p className="text-2xl font-bold text-purple-700">$27,875</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Award className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Contact Information */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{profileData.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{profileData.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Address</p>
                          <p className="font-medium">{profileData.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeProfileTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">My Projects</h1>
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => {
                      // Navigate back to main dashboard to see all investments
                      setShowProfile(false);
                    }}
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    View All Investments
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[
                    {
                      name: "Marina View Apartments",
                      location: "Harare Waterfront",
                      investment: "$50,000",
                      currentValue: "$58,750",
                      roi: "+17.5%",
                      status: "Active",
                      progress: 65,
                      image: "/src/assets/hero-project-1.jpg",
                      completion: "June 2025"
                    },
                    {
                      name: "Downtown Commercial Plaza",
                      location: "CBD District",
                      investment: "$75,000",
                      currentValue: "$82,125",
                      roi: "+9.5%",
                      status: "Active",
                      progress: 80,
                      image: "/src/assets/hero-project-2.jpg",
                      completion: "Dec 2024"
                    },
                    {
                      name: "Luxury Residential Complex",
                      location: "Borrowdale",
                      investment: "$100,000",
                      currentValue: "$112,000",
                      roi: "+12.0%",
                      status: "Completed",
                      progress: 100,
                      image: "/src/assets/hero-project-3.jpg",
                      completion: "Completed"
                    }
                  ].map((project, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-48 bg-gradient-to-r from-gray-300 to-gray-400 relative">
                        <div className="absolute top-4 right-4">
                          <Badge className={project.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="font-bold text-lg">{project.name}</h3>
                          <p className="text-sm opacity-90">{project.location}</p>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-muted-foreground">Investment</p>
                              <p className="font-semibold">{project.investment}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Current Value</p>
                              <p className="font-semibold text-green-600">{project.currentValue}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">ROI</p>
                              <p className="font-semibold text-blue-600">{project.roi}</p>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                          </div>
                          
                          <div className="flex justify-between items-center pt-2">
                            <p className="text-sm text-muted-foreground">
                              Expected: {project.completion}
                            </p>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeProfileTab === 'milestones' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">Investment Milestones</h1>
                  <Dialog open={showGoalDialog} onOpenChange={setShowGoalDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Target className="w-4 h-4 mr-2" />
                        Set New Goal
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Set New Investment Goal</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="goal-title">Goal Title</Label>
                          <Input
                            id="goal-title"
                            placeholder="e.g., Reach $500K Portfolio"
                            value={newGoal.title}
                            onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="goal-description">Description</Label>
                          <Textarea
                            id="goal-description"
                            placeholder="Describe your investment goal..."
                            value={newGoal.description}
                            onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="target-date">Target Date</Label>
                          <Input
                            id="target-date"
                            type="date"
                            value={newGoal.targetDate}
                            onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setShowGoalDialog(false)}>
                            Cancel
                          </Button>
                          <Button 
                            onClick={handleSetNewGoal}
                            disabled={!newGoal.title || !newGoal.description || !newGoal.targetDate}
                          >
                            Set Goal
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Achievement Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "First Investment",
                      description: "Made your first property investment",
                      date: "Jan 15, 2024",
                      icon: Trophy,
                      completed: true,
                      color: "text-yellow-600 bg-yellow-100"
                    },
                    {
                      title: "Portfolio Diversification",
                      description: "Invested in 3 different projects",
                      date: "Mar 20, 2024",
                      icon: Building2,
                      completed: true,
                      color: "text-blue-600 bg-blue-100"
                    },
                    {
                      title: "Return Milestone",
                      description: "Achieved $25K in total returns",
                      date: "Aug 10, 2024",
                      icon: TrendingUp,
                      completed: true,
                      color: "text-green-600 bg-green-100"
                    },
                    {
                      title: "Premium Investor",
                      description: "Reach $250K total investment",
                      date: "Target: Dec 2024",
                      icon: Star,
                      completed: false,
                      color: "text-purple-600 bg-purple-100"
                    }
                  ].map((milestone, index) => (
                    <Card key={index} className={`p-6 ${milestone.completed ? 'border-green-200 bg-green-50/30' : 'border-gray-200'}`}>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${milestone.color}`}>
                          <milestone.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{milestone.title}</h3>
                            {milestone.completed && <CheckCircle className="w-5 h-5 text-green-600" />}
                            {!milestone.completed && <Clock className="w-5 h-5 text-muted-foreground" />}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{milestone.description}</p>
                          <p className="text-xs text-muted-foreground">{milestone.date}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Progress Timeline */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Investment Journey</h3>
                  <div className="space-y-6">
                    {[
                      { date: "Jan 2024", event: "Started investing with Marina View Apartments", amount: "$50,000" },
                      { date: "Mar 2024", event: "Expanded portfolio with Downtown Commercial Plaza", amount: "$75,000" },
                      { date: "Jun 2024", event: "Invested in Luxury Residential Complex", amount: "$100,000" },
                      { date: "Sep 2024", event: "Received quarterly returns", amount: "+$8,375" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <p className="font-medium">{item.event}</p>
                            <span className="text-sm font-semibold text-primary">{item.amount}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeProfileTab === 'media' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">Media Gallery</h1>
                  <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Media
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Media</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-lg font-medium mb-2">Drag and drop files here</p>
                          <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                          <Button variant="outline">
                            <input
                              type="file"
                              multiple
                              accept="image/*,video/*,.pdf,.doc,.docx"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onChange={(e) => handleFileUpload(e.target.files)}
                            />
                            Choose Files
                          </Button>
                          {uploadedFiles.length > 0 && (
                            <div className="mt-4 text-left">
                              <p className="text-sm font-medium mb-2">Selected files:</p>
                              <ul className="text-sm text-muted-foreground">
                                {uploadedFiles.map((file, index) => (
                                  <li key={index}>{file.name}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            onClick={(e) => {
                              e.preventDefault();
                              handleUploadCancel();
                            }}
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={(e) => {
                              e.preventDefault();
                              handleUploadComplete();
                            }} 
                            disabled={uploadedFiles.length === 0}
                          >
                            Upload
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Media Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Project Photos</h3>
                    <p className="text-sm text-muted-foreground mb-4">Construction progress and completion photos</p>
                    <p className="text-2xl font-bold text-blue-600">24</p>
                    <p className="text-xs text-muted-foreground">Photos</p>
                  </Card>

                  <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Video Tours</h3>
                    <p className="text-sm text-muted-foreground mb-4">Virtual property tours and updates</p>
                    <p className="text-2xl font-bold text-green-600">6</p>
                    <p className="text-xs text-muted-foreground">Videos</p>
                  </Card>

                  <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Documents</h3>
                    <p className="text-sm text-muted-foreground mb-4">Contracts, certificates, and reports</p>
                    <p className="text-2xl font-bold text-purple-600">12</p>
                    <p className="text-xs text-muted-foreground">Files</p>
                  </Card>
                </div>

                {/* Recent Media */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Recent Media</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div key={i} className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                          <Camera className="w-8 h-8 text-gray-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeProfileTab === 'settings' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Account Settings</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      {[
                        { label: "Project Updates", description: "Get notified about project milestones" },
                        { label: "Payment Notifications", description: "Receive alerts for dividend payments" },
                        { label: "Investment Opportunities", description: "New project announcements" },
                        { label: "Security Alerts", description: "Account security notifications" }
                      ].map((setting, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{setting.label}</p>
                            <p className="text-sm text-muted-foreground">{setting.description}</p>
                          </div>
                          <Button variant="outline" size="sm">Enable</Button>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
                    <div className="space-y-4">
                      {[
                        { label: "Profile Visibility", description: "Control who can see your profile" },
                        { label: "Investment History", description: "Show investment performance to others" },
                        { label: "Contact Information", description: "Display contact details publicly" },
                        { label: "Activity Status", description: "Show when you're active" }
                      ].map((setting, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{setting.label}</p>
                            <p className="text-sm text-muted-foreground">{setting.description}</p>
                          </div>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {activeProfileTab === 'security' && (
              <div>
                <h1 className="text-3xl font-bold mb-8">Security</h1>
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Password & Authentication</h3>
                    <p className="text-muted-foreground mb-6">Manage your password and two-factor authentication settings.</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          toast({
                            title: "Change Password",
                            description: "Password change form would open here",
                          });
                        }}
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Change Password
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          toast({
                            title: "Two-Factor Authentication",
                            description: "2FA setup would open here",
                          });
                        }}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Enable Two-Factor Auth
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Account Security</h3>
                    <p className="text-muted-foreground mb-6">Monitor and manage your account security settings.</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Login Notifications</p>
                          <p className="text-sm text-muted-foreground">Get notified when someone logs into your account</p>
                        </div>
                        <Button variant="outline" size="sm">Enable</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Session Management</p>
                          <p className="text-sm text-muted-foreground">View and manage your active sessions</p>
                        </div>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {activeProfileTab === 'kyc' && (
              <div>
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">KYC Verification</h1>
                    <Badge 
                      className={
                        user?.kycStatus === 'approved' ? 'bg-green-100 text-green-800' :
                        user?.kycStatus === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                        user?.kycStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {user?.kycStatus === 'approved' ? 'Approved' :
                       user?.kycStatus === 'under_review' ? 'Under Review' :
                       user?.kycStatus === 'rejected' ? 'Rejected' :
                       'Pending'}
                    </Badge>
                  </div>
                  
                  {/* Demo Controls */}
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">Demo Controls</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      For demonstration purposes, you can simulate different KYC statuses:
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          updateKycStatus('under_review');
                          toast({
                            title: "KYC Status Updated",
                            description: "Status changed to: Under Review",
                          });
                        }}
                      >
                        Set Under Review
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => {
                          updateKycStatus('approved');
                          toast({
                            title: "KYC Status Updated",
                            description: "Status changed to: Approved ✓ You can now invest!",
                          });
                        }}
                      >
                        Approve KYC (Demo)
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          updateKycStatus('rejected');
                          toast({
                            title: "KYC Status Updated",
                            description: "Status changed to: Rejected",
                            variant: "destructive"
                          });
                        }}
                      >
                        Set Rejected
                      </Button>
                    </div>
                  </div>
                </div>

                <KYCProgress 
                  currentStep={
                    user?.kycStatus === 'approved' ? 3 :
                    user?.kycStatus === 'under_review' ? 2 :
                    1
                  } 
                />
                <DocumentUpload />
              </div>
            )}

            {activeProfileTab === 'settings' && (
              <div>
                <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
                <div className="space-y-6">
                  {/* Notification Settings */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive updates about your investments</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-muted-foreground">Get SMS alerts for important updates</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </Card>

                  {/* Privacy Settings */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Privacy & Data</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Data Export</p>
                          <p className="text-sm text-muted-foreground">Download your personal data</p>
                        </div>
                        <Button variant="outline" size="sm">Export Data</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Account Deletion</p>
                          <p className="text-sm text-muted-foreground">Permanently delete your account</p>
                        </div>
                        <Button variant="outline" size="sm">Delete Account</Button>
                      </div>
                    </div>
                  </Card>

                  {/* Language & Region */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Language & Region</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Language</p>
                          <p className="text-sm text-muted-foreground">Current: English</p>
                        </div>
                        <Button variant="outline" size="sm">Change</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Currency</p>
                          <p className="text-sm text-muted-foreground">Current: USD</p>
                        </div>
                        <Button variant="outline" size="sm">Change</Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Investor Dashboard
              </h1>
            </div>
            <Button 
              onClick={() => setShowProfile(true)}
              variant="outline" 
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              View Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalInvestment.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across {investments.length} projects</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalCurrentValue.toLocaleString()}</div>
              <p className="text-xs text-green-600">+${(totalCurrentValue - totalInvestment).toLocaleString()} gain</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total ROI</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalROI.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Portfolio performance</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Payouts</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">${totalPayouts.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{payouts.length} transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Sections */}
        <Tabs defaultValue="investments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="investments">Active Investments</TabsTrigger>
            <TabsTrigger value="certificates">Stake Certificates</TabsTrigger>
            <TabsTrigger value="payouts">Payouts History</TabsTrigger>
          </TabsList>

          <TabsContent value="investments">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Active Investments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investments.map((investment) => (
                    <Card key={investment.id} className="border">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{investment.projectName}</h3>
                            <Badge variant={investment.status === 'Active' ? 'default' : 'secondary'}>
                              {investment.status}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">ROI</p>
                            <p className="text-xl font-bold text-green-600">{investment.roi}%</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Investment</p>
                            <p className="font-semibold">${investment.investmentAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Current Value</p>
                            <p className="font-semibold text-green-600">${investment.currentValue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Start Date</p>
                            <p className="font-semibold">{new Date(investment.startDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Expected Completion</p>
                            <p className="font-semibold">{new Date(investment.expectedCompletion).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Project Progress</span>
                            <span>{investment.status === 'Completed' ? '100%' : '65%'}</span>
                          </div>
                          <Progress value={investment.status === 'Completed' ? 100 : 65} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Stake Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Certificate ID</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Stake Amount</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {investments.map((investment, index) => (
                      <TableRow key={investment.id}>
                        <TableCell className="font-mono">CERT-{String(index + 1).padStart(3, '0')}</TableCell>
                        <TableCell>{investment.projectName}</TableCell>
                        <TableCell>${investment.investmentAmount.toLocaleString()}</TableCell>
                        <TableCell>{new Date(investment.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={investment.status === 'Active' ? 'default' : 'secondary'}>
                            {investment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payouts">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Payout History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payouts.map((payout) => (
                      <TableRow key={payout.id}>
                        <TableCell>{new Date(payout.date).toLocaleDateString()}</TableCell>
                        <TableCell>{payout.project}</TableCell>
                        <TableCell>
                          <Badge variant={payout.type === 'Project Completion' ? 'default' : 'secondary'}>
                            {payout.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-green-600">
                          ${payout.amount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestorDashboard;