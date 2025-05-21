document.addEventListener('DOMContentLoaded', () => {
  // Elementos del formulario
  const form = document.querySelector('form');
  const nombreInput = document.getElementById('Input-nombre-alumno');
  const matriculaInput = document.getElementById('Input-matricula-alumno');
  const semestreSelect = document.getElementById('Input-de-semestre-alumno');
  const carreraSelect = document.getElementById('Input-de-carrera-alumno');
  const grupoSelect = document.getElementById('Input-de-grupo-alumno');
  const submitBtn = document.getElementById('btn-registro-alumnos');

  // Función para cargar opciones desde el backend
  const cargarOpciones = async (url, selectElement, valueField, textField) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();

      // Limpiar y agregar opción por defecto
      selectElement.innerHTML = '<option value="">-- Seleccione --</option>';

      // Agregar opciones dinámicas
      data.forEach(item => {
        const option = document.createElement('option');
        option.value = item[valueField];
        option.textContent = item[textField];
        selectElement.appendChild(option);
      });
    } catch (error) {
      console.error(`Error al cargar ${url}:`, error);
      selectElement.innerHTML = '<option value="">Error al cargar opciones</option>';
    }
  };

  // Cargar todas las opciones al iniciar
  const cargarTodasLasOpciones = async () => {
    await Promise.all([
      cargarOpciones('/semestres', semestreSelect, 'id_periodo', 'nombre'),
      cargarOpciones('/carreras', carreraSelect, 'id_carrera', 'nombre'),
      cargarOpciones('/grupos', grupoSelect, 'id_grupo', 'nombre')
    ]);
  };

  // Manejar el envío del formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Deshabilitar el botón para evitar múltiples envíos
    submitBtn.disabled = true;
    submitBtn.textContent = 'Registrando...';

    // Obtener los valores del formulario
    const nuevoAlumno = {
      nombre: nombreInput.value.trim(),
      matricula: matriculaInput.value.trim(),
      id_carrera: carreraSelect.value,
      id_periodo: semestreSelect.value,
      grupo: grupoSelect.value
    };

    try {
      // Enviar los datos al backend
      const response = await fetch('/estudiantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoAlumno)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al registrar alumno');
      }

      const result = await response.json();
      alert(`Alumno registrado exitosamente con ID: ${result.id}`);
      form.reset();
    } catch (error) {
      console.error('Error al registrar alumno:', error);
      alert(`Error: ${error.message}`);
    } finally {
      // Restablecer el botón
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar';
    }
  });

  // Iniciar la carga de opciones
  cargarTodasLasOpciones();
});
