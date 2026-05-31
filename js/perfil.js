const nombreInput = document.getElementById('nombre-perfil');
const apellidoInput = document.getElementById('apellido-perfil');
const emailInput = document.getElementById('mail-perfil');
const passInput = document.getElementById('pass-perfil');
const status = document.getElementById('status');
const noUser = document.getElementById('no-user');
const fotoPerfil = document.getElementById('foto-perfil');
const form = document.getElementById('form-perfil');
const logoutBtn = document.getElementById('logoutBtn');

const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
console.log('perfil.js: usuario logueado', usuarioLogueado);

if (!usuarioLogueado) {
    noUser.textContent = 'No hay usuario logueado. Por favor iniciá sesión primero.';
    form.style.display = 'none';
} else {
    const nombreCompleto = usuarioLogueado.nombre || '';
    const nombrePartes = nombreCompleto.trim().split(' ');
    nombreInput.value = nombrePartes[0] || '';
    apellidoInput.value = nombrePartes.slice(1).join(' ') || '';
    emailInput.value = usuarioLogueado.email || '';
    passInput.value = usuarioLogueado.password || '';
    if (usuarioLogueado.foto) {
        fotoPerfil.src = usuarioLogueado.foto;
    }
    status.textContent = 'Datos cargados del usuario logueado.';
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = 'Solo se muestran los datos del usuario actual en esta página.';
    console.log('perfil.js: submit perfil - datos mostrados, no modificados');
});

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('usuario');
        console.log('perfil.js: usuario deslogueado');
        window.location.href = 'login.html';
    });
}
