const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

app.use(cors());
// 👇 Esto va primero
app.use(express.json());

// Luego importa las rutas
const estudiantesRoutes = require('./routes/estudiantesroutes');
const grupoRoutes = require('./routes/gruporoutes');
const materiaRoutes = require('./routes/materiaroutes');
const carreraRoutes= require('./routes/carreraroutes');
const maestroRoutes= require('./routes/maestrosroutes');
const periodoRoutes= require('./routes/periodoroutes');

const estudiantesRoutes1 = require('./routes/estudiantesroutes');

// Y luego las usa
app.use('/api', estudiantesRoutes);
app.use('/api', grupoRoutes);
app.use('/api', materiaRoutes);
app.use('/api', carreraRoutes);
app.use('/api', maestroRoutes);
app.use('/api', periodoRoutes);

app.use('/api', estudiantesRoutes);




// Arranca el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});