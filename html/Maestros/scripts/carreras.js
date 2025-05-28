document.addEventListener('DOMContentLoaded', async () => {
  const maestroStr = localStorage.getItem('maestro');

  if (!maestroStr) {
    alert('Acceso no autorizado. Inicia sesión como maestro.');
    window.location.href = '/html/inicio.html';
    return;
  }

  const maestro = JSON.parse(maestroStr);
  const profesorId = maestro.id_profesor;

  if (!profesorId) {
    alert('ID de profesor no encontrado. Inicia sesión nuevamente.');
    localStorage.removeItem('maestro');
    window.location.href = '/html/login.html';
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/carreras/profesor/${profesorId}`);
    if (!response.ok) throw new Error('Error al obtener carreras');

    const carreras = await response.json();
    const container = document.getElementById('carreras-cards');
    container.innerHTML = '';

    carreras.forEach(carrera => {
      const card = document.createElement('div');
      card.className = 'col';
      card.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${carrera.carrera}</h5>
            <p class="card-text">ID Carrera: ${carrera.id_carrera}</p>
            <a href="/html/maestros/materia.html?id=${carrera.id_carrera}" class="btn btn-primary">Ver más</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('carreras-cards').innerHTML = '<p class="text-danger">Error al cargar las carreras.</p>';
  }
});

function cerrarSesionMaestro() {
  localStorage.removeItem('maestro');
  localStorage.removeItem('id_profesor');
  window.location.href = '/html/login.html';
}
