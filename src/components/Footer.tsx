import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowRight,
  Building2
} from 'lucide-react';

const footerLinks = {
  platform: [
    { label: "How It Works", href: "#platform" },
    { label: "Investment Process", href: "#process" },
    { label: "Risk Management", href: "#risk" },
    { label: "Returns Calculator", href: "#calculator" }
  ],
  projects: [
    { label: "Active Projects", href: "#active" },
    { label: "Completed Projects", href: "#completed" },
    { label: "Upcoming Projects", href: "#upcoming" },
    { label: "Project Gallery", href: "#gallery" }
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Team", href: "#team" },
    { label: "Careers", href: "#careers" },
    { label: "News & Updates", href: "#news" }
  ],
  legal: [
    { label: "Terms of Service", href: "#terms" },
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Investment Disclaimer", href: "#disclaimer" },
    { label: "Regulatory Compliance", href: "#compliance" }
  ]
};

const contactInfo = [
  {
    icon: Phone,
    label: "+263 4 123 4567",
    href: "tel:+2634123456"
  },
  {
    icon: Mail,
    label: "invest@visionarydev.co.zw",
    href: "mailto:invest@visionarydev.co.zw"
  },
  {
    icon: MapPin,
    label: "Harare Central Business District, Zimbabwe",
    href: "#location"
  }
];

const socialLinks = [
  { icon: Facebook, href: "#facebook", label: "Facebook" },
  { icon: Twitter, href: "#twitter", label: "Twitter" },
  { icon: Linkedin, href: "#linkedin", label: "LinkedIn" },
  { icon: Instagram, href: "#instagram", label: "Instagram" }
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">Stay Updated</h3>
              <p className="text-gray-300 text-lg">
                Get the latest investment opportunities, market insights, and company updates 
                delivered to your inbox.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                />
                <Button className="bg-primary hover:bg-primary-dark text-white px-8 py-3">
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <p className="text-sm text-gray-400">
                By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-6 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold">Visionary</div>
                <div className="text-sm text-gray-400">Property Development</div>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Zimbabwe's largest construction consortium, pioneering equity-based crowdfunding 
              for property development. Building the future, one investment at a time.
            </p>

            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-3 text-gray-300 hover:text-primary transition-colors"
                >
                  <contact.icon className="w-5 h-5" />
                  <span className="text-sm">{contact.label}</span>
                </a>
              ))}
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-primary hover:bg-primary/20 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Platform</h4>
            <div className="space-y-3">
              {footerLinks.platform.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Projects Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Projects</h4>
            <div className="space-y-3">
              {footerLinks.projects.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Company</h4>
            <div className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Legal</h4>
            <div className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 Visionary Property Development. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Licensed by Financial Services Commission</span>
              <span>•</span>
              <span>Regulated Investment Platform</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}