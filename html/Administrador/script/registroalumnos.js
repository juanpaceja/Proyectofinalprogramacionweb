// En registroalumnos.js
document.addEventListener('DOMContentLoaded', () => {
  const carreraSelect = document.getElementById('carrera');
  const grupoSelect = document.getElementById('grupo');
  const alumnoForm = document.getElementById('alumnoForm');
  const grupoForm = document.getElementById('grupoForm');
  const idAlumnoInput = document.getElementById('id_alumno');
  const cancelarBtn = document.createElement('button'); // Botón para cancelar

  let idCarreraSeleccionada = null;

  // Configurar botón cancelar
  cancelarBtn.type = 'button';
  cancelarBtn.textContent = 'Cancelar';
  cancelarBtn.className = 'btn btn-secondary ms-2';
  cancelarBtn.addEventListener('click', () => {
    alumnoForm.style.display = 'block';
    grupoForm.style.display = 'none';
    alumnoForm.reset();
    grupoSelect.innerHTML = '<option value="">Seleccione un grupo</option>';
  });

  // Insertar botón cancelar junto al botón de asignar grupo
  grupoForm.querySelector('button[type="submit"]').insertAdjacentElement('afterend', cancelarBtn);

  async function cargarCarreras() {
    try {
      const res = await fetch('http://localhost:3000/api/carrera');
      if (!res.ok) throw new Error('Error al cargar carreras');
      const carreras = await res.json();
      carreraSelect.innerHTML = '<option value="">Seleccione una carrera</option>';
      carreras.forEach(carrera => {
        const option = document.createElement('option');
        option.value = carrera.id_carrera;
        option.textContent = carrera.nombre;
        carreraSelect.appendChild(option);
      });
    } catch (error) {
      console.error(error);
      alert('No se pudieron cargar las carreras.');
    }
  }

  async function cargarGrupos(idCarrera) {
    try {
      grupoSelect.innerHTML = '<option value="">Cargando grupos...</option>';
      const res = await fetch(`http://localhost:3000/api/grupo/carrera?idCarrera=${idCarrera}`);
      if (!res.ok) throw new Error('Error al cargar grupos');
      const grupos = await res.json();
      
      if (grupos.length === 0) {
        grupoSelect.innerHTML = '<option value="">No hay grupos disponibles para esta carrera</option>';
        return;
      }
      
      grupoSelect.innerHTML = '<option value="">Seleccione un grupo</option>';
      grupos.forEach(grupo => {
        const option = document.createElement('option');
        option.value = grupo.id_grupo;
        option.textContent = `${grupo.nombre_grupo} - ${grupo.nombre_materia} (${grupo.horario})`;
        grupoSelect.appendChild(option);
      });
    } catch (error) {
      console.error(error);
      grupoSelect.innerHTML = '<option value="">No se pudieron cargar los grupos</option>';
    }
  }

  carreraSelect.addEventListener('change', (e) => {
    idCarreraSeleccionada = e.target.value;
  });

  alumnoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!alumnoForm.checkValidity()) {
      alumnoForm.reportValidity();
      return;
    }

    const alumno = {
      nombre: alumnoForm.nombre.value.trim(),
      matricula: alumnoForm.matricula.value.trim(),
      id_carrera: alumnoForm.carrera.value
    };

    try {
      const res = await fetch('http://localhost:3000/api/estudiantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alumno)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al agregar alumno');
      }
      
      const data = await res.json();
      const idAlumno = data.id;
      
      if (!idAlumno) {
        throw new Error('No se recibió el ID del alumno creado');
      }
      
      alert('Alumno registrado correctamente. Ahora puede asignarle un grupo.');
      
      alumnoForm.style.display = 'none';
      grupoForm.style.display = 'block';
      idAlumnoInput.value = idAlumno;
      
      if (idCarreraSeleccionada) {
        cargarGrupos(idCarreraSeleccionada);
      }
    } catch (error) {
      console.error(error);
      alert(`No se pudo registrar el alumno: ${error.message}`);
    }
  });

  grupoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!grupoForm.checkValidity()) {
      grupoForm.reportValidity();
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/estudiantes/grupo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_alumno: idAlumnoInput.value,
          id_grupo: grupoForm.grupo.value
        })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al asignar grupo');
      }
      
      alert('Grupo asignado correctamente');
      
      // Resetear todo
      alumnoForm.reset();
      grupoForm.reset();
      alumnoForm.style.display = 'block';
      grupoForm.style.display = 'none';
      grupoSelect.innerHTML = '<option value="">Seleccione un grupo</option>';
    } catch (error) {
      console.error(error);
      alert(`No se pudo asignar el grupo: ${error.message}`);
    }
  });

  cargarCarreras();
});