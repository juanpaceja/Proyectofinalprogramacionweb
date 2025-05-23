const Aprobado = require('../models/aprobadosmodels.js');

const getAprobados = (req, res) => {
  Aprobado.aprobados((err, results) => {
    if (err) {
      console.error('Error al obtener los aprobados:', err);
      return res.status(500).json({ error: 'Error al obtener los aprobados' });
    }
    res.status(200).json(results);
  });
};

const getReprobados = (req, res) => {
  Aprobado.reprobados((err, results) => {
    if (err) {
      console.error('Error al obtener los reprobados:', err);
      return res.status(500).json({ error: 'Error al obtener los reprobados' });
    }
    res.status(200).json(results);
  });
};

module.exports = {
  getAprobados,
  getReprobados
};