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
    let botonMusica = document.getElementById('botonMusica');
    let musicaFondo = document.getElementById('musicaFondo');
    let reproduciendo = false;

    botonMusica.addEventListener('click', function() {
        if (reproduciendo) {
            musicaFondo.pause();
            botonMusica.classList.remove("activo"); // Quita el efecto visual
        } else {
            musicaFondo.play();
            botonMusica.classList.add("activo"); // Agrega el efecto visual
        }
        reproduciendo = !reproduciendo;
    });

    let posicionBase = { x: 50, y: 50 };
    latios.style.left = posicionBase.x + 'px';
    latios.style.top = posicionBase.y + 'px';

    function crearPokemon() {
        if (document.querySelectorAll('.pokemon').length >= 5) return;
    
        let nuevoPokemon = document.createElement('img');
        nuevoPokemon.className = 'pokemon';
        nuevoPokemon.src = 'imagenes/' + pokemones[Math.floor(Math.random() * pokemones.length)];
    
        let alturaJuego = areaJuego.offsetHeight;
        let anchoJuego = areaJuego.offsetWidth;
        let x, y;
        let seSuperpone = false;
        let intentos = 0;
        let margen = 50;
    
        do {
            seSuperpone = false;
            x = Math.random() * (anchoJuego - 100);
            y = Math.random() * (alturaJuego - 100);
    
            let baseX = base.offsetLeft;
            let baseY = base.offsetTop;
            let baseAncho = base.offsetWidth;
            let baseAlto = base.offsetHeight;
    
            if (
                x + 50 > baseX &&
                x < baseX + baseAncho &&
                y + 50 > baseY &&
                y < baseY + baseAlto
            ) {
                seSuperpone = true;
            }
    
            document.querySelectorAll('.pokemon').forEach(function(pokemonExistente) {
                let pokemonX = pokemonExistente.offsetLeft;
                let pokemonY = pokemonExistente.offsetTop;
                let pokemonAncho = pokemonExistente.offsetWidth;
                let pokemonAlto = pokemonExistente.offsetHeight;
    
                if (
                    x + 50 > pokemonX - margen &&
                    x < pokemonX + pokemonAncho + margen &&
                    y + 50 > pokemonY - margen &&
                    y < pokemonY + pokemonAlto + margen
                ) {
                    seSuperpone = true;
                }
            });
    
            intentos++;
            if (intentos > 20) break;
    
        } while (seSuperpone);
    
        nuevoPokemon.style.left = x + 'px';
        nuevoPokemon.style.top = y + 'px';
    
        areaJuego.appendChild(nuevoPokemon);
    
        let tiempoDeVida = setTimeout(function() {
            eliminarPokemon(nuevoPokemon);
            fallecidos++;
            actualizarMarcador();
        }, 15000);
    
        nuevoPokemon.addEventListener('click', function() {
            if (!estaVolando) {
                rescatar(nuevoPokemon, x, y);
            }
        });
    }   

    function rescatar(pokemon, x, y) {
        estaVolando = true;
        latios.classList.add('en-rescate');
    
        // 🔹 Latios vuela más lento al Pokémon (3s)
        latios.style.transition = "top 3s ease-in-out, left 3s ease-in-out";
        latios.style.left = x + "px";
        latios.style.top = y + "px";
    
        // 🔹 Esperamos 3s para que Latios llegue antes de hacer desaparecer al Pokémon
        setTimeout(function() {
            pokemon.classList.add("desaparecer");
    
            setTimeout(function() {
                pokemon.remove();
            }, 1000); // 🔹 Animación de desaparición del Pokémon (1s)
    
            setTimeout(function() {
                latios.classList.remove('en-rescate');
                latios.classList.add('retorno');
    
                // 🔹 Regreso más lento a la base (3.5s)
                latios.style.transition = "top 3.5s ease-in-out, left 3.5s ease-in-out";
                latios.style.left = posicionBase.x + 'px';
                latios.style.top = posicionBase.y + 'px';
    
                setTimeout(function() {
                    estaVolando = false;
                    latios.classList.remove('retorno');
    
                    // 🔹 Aparece en la base antes de desaparecer
                    dejarEnBase(pokemon);
    
                    rescatados++;
                    actualizarMarcador();
                }, 3500); // 🔹 Esperamos 3.5s para el regreso
            }, 1000);
        }, 3000); // 🔹 Ahora el Pokémon desaparece cuando Latios llega (3s)
    }

function dejarEnBase(pokemon) {
    let pokemonBase = document.createElement('img');
    pokemonBase.className = 'pokemon';
    pokemonBase.src = pokemon.src;

    pokemonBase.style.left = (base.offsetLeft + 20 + (baseRescate.length * 10)) + 'px';
    pokemonBase.style.top = (base.offsetTop + 30) + 'px';
    pokemonBase.style.opacity = "1";

    areaJuego.appendChild(pokemonBase);

    setTimeout(function() {
        pokemonBase.classList.add("desaparecer");
    }, 500);

    setTimeout(function() {
        pokemonBase.remove();
    }, 1500);
}       

function eliminarPokemon(pokemon) {
    pokemon.classList.add("desaparecer");
    setTimeout(function() {
        pokemon.remove();
    }, 1000);
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
