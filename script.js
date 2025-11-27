document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener los elementos clave del DOM usando sus IDs en inglés
    const inputBusqueda = document.getElementById('search-input'); 
    const contenedorPeliculas = document.getElementById('movies');

    if (!inputBusqueda || !contenedorPeliculas) {
        console.error("Error: No se encontraron los elementos de búsqueda. Verifica los IDs 'search-input' o 'movies'.");
        return;
    }

    // Selecciona todas las tarjetas de películas
    const tarjetasPeliculas = contenedorPeliculas.querySelectorAll('.movie-card');

    // 2. Definir la función de filtrado
    function filtrarPeliculas() {
        // Obtener el texto escrito por el usuario (limpio y en minúsculas)
        const textoBusqueda = inputBusqueda.value.toLowerCase().trim();

        // Iterar sobre cada tarjeta de película
        tarjetasPeliculas.forEach(tarjeta => {
            // Obtener el título de la película (h3 dentro de .movie-info)
            const tituloElemento = tarjeta.querySelector('.movie-info h3');
            
            if (!tituloElemento) return; 

            const tituloPelicula = tituloElemento.textContent.toLowerCase();

            // 3. Lógica de Filtrado
            if (tituloPelicula.includes(textoBusqueda)) {
                // Muestra la tarjeta 
                tarjeta.style.display = ''; 
            } else {
                // Oculta la tarjeta
                tarjeta.style.display = 'none';
            }
        });
    }

    // 4. Asignar el evento a la barra de búsqueda
    // Se ejecuta con cada tecla presionada.
    inputBusqueda.addEventListener('input', filtrarPeliculas);
});
