import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Building2, 
  Award, 
  Globe, 
  Calendar,
  Users,
  TrendingUp,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const achievements = [
  {
    icon: Building2,
    number: "150+",
    label: "Projects Completed",
    description: "Successful property developments across Zimbabwe"
  },
  {
    icon: Users,
    number: "2,500+",
    label: "Happy Investors",
    description: "Growing community of satisfied stakeholders"
  },
  {
    icon: TrendingUp,
    number: "$50M+",
    label: "Total Investment",
    description: "Capital deployed in property development"
  },
  {
    icon: Award,
    number: "25%",
    label: "Average Returns",
    description: "Consistent performance across projects"
  }
];

const certifications = [
  {
    title: "Zimbabwe Investment Authority",
    description: "Licensed property development and investment company",
    status: "Verified"
  },
  {
    title: "Construction Industry Council",
    description: "Registered construction consortium member",
    status: "Certified"
  },
  {
    title: "Financial Services Commission",
    description: "Approved for crowdfunding operations",
    status: "Licensed"
  },
  {
    title: "Ministry of Lands & Housing",
    description: "Authorized for large-scale developments",
    status: "Approved"
  }
];

const locations = [
  { city: "Harare", projects: 45, value: "$18.5M" },
  { city: "Bulawayo", projects: 32, value: "$12.8M" },
  { city: "Victoria Falls", projects: 18, value: "$15.2M" },
  { city: "Gweru", projects: 25, value: "$8.9M" },
  { city: "Mutare", projects: 15, value: "$6.4M" },
  { city: "Masvingo", projects: 12, value: "$4.7M" }
];

const timeline = [
  {
    year: "2018",
    title: "Company Founded",
    description: "Established as Zimbabwe's premier property development company"
  },
  {
    year: "2019",
    title: "First Major Project",
    description: "Completed luxury residential complex in Harare's Borrowdale district"
  },
  {
    year: "2021",
    title: "Consortium Formation",
    description: "Became the largest construction consortium in Southern Hemisphere"
  },
  {
    year: "2023",
    title: "Crowdfunding Launch",
    description: "Pioneered equity-based crowdfunding platform for property investment"
  },
  {
    year: "2024",
    title: "International Recognition",
    description: "Awarded Best Property Developer in Zimbabwe by African Property Awards"
  }
];

export default function CompanyCredentials() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Trusted by Thousands,
            <span className="text-primary block">Proven by Results</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Since 2018, Visionary Property Development has been Zimbabwe's leading 
            construction consortium, delivering exceptional returns while building 
            the future of urban development.
          </p>
        </div>

        {/* Key Achievements */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center p-6 hover-lift bg-gradient-card border-0 shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <achievement.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{achievement.number}</div>
              <h3 className="font-semibold mb-2">{achievement.label}</h3>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
            </Card>
          ))}
        </div>

        {/* Company Journey */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Timeline */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold mb-8">Our Journey</h3>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{item.year.slice(-2)}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">{item.title}</h4>
                      <span className="text-sm text-muted-foreground">({item.year})</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold mb-8">Certifications & Licenses</h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <Card key={index} className="p-4 border-l-4 border-l-primary bg-gradient-card">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h4 className="font-semibold">{cert.title}</h4>
                      <p className="text-sm text-muted-foreground">{cert.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="text-sm font-medium text-success">{cert.status}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic Presence */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">National Presence</h3>
            <p className="text-xl text-muted-foreground">
              Active developments across Zimbabwe's major urban centers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <Card key={index} className="p-6 text-center hover-lift border-0 shadow-md">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{location.city}</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>{location.projects} Projects</div>
                  <div className="font-semibold text-primary">{location.value} Invested</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recognition Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Best Property Developer</h4>
            <p className="text-sm text-muted-foreground">African Property Awards 2024</p>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-success/5 to-success/10 border-success/20">
            <Star className="w-12 h-12 text-success mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Excellence in Construction</h4>
            <p className="text-sm text-muted-foreground">Zimbabwe Building Council 2023</p>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-info/5 to-info/10 border-info/20">
            <Globe className="w-12 h-12 text-info mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Regional Leader</h4>
            <p className="text-sm text-muted-foreground">Southern Africa Development 2023</p>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Partner with Zimbabwe's #1 Developer?</h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join our successful track record and be part of Zimbabwe's property development revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8">
              Start Investing Today
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8">
              Download Company Profile
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}