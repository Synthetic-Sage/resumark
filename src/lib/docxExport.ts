import { Document, Packer, Paragraph, TextRun, HeadingLevel, BorderStyle } from 'docx';
import { ResumeData } from '../store/useResumeStore';

export const generateDocx = async (data: ResumeData) => {
  const sections = [];

  // Basics: Header
  sections.push(
    new Paragraph({
      text: data.basics.name || 'Your Name',
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 100 },
    }),
    new Paragraph({
      text: data.basics.label || 'Professional Title',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: data.basics.email ? `${data.basics.email} | ` : '' }),
        new TextRun({ text: data.basics.phone ? `${data.basics.phone} | ` : '' }),
        new TextRun({ text: data.basics.location || '' }),
      ],
      spacing: { after: 300 },
    })
  );

  // Summary
  if (data.basics.summary) {
    sections.push(
      new Paragraph({
        text: 'Professional Summary',
        heading: HeadingLevel.HEADING_3,
        border: { bottom: { color: '000000', space: 1, style: BorderStyle.SINGLE, size: 6 } },
        spacing: { before: 200, after: 100 },
      }),
      new Paragraph({
        text: data.basics.summary,
        spacing: { after: 300 },
      })
    );
  }

  // Work Experience
  if (data.work.length > 0) {
    sections.push(
      new Paragraph({
        text: 'Experience',
        heading: HeadingLevel.HEADING_3,
        border: { bottom: { color: '000000', space: 1, style: BorderStyle.SINGLE, size: 6 } },
        spacing: { before: 200, after: 100 },
      })
    );

    data.work.forEach((job) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: job.position, bold: true }),
            new TextRun({ text: ` — ${job.company}`, italics: true }),
          ],
          spacing: { before: 100 },
        }),
        new Paragraph({
          text: `${job.startDate} to ${job.endDate || 'Present'}`,
          spacing: { after: 100 },
        })
      );

      job.highlights.forEach((highlight) => {
        if (highlight.trim()) {
          sections.push(
            new Paragraph({
              text: highlight,
              bullet: { level: 0 },
            })
          );
        }
      });
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: sections,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.basics.name.replace(/\s+/g, '_') || 'Resume'}.docx`;
  a.click();
  window.URL.revokeObjectURL(url);
};
