const db = require('../config/db');

const Estudiante = {
  // READ
  getAll: (callback) => {
    const query = 'SELECT * FROM Alumno';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  // CREATE
  create: (nuevoEstudiante, callback) => {
    const query = 'INSERT INTO Alumno (nombre, matricula, id_carrera) VALUES (?, ?, ?)';
    console.log('Query SQL:', query);
    console.log('Valores:', [
      nuevoEstudiante.nombre,
      nuevoEstudiante.matricula,
      nuevoEstudiante.id_carrera
    ]);
  
    db.query(query, [
      nuevoEstudiante.nombre,
      nuevoEstudiante.matricula,
      nuevoEstudiante.id_carrera
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
    const query = 'UPDATE Alumno SET nombre = ?, matricula = ?, id_carrera = ? WHERE id_alumno = ?';
    db.query(query, [datosActualizados.nombre, datosActualizados.matricula, datosActualizados.id_carrera, id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // DELETE
  delete: (id, callback) => {
    const query = 'DELETE FROM Alumno WHERE id_alumno = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // Asignar grupo a alumno
  asignarGrupo: (idAlumno, idGrupo, callback) => {
    const query = 'INSERT INTO alumno_grupo (id_alumno, id_grupo) VALUES (?, ?)';
    db.query(query, [idAlumno, idGrupo], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // Obtener grupos del alumno
  getGrupos: (idAlumno, callback) => {
    const query = `
      SELECT g.* 
      FROM alumno_grupo ag
      JOIN grupo g ON ag.id_grupo = g.id_grupo
      WHERE ag.id_alumno = ?
    `;
    db.query(query, [idAlumno], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  aprobados: (callback) => {
  const query = `
    SELECT
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
      SELECT
    ->   a.nombre AS alumno,
    ->   p.nombre AS semestre,
    ->   ca.nombre AS carrera,
    ->   m.nombre AS materia,
    ->   c.calificacion
    -> FROM alumno a
    -> JOIN carrera ca ON a.id_carrera = ca.id_carrera
    -> JOIN alumno_grupo ag ON a.id_alumno = ag.id_alumno
    -> JOIN grupo g ON ag.id_grupo = g.id_grupo
    -> JOIN materia m ON g.id_materia = m.id_materia
    -> JOIN periodo_academico p ON g.id_periodo = p.id_periodo
    -> JOIN calificacion c ON c.id_alumno_grupo = ag.id_alumno_grupo
    -> JOIN escala_calificacion e ON c.calificacion BETWEEN e.rango_inicio AND e.rango_fin
    -> WHERE g.id_periodo IN (1, 4) AND e.descripcion = 'Reprobado';
    `;
    db.query(query, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
}
};

module.exports = Estudiante;
