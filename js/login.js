const formulario = document.getElementById("loginForm");

const mensaje = document.getElementById("mensaje");
const spinner = document.getElementById('spinner');

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    try {
        console.log('login.js: submit formulario', { email });
        spinner && (spinner.style.display = 'block');

        const respuesta = await fetch("https://prog3-2026-tp3-backend-g17.onrender.com//login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await respuesta.json();
        console.log('login.js: respuesta', data);

        // soportar dos formatos: { success, usuario } o { message, data: { success, usuario } }
        const success = data.success || (data.data && data.data.success);
        const usuario = data.usuario || (data.data && data.data.usuario);

        if (success) {
            console.log('login.js: login exitoso', usuario && usuario.email);
            mensaje.innerText = "Login correcto";
            localStorage.setItem("usuario", JSON.stringify(usuario));
            setTimeout(() => { window.location.href = "./perfil.html"; }, 1200);
        } else {
            console.log('login.js: login fallido');
            mensaje.innerText = data.mensaje || data.message || 'Credenciales inválidas';
        }

    } catch (error) {

        console.log(error);

        mensaje.innerText = "Error al conectar con el servidor";

    }
    finally {
        spinner && (spinner.style.display = 'none');
    }

});