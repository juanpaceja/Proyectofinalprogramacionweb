const db = require('../config/db');

const Calificacion = {

  // READ
  getAll: (callback) => {
    const query = 'SELECT * FROM calificacion';
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
  }

};

module.exports = Calificacion;
