document.addEventListener('DOMContentLoaded', () => {
    // === 1. Lógica de Navegación y Vistas ===

    // 1.1 Obtener los enlaces de la navegación
    const linkInicio = document.querySelector('nav ul li a[href="#inicio"]');
    const linkPeliculas = document.querySelector('nav ul li a[href="#peliculas"]');
    // Puedes agregar más enlaces aquí (Series, Documentales)

    // 1.2 Obtener las secciones (vistas)
    const seccionInicio = document.getElementById('inicio');
    const seccionPeliculas = document.getElementById('peliculas');

    // Función para cambiar de vista
    function cambiarVista(vistaAMostrar) {
        // Oculta todas las secciones
        seccionInicio.style.display = 'none';
        seccionPeliculas.style.display = 'none';
        // Agrega aquí las otras secciones si existen

        // Muestra la sección deseada
        if (vistaAMostrar) {
            vistaAMostrar.style.display = 'block';
        }
    }
    
    // Asegurarse de que la sección de Inicio se vea al cargar, si existe
    if (seccionInicio) {
        seccionInicio.style.display = 'block';
    }
    // Asegurarse de que Películas esté oculta al inicio (aunque ya lo hace el CSS)
    if (seccionPeliculas) {
        seccionPeliculas.style.display = 'none';
    }


    // 1.3 Asignar Eventos a los Enlaces
    if (linkInicio && seccionInicio) {
        linkInicio.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que la página salte al hash #inicio
            cambiarVista(seccionInicio);
        });
    }

    if (linkPeliculas && seccionPeliculas) {
        linkPeliculas.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que la página salte al hash #peliculas
            cambiarVista(seccionPeliculas);
        });
    }

    // === 2. Lógica de Búsqueda (Se mantiene) ===

    const inputBusqueda = document.getElementById('search-input'); 
    const contenedorPeliculas = document.getElementById('peliculas');

    if (!inputBusqueda || !contenedorPeliculas) {
        console.error("Error: No se encontraron elementos de búsqueda.");
        return;
    }

    const tarjetasPeliculas = contenedorPeliculas.querySelectorAll('.movie-card');

    function filtrarPeliculas() {
        const textoBusqueda = inputBusqueda.value.toLowerCase().trim();

        // Si hay texto en la búsqueda, muestra la sección de películas para que se vea el resultado
        if (textoBusqueda.length > 0) {
            cambiarVista(seccionPeliculas);
        }

        tarjetasPeliculas.forEach(tarjeta => {
            const tituloElemento = tarjeta.querySelector('.movie-info h3');
            if (!tituloElemento) return; 

            const tituloPelicula = tituloElemento.textContent.toLowerCase();

            if (tituloPelicula.includes(textoBusqueda)) {
                tarjeta.style.display = 'block'; 
            } else {
                tarjeta.style.display = 'none';
            }
        });
    }

    inputBusqueda.addEventListener('input', filtrarPeliculas);

});
