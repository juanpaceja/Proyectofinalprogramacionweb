window.addEventListener('DOMContentLoaded', async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
const id_carrera = urlParams.get('id');

    const response = await fetch(`http://localhost:3000/api/materia/carrera/${id_carrera}`);
    if (!response.ok) throw new Error('Error al obtener materias');

    const materias = await response.json();
    const container = document.getElementById('materias-cards');
    container.innerHTML = '';

    materias.forEach(materia => {
      const card = document.createElement('div');
      card.className = 'col w-25';
      card.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${materia.nombre}</h5>
            <p class="card-text">Código: ${materia.codigo} | Créditos: ${materia.creditos}</p>
            <a href="/html/Administrador/admin-grupos.html?id=${materia.id_materia}" class="btn btn-primary">Ver grupos</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    document.getElementById('materias-cards').innerHTML = '<p class="text-danger">Error al cargar materias.</p>';
  }
});