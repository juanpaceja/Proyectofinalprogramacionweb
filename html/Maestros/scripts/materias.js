const profesorId = localStorage.getItem('id_profesor');

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/materia/maestro/${profesorId}`);
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
            <a href="#" class="btn btn-primary ver-grupos-btn" data-id="${materia.id_materia}">Ver grupos</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    // Delegación de eventos para los botones "Ver grupos"
container.addEventListener('click', (e) => {

  if (e.target.classList.contains('ver-grupos-btn')) {
    e.preventDefault();
    const idMateria = e.target.getAttribute('data-id');
    console.log('Guardando id_materia:', idMateria);
    localStorage.setItem('id_materia', idMateria);
    window.location.href = '/html/maestros/grupos.html';
  }
});

  } catch (error) {
    console.error(error);
    document.getElementById('materias-cards').innerHTML = '<p class="text-danger">Error al cargar materias.</p>';
  }
});