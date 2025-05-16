const Maestro = require('../models/maestrosmodel.js');

const getTeachers = (req, res) => {
  Maestro.getAll((err, maestros) => {
    if (err) {
      console.error('Error al obtener maestros:', err);
      return res.status(500).json({ error: 'Error al obtener maestros' });
    }
    res.status(200).json(maestros);
    console.log('Maestros obtenidos:', maestros);
  });
};

// CREATE
const createTeachers = (req, res) => {
  const nuevo = req.body;
  console.log('Datos recibidos para crear maestro:', nuevo);

  Maestro.create(nuevo, (err, result) => {
    if (err) {
      console.error('ERROR AL CREAR MAESTRO (desde modelo):', err);
      return res.status(500).json({ error: 'Error al crear maestro' });
    }
    res.status(201).json({ message: 'Maestro creado exitosamente', id: result.insertId });
  });
};



// UPDATE
const updateTeachers = (req, res) => {
  const id = req.params.id;
  const actualizado = req.body;
  Maestro.update(id, actualizado, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar maestro' });
    res.status(200).json({ message: 'Maestro actualizado' });
  });
};

// DELETE
const deleteTeachers = (req, res) => {
  const id = req.params.id;
  Maestro.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar maestro' });
    res.status(200).json({ message: 'Maestro eliminado' });
  });
};

module.exports = {
  getTeachers,
  createTeachers,
  updateTeachers,
  deleteTeachers
};
