document.addEventListener('DOMContentLoaded', async () => {
  const alumnoStr = localStorage.getItem('alumno');

  if (!alumnoStr) {
    alert('Acceso no autorizado. Inicia sesión como alumno.');
    window.location.href = '/html/inicio.html';
    return;
  }

  const alumno = JSON.parse(alumnoStr);
  const idAlumno = alumno.id_alumno;

  try {
    const response = await fetch(`http://localhost:3000/api/alumno/${idAlumno}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error('Error al obtener datos del alumno');

    const data = await response.json();

    document.getElementById('nombre-alumno').textContent = data.nombre || 'Sin nombre';
    document.getElementById('Nocuenta-alumno').textContent = `Número de cuenta: ${data.matricula || 'No disponible'}`;
    document.getElementById('carrera-alumno').textContent = `Carrera: ${data.carrera || 'No disponible'}`;

  } catch (error) {
    console.error('Error al cargar la información del alumno:', error);
    alert('No se pudo cargar la información del alumno');
  }
});

function cerrarSesionAlumno() {
  localStorage.removeItem('alumno');
  localStorage.removeItem('id_alumno');
  window.location.href = '/html/inicio.html';
}
