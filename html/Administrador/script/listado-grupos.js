document.addEventListener('DOMContentLoaded', () => {
  const admin = localStorage.getItem('admin');

  if (!admin) {
    alert('Acceso no autorizado. Inicia sesión como Administrador.');
    window.location.replace('/html/inicio.html');
    return;
  }

  cargarGrupos(); // Ejecuta la función si hay sesión
});

async function cargarGrupos() {
  const contenedor = document.getElementById('contenedor-tablas');
  contenedor.innerHTML = '';

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
                    <img src="/imagenes/Ejemplo-img-alumno.jpg" alt="">
                    <span class="user-link">${user.nombre}</span>
                    <span class="user-subhead">${user.rol}</span>
                  </td>
                  <td style="width: 20%;">
                    <a class="table-link" onclick="editarAlumno(${user.id_alumno_grupo})">
                      <span class="fa-stack">
                        <i class="fa fa-square fa-stack-2x"></i>
                        <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                      </span>
                    </a>
                    <a class="table-link danger" onclick="eliminarAlumnoGrupo(${user.id_alumno_grupo})">
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

async function eliminarAlumnoGrupo(id) {
  if (!confirm('¿Seguro que deseas eliminar este alumno del grupo?')) return;

  try {
    const res = await fetch(`http://localhost:3000/api/alumno-grupo/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    alert(data.message);
    cargarGrupos();

  } catch (error) {
    console.error('Error al eliminar alumno del grupo:', error);
    alert('Ocurrió un error al eliminar el alumno del grupo.');
  }
}

let alumnoGrupoSeleccionado = null;

async function editarAlumno(idAlumnoGrupo) {
  alumnoGrupoSeleccionado = idAlumnoGrupo;
  document.getElementById('modal-cambiar-grupo').style.display = 'flex';

  const selector = document.getElementById('selector-grupo');
  selector.innerHTML = '<option disabled selected>Cargando grupos...</option>';

  try {
    const res = await fetch('http://localhost:3000/api/grupo');
    const grupos = await res.json();

    selector.innerHTML = '';
    grupos.forEach(g => {
      const option = document.createElement('option');
      option.value = g.id_grupo;
      option.textContent = `${g.nombre_grupo} (${g.nombre_materia})`;
      selector.appendChild(option);
    });

  } catch (err) {
    selector.innerHTML = '<option disabled>Error al cargar</option>';
    console.error('Error al cargar grupos:', err);
  }
}

function cerrarModalGrupo() {
  document.getElementById('modal-cambiar-grupo').style.display = 'none';
  alumnoGrupoSeleccionado = null;
}

async function confirmarCambioGrupo() {
  const nuevoGrupoId = document.getElementById('selector-grupo').value;

  try {
    const res = await fetch(`http://localhost:3000/api/alumno-grupo/${alumnoGrupoSeleccionado}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_grupo: nuevoGrupoId })
    });

    const data = await res.json();
    alert(data.message);
    cerrarModalGrupo();
    cargarGrupos();

  } catch (err) {
    console.error('Error al actualizar grupo:', err);
    alert('No se pudo actualizar el grupo del alumno.');
  }
}

window.addEventListener('click', function (event) {
  const modal = document.getElementById('modal-cambiar-grupo');
  if (event.target === modal) {
    cerrarModalGrupo();
  }
});

function cerrarSesion() {
  localStorage.removeItem('admin');
  localStorage.removeItem('id_admin');
  window.location.href = '/html/inicio.html';
}