document.addEventListener('DOMContentLoaded', () => {
  const admin = localStorage.getItem('admin');

  if (!admin) {
    alert('Acceso no autorizado. Inicia sesión como Administrador.');
    window.location.replace('/html/login.html');
    return;
  }

  document.getElementById('form-periodo').addEventListener('submit', function (e) {
    e.preventDefault();

    const periodo = {
      nombre: document.getElementById('nombrePeriodo').value,
      fecha_inicio: document.getElementById('fechaInicio').value,
      fecha_fin: document.getElementById('fechaFin').value
    };

    fetch('http://localhost:3000/api/periodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(periodo)
    })
    .then(res => res.json())
    .then(data => {
      alert('Periodo creado correctamente');
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al crear periodo');
    });
  });
});