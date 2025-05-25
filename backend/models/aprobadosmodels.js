
const db = require('../config/db');
const Aprobado = {

  aprobados: (callback) => {
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
  db.query(query, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
},


  reprobados: (callback) => {
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
    db.query(query, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
}
};

module.exports = Aprobado;