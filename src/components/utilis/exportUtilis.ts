import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from '@/types/resume';

export async function exportToPDF(elementId: string, filename: string = 'resume.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Resume element not found');
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  const imgX = (pdfWidth - imgWidth * ratio) / 2;
  const imgY = 0;

  pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
  pdf.save(filename);
}

export async function exportToDOCX(data: ResumeData, filename: string = 'resume.docx') {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Name
        new Paragraph({
          children: [
            new TextRun({
              text: data.personalInfo.fullName,
              bold: true,
              size: 48,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),

        // Contact Info
        new Paragraph({
          children: [
            new TextRun({
              text: [
                data.personalInfo.email,
                data.personalInfo.phone,
                data.personalInfo.location,
              ].filter(Boolean).join(' | '),
              size: 22,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),

        // Links
        ...(data.personalInfo.linkedin || data.personalInfo.website ? [
          new Paragraph({
            children: [
              new TextRun({
                text: [data.personalInfo.linkedin, data.personalInfo.website].filter(Boolean).join(' | '),
                size: 20,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
        ] : []),

        // Summary
        ...(data.personalInfo.summary ? [
          new Paragraph({
            text: 'PROFESSIONAL SUMMARY',
            heading: HeadingLevel.HEADING_2,
            border: { bottom: { color: '000000', size: 1, style: BorderStyle.SINGLE } },
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [new TextRun({ text: data.personalInfo.summary, size: 22 })],
            spacing: { after: 400 },
          }),
        ] : []),

        // Experience
        ...(data.experiences.length > 0 ? [
          new Paragraph({
            text: 'WORK EXPERIENCE',
            heading: HeadingLevel.HEADING_2,
            border: { bottom: { color: '000000', size: 1, style: BorderStyle.SINGLE } },
            spacing: { after: 200 },
          }),
          ...data.experiences.flatMap(exp => [
            new Paragraph({
              children: [
                new TextRun({ text: exp.position, bold: true, size: 24 }),
                new TextRun({ text: ` | ${exp.company}`, size: 24 }),
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
                  italics: true,
                  size: 20,
                }),
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [new TextRun({ text: exp.description, size: 22 })],
              spacing: { after: 100 },
            }),
            ...exp.achievements.map(achievement =>
              new Paragraph({
                children: [new TextRun({ text: `• ${achievement}`, size: 22 })],
                spacing: { after: 50 },
              })
            ),
            new Paragraph({ spacing: { after: 200 } }),
          ]),
        ] : []),

        // Education
        ...(data.education.length > 0 ? [
          new Paragraph({
            text: 'EDUCATION',
            heading: HeadingLevel.HEADING_2,
            border: { bottom: { color: '000000', size: 1, style: BorderStyle.SINGLE } },
            spacing: { after: 200 },
          }),
          ...data.education.flatMap(edu => [
            new Paragraph({
              children: [
                new TextRun({ text: edu.degree, bold: true, size: 24 }),
                new TextRun({ text: ` in ${edu.field}`, size: 24 }),
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: edu.institution, size: 22 }),
                new TextRun({ text: ` | ${edu.startDate} - ${edu.endDate}`, italics: true, size: 20 }),
              ],
              spacing: { after: 200 },
            }),
          ]),
        ] : []),

        // Skills
        ...(data.skills.length > 0 ? [
          new Paragraph({
            text: 'SKILLS',
            heading: HeadingLevel.HEADING_2,
            border: { bottom: { color: '000000', size: 1, style: BorderStyle.SINGLE } },
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: data.skills.map(s => s.name).join(' • '),
                size: 22,
              }),
            ],
            spacing: { after: 400 },
          }),
        ] : []),

        // Certifications
        ...(data.certifications.length > 0 ? [
          new Paragraph({
            text: 'CERTIFICATIONS',
            heading: HeadingLevel.HEADING_2,
            border: { bottom: { color: '000000', size: 1, style: BorderStyle.SINGLE } },
            spacing: { after: 200 },
          }),
          ...data.certifications.map(cert =>
            new Paragraph({
              children: [
                new TextRun({ text: cert.name, bold: true, size: 22 }),
                new TextRun({ text: ` - ${cert.issuer} (${cert.date})`, size: 22 }),
              ],
              spacing: { after: 100 },
            })
          ),
        ] : []),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}

export function exportToHTML(elementId: string, filename: string = 'resume.html') {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Resume element not found');
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; }
  </style>
</head>
<body>
  ${element.outerHTML}
</body>
</html>
  `.trim();

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  saveAs(blob, filename);
}
