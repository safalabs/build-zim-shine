import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  User, 
  Building, 
  DollarSign,
  ArrowRight,
  X
} from 'lucide-react';

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: number;
    title: string;
    minInvestment: string;
    expectedReturns: string;
    targetAmount: string;
    currentAmount: string;
    status: string;
  } | null;
  onSwitchToSignIn: () => void;
}

export default function InvestmentModal({ 
  isOpen, 
  onClose, 
  project, 
  onSwitchToSignIn 
}: InvestmentModalProps) {
  const { user, isAuthenticated, canInvest } = useAuth();
  const { toast } = useToast();
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [step, setStep] = useState<'auth-check' | 'kyc-check' | 'invest'>('auth-check');

  // Check authentication and KYC status when modal opens
  useEffect(() => {
    if (!isAuthenticated) {
      setStep('auth-check');
    } else if (!canInvest) {
      setStep('kyc-check');
    } else {
      setStep('invest');
    }
  }, [isAuthenticated, canInvest]);

  const handleInvestment = () => {
    if (!investmentAmount) {
      toast({
        title: "Missing Amount",
        description: "Please enter an investment amount",
        variant: "destructive"
      });
      return;
    }

    const amount = parseFloat(investmentAmount.replace(/[^0-9.]/g, ''));
    const minAmount = parseFloat(project?.minInvestment?.replace(/[^0-9.]/g, '') || '0');

    if (amount < minAmount) {
      toast({
        title: "Investment Too Low",
        description: `Minimum investment for this project is ${project?.minInvestment}`,
        variant: "destructive"
      });
      return;
    }

    // Simulate successful investment
    toast({
      title: "Investment Successful!",
      description: `You have successfully invested $${amount.toLocaleString()} in ${project?.title}`,
    });
    
    onClose();
    setInvestmentAmount('');
  };

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getKycStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'under_review': return <Clock className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Invest in {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Summary */}
          <div className="bg-secondary/30 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Minimum Investment:</span>
                <div className="font-semibold">{project.minInvestment}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Expected Returns:</span>
                <div className="font-semibold text-green-600">{project.expectedReturns}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Target Amount:</span>
                <div className="font-semibold">{project.targetAmount}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Current Amount:</span>
                <div className="font-semibold">{project.currentAmount}</div>
              </div>
            </div>
          </div>

          {/* Authentication Check */}
          {step === 'auth-check' && !isAuthenticated && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Sign In Required</h3>
                <p className="text-muted-foreground mb-4">
                  You need to sign in to your account before making an investment
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={onSwitchToSignIn} className="bg-primary hover:bg-primary-dark text-white">
                    Sign In to Continue
                  </Button>
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* KYC Status Check */}
          {step === 'kyc-check' && isAuthenticated && !canInvest && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                <Building className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">KYC Verification Required</h3>
                <p className="text-muted-foreground mb-4">
                  Complete your KYC verification to start investing
                </p>
                
                {/* Current KYC Status */}
                <div className="bg-secondary/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-sm font-medium">Current Status:</span>
                    <Badge className={getKycStatusColor(user?.kycStatus || 'pending')}>
                      {getKycStatusIcon(user?.kycStatus || 'pending')}
                      <span className="ml-1 capitalize">
                        {user?.kycStatus?.replace('_', ' ') || 'Pending'}
                      </span>
                    </Badge>
                  </div>
                  
                  {user?.kycStatus === 'pending' && (
                    <p className="text-sm text-muted-foreground">
                      Please complete your KYC verification in your dashboard
                    </p>
                  )}
                  
                  {user?.kycStatus === 'under_review' && (
                    <p className="text-sm text-muted-foreground">
                      Your documents are being reviewed. You'll be notified within 2-3 business days.
                    </p>
                  )}
                  
                  {user?.kycStatus === 'rejected' && (
                    <p className="text-sm text-muted-foreground">
                      Your KYC was rejected. Please update your documents and resubmit.
                    </p>
                  )}
                </div>

                <div className="flex gap-3 justify-center">
                  <Button 
                    onClick={() => {
                      onClose();
                      // Navigate to dashboard KYC section
                      window.location.href = '/investor-dashboard';
                    }}
                    className="bg-primary hover:bg-primary-dark text-white"
                  >
                    Complete KYC Verification
                  </Button>
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Investment Form */}
          {step === 'invest' && canInvest && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Ready to Invest!</h3>
                <p className="text-muted-foreground">
                  Enter your investment amount below
                </p>
              </div>

              {/* User Info */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Verified Investor</span>
                </div>
                <div className="text-sm text-green-700">
                  <p>Logged in as: {user?.email}</p>
                  <p>KYC Status: Approved ✓</p>
                </div>
              </div>

              {/* Investment Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="amount">Investment Amount (USD)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="amount"
                    type="text"
                    value={investmentAmount}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9.]/g, '');
                      setInvestmentAmount(value);
                    }}
                    placeholder="1,000"
                    className="pl-8 text-lg font-medium"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Minimum investment: {project.minInvestment}
                </p>
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {['500', '1000', '5000', '10000'].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setInvestmentAmount(amount)}
                    className="text-sm"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>

              {/* Investment Summary */}
              {investmentAmount && (
                <div className="bg-secondary/30 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Investment Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Investment Amount:</span>
                      <span className="font-medium">${parseFloat(investmentAmount || '0').toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected Annual Return:</span>
                      <span className="font-medium text-green-600">{project.expectedReturns}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projected Annual Income:</span>
                      <span className="font-medium text-green-600">
                        ${Math.round((parseFloat(investmentAmount || '0') * 0.22)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  onClick={handleInvestment}
                  disabled={!investmentAmount}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white"
                >
                  Confirm Investment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>

              {/* Terms Notice */}
              <p className="text-xs text-muted-foreground text-center">
                By investing, you agree to our terms and conditions. 
                This is a real estate investment with inherent risks.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
