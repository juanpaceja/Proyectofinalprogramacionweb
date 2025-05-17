const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para JSON
app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'html')));

// Rutas
const estudiantesRoutes = require('./routes/estudiantesroutes');
const grupoRoutes = require('./routes/gruporoutes');
const materiaRoutes = require('./routes/materiaroutes');
const carreraRoutes = require('./routes/carreraroutes');
const maestroRoutes = require('./routes/maestrosroutes');
const periodoRoutes = require('./routes/periodoroutes');
const loginRoutes = require('./routes/loginroutes');

app.use('/api', estudiantesRoutes);
app.use('/api', grupoRoutes);
app.use('/api', materiaRoutes);
app.use('/api', carreraRoutes);
app.use('/api', maestroRoutes);
app.use('/api', periodoRoutes);
app.use('/api', loginRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
