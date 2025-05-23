document.addEventListener('DOMContentLoaded', () => {
  const resultado = document.getElementById('resultado');

  fetch('http://localhost:3000/api/aprobados')
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text); });
      }
      return response.json();
    })
    .then(data => {
      resultado.textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      resultado.textContent = 'Error al obtener los datos: ' + error.message;
    });
});
//ok