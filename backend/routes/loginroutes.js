const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/login', (req, res) => {
  const { tipo, nombre, contrasena } = req.body; // El campo 'contrasena' será el ID

  let tabla = '';
  let campoID = '';

  switch (tipo) {
    case 'alumno':
      tabla = 'alumno';
      campoID = 'id_alumno';
      break;
    case 'maestro':
      tabla = 'profesor';
      campoID = 'id_profesor';
      break;
    case 'admin':
      tabla = 'admin';
      campoID = 'id_admin';
      break;
    default:
      return res.status(400).json({ error: 'Tipo de usuario no válido' });
  }

  // ⚠️ Aquí se usa el ID como contraseña
  const sql = `SELECT * FROM ${tabla} WHERE nombre = ? AND ${campoID} = ?`;
  db.query(sql, [nombre, contrasena], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });
    if (results.length === 0) return res.status(401).json({ error: 'Credenciales incorrectas' });

    const user = results[0];
    let redirectURL = '';

    if (tipo === 'alumno') redirectURL = '/html/panel-alumno.html';
    if (tipo === 'maestro') redirectURL = '/html/panel-maestro.html';
    if (tipo === 'admin') redirectURL = '/html/panel-admin.html';

    res.json({
      message: `Bienvenido, ${user.nombre}`,
      redirect: redirectURL
    });
  });
});

module.exports = router;
