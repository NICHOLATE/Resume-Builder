import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Sparkles, Download, CheckCircle, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    { icon: FileText, text: '6 ATS-Optimized Templates' },
    { icon: Sparkles, text: 'AI Content Suggestions' },
    { icon: Download, text: 'PDF, DOCX, HTML Export' },
    { icon: CheckCircle, text: 'Job Description Matching' },
  ];

  return (
    <main>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: 'var(--gradient-hero)' }} />
        
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/20 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered CV Builder</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-display font-bold text-primary-foreground mb-6 leading-tight"
            >
              <Eye className="w-16 h-16 md:w-20 md:h-20 inline-block mr-4 text-accent" />
              CVision
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto"
            >
              Build professional, ATS-friendly resumes in minutes with AI-powered content suggestions and beautiful templates.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button
                size="xl"
                variant="accent"
                onClick={() => navigate('/builder')}
                className="group"
              >
                Get Started Free
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Button>
              <Button
                size="xl"
                variant="outline"
                onClick={() => navigate('/login')}
                className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Users className="w-5 h-5 mr-2" />
                Sign In
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10"
                >
                  <feature.icon className="w-8 h-8 text-accent" />
                  <span className="text-sm font-medium text-primary-foreground/90">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;
