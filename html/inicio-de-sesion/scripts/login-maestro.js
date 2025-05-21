document.getElementById('login-form-maestros').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombre = document.getElementById('Nombre-input-maestro').value;
    const id = document.getElementById('Input-password-maestro').value;

    try {
        const response = await fetch('http://localhost:3000/api/login/maestro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, id })
        });

        const data = await response.json();

        if (response.ok) {
            // Guarda TODOS los datos del maestro en localStorage (opcional)
            localStorage.setItem('maestro', JSON.stringify(data.maestro));
            
            // Guarda específicamente el ID en localStorage para fácil acceso
            localStorage.setItem('id_profesor', data.maestro.id_profesor); // 👈 Clave nueva
            
            window.location.href = '/html/Maestros/inicio-maestro.html';
        } else {
            alert(data.error || 'Nombre o ID incorrecto');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error de conexión con el servidor');
    }
});