// Variables globales
var estaVolando = false;
var rescatados = 0;
var fallecidos = 0;
var baseRescate = [];
var pokemones = ['pikachu.gif', 'charizard.gif', 'gengar.gif', 'mew.gif', 'mewtwo.gif'];

document.addEventListener('DOMContentLoaded', function() {
    var latios = document.getElementById('latios');
    var areaJuego = document.querySelector('.area-juego');
    var base = document.getElementById('base');
    var marcador = document.querySelector('.marcador');

    var posicionBase = { x: 50, y: 50 };
    latios.style.left = posicionBase.x + 'px';
    latios.style.top = posicionBase.y + 'px';

    function crearPokemon() {
        if (document.querySelectorAll('.pokemon').length >= 5) return;

        var pokemon = document.createElement('img');
        pokemon.className = 'pokemon';
        pokemon.src = 'imagenes/' + pokemones[Math.floor(Math.random() * pokemones.length)];

        var alturaTotal = areaJuego.offsetHeight;
        var anchoTotal = areaJuego.offsetWidth;
        var x, y;

        do {
            x = 100 + Math.random() * (anchoTotal - 200);
            y = (alturaTotal * 0.7) + Math.random() * (alturaTotal * 0.2);
        } while (x > base.offsetLeft && x < base.offsetLeft + base.offsetWidth && y > base.offsetTop && y < base.offsetTop + base.offsetHeight);
        
        pokemon.style.left = x + 'px';
        pokemon.style.top = y + 'px';
        
        areaJuego.appendChild(pokemon);
        
        var tiempoVida = setTimeout(function() {
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
        latios.classList.add('en-rescate');
        
        latios.style.left = x + 'px';
        latios.style.top = y + 'px';
        
        setTimeout(function() {
            if (pokemon.parentNode) {
                pokemon.classList.add('rescatado');
                baseRescate.push(pokemon);
                pokemon.style.opacity = "0";
                rescatados++;
                actualizarMarcador();
            }
            
            setTimeout(function() {
                latios.style.left = posicionBase.x + 'px';
                latios.style.top = posicionBase.y + 'px';

                setTimeout(function() {
                    estaVolando = false;
                    latios.classList.remove('en-rescate');
                    dejarEnBase(pokemon);
                }, 1000);
            }, 1500);
        }, 2000);
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
