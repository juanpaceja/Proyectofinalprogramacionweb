document.addEventListener('DOMContentLoaded', async () => {
  // Obtén el id del alumno guardado en localStorage (de tu login)
  const alumnoStr = localStorage.getItem('alumno');
  if (!alumnoStr) {
    alert('No hay sesión iniciada');
    window.location.href = '/html/login.html'; // Cambia a tu página de login
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

    // Si tienes imagen dinámica, cambia src del img-alumno
    // document.getElementById('img-alumno').src = data.url_imagen || '/imagenes/Ejemplo-img-alumno.jpg';

  } catch (error) {
    console.error(error);
    alert('No se pudo cargar la información del alumno');
  }
});
