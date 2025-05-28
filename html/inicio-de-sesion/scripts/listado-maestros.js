window.addEventListener('DOMContentLoaded', () => {
    localStorage.clear();
});

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.row.g-4');

  try {
    const response = await fetch('http://localhost:3000/api/maestros');
    if (!response.ok) throw new Error('Error al obtener los maestros');

    const maestros = await response.json();

    if (!Array.isArray(maestros) || maestros.length === 0) {
      container.innerHTML = '<p class="text-muted text-center">No se encontraron maestros registrados.</p>';
      return;
    }

    container.innerHTML = ''; // Limpia contenido de ejemplo

    maestros.forEach(maestro => {
      const card = document.createElement('div');
      card.className = 'col-12 col-sm-6 col-md-4 col-lg-3';
      card.innerHTML = `
        <div class="card h-100">
          <img src="/imagenes/Ejemplo-img-alumno.jpg" class="card-img-top" alt="Imagen del maestro" />
          <div class="card-body">
            <h5 class="card-title">${maestro.nombre}</h5>
            <p class="card-text">profesor@correoescolar.com</p>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error:', error);
    container.innerHTML = `<p class="text-danger text-center">Error al cargar los maestros: ${error.message}</p>`;
  }
});
