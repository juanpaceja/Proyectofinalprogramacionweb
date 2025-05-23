const Materia = require('../models/materiamodel.js');
const db = require('../config/db');

const getMateria = (req, res) => {
  Materia.getAll((err, materia) => {
    if (err) {
      console.error('Error al obtener materias:', err);
      return res.status(500).json({ error: 'Error al obtener materias' });
    }
    res.status(200).json(materia);
    console.log('Materias obtenidas:', materia);
  });
};

// CREATE
const createMateria = (req, res) => {
  const nuevo = req.body;
  console.log('Datos recibidos para crear materia:', nuevo);

  Materia.create(nuevo, (err, result) => {
    if (err) {
      console.error('ERROR AL CREAR MATERIA (desde modelo):', err); 
      return res.status(500).json({ error: 'Error al crear materia' });
    }
    res.status(201).json({ message: 'Materia creada exitosamente', id: result.insertId });
  });
};



// UPDATE
const updateMateria = (req, res) => {
  const id = req.params.id;
  const actualizado = req.body;
  Materia.update(id, actualizado, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar materia' });
    res.status(200).json({ message: 'Materia actualizada' });
  });
};

// DELETE
const deleteMateria = (req, res) => {
  const id = req.params.id;
  Materia.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar materia' });
    res.status(200).json({ message: 'Materia eliminada' });
  });
};

const getByCarrera = (req, res) => {
  const carreraId = req.params.id;
  const query = 'SELECT * FROM materia WHERE id_carrera = ?';

  Materia.getByCarrera(carreraId, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener materias' });
    res.status(200).json(results);
  });
};

const getByMaestro = (req, res) => {
  const idMaestro = req.params.id;

  const sql = `
    SELECT DISTINCT 
      m.id_materia,
      m.nombre AS nombre,
      m.codigo,
      m.creditos
    FROM grupo g
    JOIN materia m ON g.id_materia = m.id_materia
    WHERE g.id_profesor = ?;
  `;

  db.query(sql, [idMaestro], (err, results) => {
    if (err) {
      console.error('Error al obtener materias por profesor:', err);
      return res.status(500).json({ error: 'Error al obtener materias por profesor' });
    }
    res.status(200).json(results);
  });
};

const getMateriasConCarrera = (req, res) => {
  const sql = `
    SELECT 
      m.nombre AS nombre,
      m.codigo,
      m.creditos,
      c.nombre AS carrera
    FROM materia m
    JOIN carrera c ON m.id_carrera = c.id_carrera
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener materias con carrera:', err);
      return res.status(500).json({ error: 'Error al obtener materias con carrera' });
    }
    res.status(200).json(results);
  });
};



module.exports = {
  getMateria,
  createMateria,
  updateMateria,
  deleteMateria,
  getByCarrera,
  getByMaestro,
  getMateriasConCarrera
};
