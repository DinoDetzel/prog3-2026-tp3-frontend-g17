async function obtenerServicios() {

    try {

        const contenedor = document.getElementById('servicioContenedor');
        const search = document.getElementById('searchServicios');


        contenedor.innerHTML = 'Cargando...';
        const response = await fetch('https://prog3-2026-tp3-backend-g17.onrender.com//servicios');
        const serviciosResponse = await response.json();
        console.log('main.js: servicios cargados', serviciosResponse.data);

        let current = serviciosResponse.data;

        function render(list) {
            if (!list || list.length === 0) {
                contenedor.innerHTML = '<p>No hay servicios</p>';
                return;
            }
            contenedor.innerHTML = '';
            list.forEach(s => {
                const card = document.createElement('div');
                card.className = 'servicio_card';
                card.innerHTML = `
                    <img src="${s.img || '../assets/img/musculacion.png'}" alt="${s.nombre}">
                    <h3>${s.nombre}</h3>
                    <p>${s.descripcion || ''}</p>
                    <span class="servicio_precio">${s.precio || ''}</span>
                `;
                contenedor.appendChild(card);
            });
        }

        render(current);

        search.addEventListener('input', (e) => {
            const q = e.target.value.trim().toLowerCase();
            console.log('main.js: buscar', q);
            if (!q) {
                render(current);
                return;
            }
            const filtered = current.filter(s => (s.nombre || '').toLowerCase().includes(q));
            render(filtered);
        });

    } catch (error) {

        console.error('main.js: Error al obtener servicios', error);

    }

}

obtenerServicios();