document.addEventListener('DOMContentLoaded', () => {
 
    const inputBusqueda = document.getElementById('input-busqueda');
    const contenedorPeliculas = document.getElementById('peliculas');

    const tarjetasPeliculas = contenedorPeliculas.querySelectorAll('.movie-card');

 
    function filtrarPeliculas() {
      
        const textoBusqueda = inputBusqueda.value.toLowerCase().trim();

       
        tarjetasPeliculas.forEach(tarjeta => {
           
            const tituloElemento = tarjeta.querySelector('.movie-info h3');
            
 
            if (!tituloElemento) return; 

            const tituloPelicula = tituloElemento.textContent.toLowerCase();

            if (tituloPelicula.includes(textoBusqueda)) {
               
                tarjeta.style.display = 'flex'; 
            } else {

                tarjeta.style.display = 'none';
            }
        });
    }


    inputBusqueda.addEventListener('input', filtrarPeliculas);


    // ya que el filtro se aplica automáticamente mientras el usuario escribe.
});
