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

const getByMateria = (req, res) => {
  const idMateria = req.params.id;
  const query = `
    SELECT 
      grupo.id_grupo,
      grupo.nombre AS nombre_grupo,
      grupo.horario,
      materia.nombre AS nombre_materia,
      periodo_academico.nombre AS nombre_periodo,
      profesor.nombre AS nombre_profesor
    FROM grupo
    JOIN materia ON grupo.id_materia = materia.id_materia
    JOIN periodo_academico ON grupo.id_periodo = periodo_academico.id_periodo
    JOIN profesor ON grupo.id_profesor = profesor.id_profesor
    WHERE grupo.id_materia = ?
  `;

  Grupo.queryCustom(query, [idMateria], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener grupos' });
    res.status(200).json(results);
  });
};

const getByProfesor = (req, res) => {
  const idProfesor = req.params.id;

  const query = `
    SELECT 
      grupo.id_grupo,
      grupo.nombre AS nombre_grupo,
      grupo.horario,
      materia.nombre AS nombre_materia,
      periodo_academico.nombre AS nombre_periodo
    FROM grupo
    JOIN materia ON grupo.id_materia = materia.id_materia
    JOIN periodo_academico ON grupo.id_periodo = periodo_academico.id_periodo
    WHERE grupo.id_profesor = ?
  `;

  Grupo.queryCustom(query, [idProfesor], (err, results) => {
    if (err) {
      console.error('❌ Error al obtener grupos por profesor:', err);
      return res.status(500).json({ error: 'Error al obtener grupos por profesor' });
    }
    res.status(200).json(results);
  });
};

const getAlumnosByGrupo = (req, res) => {
  const idGrupo = req.params.id;
  Grupo.getAlumnosByGrupo(idGrupo, (err, alumnos) => {
    if (err) {
      console.error('Error al obtener alumnos del grupo:', err);
      return res.status(500).json({ error: 'Error al obtener alumnos del grupo' });
    }
    res.status(200).json(alumnos);
  });
};

const getAlumnosConCalificaciones = (req, res) => {
  const idGrupo = req.params.id;
  Grupo.getAlumnosConCalificaciones(idGrupo, (err, results) => {
    if (err) {
      console.error('Error al obtener alumnos con calificaciones:', err);
      return res.status(500).json({ error: 'Error al obtener alumnos con calificaciones' });
    }
    res.status(200).json(results);
  });
};

// Actualizar o insertar calificación de un alumno
const updateCalificacion = (req, res) => {
  const { idAlumnoGrupo, calificacion } = req.body;

  Grupo.upsertCalificacion(idAlumnoGrupo, calificacion, (err, result) => {
    if (err) {
      console.error('Error al actualizar calificación:', err);
      return res.status(500).json({ error: 'Error al actualizar calificación' });
    }
    res.status(200).json({ message: 'Calificación actualizada correctamente' });
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
  getByMateria,
  getByProfesor,
  getAlumnosByGrupo,
  getAlumnosConCalificaciones,
  updateCalificacion,
  getGruposPorCarrera
};
