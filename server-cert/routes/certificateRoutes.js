import express from 'express';
import PDFDocument from 'pdfkit';
import stream from 'stream';

const router = express.Router();

router.post('/generate', async (req, res) => {
  const {
    donorName,
    bookTitle,
    quantity,
    date,
    schoolName,
    schoolAddress
  } = req.body;

  if (!donorName || !bookTitle || !quantity || !date || !schoolName || !schoolAddress) {
    return res.status(400).json({ error: 'Missing certificate details' });
  }

  try {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    // Create an in-memory stream
    const bufferStream = new stream.PassThrough();
    const chunks = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => {
      const finalBuffer = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=certificate-${donorName.replace(/\s+/g, '_')}.pdf`
      );
      res.send(finalBuffer);
    });

    // ---------------------------
    // 🖨️ Generate Certificate Content
    // ---------------------------

    doc
      .fontSize(24)
      .fillColor('#003366')
      .text('Certificate of Appreciation', { align: 'center' })
      .moveDown(1.5);

    doc
      .fontSize(16)
      .fillColor('black')
      .text(`This certificate is proudly presented to`, { align: 'center' });

    doc
      .fontSize(20)
      .fillColor('#000000')
      .text(`${donorName}`, { align: 'center' })
      .moveDown(1);

    doc
      .fontSize(14)
      .text(`For donating "${bookTitle}" (${quantity} copies)`, { align: 'center' })
      .moveDown(1);

    doc
      .fontSize(14)
      .text(`Recipient School:`, { align: 'center' });

    doc
      .fontSize(14)
      .text(`${schoolName}`, { align: 'center' });

    doc
      .fontSize(12)
      .text(`${schoolAddress}`, { align: 'center' })
      .moveDown(2);

    doc
      .fontSize(12)
      .text(`Date of Donation: ${date}`, { align: 'center' });

    doc
      .moveDown(3)
      .fontSize(14)
      .text('With heartfelt gratitude,', { align: 'left' });

    doc
      .fontSize(16)
      .fillColor('#003366')
      .text('Team BookBridge', { align: 'left' });

    // ---------------------------
    doc.end();

  } catch (error) {
    console.error('❌ PDFKit Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate PDF.' });
  }
});

export default router;
