const db = require('../config/db');

const Maestro = {
  // READ
  getAll: (callback) => {
    const query = 'SELECT * FROM profesor';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  // CREATE
  create: (nuevoMaestro, callback) => {
    const query = 'INSERT INTO profesor (nombre) VALUES (?)';
    console.log('Query SQL:', query);
    console.log('Valores:', [
      nuevoMaestro.nombre
    ]);
  
    db.query(query, [
      nuevoMaestro.nombre
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
    const query = 'UPDATE profesor SET nombre = ? WHERE id_profesor = ?';
    db.query(query, [datosActualizados.nombre, id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // DELETE
  delete: (id, callback) => {
    const query = 'DELETE FROM profesor WHERE id_profesor = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  getMaestroById: (id, callback) => {
    const query = 'SELECT * FROM profesor WHERE id_profesor = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
};


module.exports = Maestro;
