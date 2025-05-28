document.addEventListener('DOMContentLoaded', async () => {
  const maestroStr = localStorage.getItem('maestro');

  if (!maestroStr) {
    alert('Acceso no autorizado. Inicia sesión como maestro.');
    window.location.href = '/html/inicio.html';
    return;
  }

  const maestro = JSON.parse(maestroStr);
  const idProfesor = maestro.id_profesor;
  console.log('Maestro cargado desde localStorage:', maestro);

  try {
    const response = await fetch(`http://localhost:3000/api/maestros/${idProfesor}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error('Error al obtener datos del profesor');

    const data = await response.json();

    const nombreElemento = document.getElementById('nombre-maestro');
    if (nombreElemento) {
      nombreElemento.textContent = data.nombre || maestro.nombre || 'Sin nombre';
    }


  } catch (error) {
    console.error(error);
    alert('No se pudo cargar la información del profesor');
    localStorage.removeItem('maestro');
    localStorage.removeItem('id_profesor');
    window.location.href = '/html/login.html';
  }
});

function cerrarSesionMaestro() {
  localStorage.removeItem('maestro');
  localStorage.removeItem('id_profesor');
  window.location.href = '/html/login.html';
}
