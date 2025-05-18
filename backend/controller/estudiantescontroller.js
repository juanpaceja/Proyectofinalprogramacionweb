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
  console.log('Datos recibidos para crear estudiante:', nuevo);

  Estudiante.create(nuevo, (err, result) => {
    if (err) {
      console.error('ERROR AL CREAR ESTUDIANTE (desde modelo):', err);
      return res.status(500).json({ error: 'Error al crear estudiante' });
    }
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

const db = require('../config/db'); // Asegúrate de tener esto

const loginAlumno = (req, res) => {
  const { id, nombre } = req.body;

  const idAlumno = Number(id); // asegura tipo número

  const query = 'SELECT * FROM Alumno WHERE id_alumno = ? AND nombre = ?';

  db.query(query, [idAlumno, nombre], (err, results) => {
    if (err) {
      console.error('Error en la base de datos:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    console.log('Resultados:', results);

    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    res.status(200).json({ alumno: results[0] });
  });
};

const getAlumnoById = (req, res) => {
  const idAlumno = Number(req.params.id);

  const query = `
SELECT Alumno.*, carrera.nombre AS carrera
FROM Alumno
JOIN carrera ON Alumno.id_carrera = carrera.id_carrera
WHERE Alumno.id_alumno = ?;

`;

  db.query(query, [idAlumno], (err, results) => {
    if (err) {
      console.error('Error en la base de datos:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    res.status(200).json(results[0]);
  });
};



module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  loginAlumno,
  getAlumnoById// 👈 Agrega aquí también
};

