import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { BookOpen, Home, LogOut, PlusCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, isAuthenticated, isInstructor } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/dashboard', label: 'Home', icon: Home },
    { path: '/courses', label: 'Courses', icon: BookOpen },
    ...(isInstructor ? [{ path: '/add-course', label: 'Add Course', icon: PlusCircle }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">
              LearnHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <Button
                    variant={isActive(link.path) ? 'default' : 'ghost'}
                    size="sm"
                    className="gap-2"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>
          )}

          {/* User Info & Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-semibold text-foreground">{user?.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="hidden sm:flex"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
                {/* Mobile menu button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X /> : <Menu />}
                </Button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isAuthenticated && mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={isActive(link.path) ? 'default' : 'ghost'}
                    className="w-full justify-start gap-3"
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Button>
                </Link>
              ))}
              <Button
                variant="outline"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start gap-3 mt-2"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
