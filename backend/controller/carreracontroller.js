const Carrera = require('../models/carreramodel.js');
const db = require('../config/db'); // ✅ Solo una vez

const getCarreras = (req, res) => {
  const sql = 'SELECT * FROM carrera';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener carreras:', err);
      return res.status(500).json({ error: 'Error al obtener carreras' });
    }
    res.status(200).json(results);
  });
};

// CREATE
const createCarrera = (req, res) => {
  const nuevo = req.body;
  console.log('Datos recibidos para crear carrera:', nuevo);

  Carrera.create(nuevo, (err, result) => {
    if (err) {
      console.error('ERROR AL CREAR CARRERA (desde modelo):', err); 
      return res.status(500).json({ error: 'Error al crear carrera' });
    }
    res.status(201).json({ message: 'Carrera creada exitosamente', id: result.insertId });
  });
};

// UPDATE
const updateCarrera = (req, res) => {
  const id = req.params.id;
  const actualizado = req.body;
  Carrera.update(id, actualizado, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar carrera' });
    res.status(200).json({ message: 'Carrera actualizada' });
  });
};

// DELETE
const deleteCarrera = (req, res) => {
  const id = req.params.id;
  Carrera.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar carrera' });
    res.status(200).json({ message: 'Carrera eliminada' });
  });
};

const getCarrerasPorProfesor = (req, res) => {
  const idProfesor = req.params.id;

  const query = `
    SELECT DISTINCT c.id_carrera, c.nombre AS carrera
    FROM profesor p
    JOIN grupo g ON p.id_profesor = g.id_profesor
    JOIN materia m ON g.id_materia = m.id_materia
    JOIN carrera c ON m.id_carrera = c.id_carrera
    WHERE p.id_profesor = ?
  `;

  db.query(query, [idProfesor], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener carreras' });
    res.status(200).json(results);
  });
};

module.exports = {
  getCarreras,
  createCarrera,
  updateCarrera,
  deleteCarrera,
  getCarrerasPorProfesor,
};
