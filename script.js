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
    // NOTA: Se ha quitado la referencia a '#series' ya que la eliminamos del HTML
    const secciones = {
        '#inicio': document.getElementById('inicio'),
        '#peliculas': document.getElementById('peliculas'),
        '#documentales': document.getElementById('documentales'),
    };
    
    // Función para cambiar de vista (muestra la sección solicitada y oculta las demás)
    function cambiarVista(idVistaAMostrar) {
        
        const contentRows = document.querySelectorAll('.content-row'); // Todas las filas horizontales

        // 1. Ocultar todas las secciones principales de navegación (banner, cuadrículas)
        for (const id in secciones) {
            const seccion = secciones[id];
            if (seccion) {
                seccion.style.display = 'none';
            }
        }

        // 2. Ocultar todas las filas de contenido por defecto
        contentRows.forEach(row => row.style.display = 'none');
        
        // 3. Control de visibilidad de la sección y las Filas de Contenido
        
        if (idVistaAMostrar === '#inicio') {
            // En Inicio, mostramos el banner y todas las filas de contenido.
            document.getElementById('inicio').style.display = 'block';
            contentRows.forEach(row => row.style.display = 'block');
            
        } else if (idVistaAMostrar === '#series') {
            
            // CORRECCIÓN: SOLO mostramos la fila específica de series
            const seriesRow = findRowByTitle('Series épicas');
            if (seriesRow) {
                seriesRow.style.display = 'block';
            }
            
        } else if (idVistaAMostrar === '#peliculas') {
            
            document.getElementById('peliculas').style.display = 'block'; // Muestra la cuadrícula
            
            // Opcional: Mostrar la fila de 'Tendencias' en la vista de Películas también
            const tendenciasRow = findRowByTitle('Tendencias ahora');
            if (tendenciasRow) {
                tendenciasRow.style.display = 'block';
            }
            
        } else if (idVistaAMostrar === '#documentales') {
            
            document.getElementById('documentales').style.display = 'block'; 
            
        } else {
            // Caso de fallback o búsqueda, mostrar la cuadrícula de películas
            document.getElementById('peliculas').style.display = 'block';
        }

        // Restaura todas las tarjetas a 'block' para que el filtro de búsqueda no persista
        document.querySelectorAll('.movie-card').forEach(tarjeta => tarjeta.style.display = 'block');
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
            window.
