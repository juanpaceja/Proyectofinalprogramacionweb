document.addEventListener('DOMContentLoaded', async () => {
  // Validación de sesión del maestro
  const maestroStr = localStorage.getItem('maestro');
  if (!maestroStr) {
    alert('Acceso no autorizado. Inicia sesión como maestro.');
    window.location.href = '/html/login.html';
    return;
  }

  // Validación de ID de grupo
  const grupoId = localStorage.getItem('id_grupo');
  if (!grupoId) {
    alert('No se encontró el ID del grupo. Redirigiendo...');
    window.location.href = '/html/maestros/grupos.html';
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/grupos/${grupoId}/alumnos-calificaciones`);
    if (!response.ok) throw new Error('Error al obtener alumnos con calificaciones');

    const alumnos = await response.json();
    const tablaBody = document.querySelector('tbody');
    tablaBody.innerHTML = '';

    alumnos.forEach(alumno => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${alumno.matricula}</td>
        <td>${alumno.alumno}</td>
        <td>${alumno.carrera}</td>
        <td>
          <input type="number" min="0" max="100" value="${alumno.calificacion ?? ''}" data-id-alumno-grupo="${alumno.id_alumno_grupo}" class="input-calificacion" style="width: 70px;">
          <button class="btn btn-sm btn-success btn-guardar" data-id-alumno-grupo="${alumno.id_alumno_grupo}">Guardar</button>
        </td>
      `;
      tablaBody.appendChild(fila);
    });

    // Delegación de eventos para guardar calificación
    tablaBody.addEventListener('click', async (e) => {
      if (e.target.classList.contains('btn-guardar')) {
        const idAlumnoGrupo = e.target.getAttribute('data-id-alumno-grupo');
        const input = tablaBody.querySelector(`input[data-id-alumno-grupo="${idAlumnoGrupo}"]`);
        const nuevaCalificacion = input.value;

        try {
          const res = await fetch('http://localhost:3000/api/calificacion', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idAlumnoGrupo, calificacion: nuevaCalificacion }),
          });

          if (!res.ok) throw new Error('Error al actualizar calificación');
          alert('Calificación actualizada');
        } catch (error) {
          alert('Error al guardar la calificación');
          console.error(error);
        }
      }
    });

  } catch (error) {
    console.error('Error:', error);
    const tablaBody = document.querySelector('tbody');
    tablaBody.innerHTML = '<tr><td colspan="4" class="text-danger">Error al cargar los alumnos y calificaciones.</td></tr>';
  }
});

function cerrarSesionMaestro() {
  localStorage.removeItem('maestro');
  localStorage.removeItem('id_profesor');
  window.location.href = '/html/login.html';
}
