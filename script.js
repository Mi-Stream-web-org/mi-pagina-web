document.addEventListener('DOMContentLoaded', () => {

    // === FUNCIONES AUXILIARES NECESARIAS PARA LA NAVEGACIÓN ===
    
    // Función auxiliar para buscar la fila por el título H2 (crucial para la navegación a 'Series')
    function findRowByTitle(title) {
        const rows = document.querySelectorAll('.content-row');
        for (const row of rows) {
            const h2 = row.querySelector('h2');
            if (h2 && h2.textContent.trim() === title) {
                return row;
            }
        }
        return null;
    }

    // 1.2 Obtener todas las secciones principales por su ID
    const secciones = {
        '#inicio': document.getElementById('inicio'),
        '#peliculas': document.getElementById('peliculas'),
        '#series': document.getElementById('series'),
        '#documentales': document.getElementById('documentales'),
    };
    
    // Función para cambiar de vista (muestra la sección solicitada y oculta las demás)
    function cambiarVista(idVistaAMostrar) {
        
        const contentRows = document.querySelectorAll('.content-row'); // Todas las filas horizontales

        // 1. Ocultar todas las secciones principales y de navegación
        for (const id in secciones) {
            const seccion = secciones[id];
            if (seccion) {
                seccion.style.display = 'none';
            }
        }

        // 2. Control de visibilidad de las Filas de Contenido y Secciones
        
        if (idVistaAMostrar === '#inicio') {
            // En Inicio, mostramos todas las filas horizontales
            document.getElementById('inicio').style.display = 'block';
            contentRows.forEach(row => row.style.display = 'block');
            
        } else if (idVistaAMostrar === '#series') {
            
            document.getElementById('series').style.display = 'block'; 
            
            // Ocultamos todas las filas horizontales primero
            contentRows.forEach(row => row.style.display = 'none');
            
            // Y solo mostramos la fila específica de series
            const seriesRow = findRowByTitle('Series épicas');
            if (seriesRow) {
                seriesRow.style.display = 'block';
            }
            
        } else if (idVistaAMostrar === '#peliculas') {
            
            document.getElementById('peliculas').style.display = 'block'; // Muestra la cuadrícula
            
            // Ocultamos todas las filas horizontales
            contentRows.forEach(row => row.style.display = 'none');
            
        } else if (idVistaAMostrar === '#documentales') {
            
            document.getElementById('documentales').style.display = 'block'; 
            contentRows.forEach(row => row.style.display = 'none');
            
        } else {
            // Caso de fallback o búsqueda
            document.getElementById('peliculas').style.display = 'block';
        }

        // Si se llama desde la búsqueda, restauramos todas las tarjetas a 'block' antes de filtrar
        if (idVistaAMostrar !== '#inicio') {
             document.querySelectorAll('.movie-card').forEach(tarjeta => tarjeta.style.display = 'block');
        }
    }

    // Ocultar todas las secciones al inicio, excepto #inicio (el banner hero)
    cambiarVista('#inicio');


    // 1.3 Asignar Eventos a los Enlaces de Navegación
    const enlacesNavegacion = document.querySelectorAll('.navbar ul li a');
    enlacesNavegacion.forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            const idObjetivo = enlace.getAttribute('href');

            if (idObjetivo && idObjetivo.startsWith('#')) {
                e.preventDefault(); 
                cambiarVista(idObjetivo);
                // Limpia la búsqueda si navegas
                document.getElementById('search-input').value = '';
            }
        });
    });
    
    // 1.4 Asignar Eventos a los botones de acción del Banner Hero
    const btnPlayBanner = document.querySelector('.banner-content .btn-play');
    const btnInfo = document.querySelector('.btn-info');
    
    if (btnPlayBanner) {
        btnPlayBanner.addEventListener('click', () => {
            // El botón principal reproduce el video de fondo (Moana.mp4)
            window.open('peliculas/moana.mp4', '_blank'); 
        });
    }
    
    if (btnInfo) {
        btnInfo.addEventListener('click', () => {
            alert('Agregado a tu lista.');
        });
    }

    // === 1.5 Lógica de Reproducción de Tarjetas ===
    document.querySelectorAll('.movie-card').forEach(card => {
        // Lee la URL del video del atributo data-video-url
        const videoURL = card.getAttribute('data-video-url');
        
        // Selecciona todos los botones que tengan data-action="play"
        const playButtons = card.querySelectorAll('[data-action="play"]'); 
        
        playButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); 
                
                if (videoURL) {
                    window.open(videoURL, '_blank'); 
                } else {
                    alert('Error: La URL del video no está definida para esta película.');
                }
            });
        });
        
        // Manejo del botón 'Mi lista'
        const addToListButton = card.querySelector('.btn:not([data-action="play"])');
        if (addToListButton && addToListButton.textContent.includes('Mi lista')) {
            addToListButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const titleElement = card.querySelector('h3, h4');
                const title = titleElement ? titleElement.textContent : "Contenido Desconocido";
                alert(`"${title}" agregado a tu lista.`);
            });
        }
    });


    // === 2. Lógica de Búsqueda (SIMPLIFICADA Y MÁS ESTABLE) ===

    const inputBusqueda = document.getElementById('search-input'); 
    const contenedorPeliculas = secciones['#peliculas']; 
    const todasLasTarjetas = document.querySelectorAll('.movie-card');
    const searchButton = document.getElementById('search-button');

    function filtrarPeliculas() {
        const textoBusqueda = inputBusqueda.value.toLowerCase().trim();

        if (textoBusqueda.length > 0) {
            // 1. Mostrar la sección de Películas (la cuadrícula) y ocultar las filas de contenido
            cambiarVista('#peliculas'); 
            
            // 2. Filtrar las tarjetas
            todasLasTarjetas.forEach(tarjeta => {
                const tituloElemento = tarjeta.querySelector('h3, h4'); 
                if (!tituloElemento) return; 

                const tituloPelicula = tituloElemento.textContent.toLowerCase();

                if (tituloPelicula.includes(textoBusqueda)) {
                    tarjeta.style.display = 'block'; 
                } else {
                    tarjeta.style.display = 'none';
                }
            });

        } else {
            // Si el campo de búsqueda está vacío, volvemos a la vista de inicio
            cambiarVista('#inicio');
        }
    }

    // Asignamos el evento al input (búsqueda en tiempo real)
    inputBusqueda.addEventListener('input', filtrarPeliculas);
    
    // Asignamos el evento al botón de búsqueda
    if (searchButton) {
        searchButton.addEventListener('click', (e) => {
             e.preventDefault(); 
             filtrarPeliculas();
        });
    }
});
