// Obtener los enlaces de las secciones
const inicioLink = document.getElementById('inicio-link');
const peliculasLink = document.getElementById('peliculas-link');

// Obtener las secciones
const inicioSection = document.getElementById('inicio');
const peliculasSection = document.getElementById('peliculas');

// Función para mostrar solo la sección de inicio
// Función para mostrar las películas
function showMovies() {
    const peliculasContent = document.getElementById("peliculas-content");
    peliculasContent.style.display = "block"; // Muestra el contenido de Películas
}
function showInicio() {
    inicioSection.style.display = 'block';
    peliculasSection.style.display = 'none';
}

// Función para mostrar solo la sección de películas
function showPeliculas() {
    peliculasSection.style.display = 'block';
    inicioSection.style.display = 'none';
}

// Event listeners para los enlaces de navegación
inicioLink.addEventListener('click', function(e) {
    e.preventDefault();
    showInicio();
});

peliculasLink.addEventListener('click', function(e) {
    e.preventDefault();
    showPeliculas();
});


// Mostrar la sección de inicio por defecto cuando se cargue la página
showInicio();

