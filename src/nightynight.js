// Configurazione
const tempoInattivita = 10000; // 10 secondi di inattività
const numeroImmagini = 30; // quante immagini mostrare
const posizioni = [
    { top: '20%', left: '15%' },
    { top: '50%', left: '70%' },
    { top: '70%', left: '30%' }
]; // posizioni predefinite delle immagini

let timerInattivita;
let immaginiAttive = false;

// Funzione per resettare il timer di inattività
function resetTimerInattivita() {
    clearTimeout(timerInattivita);
    
    // Se le immagini sono visibili, nascondile
    if (immaginiAttive) {
        nascondiImmagini();
    } else {
        // Imposta un nuovo timer per mostrare le immagini
        timerInattivita = setTimeout(() => {
            mostraImmagini();
        }, tempoInattivita);
    }
}

// Funzione per nascondere le immagini
function nascondiImmagini() {
    immaginiAttive = false;
    const container = document.getElementById('immaginiContainer');
    container.style.opacity = '0';
    
    // Rimuovi le immagini dopo la transizione
    setTimeout(() => {
        container.innerHTML = '';
        
        // Importante: riavvia il timer dopo che le immagini sono scomparse
        timerInattivita = setTimeout(() => {
            mostraImmagini();
        }, tempoInattivita);
    }, 1000);
}

// Funzione per mostrare le immagini
function mostraImmagini() {
    immaginiAttive = true;
    const container = document.getElementById('immaginiContainer');
    
    // Crea le immagini nelle posizioni desiderate
    for (let i = 0; i < numeroImmagini; i++) {
        const immagine = document.createElement('div');
        
        immagine.classList.add('immagine');
        
        // Posiziona le immagini usando le posizioni predefinite
        if (posizioni[i]) {
            immagine.style.top = posizioni[i].top;
            immagine.style.left = posizioni[i].left;
        } else {
            // Posizione casuale se non è definita
            immagine.style.top = `${Math.random() * 80}%`;
            immagine.style.left = `${Math.random() * 80}%`;
        }
        
        container.appendChild(immagine);
    }
    
    // Mostra il container
    setTimeout(() => {
        container.style.opacity = '1';
    }, 100);
}

// Eventi per resettare il timer di inattività
['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'].forEach(evento => {
    document.addEventListener(evento, resetTimerInattivita);
});

// Inizializza il timer al caricamento della pagina
document.addEventListener('DOMContentLoaded', resetTimerInattivita);