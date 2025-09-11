import { User, Shield, FileText, Camera, Target, Building2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProfileSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileSidebar = ({ activeTab, onTabChange }: ProfileSidebarProps) => {
  const menuItems = [
    { id: 'profile', label: 'Profile Overview', icon: User },
    { id: 'projects', label: 'My Projects', icon: Building2 },
    { id: 'milestones', label: 'Milestones', icon: Target },
    { id: 'media', label: 'Media Gallery', icon: Camera },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'kyc', label: 'KYC Verification', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-72 bg-background border-r border-border min-h-screen p-6">
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-2">Profile Menu</h2>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-12 text-left",
                activeTab === item.id && "bg-primary/10 text-primary font-medium border-r-2 border-primary"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default ProfileSidebar;