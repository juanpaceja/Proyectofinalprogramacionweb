const db = require('../config/db');

const Grupo = {
  // READ mejorado con JOINs
  getAll: (callback) => {
    const query = `
SELECT 
  grupo.id_grupo,
  grupo.nombre AS nombre_grupo,
  grupo.horario,
  materia.nombre AS nombre_materia,
  periodo_academico.nombre AS nombre_periodo,
  profesor.nombre AS nombre_profesor
FROM grupo
JOIN materia ON grupo.id_materia = materia.id_materia
JOIN periodo_academico ON grupo.id_periodo = periodo_academico.id_periodo
JOIN profesor ON grupo.id_profesor = profesor.id_profesor;


    `;
    db.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // CREATE
  create: (nuevoGrupo, callback) => {
    const query = `
      INSERT INTO grupo (nombre, horario, id_materia, id_periodo, id_profesor) 
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [
      nuevoGrupo.nombre,
      nuevoGrupo.horario,
      nuevoGrupo.id_materia, 
      nuevoGrupo.id_periodo,
      nuevoGrupo.id_profesor
    ], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // UPDATE
  update: (id, datosActualizados, callback) => {
    const query = `
      UPDATE grupo 
      SET nombre = ?, horario = ?, id_materia = ?, id_periodo = ?, id_profesor = ? 
      WHERE id_grupo = ?
    `;
    db.query(query, [
      datosActualizados.nombre,
      datosActualizados.horario,
      datosActualizados.id_materia,
      datosActualizados.id_periodo,
      datosActualizados.id_profesor,
      id
    ], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // DELETE
  delete: (id, callback) => {
    const query = 'DELETE FROM grupo WHERE id_grupo = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  queryCustom: (sql, params, callback) => {
  db.query(sql, params, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
},

getAlumnosByGrupo: (idGrupo, callback) => {
  const query = `
    SELECT 
      a.id_alumno,
      a.nombre AS alumno,
      a.matricula,
      c.nombre AS carrera
    FROM alumno_grupo ag
    JOIN alumno a ON ag.id_alumno = a.id_alumno
    JOIN carrera c ON a.id_carrera = c.id_carrera
    WHERE ag.id_grupo = ?;
  `;
  db.query(query, [idGrupo], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
},

getAlumnosConCalificaciones: (idGrupo, callback) => {
    const query = `
      SELECT 
        a.id_alumno,
        a.nombre AS alumno,
        a.matricula,
        c.nombre AS carrera,
        cal.calificacion,
        ag.id_alumno_grupo
      FROM alumno_grupo ag
      JOIN alumno a ON ag.id_alumno = a.id_alumno
      JOIN carrera c ON a.id_carrera = c.id_carrera
      LEFT JOIN calificacion cal ON cal.id_alumno_grupo = ag.id_alumno_grupo
      WHERE ag.id_grupo = ?;
    `;
    db.query(query, [idGrupo], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // Método para actualizar o insertar calificación
  upsertCalificacion: (idAlumnoGrupo, calificacion, callback) => {
    const query = `
      INSERT INTO calificacion (id_alumno_grupo, calificacion)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE calificacion = VALUES(calificacion);
    `;
    db.query(query, [idAlumnoGrupo, calificacion], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
getByCarrera: (idCarrera, callback) => {
  const query = `
    SELECT 
      grupo.id_grupo,
      grupo.nombre AS nombre_grupo,
      grupo.horario,
      materia.nombre AS nombre_materia,
      periodo_academico.nombre AS nombre_periodo,
      profesor.nombre AS nombre_profesor
    FROM grupo
    JOIN materia ON grupo.id_materia = materia.id_materia
    JOIN periodo_academico ON grupo.id_periodo = periodo_academico.id_periodo
    JOIN profesor ON grupo.id_profesor = profesor.id_profesor
    WHERE materia.id_carrera = ?
  `;
  db.query(query, [idCarrera], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
}
};

module.exports = Grupo;
