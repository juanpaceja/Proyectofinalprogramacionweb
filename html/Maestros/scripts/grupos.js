document.addEventListener('DOMContentLoaded', async () => {
  // Verificar que haya sesión de maestro
  const maestroStr = localStorage.getItem('maestro');
  if (!maestroStr) {
    alert('Acceso no autorizado. Inicia sesión como maestro.');
    window.location.href = '/html/login.html';
    return;
  }

  // Obtener id_materia
  const idMateria = localStorage.getItem('id_materia');
  if (!idMateria) {
    document.getElementById('grupos-cards').innerHTML = '<p class="text-danger">ID de materia no encontrado.</p>';
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/grupos/materia/${idMateria}`);
    if (!response.ok) throw new Error('Error al obtener grupos');

    const grupos = await response.json();
    const container = document.getElementById('grupos-cards');
    container.innerHTML = '';

    grupos.forEach(grupo => {
      const card = document.createElement('div');
      card.className = 'col w-25';
      card.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${grupo.nombre_grupo}</h5>
            <p class="card-text">
              Materia: ${grupo.nombre_materia}<br>
              Profesor: ${grupo.nombre_profesor}<br>
              Horario: ${grupo.horario}<br>
              Periodo: ${grupo.nombre_periodo}
            </p>
            <a href="#" class="btn btn-primary ver-alumnos-btn" data-id="${grupo.id_grupo}">Ver alumnos</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    // Delegación de eventos para "Ver alumnos"
    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('ver-alumnos-btn')) {
        e.preventDefault();
        const idGrupo = e.target.getAttribute('data-id');
        localStorage.setItem('id_grupo', idGrupo);
        window.location.href = '/html/maestros/grupo.html'; // Ruta correcta
      }
    });

  } catch (error) {
    console.error('Error:', error);
    document.getElementById('grupos-cards').innerHTML = '<p class="text-danger">Error al cargar los grupos.</p>';
  }
});

function cerrarSesionMaestro() {
  localStorage.removeItem('maestro');
  localStorage.removeItem('id_profesor');
  window.location.href = '/html/login.html';
}
