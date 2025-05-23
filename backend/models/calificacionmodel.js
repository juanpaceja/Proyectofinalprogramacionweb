const db = require('../config/db');

const Calificacion = {

  // READ
  getAll: (callback) => {
    const query = 'SELECT * FROM ';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  // CREATE
  create: (nuevoCalificacion, callback) => {
    const query = 'INSERT INTO calificacion (id_alumno_grupo, calificacion) VALUES (?, ?)';
    console.log('Query SQL:', query);
    console.log('Valores:', [
      nuevoCalificacion.id_alumno_grupo,
      nuevoCalificacion.calificacion
    ]);
  
    db.query(query, [
      nuevoCalificacion.id_alumno_grupo,
      nuevoCalificacion.calificacion
    ], (err, results) => {
      if (err) {
        console.error(' ERROR SQL:', err); 
        return callback(err);
      }
      callback(null, results);
    });
  },

  // UPDATE
  update: (id, datosActualizados, callback) => {
    const query = 'UPDATE calificacion SET id_alumno_grupo = ?, calificacion =? WHERE id_calificacion = ?';
    db.query(query, [datosActualizados.id_alumno_grupo, datosActualizados.calificacion, id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // DELETE
  delete: (id, callback) => {
    const query = 'DELETE FROM calificacion WHERE id_calificacion = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  getByAlumno: (idAlumno, callback) => {
    const query = `
SELECT materia.nombre AS materia, calificacion.calificacion
FROM calificacion
JOIN alumno_grupo ON calificacion.id_alumno_grupo = alumno_grupo.id_alumno_grupo
JOIN grupo ON alumno_grupo.id_grupo = grupo.id_grupo
JOIN materia ON grupo.id_materia = materia.id_materia
WHERE alumno_grupo.id_alumno = ?  
    `;
    db.query(query, [idAlumno], callback);
  },

getHistorialByAlumno: (idAlumno, callback) => {
  const query = `
SELECT 
  m.nombre AS materia,
  g.nombre AS grupo,
  p.nombre AS semestre,
  c.calificacion
FROM alumno a
JOIN alumno_grupo ag ON a.id_alumno = ag.id_alumno
JOIN grupo g ON ag.id_grupo = g.id_grupo
JOIN materia m ON g.id_materia = m.id_materia
JOIN periodo_academico p ON g.id_periodo = p.id_periodo
JOIN calificacion c ON c.id_alumno_grupo = ag.id_alumno_grupo
WHERE a.id_alumno = ?
ORDER BY p.id_periodo DESC;


  `;
  db.query(query, [idAlumno], callback);
},

  getCalificacionActual : (idAlumno, callback) => {
    const query = `SELECT 
  a.nombre AS alumno,
  m.nombre AS materia,
  p.nombre AS semestre,
  c.calificacion,
  e.descripcion AS estado
FROM alumno a
JOIN alumno_grupo ag ON a.id_alumno = ag.id_alumno
JOIN grupo g ON ag.id_grupo = g.id_grupo
JOIN materia m ON g.id_materia = m.id_materia
JOIN periodo_academico p ON g.id_periodo = p.id_periodo
JOIN calificacion c ON c.id_alumno_grupo = ag.id_alumno_grupo
JOIN escala_calificacion e ON c.calificacion BETWEEN e.rango_inicio AND e.rango_fin
WHERE a.id_alumno = ?
  AND p.id_periodo = (
    SELECT MAX(p2.id_periodo)
    FROM alumno_grupo ag2
    JOIN grupo g2 ON ag2.id_grupo = g2.id_grupo
    JOIN periodo_academico p2 ON g2.id_periodo = p2.id_periodo
    WHERE ag2.id_alumno = a.id_alumno
  );
`;
    db.query(query, [idAlumno], callback);
  }
};

module.exports = Calificacion;
