// Variables globales
let estaVolando = false;
let rescatados = 0;
let fallecidos = 0;
let baseRescate = [];
let pokemones = ['pikachu.gif', 'charizard.gif', 'gengar.gif', 'mew.gif', 'mewtwo.gif'];

document.addEventListener('DOMContentLoaded', function() {
    let latios = document.getElementById('latios');
    let areaJuego = document.querySelector('.area-juego');
    let base = document.getElementById('base');
    let marcador = document.querySelector('.marcador');

    let posicionBase = { x: 50, y: 50 };
    latios.style.left = posicionBase.x + 'px';
    latios.style.top = posicionBase.y + 'px';

    function crearPokemon() {
        if (document.querySelectorAll('.pokemon').length >= 5) return;

        let pokemon = document.createElement('img');
        pokemon.className = 'pokemon';
        pokemon.src = 'imagenes/' + pokemones[Math.floor(Math.random() * pokemones.length)];

        let alturaTotal = areaJuego.offsetHeight;
        let anchoTotal = areaJuego.offsetWidth;
        let x, y;

        do {
            x = 100 + Math.random() * (anchoTotal - 200);
            y = (alturaTotal * 0.7) + Math.random() * (alturaTotal * 0.2);
        } while (x > base.offsetLeft && x < base.offsetLeft + base.offsetWidth && y > base.offsetTop && y < base.offsetTop + base.offsetHeight);
        
        pokemon.style.left = x + 'px';
        pokemon.style.top = y + 'px';
        
        areaJuego.appendChild(pokemon);
        
        let tiempoVida = setTimeout(function() {
            if (pokemon.parentNode) {
                pokemon.classList.add('morir');
                setTimeout(function() {
                    pokemon.remove();
                    fallecidos++;
                    actualizarMarcador();
                }, 1000);
            }
        }, 15000);

        pokemon.addEventListener('click', function() {
            if (!estaVolando) {
                rescatar(pokemon, x, y);
            }
        });
    }
    function rescatar(pokemon, x, y) {
        estaVolando = true;
        latios.classList.add('en-rescate'); // 🔹 Activar animación de ida
    
        // Calcular distancia total a recorrer
        var deltaX = x - latios.offsetLeft;
        var deltaY = y - latios.offsetTop;
        var distancia = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        var duracion = distancia * 5; // Ajustar tiempo en función de la distancia
    
        latios.style.transition = 'left ' + duracion + 'ms linear, top ' + duracion + 'ms linear';
        latios.style.left = x + 'px';
        latios.style.top = y + 'px';
    
        setTimeout(function () {
            latios.classList.remove('en-rescate');
            latios.classList.add('retorno');
    
            latios.style.transition = 'left 1500ms linear, top 1500ms linear';
            latios.style.left = posicionBase.x + 'px';
            latios.style.top = posicionBase.y + 'px';
    
            setTimeout(function () {
                estaVolando = false;
                latios.classList.remove('retorno');
    
                // Guardar Pokémon en la base antes de mostrarlo
                baseRescate.push(pokemon);
                dejarEnBase(pokemon);
    
                // 🔹 Incrementar el contador de rescatados y actualizar marcador
                rescatados++;
                actualizarMarcador();
            }, 1500);
        }, duracion);
    }
    
    

    function dejarEnBase(pokemon) {
        pokemon.style.opacity = "1";
        pokemon.style.left = (base.offsetLeft + 20 + (baseRescate.length * 10)) + 'px';
        pokemon.style.top = (base.offsetTop + 30) + 'px';
        areaJuego.appendChild(pokemon);
    }

    function actualizarMarcador() {
        document.getElementById('rescatados').textContent = rescatados;
        document.getElementById('fallecidos').textContent = fallecidos;
    }

    setInterval(crearPokemon, 4000);
    crearPokemon();

    window.addEventListener('resize', function() {
        latios.style.left = posicionBase.x + 'px';
        latios.style.top = posicionBase.y + 'px';
    });
});
