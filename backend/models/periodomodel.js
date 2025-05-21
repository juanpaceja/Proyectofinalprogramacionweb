const db = require('../config/db');

const Periodo = {
  // READ
  getAll: (callback) => {
    const query = 'SELECT * FROM periodo_academico';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  // CREATE
// CREATE
create: (nuevoPeriodo, callback) => {
  const query = 'INSERT INTO periodo_academico (nombre, fecha_inicio, fecha_fin) VALUES (?, ?, ?)';
  console.log('Query SQL:', query);
  console.log('Valores:', [
    nuevoPeriodo.nombre,
    nuevoPeriodo.fecha_inicio,
    nuevoPeriodo.fecha_fin
  ]);

  db.query(query, [
    nuevoPeriodo.nombre,
    nuevoPeriodo.fecha_inicio,
    nuevoPeriodo.fecha_fin
  ], (err, results) => {
    if (err) {
      console.error(' ERROR SQL:', err); 
      return callback(err);
    }
    callback(null, results);
  });
}
,
  

  // UPDATE
  update: (id, datosActualizados, callback) => {
    const query = 'UPDATE periodo_academico SET nombre = ?, fecha_inicio = ?, fecha_fin = ? WHERE id_periodo = ?';
    db.query(query, [datosActualizados.nombre, datosActualizados.fecha_inicio, datosActualizados.fecha_fin, id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // DELETE
  delete: (id, callback) => {
    const query = 'DELETE FROM periodo_academico WHERE id_periodo = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
};

module.exports = Periodo;
