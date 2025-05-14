const Grupo = require('../models/grupomodel.js');

const getGroup = (req, res) => {
  Grupo.getAll((err, group) => {
    if (err) {
      console.error('Error al obtener estudiantes:', err);
      return res.status(500).json({ error: 'Error al obtener estudiantes' });
    }
    res.status(200).json(group);
    console.log('Grupos obtenidos:', group);
  });
};

// CREATE
const createGroup = (req, res) => {
  const nuevo = req.body;
  console.log('Datos recibidos para crear grupo:', nuevo);
  Grupo.create(nuevo, (err, result) => {
    if (err) {
      console.error('❌ ERROR AL CREAR GRUPO (desde modelo):', err); // 👈 DEBE IMPRIMIR ESTO
      return res.status(500).json({ error: 'Error al grupo' });
    }
    res.status(201).json({ message: 'Grupo creado exitosamente', id: result.insertId });
  });
};



// UPDATE
const updateGroup = (req, res) => {
  const id = req.params.id;
  const actualizado = req.body;
  Grupo.update(id, actualizado, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar grupo' });
    res.status(200).json({ message: 'Grupo actualizado' });
  });
};

// DELETE
const deleteGroup = (req, res) => {
  const id = req.params.id;
  Grupo.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar grupo' });
    res.status(200).json({ message: 'Grupo eliminado' });
  });
};

module.exports = {
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup
};

