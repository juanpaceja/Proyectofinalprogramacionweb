async function cargarCarreras() {
  const contenedor = document.getElementById('contenedor-carreras');
  contenedor.innerHTML = ''; // Limpiar contenido

  try {
    const res = await fetch('http://localhost:3000/api/carreras');
    const carreras = await res.json();

    carreras.forEach(carrera => {
      const tabla = document.createElement('div');
      tabla.classList.add('table-responsive', 'mb-4');
      tabla.innerHTML = `
        <h4 class="mt-5">${carrera.nombre}</h4>
        <table class="table user-list">
          <thead>
            <tr>
              <th><span>Facultad</span></th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="user-link">${carrera.facultad}</span></td>
              <td style="width: 20%;">
                <a href="#" class="table-link danger">
                  <span class="fa-stack">
                    <i class="fa fa-square fa-stack-2x"></i>
                    <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      `;
      contenedor.appendChild(tabla);
    });

  } catch (error) {
    console.error('Error al cargar carreras:', error);
    contenedor.innerHTML = '<p class="text-danger">Error al cargar los datos.</p>';
  }
}

document.addEventListener('DOMContentLoaded', cargarCarreras);
