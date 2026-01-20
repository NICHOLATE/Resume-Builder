import { ResumeData, ATSScore, JobMatch } from '@/types/resume';

const commonKeywords: Record<string, string[]> = {
  software: ['agile', 'scrum', 'git', 'api', 'rest', 'testing', 'debugging', 'deployment', 'ci/cd', 'documentation'],
  marketing: ['seo', 'analytics', 'campaigns', 'roi', 'crm', 'content', 'social media', 'brand', 'strategy', 'metrics'],
  finance: ['financial analysis', 'budgeting', 'forecasting', 'excel', 'reporting', 'compliance', 'audit', 'risk management'],
  healthcare: ['patient care', 'hipaa', 'ehr', 'clinical', 'medical', 'documentation', 'protocols', 'compliance'],
  general: ['leadership', 'communication', 'teamwork', 'problem-solving', 'project management', 'analytical', 'organization'],
};

export function calculateATSScore(data: ResumeData): ATSScore {
  let formattingScore = 100;
  let keywordsScore = 50;
  let readabilityScore = 100;
  const suggestions: string[] = [];

  // Check formatting
  if (!data.personalInfo.email) {
    formattingScore -= 20;
    suggestions.push('Add an email address to your contact information');
  }
  if (!data.personalInfo.phone) {
    formattingScore -= 15;
    suggestions.push('Include a phone number for easy contact');
  }
  if (!data.personalInfo.summary || data.personalInfo.summary.length < 50) {
    formattingScore -= 15;
    suggestions.push('Write a professional summary of at least 50 characters');
  }
  if (data.experiences.length === 0) {
    formattingScore -= 25;
    suggestions.push('Add work experience to strengthen your resume');
  }
  if (data.skills.length < 5) {
    formattingScore -= 10;
    suggestions.push('Add more skills (aim for at least 5 relevant skills)');
  }

  // Check keywords based on industry
  const industry = data.targetIndustry?.toLowerCase() || 'general';
  const relevantKeywords = commonKeywords[industry] || commonKeywords.general;
  const resumeText = JSON.stringify(data).toLowerCase();
  
  let matchedKeywords = 0;
  relevantKeywords.forEach(keyword => {
    if (resumeText.includes(keyword.toLowerCase())) {
      matchedKeywords++;
    }
  });
  
  keywordsScore = Math.min(100, (matchedKeywords / relevantKeywords.length) * 100);
  
  if (keywordsScore < 50) {
    suggestions.push(`Consider adding more industry-specific keywords related to ${industry}`);
  }

  // Check readability
  data.experiences.forEach((exp, index) => {
    if (exp.description.length > 500) {
      readabilityScore -= 10;
      suggestions.push(`Experience ${index + 1}: Consider making the description more concise`);
    }
    if (exp.achievements.length === 0) {
      readabilityScore -= 5;
      suggestions.push(`Experience ${index + 1}: Add quantifiable achievements`);
    }
  });

  if (data.personalInfo.summary && data.personalInfo.summary.length > 300) {
    readabilityScore -= 10;
    suggestions.push('Consider shortening your professional summary');
  }

  const overall = Math.round((formattingScore + keywordsScore + readabilityScore) / 3);

  return {
    overall,
    formatting: Math.max(0, formattingScore),
    keywords: Math.max(0, keywordsScore),
    readability: Math.max(0, readabilityScore),
    suggestions: suggestions.slice(0, 5),
  };
}

export function analyzeJobMatch(data: ResumeData, jobDescription: string): JobMatch {
  const resumeText = JSON.stringify(data).toLowerCase();
  const jobWords = jobDescription.toLowerCase().split(/\s+/);
  
  // Extract keywords from job description (simple approach)
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'we', 'you', 'they', 'i', 'he', 'she', 'it', 'as', 'from', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'up', 'down', 'out', 'off', 'over', 'under', 'again', 'further', 'then', 'once']);
  
  const jobKeywords = [...new Set(jobWords)]
    .filter(word => word.length > 3 && !commonWords.has(word))
    .slice(0, 30);

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  jobKeywords.forEach(keyword => {
    if (resumeText.includes(keyword)) {
      matchedKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });

  const score = jobKeywords.length > 0 
    ? Math.round((matchedKeywords.length / jobKeywords.length) * 100)
    : 0;

  const suggestions: string[] = [];
  if (score < 50) {
    suggestions.push('Consider tailoring your resume more closely to this job description');
  }
  if (missingKeywords.length > 0) {
    suggestions.push(`Try incorporating these keywords: ${missingKeywords.slice(0, 5).join(', ')}`);
  }
  if (matchedKeywords.length > 5) {
    suggestions.push('Good keyword match! Your resume aligns well with this position');
  }

  return {
    score,
    matchedKeywords: matchedKeywords.slice(0, 10),
    missingKeywords: missingKeywords.slice(0, 10),
    suggestions,
  };
}

export function getIndustryKeywords(industry: string): string[] {
  return commonKeywords[industry.toLowerCase()] || commonKeywords.general;
}
