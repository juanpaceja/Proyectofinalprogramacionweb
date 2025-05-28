window.addEventListener('DOMContentLoaded', () => {
    localStorage.clear();
});

document.getElementById('login-form-alumnos').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombre = document.getElementById('Nombre-input-alumno').value;
    const id = document.getElementById('Input-password-alumno').value;

    try {
        const response = await fetch('http://localhost:3000/api/login/alumno', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, id })
        });

        const data = await response.json();

        if (response.ok) {
            // Guarda TODOS los datos del alumno en localStorage (opcional)
            localStorage.setItem('alumno', JSON.stringify(data.alumno));
            
            // Guarda específicamente el ID en localStorage para fácil acceso
            localStorage.setItem('id_alumno', data.alumno.id_alumno); // 👈 Clave nueva
            
            window.location.href = '/html/alumnos/inicio-alumno.html';
        } else {
            alert(data.error || 'Nombre o ID incorrecto');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error de conexión con el servidor');
    }
});