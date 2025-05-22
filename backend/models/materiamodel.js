const db = require('../config/db');

const Materia = {
  // READ
  getAll: (callback) => {
    const query = 'SELECT * FROM materia';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  // CREATE
  create: (nuevoMateria, callback) => {
    const query = 'INSERT INTO materia (nombre, codigo, creditos, id_carrera) VALUES (?, ?, ?, ?)';
    console.log('Query SQL:', query);
    console.log('Valores:', [
      nuevoMateria.nombre,
      nuevoMateria.codigo,
      nuevoMateria.creditos,
      nuevoMateria.id_carrera
    ]);
  
    db.query(query, [
      nuevoMateria.nombre,
      nuevoMateria.codigo,
      nuevoMateria.creditos,
      nuevoMateria.id_carrera
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
    const query = 'UPDATE materia SET nombre = ?, codigo = ?, creditos = ?, id_carrera = ? WHERE id_materia = ?';
    db.query(query, [datosActualizados.nombre, datosActualizados.codigo, datosActualizados.creditos, datosActualizados.id_carrera, id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // DELETE
  delete: (id, callback) => {
    const query = 'DELETE FROM materia WHERE id_materia = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  getByCarrera: (id_carrera, callback) => {
  const query = 'SELECT * FROM materia WHERE id_carrera = ?';
  db.query(query, [id_carrera], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
}

};



module.exports = Materia;
