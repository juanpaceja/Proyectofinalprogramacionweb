const Estudiante = require('../models/estudiantemodel.js');

const getStudents =
(req,
res) => {
  Estudiante.getAll((err,
estudiantes) => {
    if (err) {
    console.log(estudiantes);
      return res.status(500).json({ error: 'Error al obtener estudiantes' });
    }
    res.status(200).json(estudiantes);
    console.log(estudiantes);
  });
};

module.exports =
{
  getStudents
};