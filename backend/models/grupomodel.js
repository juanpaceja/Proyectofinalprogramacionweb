const db = require('../config/db');

const Grupo= {
  // READ
  getAll: (callback) => {
    const query = 'SELECT * FROM grupo';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  // CREATE
  create: (nuevoGrupo, callback) => {
    const query = 'INSERT INTO grupo (nombre, horario, id_materia, id_periodo, id_profesor) VALUES (?, ?, ?, ?, ?)';
    console.log('Query SQL:', query);
    console.log('Valores:', [
      nuevoGrupo.nombre,
      nuevoGrupo.horario,
      nuevoGrupo.id_materia, 
      nuevoGrupo.id_periodo,
      nuevoGrupo.id_profesor
    ]);
  
    db.query(query, [
      nuevoGrupo.nombre,
      nuevoGrupo.horario,
      nuevoGrupo.id_materia, 
      nuevoGrupo.id_periodo,
      nuevoGrupo.id_profesor
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
    const query = 'UPDATE grupo SET nombre = ?, horario = ?, id_materia = ?, id_periodo = ?, id_profesor = ? WHERE id_grupo = ?';
    db.query(query, [datosActualizados.nombre, datosActualizados.horario, datosActualizados.id_materia, datosActualizados.id_periodo, datosActualizados.id_profesor, id], (err, results) => {
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
