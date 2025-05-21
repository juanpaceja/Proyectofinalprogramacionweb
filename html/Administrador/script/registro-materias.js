
document.addEventListener('DOMContentLoaded', () => {
  const selectCarrera = document.getElementById('Select-carrera');

  // 1. Llenar el select con las carreras
  fetch('http://localhost:3000/api/carrera')
    .then(res => res.json())
    .then(data => {
      data.forEach(carrera => {
        const option = document.createElement('option');
        option.value = carrera.id_carrera;
        option.textContent = carrera.nombre;
        selectCarrera.appendChild(option);
      });
    })
    .catch(err => console.error('Error al obtener carreras:', err));

  // 2. Evento para enviar el formulario
  document.getElementById('form-materia').addEventListener('submit', (e) => {
    e.preventDefault();

    const nuevaMateria = {
      nombre: document.getElementById('Input-nombre-materia').value,
      codigo: document.getElementById('Input-codigo').value,
      creditos: parseInt(document.getElementById('Input-creditos').value),
      id_carrera: parseInt(document.getElementById('Select-carrera').value)
    };

    fetch('http://localhost:3000/api/materia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaMateria)
    })
    .then(res => res.json())
    .then(data => {
      alert('Materia registrada con éxito');
      document.getElementById('form-materia').reset();
    })
    .catch(err => {
      console.error('Error al registrar materia:', err);
      alert('Error al registrar materia');
    });
  });
});
