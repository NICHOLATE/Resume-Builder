import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ATSScore } from '@/types/resume';
import { AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ATSScoreCardProps {
  score: ATSScore;
}

const ATSScoreCard: React.FC<ATSScoreCardProps> = ({ score }) => {
  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (value: number) => {
    if (value >= 80) return 'Excellent';
    if (value >= 60) return 'Good';
    if (value >= 40) return 'Needs Work';
    return 'Poor';
  };

  return (
    <Card elevated>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            ATS Score
          </span>
          <span className={cn("text-3xl font-bold", getScoreColor(score.overall))}>
            {score.overall}%
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Overall Score</span>
            <Badge variant={score.overall >= 70 ? "default" : "secondary"}>
              {getScoreLabel(score.overall)}
            </Badge>
          </div>
          <Progress value={score.overall} className="h-3" />
        </div>

        {/* Individual Scores */}
        <div className="space-y-4">
          {[
            { label: 'Formatting', value: score.formatting },
            { label: 'Keywords', value: score.keywords },
            { label: 'Readability', value: score.readability },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1">
                <span>{item.label}</span>
                <span className={getScoreColor(item.value)}>{item.value}%</span>
              </div>
              <Progress value={item.value} className="h-2" />
            </div>
          ))}
        </div>

        {/* Suggestions */}
        {score.suggestions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-warning" />
              Suggestions to Improve
            </h4>
            <ul className="space-y-2">
              {score.suggestions.map((suggestion, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-accent mt-0.5">•</span>
                  {suggestion}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {score.overall >= 80 && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-success/10 text-success">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Your resume is well-optimized for ATS!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ATSScoreCard;
