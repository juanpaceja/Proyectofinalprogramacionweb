const express = require('express');
const app = express();
const PORT = 3000;

// 👇 Esto va primero
app.use(express.json());

// Luego importa las rutas
const estudiantesRoutes = require('./routes/estudiantesroutes');

// Y luego las usa
app.use('/api', estudiantesRoutes);


// Arranca el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
