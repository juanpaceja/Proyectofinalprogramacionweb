async function cargarMaterias() {
  const contenedor = document.getElementById('contenedor-materias');
  contenedor.innerHTML = ''; // Limpiar contenido

  try {
    const res = await fetch('http://localhost:3000/api/materias-con-carrera');
    const materias = await res.json();

    materias.forEach(materia => {
      const tabla = document.createElement('div');
      tabla.classList.add('table-responsive', 'mb-4');
      tabla.innerHTML = `
        <h4 class="mt-5">${materia.nombre}</h4>
        <table class="table user-list">
          <thead>
            <tr>
              <th><span>Código</span></th>
              <th><span>Créditos</span></th>
              <th><span>Carrera</span></th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="user-link">${materia.codigo}</span></td>
              <td><span class="user-link">${materia.creditos}</span></td>
              <td><span class="user-link">${materia.carrera}</span></td>
              <td style="width: 20%;">
              </td>
            </tr>
          </tbody>
        </table>
      `;
      contenedor.appendChild(tabla);
    });

  } catch (error) {
    console.error('Error al cargar materias:', error);
    contenedor.innerHTML = '<p class="text-danger">Error al cargar los datos.</p>';
  }
}

window.onload = cargarMaterias;
