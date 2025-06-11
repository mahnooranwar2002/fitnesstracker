const express = require('express');
const router = express.Router();
const Progress = require('../model/ProgressTracker');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');

// CSV Export Route
router.get('/export/csv/:userId', async (req, res) => {
  try {
    const progresses = await Progress.find({ userId: req.params.userId });

    const fields = ['weight', 'chest', 'waist', 'hips', 'arms', 'legs', 'runTime', 'squatMax', 'benchPressMax', 'deadliftMax', 'notes', 'dateDay'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(progresses);

    res.header('Content-Type', 'text/csv');
    res.attachment('progress.csv');
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// PDF Export Route
router.get('/export/pdf/:userId', async (req, res) => {
  try {
    const progresses = await Progress.find({ userId: req.params.userId });

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=progress.pdf');
    
    doc.pipe(res);

    doc.fontSize(18).text('Fitness Progress Report', { align: 'center' });
    doc.moveDown();

    progresses.forEach(progress => {
      doc.fontSize(12).text(`Date: ${progress.dateDay}`);
      doc.text(`Weight: ${progress.weight} kg`);
      doc.text(`Chest: ${progress.chest} cm`);
      doc.text(`Waist: ${progress.waist} cm`);
      doc.text(`Hips: ${progress.hips} cm`);
      doc.text(`Arms: ${progress.arms} cm`);
      doc.text(`Legs: ${progress.legs} cm`);
      doc.text(`Run Time: ${progress.runTime} min`);
      doc.text(`Squat Max: ${progress.squatMax} kg`);
      doc.text(`Bench Press Max: ${progress.benchPressMax} kg`);
      doc.text(`Deadlift Max: ${progress.deadliftMax} kg`);
      doc.text(`Notes: ${progress.notes}`);
      doc.moveDown();
    });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
