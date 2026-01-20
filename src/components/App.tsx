import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ResumeBuilder from "./pages/ResumeBuilder";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useCVisionStorage } from "./hooks/useCVisionStorage";

const queryClient = new QueryClient();

const AppContent = () => {
  const storage = useCVisionStorage();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/builder" element={<ResumeBuilder />} />
      <Route 
        path="/login" 
        element={<LoginPage onLogin={storage.login} />} 
      />
      <Route 
        path="/dashboard" 
        element={
          <Dashboard
            savedCVs={storage.savedCVs}
            coverLetters={storage.coverLetters}
            applications={storage.applications}
            profile={storage.profile}
            isLoggedIn={storage.isLoggedIn}
            onLoadCV={storage.loadCV}
            onDeleteCV={storage.deleteCV}
            onDeleteCoverLetter={storage.deleteCoverLetter}
            onDeleteApplication={storage.deleteApplication}
            onUpdateApplication={storage.updateApplication}
            onLogout={storage.logout}
          />
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
