const Grupo = require('../models/grupomodel.js');
const db = require('../config/db');

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
const getGruposConAlumnos = (req, res) => {
  const sql = `
    SELECT 
      g.id_grupo,
      g.nombre AS grupo,
      ag.id_alumno_grupo,
      a.nombre AS nombre
    FROM grupo g
    LEFT JOIN alumno_grupo ag ON g.id_grupo = ag.id_grupo
    LEFT JOIN alumno a ON ag.id_alumno = a.id_alumno
    ORDER BY g.id_grupo, a.nombre;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener grupos con alumnos:', err);
      return res.status(500).json({ error: 'Error al obtener grupos con alumnos' });
    }

    const gruposMap = {};

    results.forEach(row => {
      if (!gruposMap[row.grupo]) {
        gruposMap[row.grupo] = [];
      }

      if (row.id_alumno_grupo) {
        gruposMap[row.grupo].push({
          id_alumno_grupo: row.id_alumno_grupo,
          nombre: row.nombre,
          rol: 'Alumno',
          avatar_url: null
        });
      }
    });

    const salida = Object.entries(gruposMap).map(([grupo, usuarios]) => ({
      grupo,
      usuarios
    }));

    res.json(salida);
  });
};

  const getByMateria = (req, res) => {
    const idMateria = req.params.id;
    Grupo.getByMateria(idMateria, (err, grupos) => {
        if (err) {
            console.error('Error al obtener grupos por materia:', err);
            return res.status(500).json({ error: 'Error al obtener grupos por materia' });
        }
        res.status(200).json(grupos);
    });
  };

const eliminarAlumnoDeGrupo = (req, res) => {
  const idAlumnoGrupo = req.params.id;

  const eliminarCalificaciones = 'DELETE FROM calificacion WHERE id_alumno_grupo = ?';
  const eliminarAlumnoGrupo = 'DELETE FROM alumno_grupo WHERE id_alumno_grupo = ?';

  db.query(eliminarCalificaciones, [idAlumnoGrupo], (err) => {
    if (err) {
      console.error('Error al eliminar calificaciones:', err);
      return res.status(500).json({ error: 'Error al eliminar calificaciones' });
    }

    db.query(eliminarAlumnoGrupo, [idAlumnoGrupo], (err2) => {
      if (err2) {
        console.error('Error al eliminar alumno del grupo:', err2);
        return res.status(500).json({ error: 'Error al eliminar alumno del grupo' });
      }

      res.status(200).json({ message: 'Alumno eliminado del grupo y calificaciones eliminadas' });
    });
  });
};


const getGruposPorCarrera = (req, res) => {
  const idCarrera = req.query.idCarrera;

  const query = `
    SELECT 
      g.id_grupo,
      g.nombre AS grupo,
      g.horario,
      m.nombre AS materia,
      c.nombre AS carrera
    FROM grupo g
    JOIN materia m ON g.id_materia = m.id_materia
    JOIN carrera c ON m.id_carrera = c.id_carrera
    WHERE c.id_carrera = ?
  `;

  db.query(query, [idCarrera], (err, results) => {
    if (err) {
      console.error('Error al obtener grupos por carrera:', err);
      return res.status(500).json({ error: 'Error al obtener grupos por carrera' });
    }
    res.status(200).json(results);
  });
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
  getGruposConAlumnos,
  eliminarAlumnoDeGrupo,
  getGruposPorCarrera
};
