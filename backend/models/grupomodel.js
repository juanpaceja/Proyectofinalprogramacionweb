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
  }
};

module.exports = Grupo;
