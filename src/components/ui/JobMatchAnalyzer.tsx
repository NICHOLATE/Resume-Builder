import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { JobMatch } from '@/types/resume';
import { analyzeJobMatch } from '@/utils/atsChecker';
import { ResumeData } from '@/types/resume';
import { Target, Search, CheckCircle, XCircle } from 'lucide-react';

interface JobMatchAnalyzerProps {
  resumeData: ResumeData;
}

const JobMatchAnalyzer: React.FC<JobMatchAnalyzerProps> = ({ resumeData }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<JobMatch | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!jobDescription.trim()) return;
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const result = analyzeJobMatch(resumeData, jobDescription);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 1000);
  };

  return (
    <Card elevated>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-accent" />
          Job Match Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste a job description here to see how well your resume matches..."
            className="min-h-[120px]"
          />
          <Button 
            onClick={handleAnalyze} 
            disabled={!jobDescription.trim() || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Search className="w-4 h-4" />
                </motion.div>
                Analyzing...
              </span>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Analyze Match
              </>
            )}
          </Button>
        </div>

        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 pt-4 border-t"
          >
            {/* Match Score */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Match Score</span>
                <span className={`text-2xl font-bold ${
                  analysis.score >= 70 ? 'text-green-600' : 
                  analysis.score >= 50 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {analysis.score}%
                </span>
              </div>
              <Progress value={analysis.score} className="h-3" />
            </div>

            {/* Matched Keywords */}
            {analysis.matchedKeywords.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Matched Keywords ({analysis.matchedKeywords.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.matchedKeywords.map((keyword, i) => (
                    <Badge key={i} variant="default" className="bg-success/20 text-success hover:bg-success/30">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Keywords */}
            {analysis.missingKeywords.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  Missing Keywords ({analysis.missingKeywords.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingKeywords.map((keyword, i) => (
                    <Badge key={i} variant="outline" className="border-destructive/50 text-destructive">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {analysis.suggestions.length > 0 && (
              <div className="p-3 rounded-lg bg-muted">
                <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {analysis.suggestions.map((suggestion, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobMatchAnalyzer;
