import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, Users, ArrowRight, CheckCircle } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Quality Courses',
      description: 'Access educational content designed for rural communities',
    },
    {
      icon: GraduationCap,
      title: 'Learn at Your Pace',
      description: 'Study anytime, anywhere with simple lessons',
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Connect with instructors and fellow students',
    },
  ];

  const benefits = [
    'Simple and easy-to-use interface',
    'Designed for low-bandwidth areas',
    'Video and text-based lessons',
    'Free access to quality education',
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">LearnHub</span>
            </div>
            <div className="flex gap-3">
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <GraduationCap className="w-4 h-4" />
            Education for Everyone
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Digital Learning for{' '}
            <span className="text-primary">Rural Communities</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Access quality education from anywhere. Simple courses designed for students 
            in rural areas with easy-to-understand lessons and video content.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="xl" className="gap-2 w-full sm:w-auto">
                Start Learning Today
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                I Already Have an Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Why Choose LearnHub?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl border border-border p-8 text-center shadow-card"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 mx-auto flex items-center justify-center mb-5">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-3xl border border-border p-8 sm:p-12 shadow-elevated">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
              Built for Rural Students
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                  <span className="text-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Link to="/register">
                <Button size="lg" className="gap-2">
                  Join Now - It's Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">LearnHub</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Empowering rural education through technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
