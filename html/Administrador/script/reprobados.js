document.addEventListener('DOMContentLoaded', () => {
  const admin = localStorage.getItem('admin');

  if (!admin) {
    window.location.replace('/html/login.html');
    return;
  }

  const resultado = document.getElementById('resultado');

  fetch('http://localhost:3000/api/reprobados')
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text); });
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data) || data.length === 0) {
        resultado.innerHTML = '<p class="text-muted">No se encontraron alumnos reprobados.</p>';
        return;
      }

      const table = document.createElement('table');
      table.className = 'table table-striped table-bordered text-center';

      const thead = `
        <thead class="table-danger">
          <tr>
            <th>Alumno</th>
            <th>Materia</th>
            <th>Semestre</th>
            <th>Calificación</th>
          </tr>
        </thead>
      `;

      const tbody = data.map(item => `
        <tr>
          <td>${item.alumno}</td>
          <td>${item.materia}</td>
          <td>${item.semestre || item.periodo || '—'}</td>
          <td>${item.calificacion}</td>
        </tr>
      `).join('');

      table.innerHTML = thead + `<tbody>${tbody}</tbody>`;
      resultado.innerHTML = ''; // Limpia contenido anterior
      resultado.appendChild(table);
    })
    .catch(error => {
      resultado.innerHTML = `<p class="text-danger">Error al obtener los datos: ${error.message}</p>`;
    });
});

function verPDF() {
  window.open('http://localhost:3000/api/reportes/reprobados', '_blank');
}
