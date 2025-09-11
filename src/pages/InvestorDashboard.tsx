import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const InvestorDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setShowProfile(false)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-primary to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="text-2xl">Investor Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                    <p className="text-lg font-semibold">John Alexander Smith</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                    <p className="text-lg">john.smith@email.com</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Investor ID</label>
                    <p className="text-lg font-mono">INV-2024-001</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Member Since</label>
                    <p className="text-lg">January 2024</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Risk Profile</label>
                    <Badge variant="secondary">Moderate Risk</Badge>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Investment Tier</label>
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">Gold Investor</Badge>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-4">Investment Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{investments.length}</p>
                      <p className="text-sm text-muted-foreground">Active Investments</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">${totalCurrentValue.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Portfolio Value</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{totalROI.toFixed(1)}%</p>
                      <p className="text-sm text-muted-foreground">Total ROI</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">${totalPayouts.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total Payouts</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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