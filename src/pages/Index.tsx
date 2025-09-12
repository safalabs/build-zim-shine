import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PlatformOverview from '@/components/PlatformOverview';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import CompanyCredentials from '@/components/CompanyCredentials';
import Footer from '@/components/Footer';
import AudioPlayer from '@/components/AudioPlayer';
import { useState } from 'react';

const Index = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    alert(`Thank you ${formData.firstName}! Your message has been sent. We'll get back to you soon.`);
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <PlatformOverview />
        <ProjectsShowcase />
        <CompanyCredentials />
        
        {/* About Section */}
        <section id="about" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                About Visionary Property Development
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Visionary Property Development is Zimbabwe's leading property investment platform, 
                revolutionizing how people invest in real estate through innovative crowdfunding solutions. 
                We bridge the gap between ambitious property developers and forward-thinking investors.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">10+</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Years Experience</h3>
                  <p className="text-muted-foreground">Building Zimbabwe's future through strategic property development</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">50+</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Completed Projects</h3>
                  <p className="text-muted-foreground">Successfully delivered projects across residential and commercial sectors</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2500+</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Happy Investors</h3>
                  <p className="text-muted-foreground">Building wealth and communities together through smart investments</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Get In Touch
                </h2>
                <p className="text-lg text-muted-foreground">
                  Ready to start your investment journey? Contact our team today.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary">📍</span>
                        </div>
                        <div>
                          <p className="font-medium">Address</p>
                          <p className="text-muted-foreground">78 Kaguvi Street, Harare, Zimbabwe</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary">📞</span>
                        </div>
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-muted-foreground">+263 772 123 456</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary">✉️</span>
                        </div>
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-muted-foreground">info@visionaryproperty.co.zw</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold mb-4">Office Hours</h4>
                    <div className="space-y-2 text-muted-foreground">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 1:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
                
                {/* Contact Form */}
                <div className="bg-card p-8 rounded-lg border shadow-sm">
                  <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input 
                          type="text" 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input 
                          type="text" 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject</label>
                      <input 
                        type="text" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                        placeholder="Investment Inquiry"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <textarea 
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                        placeholder="Tell us about your investment goals..."
                        required
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AudioPlayer />
    </div>
  );
};

export default Index;