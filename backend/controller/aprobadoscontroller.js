const Aprobado = require('../models/aprobadosmodels.js');

const getAprobados = (req, res) => {
  Aprobado.aprobados((err, results) => {
    if (err) {
      console.error('Error al obtener los aprobados:', err);
      return res.status(500).json({ error: 'Error al obtener los aprobados' });
    }
    res.status(200).json(results);
  });
};

const getReprobados = (req, res) => {
  Aprobado.reprobados((err, results) => {
    if (err) {
      console.error('Error al obtener los reprobados:', err);
      return res.status(500).json({ error: 'Error al obtener los reprobados' });
    }
    res.status(200).json(results);
  });
};

const PDFDocument = require('pdfkit');
const db = require('../config/db');


const generarPDFAlumnosAprobados = (req, res) => {
  const doc = new PDFDocument({ margin: 30, size: 'A4' });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename=aprobados.pdf');

  doc.pipe(res);

  doc.fontSize(20).text('Reporte de Alumnos Aprobados', { align: 'center' });
  doc.moveDown(2);

  const query = `
    SELECT DISTINCT
      a.nombre AS alumno,
      p.nombre AS semestre,
      ca.nombre AS carrera,
      m.nombre AS materia,
      c.calificacion
    FROM alumno a
    JOIN carrera ca ON a.id_carrera = ca.id_carrera
    JOIN alumno_grupo ag ON a.id_alumno = ag.id_alumno
    JOIN grupo g ON ag.id_grupo = g.id_grupo
    JOIN materia m ON g.id_materia = m.id_materia
    JOIN periodo_academico p ON g.id_periodo = p.id_periodo
    JOIN calificacion c ON c.id_alumno_grupo = ag.id_alumno_grupo
    JOIN escala_calificacion e ON c.calificacion BETWEEN e.rango_inicio AND e.rango_fin
    WHERE g.id_periodo IN (1, 4) AND e.descripcion = 'Aprobado';
  `;

  db.query(query, async (err, results) => {
    console.log('Resultados obtenidos para PDF:', results);

    if (err) {
      doc.fontSize(12).fillColor('red').text('Error al generar el reporte');
      doc.end();
      return;
    }

    if (!results.length) {
      doc.fontSize(12).text('No hay alumnos aprobados.');
      doc.end();
      return;
    }

    doc.fontSize(14).font('Helvetica-Bold').text('Listado de Aprobados', { underline: true });
doc.moveDown(1.5);

results.forEach((row, index) => {
  doc
    .fontSize(12)
    .font('Helvetica-Bold')
    .fillColor('#2e7d32')
    .text(`${index + 1}. ${row.alumno}`, { continued: false });

  doc
    .fontSize(11)
    .font('Helvetica')
    .fillColor('black')
    .text(`• Carrera: ${row.carrera}`)
    .text(`• Materia: ${row.materia}`)
    .text(`• Semestre: ${row.semestre}`)
    .text(`• Calificación: ${row.calificacion}`)
    .moveDown(1);
});



    doc.end();
  });
};

const generarPDFAlumnosReprobados = (req, res) => {
  const doc = new PDFDocument({ margin: 30, size: 'A4' });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename=reprobados.pdf');

  doc.pipe(res);

  doc.fontSize(20).text('Reporte de Alumnos Reprobados', { align: 'center' });
  doc.moveDown(2);

  const query = `
    SELECT DISTINCT
  a.nombre AS alumno,
  p.nombre AS semestre,
  ca.nombre AS carrera,
  m.nombre AS materia,
  c.calificacion
FROM alumno a
JOIN carrera ca ON a.id_carrera = ca.id_carrera
JOIN alumno_grupo ag ON a.id_alumno = ag.id_alumno
JOIN grupo g ON ag.id_grupo = g.id_grupo
JOIN materia m ON g.id_materia = m.id_materia
JOIN periodo_academico p ON g.id_periodo = p.id_periodo
JOIN calificacion c ON c.id_alumno_grupo = ag.id_alumno_grupo
JOIN escala_calificacion e ON c.calificacion BETWEEN e.rango_inicio AND e.rango_fin
WHERE g.id_periodo IN (1, 4)
  AND e.descripcion = 'Reprobado';
  `;

  db.query(query, async (err, results) => {
    console.log('Resultados obtenidos para PDF:', results);

    if (err) {
      doc.fontSize(12).fillColor('red').text('Error al generar el reporte');
      doc.end();
      return;
    }

    if (!results.length) {
      doc.fontSize(12).text('No hay alumnos reprobados.');
      doc.end();
      return;
    }

    doc.fontSize(14).font('Helvetica-Bold').text('Listado de Reprobados', { underline: true });
doc.moveDown(1.5);

results.forEach((row, index) => {
  doc
    .fontSize(12)
    .font('Helvetica-Bold')
    .fillColor('#2e7d32')
    .text(`${index + 1}. ${row.alumno}`, { continued: false });

  doc
    .fontSize(11)
    .font('Helvetica')
    .fillColor('black')
    .text(`• Carrera: ${row.carrera}`)
    .text(`• Materia: ${row.materia}`)
    .text(`• Semestre: ${row.semestre}`)
    .text(`• Calificación: ${row.calificacion}`)
    .moveDown(1);
});



    doc.end();
  });
};



module.exports = {
  getAprobados,
  getReprobados,
  generarPDFAlumnosAprobados,
  generarPDFAlumnosReprobados
};