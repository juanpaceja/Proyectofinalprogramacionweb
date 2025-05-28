document.addEventListener('DOMContentLoaded', () => { 
  const alumnoStr = localStorage.getItem('alumno');
  const idAlumno = localStorage.getItem('id_alumno');

  if (!alumnoStr || !idAlumno) {
    alert('Acceso no autorizado. Inicia sesión como alumno.');
    window.location.href = '/html/inicio.html'; // Ajusta según la ruta real
    return;
  }

  fetch(`http://localhost:3000/api/calificaciones/historial/${idAlumno}`)
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById('contenedor-tablas');
      contenedor.innerHTML = '';

      // Agrupar por semestre
      const porSemestre = {};

      data.forEach(item => {
        const semestre = item.semestre || 'Semestre desconocido';
        if (!porSemestre[semestre]) porSemestre[semestre] = [];
        porSemestre[semestre].push(item);
      });

      // Crear tabla para cada semestre
      Object.keys(porSemestre).sort().forEach(semestre => {
        const materias = porSemestre[semestre];

        const card = document.createElement('div');
        card.className = 'card widget-card border-light shadow-sm mb-4';

        card.innerHTML = `
          <div class="card-body p-4">
            <h5 class="card-title widget-card-title mb-4">${semestre}</h5>
            <div class="table-responsive">
              <table class="table table-borderless bsb-table-xl text-nowrap align-middle m-0">
                <thead>
                  <tr>
                    <th>Materia</th>
                    <th>Grupo</th>
                    <th>Semestre</th>
                    <th>Calificación</th>
                  </tr>
                </thead>
                <tbody>
                  ${materias.map(m => `
                    <tr>
                      <td><h6 class="mb-1">${m.materia}</h6></td>
                      <td><h6 class="mb-1">${m.grupo}</h6></td>
                      <td><h6 class="mb-1">${m.semestre}</h6></td>
                      <td><h6 class="mb-1">${m.calificacion}</h6></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;

        contenedor.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error al cargar historial:', error);
      alert('No se pudieron cargar las calificaciones');
    });
});

function cerrarSesionAlumno() {
  localStorage.removeItem('alumno');
  localStorage.removeItem('id_alumno');
  window.location.href = '/html/inicio.html'; // o la página correcta
}
