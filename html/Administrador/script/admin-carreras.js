

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/carrera`);
    if (!response.ok) throw new Error('Error al obtener carreras');

    const carreras = await response.json();
    const container = document.getElementById('carreras-cards');
    container.innerHTML = '';

    carreras.forEach(carrera => {
      const card = document.createElement('div');
      card.className = 'col';
      card.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${carrera.nombre}</h5>
            <p class="card-text">ID Carrera: ${carrera.id_carrera}</p>
            <a href="/html/Administrador/admin-materia.html?id=${carrera.id_carrera}" class="btn btn-primary">Ver más</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('carreras-cards').innerHTML = '<p class="text-danger">Error al cargar las carreras.</p>';
  }
});