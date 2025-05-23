const db = require('../config/db');

const Administrador = {
    getAdminById: (idAdmin, callback) => {
        const query = 'SELECT id_admin, nombre FROM administrador WHERE id_admin = ?';
        db.query(query, [idAdmin],callback);
    }
};    


module.exports = Administrador;
//ola