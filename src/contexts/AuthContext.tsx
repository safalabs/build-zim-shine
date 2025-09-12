import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  kycStatus: 'pending' | 'under_review' | 'approved' | 'rejected';
  isLoggedIn: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateKycStatus: (status: User['kycStatus']) => void;
  isAuthenticated: boolean;
  canInvest: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    try {
      // Mock successful login
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        kycStatus: 'pending', // Default to pending KYC
        isLoggedIn: true
      };
      setUser(mockUser);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateKycStatus = (status: User['kycStatus']) => {
    if (user) {
      setUser({ ...user, kycStatus: status });
    }
  };

  const isAuthenticated = !!user;
  const canInvest = isAuthenticated && user?.kycStatus === 'approved';

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateKycStatus,
        isAuthenticated,
        canInvest
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
