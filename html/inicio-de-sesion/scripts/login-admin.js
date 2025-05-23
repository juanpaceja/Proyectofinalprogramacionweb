document.getElementById('login-form-admin').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre-input-admin').value;
    const id = document.getElementById('Input-password-admin').value;

    try {
        const response = await fetch('http://localhost:3000/api/login/admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, id })
        });

        const data = await response.json();

        if (response.ok) {
            // Guarda TODOS los datos del maestro en localStorage (opcional)
            localStorage.setItem('admin', JSON.stringify(data.admin));
            
            // Guarda específicamente el ID en localStorage para fácil acceso
            localStorage.setItem('id_admin', data.admin.id_admin); // 👈 Clave nueva
            
            window.location.href = '/html/Administrador/inicio-admin.html';
            console.log(data.admin);
        } else {
            alert(data.error || 'Nombre o ID incorrecto');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error de conexión con el servidor');
    }
});