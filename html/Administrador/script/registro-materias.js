document.addEventListener('DOMContentLoaded', () => {
  const admin = localStorage.getItem('admin');

  if (!admin) {
    window.location.replace('/html/login.html');
    return;
  }

  cargarCarreras(); // Llamar directamente

  const formulario = document.getElementById('form-materia');
  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = {
      nombre: document.getElementById('Input-nombre-materia').value,
      codigo: document.getElementById('Input-codigo').value,
      creditos: Number(document.getElementById('Input-creditos').value),
      id_carrera: document.getElementById('Select-carrera').value
    };

    try {
      const res = await fetch('http://localhost:3000/api/materia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });

      const resBody = await res.json();
      if (!res.ok) throw new Error('Error al registrar materia');

      alert('Materia registrada con éxito');
      formulario.reset();

    } catch (err) {
      console.error(err);
      alert('Hubo un problema al registrar la materia');
    }
  });

  async function cargarCarreras() {
    try {
      const res = await fetch('http://localhost:3000/api/carreras');
      if (!res.ok) throw new Error('Error al cargar carreras');
      const carreras = await res.json();

      const carreraSelect = document.getElementById('Select-carrera');
      carreraSelect.innerHTML = '<option value="">Seleccione una carrera</option>';
      carreras.forEach(carrera => {
        const option = document.createElement('option');
        option.value = carrera.id_carrera;
        option.textContent = carrera.nombre;
        carreraSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error al cargar carreras:', error);
      alert('No se pudieron cargar las carreras.');
    }
  }
});
