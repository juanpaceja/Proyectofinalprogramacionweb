async function cargarGrupos() {
  const contenedor = document.getElementById('contenedor-tablas');
  contenedor.innerHTML = ''; // Limpiar contenido original

  try {
    const res = await fetch('http://localhost:3000/api/grupos-usuarios');
    const grupos = await res.json();

    grupos.forEach(grupo => {
      const tabla = document.createElement('div');
      tabla.innerHTML = `
        <h4 class="mt-5">${grupo.grupo}</h4>
        <div class="table-responsive">
          <table class="table user-list">
            <thead>
              <tr>
                <th><span>User</span></th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              ${grupo.usuarios.map(user => `
                <tr>
                  <td>
                    <img src="${user.avatar_url || 'https://bootdey.com/img/Content/avatar/avatar1.png'}" alt="">
                    <span class="user-link">${user.nombre}</span>
                    <span class="user-subhead">${user.rol}</span>
                  </td>
                  <td style="width: 20%;">
                    <a href="#" class="table-link danger">
                      <span class="fa-stack">
                        <i class="fa fa-square fa-stack-2x"></i>
                        <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                      </span>
                    </a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      contenedor.appendChild(tabla);
    });

  } catch (error) {
    console.error('Error al cargar grupos:', error);
    contenedor.innerHTML = '<p class="text-danger">Error al cargar los datos.</p>';
  }
}

window.onload = cargarGrupos;
