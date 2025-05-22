const Calificacion = require('../models/calificacionmodel.js');

const getCalificacion = (req, res) => {
  Calificacion.getAll((err, calificaciones) => {
    if (err) {
      console.error('Error al obtener calificaciones:', err);
      return res.status(500).json({ error: 'Error al obtener calificaciones' });
    }
    res.status(200).json(calificaciones);
    console.log('Calificaciones obtenidas:', calificaciones);
  });
};

// CREATE
const createCalificacion = (req, res) => {
  const nuevo = req.body;
  console.log('Datos recibidos para crear calificaciones:', nuevo);

  Calificacion.create(nuevo, (err, result) => {
    if (err) {
      console.error('ERROR AL CREAR MATERIA (desde modelo):', err);
      return res.status(500).json({ error: 'Error al crear calificacion' });
    }
    res.status(201).json({ message: 'Calificacion creada exitosamente', id: result.insertId });
  });
};



// UPDATE
const updateCalificacion = (req, res) => {
  const id = req.params.id;
  const actualizado = req.body;
  Calificacion.update(id, actualizado, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar calificación' });
    res.status(200).json({ message: 'Calificación actualizada' });
  });
};

// DELETE
const deleteCalificacion = (req, res) => {
  const id = req.params.id;
  Calificacion.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar calificación' });
    res.status(200).json({ message: 'Calificación eliminada' });
  });
};




const getCalificacionesByAlumno = (req, res) => {
  const id = req.params.id_alumno;

  Calificacion.getByAlumno(id, (err, results) => {
    if (err) {
      console.error('Error al obtener calificaciones del alumno:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }
    res.json(results);
  });
};

const getHistorialCalificaciones = (req, res) => {
  const id = req.params.id_alumno;

  Calificacion.getHistorialByAlumno(id, (err, results) => {
    if (err) {
      console.error('Error al obtener historial de calificaciones:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }
    res.json(results);
  });
};

const getCalificacionActual = (req, res) => {
  const id = req.params.id_alumno;

  Calificacion.getCalificacionActual(id, (err, results) => {
    if (err) {
      console.error('Error al obtener calificaciones del alumno:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }
    res.json(results);
  });
}



const db = require('../config/db'); // Asegúrate de tener esto




module.exports = {
  getCalificacion,
  createCalificacion,
  updateCalificacion,
  deleteCalificacion,
  getCalificacionesByAlumno,
  getHistorialCalificaciones,
  getCalificacionActual
};

