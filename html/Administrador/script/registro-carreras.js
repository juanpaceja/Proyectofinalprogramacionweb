document.addEventListener('DOMContentLoaded', () => {
  const admin = localStorage.getItem('admin');

  if (!admin) {
    window.location.replace('/html/login.html');
    return;
  }

document.getElementById('btn-registro-carreras').addEventListener('click', function(e) {
  e.preventDefault();

  const nombre = document.getElementById('Input-nombre-carrera').value;
  const facultad = document.getElementById('Input-facultad-carrera').value;

  fetch('http://localhost:3000/api/carrera', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nombre, facultad })
  })
  .then(response => response.json())
  .then(data => {
    alert('Carrera registrada correctamente');
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error al registrar carrera');
  });
});

});