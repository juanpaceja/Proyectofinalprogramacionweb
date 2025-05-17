document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const tipo = document.getElementById('tipo').value;
            const nombre = document.getElementById('nombre').value;
            const contrasena = document.getElementById('contrasena').value;

            if (!nombre.trim() || !contrasena.trim()) {
                alert('Por favor, ingresa tu nombre y contraseña.');
                return;
            }

            const datosLogin = { tipo, nombre, contrasena };

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datosLogin)
                });

                const resultado = await response.json();

                if (response.ok) {
                    alert(resultado.message || '¡Inicio de sesión exitoso!');
                    if (resultado.redirect) {
                        window.location.href = resultado.redirect;
                    }
                } else {
                    alert(resultado.error || 'Credenciales incorrectas.');
                }

            } catch (error) {
                console.error('Error al intentar iniciar sesión:', error);
                alert('Error del servidor. Inténtalo más tarde.');
            }
        });
    } else {
        console.error("Formulario de login no encontrado.");
    }
});
