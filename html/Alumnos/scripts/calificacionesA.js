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
    document.getElementById('semestre-actual').textContent = `| ${nombreSemestre}`;

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
