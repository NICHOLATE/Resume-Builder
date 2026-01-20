import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Eye, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface LoginPageProps {
  onLogin: (name: string, email: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (isSignUp && !name) {
      toast.error('Please enter your name');
      return;
    }

    // Local storage authentication simulation
    const users = JSON.parse(localStorage.getItem('cvision_users') || '[]');
    
    if (isSignUp) {
      if (users.some((u: any) => u.email === email)) {
        toast.error('An account with this email already exists');
        return;
      }
      users.push({ name, email, password });
      localStorage.setItem('cvision_users', JSON.stringify(users));
      onLogin(name, email);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } else {
      const user = users.find((u: any) => u.email === email && u.password === password);
      if (user) {
        onLogin(user.name, user.email);
        toast.success('Welcome back!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid email or password');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--gradient-hero)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-4"
      >
        <Card elevated className="backdrop-blur-lg bg-card/95">
          <CardHeader className="text-center">
            <a href="/" className="flex items-center justify-center gap-2 mb-4">
              <Eye className="w-8 h-8 text-accent" />
              <span className="font-display text-2xl font-bold text-foreground">CVision</span>
            </a>
            <CardTitle className="text-2xl">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </CardTitle>
            <CardDescription>
              {isSignUp 
                ? 'Sign up to save your CVs and track applications' 
                : 'Sign in to access your dashboard'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <Button type="submit" className="w-full" variant="gradient">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-accent hover:underline"
              >
                {isSignUp 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Sign up"
                }
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => navigate('/builder')}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Continue without account →
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
