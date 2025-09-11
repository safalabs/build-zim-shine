import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface KYCProgressProps {
  currentStep: number;
}

const KYCProgress = ({ currentStep }: KYCProgressProps) => {
  const steps = [
    { id: 1, label: 'Upload', completed: currentStep >= 1 },
    { id: 2, label: 'Review', completed: currentStep >= 2 },
    { id: 3, label: 'Approved', completed: currentStep >= 3 },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">KYC Verification</h2>
        <Badge variant={currentStep === 3 ? "default" : "secondary"}>
          Status: {currentStep === 3 ? 'Approved' : currentStep === 2 ? 'Under Review' : 'Pending'}
        </Badge>
      </div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  "w-12 h-12 rounded-full border-4 flex items-center justify-center",
                  step.completed
                    ? "bg-primary border-primary"
                    : currentStep === step.id
                    ? "bg-background border-primary"
                    : "bg-background border-muted"
                )}
              >
                {step.completed ? (
                  <Check className="w-6 h-6 text-primary-foreground" />
                ) : (
                  <span className={cn(
                    "text-sm font-medium",
                    currentStep === step.id ? "text-primary" : "text-muted-foreground"
                  )}>
                    {step.id}
                  </span>
                )}
              </div>
              <span className={cn(
                "mt-2 text-sm font-medium",
                step.completed || currentStep === step.id ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
        
        {/* Progress line */}
        <div className="absolute top-6 left-6 right-6 h-1 bg-muted -z-0">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${Math.max(0, (currentStep - 1) * 50)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default KYCProgress;