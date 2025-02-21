// Variables globales
let estaVolando = false;
let rescatados = 0;
let fallecidos = 0;
let baseRescate = [];
let pokemones = ['pikachu.gif', 'charizard.gif', 'gengar.gif', 'mew.gif', 'mewtwo.gif'];
>>>>>>> Stashed changes

// 🔹 Listener para la pantalla de inicio
document.addEventListener('DOMContentLoaded', function() {
    let pantallaInicio = document.getElementById('pantallaInicio');    // Referencia a la pantalla inicial
    let botonStart = document.getElementById('botonStart');            // Botón de inicio

    // 🔹 Al hacer clic en Start, oculta la pantalla de inicio
    botonStart.addEventListener('click', function() {
        pantallaInicio.classList.add('oculta');
    });
});

// 🔹 Configuración principal del juego
document.addEventListener('DOMContentLoaded', function() {
    // 🔹 Obtención de elementos del DOM
    let latios = document.getElementById('latios');                    // Helicóptero principal
    let areaJuego = document.querySelector('.area-juego');            // Área de juego
    let base = document.getElementById('base');                        // Base de rescate
    let botonMusica = document.getElementById('botonMusica');         // Control de música
    let musicaFondo = document.getElementById('musicaFondo');         // Elemento de audio
    let reproduciendo = false;                                        // Estado de la música

    // 🔹 Control de la música de fondo
    botonMusica.addEventListener('click', function() {
        if (reproduciendo) {
            musicaFondo.pause();                                      // Pausa la música
            botonMusica.classList.remove("activo");                   // Desactiva el botón
        } else {
            musicaFondo.play();                                       // Reproduce la música
            botonMusica.classList.add("activo");                      // Activa el botón
        }
        reproduciendo = !reproduciendo;                               // Cambia el estado
    });

    // 🔹 Configuración de la posición inicial
    let posicionBase = [50, 50];  

        // 🔹 Posiciona a Latios en sus coordenadas iniciales
        latios.style.left = posicionBase[0] + 'px';
        latios.style.top = posicionBase[1] + 'px';
    
        function crearPokemon() {
            // 🔹 Limita el número máximo de Pokémon a 5 en pantalla
            if (document.querySelectorAll('.pokemon').length >= 5) return;
    
            // 🔹 Crea un nuevo elemento imagen para el Pokémon
            let nuevoPokemon = document.createElement('img');
            nuevoPokemon.className = 'pokemon';
            // 🔹 Selecciona una imagen aleatoria del array de pokemones
            nuevoPokemon.src = 'imagenes/' + pokemones[Math.floor(Math.random() * pokemones.length)];
    
            // 🔹 Obtiene las dimensiones del área de juego
            let alturaJuego = areaJuego.offsetHeight;
            let anchoJuego = areaJuego.offsetWidth;
            let x, y;
            let seSuperpone = false;
            let intentos = 0;
            let margen = 50;
    
            do {
                // 🔹 Genera posiciones aleatorias para el nuevo Pokémon
                seSuperpone = false;
                x = Math.random() * (anchoJuego - 100);
                y = Math.random() * (alturaJuego - 100);
    
                // 🔹 Obtiene las coordenadas y dimensiones de la base
                let baseX = base.offsetLeft;
                let baseY = base.offsetTop;
                let baseAncho = base.offsetWidth;
                let baseAlto = base.offsetHeight;
    
                // 🔹 Comprueba si el Pokémon se superpone con la base
                if (x + 50 > baseX && x < baseX + baseAncho &&
                    y + 50 > baseY && y < baseY + baseAlto) {
                    seSuperpone = true;
                }
    
             // Obtiene las coordenadas y dimensiones de cada Pokémon ya existente
document.querySelectorAll('.pokemon').forEach(function(pokemonExistente) {
    let pokemonX = pokemonExistente.offsetLeft;      // Posición X del Pokémon existente
    let pokemonY = pokemonExistente.offsetTop;       // Posición Y del Pokémon existente
    let pokemonAncho = pokemonExistente.offsetWidth; // Ancho del Pokémon existente
    let pokemonAlto = pokemonExistente.offsetHeight; // Alto del Pokémon existente

    // Verifica si hay superposición entre el nuevo Pokémon y los existentes
    if (x + 50 > pokemonX - margen &&               // Borde derecho del nuevo > Borde izquierdo del existente
        x < pokemonX + pokemonAncho + margen &&     // Borde izquierdo del nuevo < Borde derecho del existente
        y + 50 > pokemonY - margen &&               // Borde inferior del nuevo > Borde superior del existente
        y < pokemonY + pokemonAlto + margen) {      // Borde superior del nuevo < Borde inferior del existente
        seSuperpone = true;                         // Si hay superposición, marca como verdadero
    }
});
    
                intentos++;
                // 🔹 Limita los intentos para evitar bucles infinitos
                if (intentos > 20) break;
    
            } while (seSuperpone);
    
            // 🔹 Posiciona el nuevo Pokémon
            nuevoPokemon.style.left = x + 'px';
            nuevoPokemon.style.top = y + 'px';
            areaJuego.appendChild(nuevoPokemon);
    
            // 🔹 Establece tiempo de vida del Pokémon (15 segundos)
            let tiempoDeVida = setTimeout(function() {
                eliminarPokemon(nuevoPokemon);
                fallecidos++;
                actualizarMarcador();
            }, 15000);
    
            // 🔹 Añade evento de clic para rescatar
            nuevoPokemon.addEventListener('click', function() {
                if (!estaVolando) {
                    rescatar(nuevoPokemon, x, y);
                }
            });
        }
    
        function rescatar(pokemon, x, y) {
            // 🔹 Inicia el proceso de rescate
            estaVolando = true;
            latios.classList.add('en-rescate');
    
            // 🔹 Animación de vuelo hacia el Pokémon (3s)
            latios.style.transition = "top 3s ease-in-out, left 3s ease-in-out";
            latios.style.left = x + "px";
            latios.style.top = y + "px";
    
            setTimeout(function() {
                // 🔹 Hace desaparecer al Pokémon rescatado
                pokemon.classList.add("desaparecer");
    
                setTimeout(function() {
                    pokemon.remove();
                }, 1000);
    
                setTimeout(function() {
                    // 🔹 Inicia el regreso a la base
                    latios.classList.remove('en-rescate');
                    latios.classList.add('retorno');
    
                    // 🔹 Animación de regreso (3.5s)
                    latios.style.transition = "top 3.5s ease-in-out, left 3.5s ease-in-out";
                    latios.style.left = posicionBase[0] + 'px';
                    latios.style.top = posicionBase[1] + 'px';
    
                    setTimeout(function() {
                        // 🔹 Finaliza el rescate
                        estaVolando = false;
                        latios.classList.remove('retorno');
                        dejarEnBase(pokemon);
                        rescatados++;
                        actualizarMarcador();
                    }, 3500);
                }, 1000);
            }, 3000);
        }
    
        function dejarEnBase(pokemon) {
            // 🔹 Crea una copia del Pokémon en la base
            let pokemonBase = document.createElement('img');
            pokemonBase.className = 'pokemon';
            pokemonBase.src = pokemon.src;
    
            // 🔹 Posiciona el Pokémon en la base
            pokemonBase.style.left = (base.offsetLeft + 20 + (baseRescate.length * 10)) + 'px';
            pokemonBase.style.top = (base.offsetTop + 30) + 'px';
            pokemonBase.style.opacity = "1";
    
            areaJuego.appendChild(pokemonBase);
    
            // 🔹 Animación de desaparición en la base
            setTimeout(function() {
                pokemonBase.classList.add("desaparecer");
            }, 500);
    
            setTimeout(function() {
                pokemonBase.remove();
            }, 1500);
        }
    
        function eliminarPokemon(pokemon) {
            // 🔹 Animación de desaparición del Pokémon
            pokemon.classList.add("desaparecer");
            setTimeout(function() {
                pokemon.remove();
            }, 1000);
        }
    
        function actualizarMarcador() {
            // 🔹 Actualiza los contadores en pantalla
            document.getElementById('rescatados').textContent = rescatados;
            document.getElementById('fallecidos').textContent = fallecidos;
        }
    
        // 🔹 Inicia la generación de Pokémon cada 4 segundos
        setInterval(crearPokemon, 4000);
        crearPokemon();
    
        // 🔹 Mantiene a Latios en su posición base al redimensionar la ventana
        window.addEventListener('resize', function() {
            latios.style.left = posicionBase[0] + 'px';
            latios.style.top = posicionBase[1] + 'px';
        });
    });