document.addEventListener('DOMContentLoaded', () => {
  const admin = localStorage.getItem('admin');

  if (!admin) {
    alert('Acceso no autorizado. Inicia sesión como Administrador.');
    window.location.replace('/html/login.html');
    return;
  }

  cargarCarreras();
  cargarPeriodos();
  cargarProfesores();

  const carreraSelect = document.getElementById('carrera');
  carreraSelect.addEventListener('change', (e) => {
    const idCarrera = e.target.value;
    if (idCarrera) {
      cargarMateriasPorCarrera(idCarrera);
    } else {
      const materiaSelect = document.getElementById('materia');
      materiaSelect.innerHTML = '<option value="">Seleccione una materia</option>';
    }
  });

  const formulario = document.getElementById('grupoForm');
  if (!formulario) {
    console.error('No se encontró el formulario grupoForm');
    return;
  }

  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const checkboxes = document.querySelectorAll('input[name="dias"]:checked');
    const diasSeleccionados = Array.from(checkboxes).map(cb => cb.value);
    const horaInicio = document.getElementById('horaInicio').value;
    const horaFin = document.getElementById('horaFin').value;

    if (horaInicio >= horaFin) {
      alert('La hora de inicio debe ser menor que la hora de fin');
      return;
    }

    if (diasSeleccionados.length === 0 || !horaInicio || !horaFin) {
      alert('Por favor, seleccione los días y especifique las horas de inicio y fin.');
      return;
    }

    const horario = diasSeleccionados.join(', ') + ' ' + horaInicio + ' - ' + horaFin;

    const datos = {
      nombre: document.getElementById('nombre').value.trim(),
      horario: horario,
      id_materia: document.getElementById('materia').value,
      id_periodo: document.getElementById('periodo').value,
      id_profesor: document.getElementById('profesor').value,
    };

    if (!datos.nombre || !datos.id_materia || !datos.id_periodo || !datos.id_profesor) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/grupo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });

      if (!res.ok) throw new Error(`Error al registrar grupo: ${res.statusText}`);

      await res.json();
      alert('Grupo registrado con éxito');
      formulario.reset();
    } catch (err) {
      console.error(err);
      alert('Hubo un problema al registrar el grupo');
    }
  });
});

// ====================== FUNCIONES AUXILIARES ======================

async function cargarCarreras() {
  const loading = document.getElementById('loadingCarreras');
  if (loading) loading.style.display = 'inline';

  try {
    const res = await fetch('http://localhost:3000/api/carreras');
    if (!res.ok) throw new Error('Error en respuesta carreras');
    const carreras = await res.json();

    const select = document.getElementById('carrera');
    select.innerHTML = '<option value="">Seleccione una carrera</option>';
    carreras.forEach(c => {
      const option = document.createElement('option');
      option.value = c.id_carrera;
      option.textContent = c.nombre;
      select.appendChild(option);
    });

    if (loading) loading.style.display = 'none';
  } catch (err) {
    console.error('Error al cargar carreras', err);
    if (loading) loading.textContent = 'Error al cargar carreras';
  }
}

async function cargarMateriasPorCarrera(idCarrera) {
  const loading = document.getElementById('loadingMaterias');
  if (loading) loading.style.display = 'inline';

  try {
    const res = await fetch('http://localhost:3000/api/materia');
    if (!res.ok) throw new Error('Error en respuesta materias');
    const materias = await res.json();

    const select = document.getElementById('materia');
    select.innerHTML = '<option value="">Seleccione una materia</option>';

    materias
      .filter(m => m.id_carrera == idCarrera)
      .forEach(m => {
        const option = document.createElement('option');
        option.value = m.id_materia;
        option.textContent = `${m.nombre} (${m.codigo})`;
        select.appendChild(option);
      });

    if (loading) loading.style.display = 'none';
  } catch (err) {
    console.error('Error al cargar materias', err);
    if (loading) loading.textContent = 'Error al cargar materias';
  }
}

async function cargarPeriodos() {
  const loading = document.getElementById('loadingPeriodos');
  if (loading) loading.style.display = 'inline';

  try {
    const res = await fetch('http://localhost:3000/api/periodo');
    if (!res.ok) throw new Error('Error en respuesta periodos');
    const periodos = await res.json();

    const select = document.getElementById('periodo');
    select.innerHTML = '<option value="">Seleccione un periodo</option>';

    periodos.forEach(p => {
      const option = document.createElement('option');
      option.value = p.id_periodo;
      option.textContent = p.nombre;
      select.appendChild(option);
    });

    if (loading) loading.style.display = 'none';
  } catch (err) {
    console.error('Error al cargar periodos', err);
    if (loading) loading.textContent = 'Error al cargar periodos';
  }
}

async function cargarProfesores() {
  const loading = document.getElementById('loadingProfesores');
  if (loading) loading.style.display = 'inline';

  try {
    const res = await fetch('http://localhost:3000/api/maestros');
    if (!res.ok) throw new Error('Error en respuesta profesores');
    const profesores = await res.json();

    const select = document.getElementById('profesor');
    select.innerHTML = '<option value="">Seleccione un profesor</option>';

    profesores.forEach(p => {
      const option = document.createElement('option');
      option.value = p.id_profesor;
      option.textContent = p.nombre;
      select.appendChild(option);
    });

    if (loading) loading.style.display = 'none';
  } catch (err) {
    console.error('Error al cargar profesores', err);
    if (loading) loading.textContent = 'Error al cargar profesores';
  }
}