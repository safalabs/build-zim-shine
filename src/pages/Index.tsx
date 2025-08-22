import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PlatformOverview from '@/components/PlatformOverview';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import CompanyCredentials from '@/components/CompanyCredentials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <PlatformOverview />
        <ProjectsShowcase />
        <CompanyCredentials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
