document.addEventListener('DOMContentLoaded', () => {
  const alumnoStr = localStorage.getItem('alumno');

  if (!alumnoStr) {
    alert('Acceso no autorizado. Inicia sesión como alumno.');
    window.location.href = '/html/inicio.html'; // Asegúrate que esta ruta sea correcta
    return;
  }

document.addEventListener('DOMContentLoaded', () => {
    const idAlumno = localStorage.getItem('id_alumno'); // 👈 Recupera el ID guardado
    
    if (!idAlumno) {
        alert('Debes iniciar sesión primero');
        window.location.href = '/login.html';
        return;
    }

    fetch(`http://localhost:3000/api/calificaciones/actual/${idAlumno}`)
        .then(res => res.json())
        .then(data => {
          const nombreSemestre = data[0].semestre || '';
    //document.getElementById('semestre-actual').textContent = `| ${nombreSemestre}`;

        const tbody = document.getElementById('table-content');
        data.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td><h6 class="mb-1">${item.materia}</h6></td>
            <td><h6 class="mb-1">${item.calificacion}</h6></td>
            <td><h6 class="mb-1">${item.estado}</h6></td>
          `;
          tbody.appendChild(row);
        });
      })
      .catch(error => console.error('Error al cargar calificaciones:', error));
  });
});

function cerrarSesionAlumno() {
  localStorage.removeItem('alumno');
  localStorage.removeItem('id_alumno');
  window.location.href = '/html/inicio.html';
}
