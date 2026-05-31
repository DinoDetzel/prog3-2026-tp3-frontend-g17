const form = document.getElementById('registerForm');
const mensaje = document.getElementById('mensaje');
const spinner = document.getElementById('spinner');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('register.js: iniciar registro', { email, nombre });

    try {
        spinner.style.display = 'block';
        const resp = await fetch('https://prog3-2026-tp3-backend-g17.onrender.com//register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, password })
        });

        const data = await resp.json();
        console.log('register.js: respuesta recibida', data);

        if (data && data.success) {
            mensaje.innerText = 'Registro exitoso';
            setTimeout(() => { window.location.href = 'login.html'; }, 1200);
        } else if (data && data.mensaje) {
            mensaje.innerText = data.mensaje;
        } else {
            mensaje.innerText = 'Error en el registro';
        }

    } catch (error) {
        console.error('register.js: error', error);
        mensaje.innerText = 'No se pudo conectar con el servidor';
    } finally {
        spinner.style.display = 'none';
    }
});
