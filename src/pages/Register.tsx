import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, User, Mail, Lock, UserPlus, Loader2, GraduationCap, School } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'instructor'>('student');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast({
        title: 'Please fill all fields',
        description: 'Name, email, and password are required.',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 6 characters.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await authAPI.register(name, email, password, role);
      toast({
        title: 'Registration Successful!',
        description: 'Please login to continue.',
      });
      navigate('/login');
    } catch (error: any) {
      toast({
        title: 'Registration Failed',
        description: error.response?.data?.message || 'Unable to create account.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary mx-auto flex items-center justify-center mb-4">
            <BookOpen className="w-9 h-9 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-2">Join our learning community</p>
        </div>

        {/* Form */}
        <div className="form-container">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="input-label">
                <User className="w-4 h-4 inline-block mr-2" />
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="email" className="input-label">
                <Mail className="w-4 h-4 inline-block mr-2" />
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="input-label">
                <Lock className="w-4 h-4 inline-block mr-2" />
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password (min. 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label className="input-label">I am a...</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                    role === 'student'
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                  disabled={loading}
                >
                  <GraduationCap className={`w-8 h-8 ${role === 'student' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`font-semibold ${role === 'student' ? 'text-primary' : 'text-foreground'}`}>
                    Student
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('instructor')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                    role === 'instructor'
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                  disabled={loading}
                >
                  <School className={`w-8 h-8 ${role === 'instructor' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`font-semibold ${role === 'instructor' ? 'text-primary' : 'text-foreground'}`}>
                    Instructor
                  </span>
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
