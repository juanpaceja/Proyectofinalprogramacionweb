const Grupo = require('../models/grupomodel.js');

const getGroup = (req, res) => {
  Grupo.getAll((err, group) => {
    if (err) {
      console.error('Error al obtener grupos:', err);
      return res.status(500).json({ error: 'Error al obtener grupos' });
    }
    res.status(200).json(group);
    console.log('Grupos obtenidos:', group);
  });
};

// CREATE
const createGroup = (req, res) => {
  const nuevo = req.body;
  Grupo.create(nuevo, (err, result) => {
    if (err) {
      console.error('❌ ERROR AL CREAR GRUPO:', err);
      return res.status(500).json({ error: 'Error al crear grupo' });
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

const getGruposPorCarrera = (req, res) => {
  const idCarrera = req.query.idCarrera;
  if (idCarrera) {
    Grupo.getByCarrera(idCarrera, (err, grupos) => {
      if (err) return res.status(500).json({ error: 'Error en la base de datos' });
      res.json(grupos);
    });
  } else {
    Grupo.getAll((err, grupos) => {
      if (err) return res.status(500).json({ error: 'Error en la base de datos' });
      res.json(grupos);
    });
  }
};



module.exports = {
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  getGruposPorCarrera
};
