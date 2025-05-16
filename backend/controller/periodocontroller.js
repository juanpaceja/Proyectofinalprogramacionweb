const Periodo = require('../models/periodomodel.js');

const getPeriod = (req, res) => {
  Periodo.getAll((err, periodos) => {
    if (err) {
      console.error('Error al obtener el periodo:', err);
      return res.status(500).json({ error: 'Error al obtener el periodo' });
    }
    res.status(200).json(periodos);
    console.log('Periodos obtenidos:', periodos);
  });
};

// CREATE
const createPeriod = (req, res) => {
  const nuevo = req.body;
  console.log('Periodo creado', nuevo);

  Periodo.create(nuevo, (err, result) => {
    if (err) {
      console.error('ERROR AL CREAR Periodo (desde modelo):', err);
      return res.status(500).json({ error: 'Error al crear Periodo' });
    }
    res.status(201).json({ message: 'Periodo creado exitosamente', id: result.insertId });
  });
};



// UPDATE
const updatePeriod = (req, res) => {
  const id = req.params.id;
  const actualizado = req.body;
  Periodo.update(id, actualizado, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar el periodo' });
    res.status(200).json({ message: 'Periodo actualizado' });
  });
};

// DELETE
const deletePeriod = (req, res) => {
  const id = req.params.id;
  Periodo.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar el periodo' });
    res.status(200).json({ message: 'Periodo eliminado' });
  });
};

module.exports = {
  getPeriod,
  createPeriod,
  updatePeriod,
  deletePeriod
};

