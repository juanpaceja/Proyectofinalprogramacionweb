document.addEventListener('DOMContentLoaded', async () => {
  const maestroStr = localStorage.getItem('maestro');
  if (!maestroStr) {
    alert('No hay sesión iniciada');
    window.location.href = '/html/login.html';
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

    document.getElementById('nombre-maestro').textContent = maestro.nombre || 'Sin nombre';

    // Si tienes imagen dinámica, cambia src del img-alumno
    // document.getElementById('img-alumno').src = data.url_imagen || '/imagenes/Ejemplo-img-alumno.jpg';

  } catch (error) {
    console.error(error);
    alert('No se pudo cargar la información del profesor');
  }
});
