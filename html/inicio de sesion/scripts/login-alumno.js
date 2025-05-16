document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Enviar credenciales al servidor (ej. a un endpoint '/login')
        const response = await fetch('/api/login', { // Asegúrate de que esta ruta coincida con tu API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) { // El servidor respondió con un estado 2xx (éxito)
            messageDiv.textContent = '¡Inicio de sesión exitoso!';
            messageDiv.style.color = 'green';

            // Guardar información de la sesión en sessionStorage
            // NUNCA guardes la contraseña aquí. Guarda un token o datos no sensibles.
            window.sessionStorage.setItem('username', data.username); // Ejemplo: guardar nombre de usuario
            window.sessionStorage.setItem('userToken', data.token); // Ejemplo: guardar un token de sesión

            // Opcional: Redirigir a otra página
            // window.location.href = '/dashboard.html';

            // Opcional: Actualizar la UI para mostrar que el usuario está logueado
            console.log('Usuario logueado:', window.sessionStorage.getItem('username'));
            console.log('Token:', window.sessionStorage.getItem('userToken'));

        } else { // El servidor respondió con un error
            messageDiv.textContent = data.message || 'Error: Nombre de usuario o contraseña incorrectos.';
            messageDiv.style.color = 'red';
            // Limpiar sessionStorage si hubo un intento fallido y algo se guardó erróneamente
            window.sessionStorage.removeItem('username');
            window.sessionStorage.removeItem('userToken');
        }
    } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        messageDiv.textContent = 'Error de conexión con el servidor. Inténtalo más tarde.';
        messageDiv.style.color = 'red';
    }
});

// Para verificar en otras páginas si el usuario está logueado:
function checkLoginStatus() {
    const loggedInUser = window.sessionStorage.getItem('username');
    if (loggedInUser) {
        console.log('El usuario', loggedInUser, 'está actualmente logueado en esta sesión.');
        // Aquí puedes habilitar funcionalidades o mostrar información específica del usuario
    } else {
        console.log('Ningún usuario logueado en esta sesión.');
        // Aquí podrías redirigir al login si la página requiere autenticación
        // window.location.href = '/index.html';
    }
}

// Llamar a esta función en las páginas que necesiten saber el estado de la sesión
// checkLoginStatus();