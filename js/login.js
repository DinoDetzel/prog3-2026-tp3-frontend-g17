const formulario = document.getElementById("loginForm");

const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    try{

        const respuesta = await fetch("http://localhost:3000/login", {

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

        if(data.success){

            mensaje.innerText = "Login correcto";

            localStorage.setItem("usuario", JSON.stringify(data.usuario));

            setTimeout(() => {

                window.location.href = "./perfil.html";

            }, 1500);

        }else{

            mensaje.innerText = data.message;

        }

    }catch(error){

        console.log(error);

        mensaje.innerText = "Error al conectar con el servidor";

    }

});