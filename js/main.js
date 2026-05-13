async function obtenerServicios() {

    try {

        const response = await fetch(
            'http://localhost:3000/servicios'
        );

        const servicios = await response.json();

        console.log(servicios);

    } catch (error) {

        console.log('Error al obtener servicios');

    }

}

obtenerServicios();