document.addEventListener('DOMContentLoaded', () => {
  const admin = localStorage.getItem('admin');

  if (!admin) {
    window.location.replace('/html/login.html');
    return;
  }

document.getElementById('form-maestro').addEventListener('submit', function (e) {
      e.preventDefault();
      const nombre = document.getElementById('Input-de-nombre-maestro').value;

      fetch('http://localhost:3000/api/maestros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre })
      })
      .then(res => res.json())
      .then(data => {
        alert('Maestro registrado con éxito');
        document.getElementById('form-maestro').reset();
      })
      .catch(err => {
        console.error('Error al registrar maestro:', err);
        alert('Error al registrar maestro');
      });
    });
});