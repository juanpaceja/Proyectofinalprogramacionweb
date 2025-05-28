document.addEventListener('DOMContentLoaded', async () => {
  const adminStr = localStorage.getItem('admin');
  if (!adminStr) {
    window.location.replace('/html/login.html');
    return;
  }

  const admin = JSON.parse(adminStr);
  const idAdmin = admin.id_admin;
  console.log('Administrador cargado desde localStorage:', admin);

  try {
    const response = await fetch(`http://localhost:3000/api/admin/${idAdmin}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error('Error al obtener datos del administrador');

    const data = await response.json();

    document.getElementById('nombre-admin').textContent = data.nombre || admin.nombre || 'Sin nombre';


  } catch (error) {
    console.error(error);
    alert('No se pudo cargar la información del administrador');
  }
});

function cerrarSesion() {
  localStorage.removeItem('admin');
  localStorage.removeItem('id_admin');
  window.location.href = '/html/inicio.html';
}