const db = require('../config/db');

const Carrera = {
  // READ
  getAll: (callback) => {
    const query = 'SELECT * FROM carrera';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  // CREATE
  create: (nuevoCarrera, callback) => {
    const query = 'INSERT INTO carrera (nombre, facultad) VALUES (?, ?)';
    console.log('Query SQL:', query);
    console.log('Valores:', [
      nuevoCarrera.nombre,
      nuevoCarrera.facultad
    ]);
  
    db.query(query, [
      nuevoCarrera.nombre,
      nuevoCarrera.facultad
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
    const query = 'UPDATE carrera SET nombre = ?, facultad = ? WHERE id_carrera = ?';
    db.query(query, [datosActualizados.nombre, datosActualizados.facultad, id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // DELETE
  delete: (id, callback) => {
    const query = 'DELETE FROM carrera WHERE id_carrera = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
};

module.exports = Carrera;
