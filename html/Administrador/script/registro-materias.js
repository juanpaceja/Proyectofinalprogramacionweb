    document.addEventListener('DOMContentLoaded', () => {
      cargarMaterias();
      cargarPeriodos();
      cargarProfesores();

      const formulario = document.getElementById('grupoForm');
      formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        const datos = {
          nombre: document.getElementById('nombre').value,
          horario: document.getElementById('horario').value,
          id_materia: document.getElementById('materia').value,
          id_periodo: document.getElementById('periodo').value,
          id_profesor: document.getElementById('profesor').value
        };

        try {
          const res = await fetch('/grupos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
          });

          if (!res.ok) throw new Error('Error al registrar grupo');

          const resultado = await res.json();
          alert('Grupo registrado con éxito');
          formulario.reset();
        } catch (err) {
          console.error(err);
          alert('Hubo un problema al registrar el grupo');
        }
      });
    });

    async function cargarMaterias() {
      try {
        const res = await fetch('/materias');
        const materias = await res.json();
        const select = document.getElementById('materia');
        select.innerHTML = '<option value="">Seleccione una materia</option>';
        materias.forEach(m => {
          const option = document.createElement('option');
          option.value = m.id;
          option.textContent = m.nombre;
          select.appendChild(option);
        });
      } catch (err) {
        console.error('Error al cargar materias', err);
      }
    }

    async function cargarPeriodos() {
      try {
        const res = await fetch('/periodos');
        const periodos = await res.json();
        const select = document.getElementById('periodo');
        select.innerHTML = '<option value="">Seleccione un periodo</option>';
        periodos.forEach(p => {
          const option = document.createElement('option');
          option.value = p.id;
          option.textContent = p.nombre;
          select.appendChild(option);
        });
      } catch (err) {
        console.error('Error al cargar periodos', err);
      }
    }

    async function cargarProfesores() {
      try {
        const res = await fetch('/profesores');
        const profesores = await res.json();
        const select = document.getElementById('profesor');
        select.innerHTML = '<option value="">Seleccione un profesor</option>';
        profesores.forEach(p => {
          const option = document.createElement('option');
          option.value = p.id;
          option.textContent = p.nombre;
          select.appendChild(option);
        });
      } catch (err) {
        console.error('Error al cargar profesores', err);
      }
    };