const db = require('../config/db'); // Asegúrate de tener esto
const Admin = require('../models/adminmodels.js');

const loginAdmin = (req, res) => {
  const { id, nombre } = req.body;

  const idAdmin = Number(id); // asegura tipo número

  const query = 'SELECT * FROM Administrador WHERE id_admin = ? AND nombre = ?';

  db.query(query, [idAdmin, nombre], (err, results) => {
    if (err) {
      console.error('Error en la base de datos:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    console.log('Resultados:', results);

    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    res.status(200).json({ admin: results[0] });
  });
};

  const getAdminById = (req, res) => {
    const id = req.params.id_admin;
    Admin.getAdminById(id, (err, results) => {
    if (err) {
      console.error('Error al obtener administrador:', err);
      return res.status(500).json({ error: 'Error al obtener administrador' });
    }
    res.status(200).json(results);
  });
  };

module.exports = {
  loginAdmin,
  getAdminById
};