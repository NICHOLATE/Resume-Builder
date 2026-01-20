import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Eye, FileText, Plus, Trash2, Download, Edit, 
  Briefcase, FileCheck, User, LogOut, FolderOpen,
  Clock, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
import { SavedCV, CoverLetter, JobApplication } from '@/types/resume';
import { format } from 'date-fns';

interface DashboardProps {
  savedCVs: SavedCV[];
  coverLetters: CoverLetter[];
  applications: JobApplication[];
  profile: { name: string; email: string };
  isLoggedIn: boolean;
  onLoadCV: (cv: SavedCV) => void;
  onDeleteCV: (id: string) => void;
  onDeleteCoverLetter: (id: string) => void;
  onDeleteApplication: (id: string) => void;
  onUpdateApplication: (id: string, updates: Partial<JobApplication>) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  savedCVs,
  coverLetters,
  applications,
  profile,
  isLoggedIn,
  onLoadCV,
  onDeleteCV,
  onDeleteCoverLetter,
  onDeleteApplication,
  onUpdateApplication,
  onLogout,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'cvs' | 'applications' | 'coverletters' | 'profile'>('cvs');

  const getStatusIcon = (status: JobApplication['status']) => {
    switch (status) {
      case 'applied': return <Clock className="w-4 h-4" />;
      case 'interviewing': return <AlertCircle className="w-4 h-4" />;
      case 'offered': return <CheckCircle className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: JobApplication['status']) => {
    switch (status) {
      case 'applied': return 'bg-blue-500/10 text-blue-500';
      case 'interviewing': return 'bg-yellow-500/10 text-yellow-500';
      case 'offered': return 'bg-green-500/10 text-green-500';
      case 'accepted': return 'bg-emerald-500/10 text-emerald-500';
      case 'rejected': return 'bg-red-500/10 text-red-500';
    }
  };

  const tabs = [
    { id: 'cvs', label: 'My CVs', icon: FileText, count: savedCVs.length },
    { id: 'applications', label: 'Applications', icon: Briefcase, count: applications.length },
    { id: 'coverletters', label: 'Cover Letters', icon: FileCheck, count: coverLetters.length },
    { id: 'profile', label: 'Profile', icon: User, count: null },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <Eye className="w-6 h-6 text-accent" />
              <span className="font-display text-xl font-bold text-foreground">CVision</span>
            </a>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden md:block">
                {profile.email || 'Guest'}
              </span>
              <Button onClick={() => navigate('/builder')} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                New CV
              </Button>
              {isLoggedIn && (
                <Button onClick={onLogout} variant="ghost" size="icon">
                  <LogOut className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Welcome back{profile.name ? `, ${profile.name}` : ''}!
            </h1>
            <p className="text-muted-foreground">
              Manage your CVs, cover letters, and track your job applications.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{savedCVs.length}</p>
                  <p className="text-sm text-muted-foreground">Saved CVs</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{applications.length}</p>
                  <p className="text-sm text-muted-foreground">Applications</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {applications.filter(a => a.status === 'interviewing' || a.status === 'offered').length}
                  </p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <FileCheck className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{coverLetters.length}</p>
                  <p className="text-sm text-muted-foreground">Cover Letters</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex items-center gap-2"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.count !== null && (
                  <Badge variant="secondary" className="ml-1">
                    {tab.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'cvs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedCVs.length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="py-12 text-center">
                    <FolderOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-2">No CVs saved yet</h3>
                    <p className="text-muted-foreground mb-4">Create your first CV to get started</p>
                    <Button onClick={() => navigate('/builder')}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create CV
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                savedCVs.map((cv) => (
                  <Card key={cv.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {cv.name}
                        <Badge variant="outline">{cv.settings.template}</Badge>
                      </CardTitle>
                      <CardDescription>
                        Updated {format(new Date(cv.updatedAt), 'MMM d, yyyy')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {cv.resumeData.personalInfo.fullName || 'Untitled'} • {cv.resumeData.experiences.length} experiences
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            onLoadCV(cv);
                            navigate('/builder');
                          }}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => onDeleteCV(cv.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="space-y-4">
              {applications.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-2">No applications tracked</h3>
                    <p className="text-muted-foreground">Start tracking your job applications here</p>
                  </CardContent>
                </Card>
              ) : (
                applications.map((app) => (
                  <Card key={app.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${getStatusColor(app.status)}`}>
                            {getStatusIcon(app.status)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{app.position}</h3>
                            <p className="text-sm text-muted-foreground">{app.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <select
                            value={app.status}
                            onChange={(e) => onUpdateApplication(app.id, { status: e.target.value as any })}
                            className="text-sm border rounded px-2 py-1 bg-background"
                          >
                            <option value="applied">Applied</option>
                            <option value="interviewing">Interviewing</option>
                            <option value="offered">Offered</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <span className="text-sm text-muted-foreground hidden md:block">
                            {format(new Date(app.appliedDate), 'MMM d, yyyy')}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive"
                            onClick={() => onDeleteApplication(app.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {activeTab === 'coverletters' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coverLetters.length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="py-12 text-center">
                    <FileCheck className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-2">No cover letters yet</h3>
                    <p className="text-muted-foreground mb-4">Create cover letters in the CV builder</p>
                    <Button onClick={() => navigate('/builder')}>
                      Go to Builder
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                coverLetters.map((letter) => (
                  <Card key={letter.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{letter.name}</CardTitle>
                      <CardDescription>
                        {letter.targetCompany} • {letter.targetPosition}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {letter.content.substring(0, 150)}...
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => navigate('/builder?tab=cover')}>
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => onDeleteCoverLetter(letter.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <User className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{profile.name || 'Guest User'}</h3>
                    <p className="text-muted-foreground">{profile.email || 'Not signed in'}</p>
                  </div>
                </div>
                
                {!isLoggedIn && (
                  <div className="pt-4 border-t">
                    <p className="text-muted-foreground mb-4">
                      Sign in to save your data across devices and access all features.
                    </p>
                    <Button onClick={() => navigate('/login')}>
                      Sign In
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
