document.getElementById('login-form-alumnos').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombre = document.getElementById('Nombre-input-alumno').value;
    const id = document.getElementById('Input-password-alumno').value;

    console.log('Formulario enviado'); // Ya tienes esto

    try {
        console.log('Enviando datos:', { nombre, id }); // 👈 Verifica los datos que se envían

        const response = await fetch('http://localhost:3000/api/login/alumno', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, id })
        });

        console.log('Response status:', response.status); // 👈 Verifica si responde

        const data = await response.json();
        console.log('Respuesta del servidor:', data); // 👈 Esto debería mostrarse si todo va bien

        if (response.ok) {
            localStorage.setItem('alumno', JSON.stringify(data.alumno));
            window.location.href = '/html/alumnos/inicio-alumno.html';
        } else {
            alert(data.error || 'Nombre o ID incorrecto');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error); // 👈 Esto aparecerá si el servidor no responde
        alert('Error de conexión con el servidor');
    }
});
