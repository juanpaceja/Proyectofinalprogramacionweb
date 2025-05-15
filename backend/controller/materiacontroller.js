const Materia = require('../models/materiamodel.js');

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

module.exports = {
  getMateria,
  createMateria,
  updateMateria,
  deleteMateria 
};
