const express = require('express');
const app = express();
const PORT = 3000;

//Middlewear para parsear JSON
app.use(express.json());

app.listen(PORT, () => {console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);});

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!',200);
});


//Aquí debemos importara las rutas que definamos


const estudiantesRoutes = require('./routes/estudiantesroutes.js');

app.use(express.json());

app.use('/api', estudiantesRoutes);

