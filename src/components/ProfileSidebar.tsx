import { User, Shield, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProfileSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileSidebar = ({ activeTab, onTabChange }: ProfileSidebarProps) => {
  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'kyc', label: 'KYC', icon: FileText },
  ];

  return (
    <div className="w-64 bg-background border-r border-border min-h-screen p-6">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-12",
                activeTab === item.id && "bg-muted text-primary font-medium"
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