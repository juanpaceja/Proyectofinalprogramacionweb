const Estudiante = require('../models/estudiantemodel.js');

const getStudents = (req, res) => {
  Estudiante.getAll((err, estudiantes) => {
    if (err) {
      console.error('Error al obtener estudiantes:', err);
      return res.status(500).json({ error: 'Error al obtener estudiantes' });
    }
    res.status(200).json(estudiantes);
    console.log('Estudiantes obtenidos:', estudiantes);
  });
};

// CREATE
const createStudent = (req, res) => {
  const nuevo = req.body;
  Estudiante.create(nuevo, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear estudiante' });
    res.status(201).json({ message: 'Estudiante creado exitosamente', id: result.insertId });
  });
};

// UPDATE
const updateStudent = (req, res) => {
  const id = req.params.id;
  const actualizado = req.body;
  Estudiante.update(id, actualizado, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar estudiante' });
    res.status(200).json({ message: 'Estudiante actualizado' });
  });
};

// DELETE
const deleteStudent = (req, res) => {
  const id = req.params.id;
  Estudiante.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar estudiante' });
    res.status(200).json({ message: 'Estudiante eliminado' });
  });
};

module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
};

