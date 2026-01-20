import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResumeData, TemplateSettings } from '@/types/resume';
import { exportToPDF, exportToDOCX, exportToHTML } from '@/utils/exportUtils';
import { Download, FileText, FileCode, FileType } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

interface ResumePreviewProps {
  data: ResumeData;
  settings: TemplateSettings;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, settings }) => {
  const { toast } = useToast();

  const handleExport = async (format: 'pdf' | 'docx' | 'html') => {
    try {
      const filename = `${data.personalInfo.fullName || 'resume'}_resume`;
      
      switch (format) {
        case 'pdf':
          await exportToPDF('resume-preview', `${filename}.pdf`);
          break;
        case 'docx':
          await exportToDOCX(data, `${filename}.docx`);
          break;
        case 'html':
          exportToHTML('resume-preview', `${filename}.html`);
          break;
      }
      
      toast({
        title: 'Export successful',
        description: `Your resume has been exported as ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: 'Export failed',
        description: 'There was an error exporting your resume. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const TemplateComponent = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    creative: CreativeTemplate,
  }[settings.template];

  return (
    <div className="space-y-6">
      {/* Export Options */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Download className="w-5 h-5 text-accent" />
            Export Resume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => handleExport('pdf')} variant="default">
              <FileText className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={() => handleExport('docx')} variant="outline">
              <FileType className="w-4 h-4 mr-2" />
              Download DOCX
            </Button>
            <Button onClick={() => handleExport('html')} variant="outline">
              <FileCode className="w-4 h-4 mr-2" />
              Download HTML
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="overflow-auto rounded-xl shadow-xl bg-gray-100 p-6"
      >
        <div className="transform scale-[0.6] origin-top-left" style={{ width: '166.67%' }}>
          <TemplateComponent data={data} settings={settings} />
        </div>
      </motion.div>
    </div>
  );
};

export default ResumePreview;
