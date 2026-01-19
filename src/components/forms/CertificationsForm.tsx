import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Certification } from '@/types/resume';
import { Award, Plus, Trash2, ChevronDown } from 'lucide-react';

interface CertificationsFormProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

const CertificationsForm: React.FC<CertificationsFormProps> = ({ data, onChange }) => {
  const [openItems, setOpenItems] = useState<string[]>(data.map(c => c.id));

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiry: '',
      credentialId: '',
    };
    onChange([...data, newCert]);
    setOpenItems([...openItems, newCert.id]);
  };

  const removeCertification = (id: string) => {
    onChange(data.filter(c => c.id !== id));
    setOpenItems(openItems.filter(i => i !== id));
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onChange(data.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card elevated>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-accent" />
            </div>
            Certifications
          </CardTitle>
          <CardDescription>
            Add professional certifications to validate your expertise.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AnimatePresence mode="popLayout">
            {data.map((cert, index) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Collapsible
                  open={openItems.includes(cert.id)}
                  onOpenChange={() => toggleItem(cert.id)}
                >
                  <div className="border rounded-lg">
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-muted-foreground">
                            {index + 1}.
                          </span>
                          <span className="font-medium">
                            {cert.name || 'New Certification'}
                          </span>
                          {cert.issuer && (
                            <span className="text-sm text-muted-foreground">
                              • {cert.issuer}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCertification(cert.id);
                            }}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <ChevronDown className={`w-4 h-4 transition-transform ${openItems.includes(cert.id) ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="p-4 pt-0 space-y-4 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Certification Name *</Label>
                            <Input
                              value={cert.name}
                              onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                              placeholder="e.g., AWS Solutions Architect"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Issuing Organization *</Label>
                            <Input
                              value={cert.issuer}
                              onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                              placeholder="e.g., Amazon Web Services"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Issue Date</Label>
                            <Input
                              type="month"
                              value={cert.date}
                              onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Expiry Date (optional)</Label>
                            <Input
                              type="month"
                              value={cert.expiry || ''}
                              onChange={(e) => updateCertification(cert.id, 'expiry', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Credential ID (optional)</Label>
                            <Input
                              value={cert.credentialId || ''}
                              onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                              placeholder="e.g., ABC123XYZ"
                            />
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              </motion.div>
            ))}
          </AnimatePresence>

          <Button onClick={addCertification} variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Certification
          </Button>

          {data.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No certifications added yet. Add certifications to enhance your resume.
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CertificationsForm;
