// Variables globales
let estaVolando = false;
let rescatados = 0;
let fallecidos = 0;
const baseRescate = [];

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const helicoptero = document.getElementById('helicoptero');
    const areaJuego = document.querySelector('.area-juego');
    const base = document.getElementById('base');
    const marcador = document.querySelector('.marcador');

    // Mejorar diseño del marcador
    marcador.style.background = "rgba(0, 0, 0, 0.8)";
    marcador.style.color = "white";
    marcador.style.padding = "20px";
    marcador.style.borderRadius = "15px";
    marcador.style.fontSize = "26px";
    marcador.style.boxShadow = "0 0 15px rgba(255, 255, 255, 0.5)";

    // Posición inicial del helicóptero
    const posicionBase = { x: 50, y: 50 };
    helicoptero.style.left = `${posicionBase.x}px`;
    helicoptero.style.top = `${posicionBase.y}px`;

    function crearSuperviviente() {
        if (document.querySelectorAll('.superviviente').length >= 5) return;

        const superviviente = document.createElement('img');
        superviviente.className = 'superviviente';
        superviviente.src = 'imagenes/nadador-01.gif';

        const alturaTotal = areaJuego.offsetHeight;
        const anchoTotal = areaJuego.offsetWidth;
        
        const x = 100 + Math.random() * (anchoTotal - 200);
        const y = (alturaTotal * 0.7) + Math.random() * (alturaTotal * 0.2);
        
        superviviente.style.left = `${x}px`;
        superviviente.style.top = `${y}px`;
        
        areaJuego.appendChild(superviviente);
        
        const tiempoVida = setTimeout(() => {
            if (superviviente.parentNode) {
                superviviente.classList.add('morir');
                setTimeout(() => {
                    superviviente.remove();
                    fallecidos++;
                    actualizarMarcador();
                }, 1000);
            }
        }, 15000);

        superviviente.addEventListener('click', () => {
            if (!estaVolando) {
                rescatar(superviviente, x, y);
            }
        });
    }

    function rescatar(superviviente, x, y) {
        estaVolando = true;
        helicoptero.classList.add('en-rescate');
        
        helicoptero.style.left = `${x}px`;
        helicoptero.style.top = `${y}px`;
        
        setTimeout(() => {
            if (superviviente.parentNode) {
                superviviente.classList.add('rescatado');
                baseRescate.push(superviviente);
                superviviente.style.opacity = "0";
                rescatados++;
                actualizarMarcador();
            }
            
            setTimeout(() => {
                helicoptero.style.left = `${posicionBase.x}px`;
                helicoptero.style.top = `${posicionBase.y}px`;

                setTimeout(() => {
                    estaVolando = false;
                    helicoptero.classList.remove('en-rescate');
                    dejarEnBase(superviviente);
                }, 1000);
            }, 1500);
        }, 2000);
    }

    function dejarEnBase(superviviente) {
        superviviente.style.opacity = "1";
        superviviente.style.left = `${base.offsetLeft + 20 + (baseRescate.length * 10)}px`;
        superviviente.style.top = `${base.offsetTop + 30}px`;
        areaJuego.appendChild(superviviente);
    }

    function actualizarMarcador() {
        document.getElementById('rescatados').textContent = rescatados;
        document.getElementById('fallecidos').textContent = fallecidos;
    }

    setInterval(crearSuperviviente, 4000);
    crearSuperviviente();

    window.addEventListener('resize', () => {
        helicoptero.style.left = `${posicionBase.x}px`;
        helicoptero.style.top = `${posicionBase.y}px`;
    });
});
