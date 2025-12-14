import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { BookOpen, PlusCircle, GraduationCap, School, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { user, isInstructor } = useAuth();

  const dashboardCards = [
    {
      title: 'Browse Courses',
      description: 'Explore all available courses and start learning today',
      icon: BookOpen,
      link: '/courses',
      color: 'bg-primary/10 text-primary',
    },
    ...(isInstructor
      ? [
          {
            title: 'Create Course',
            description: 'Share your knowledge by creating a new course',
            icon: PlusCircle,
            link: '/add-course',
            color: 'bg-accent/10 text-accent',
          },
        ]
      : []),
  ];

  return (
    <div className="page-container">
      <Navbar />

      <main className="content-container">
        {/* Welcome Section */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8 shadow-card">
          <div className="flex items-start gap-5">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              isInstructor ? 'bg-accent/10' : 'bg-primary/10'
            }`}>
              {isInstructor ? (
                <School className="w-9 h-9 text-accent" />
              ) : (
                <GraduationCap className="w-9 h-9 text-primary" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome, {user?.name}!
              </h1>
              <p className="text-lg text-muted-foreground">
                {isInstructor
                  ? 'Manage your courses and help students learn.'
                  : 'Continue your learning journey with our courses.'}
              </p>
              <span className={`inline-block mt-3 px-4 py-1.5 rounded-full text-sm font-semibold ${
                isInstructor
                  ? 'bg-accent/10 text-accent'
                  : 'bg-primary/10 text-primary'
              }`}>
                {isInstructor ? 'Instructor' : 'Student'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {dashboardCards.map((card) => (
            <Link key={card.link} to={card.link}>
              <div className="bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-elevated transition-all duration-300 group h-full">
                <div className={`w-14 h-14 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                  <card.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-muted-foreground mb-4">{card.description}</p>
                <Button variant="outline" size="sm" className="gap-2 group-hover:border-primary group-hover:text-primary transition-colors">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Link>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-secondary/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-3">💡 Tips for Success</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              Set aside regular time each day for learning
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              Take notes as you go through lessons
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              Practice what you learn with real projects
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
