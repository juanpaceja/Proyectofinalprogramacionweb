const express = require('express');
const app = express();
const PORT = 3000;

// 👇 Esto va primero
app.use(express.json());

// Luego importa las rutas
const estudiantesRoutes = require('./routes/estudiantesroutes');
const grupoRoutes = require('./routes/gruporoutes');
const materiaRoutes = require('./routes/materiaroutes');
// Y luego las usa
app.use('/api', estudiantesRoutes);
app.use('/api', grupoRoutes);
app.use('/api', materiaRoutes);


// Arranca el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
