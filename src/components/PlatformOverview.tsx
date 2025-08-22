import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Users, 
  TrendingUp, 
  Shield, 
  Building2, 
  Banknote, 
  BarChart3,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: "Equity Crowdfunding",
    description: "Pool investments from multiple investors to fund large-scale property developments with minimum investment thresholds."
  },
  {
    icon: TrendingUp,
    title: "Smart Returns",
    description: "Track your investment performance in real-time with transparent reporting and projected returns based on market analysis."
  },
  {
    icon: Shield,
    title: "Secure Investments",
    description: "All investments are backed by real estate assets and legal frameworks ensuring maximum security for your capital."
  },
  {
    icon: Building2,
    title: "Diverse Portfolio",
    description: "Choose from residential, commercial, and mixed-use developments across Zimbabwe's growing urban centers."
  },
  {
    icon: Banknote,
    title: "Flexible Funding",
    description: "Invest as little as $100 or scale up to institutional-level investments with our flexible funding options."
  },
  {
    icon: BarChart3,
    title: "Market Insights",
    description: "Access comprehensive market data, property valuations, and investment analytics to make informed decisions."
  }
];

const steps = [
  {
    number: "01",
    title: "Register & Verify",
    description: "Create your investor account and complete our simple verification process."
  },
  {
    number: "02",
    title: "Browse Projects",
    description: "Explore our curated selection of property development opportunities."
  },
  {
    number: "03",
    title: "Invest & Track",
    description: "Choose your investment amount and monitor progress through our dashboard."
  },
  {
    number: "04",
    title: "Earn Returns",
    description: "Receive quarterly returns as projects complete and properties appreciate."
  }
];

export default function PlatformOverview() {
  return (
    <section id="platform" className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Revolutionizing Property Investment 
            <span className="text-primary block">in Zimbabwe</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Our equity-based crowdfunding platform democratizes access to premium property 
            development opportunities, allowing investors of all sizes to participate in 
            Zimbabwe's growing real estate market.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover-lift bg-gradient-card border-0 shadow-md">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h3>
            <p className="text-xl text-muted-foreground">
              Start your property investment journey in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  <h4 className="text-lg font-semibold">{step.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-primary mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-primary-dark text-white px-8 py-4">
              Start Investing Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h4 className="text-lg font-semibold">Regulatory Compliant</h4>
            <p className="text-muted-foreground text-sm">
              Fully compliant with Zimbabwe's financial regulations and property laws
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="w-16 h-16 bg-info/10 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-info" />
            </div>
            <h4 className="text-lg font-semibold">Insured Investments</h4>
            <p className="text-muted-foreground text-sm">
              All projects backed by comprehensive insurance and legal frameworks
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
              <TrendingUp className="w-8 h-8 text-warning" />
            </div>
            <h4 className="text-lg font-semibold">Proven Track Record</h4>
            <p className="text-muted-foreground text-sm">
              5+ years of successful property development with consistent returns
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}