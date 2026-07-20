// ===== REEMPLAZA ESTO CON EL LINK DIRECTO A TU ARCHIVO .mp3 =====
const defaultMusicUrl = 'Fonseca.mp3'; 
// ================================================================

const musicBtn = document.getElementById('musicBtn');
const musicLinkInput = document.getElementById('musicLinkInput');
const applyMusicBtn = document.getElementById('applyMusicBtn');

// Creamos el elemento de audio nativo del navegador
const audio = new Audio(defaultMusicUrl);
audio.loop = true; // La música se repetirá infinitamente
audio.volume = 1.0; // Volumen al 100%

let isPlaying = false;

// Función para reproducir
function playMusic() {
    audio.play().then(() => {
        isPlaying = true;
        if(musicBtn) musicBtn.innerText = '🔇 Pausar Música';
    }).catch((error) => {
        console.log("El navegador está esperando el primer clic para permitir el audio...", error);
    });
}

// Función para pausar
function pauseMusic() {
    audio.pause();
    isPlaying = false;
    if(musicBtn) musicBtn.innerText = '🎵 Reproducir Música';
}

// Botón principal de Música
function toggleMusic() {
    if (audio.paused) {
        audio.muted = false; // Aseguramos que tenga sonido
        playMusic();
    } else {
        pauseMusic();
    }
}

if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusic);
}

// Si tienes un campo para cambiar la canción en tu página
if (applyMusicBtn) {
    applyMusicBtn.addEventListener('click', () => {
        const url = musicLinkInput.value.trim();
        if (!url) return;
        audio.src = url; // Cambiamos la fuente del audio
        audio.muted = false;
        playMusic();
    });
}

// Intentar reproducir automáticamente al cargar la página
// (Empezará en silencio si el navegador lo bloquea, y sonará al primer clic)
window.addEventListener('load', () => {
    audio.muted = true; 
    playMusic();
});

// El truco clave: Desbloquear el audio en el primer clic del usuario en cualquier parte
function unlockAudioOnFirstInteraction() {
    audio.muted = false; // ¡Le quitamos el silencio!
    audio.volume = 1.0;
    
    if (audio.paused) {
        playMusic();
    } else {
        isPlaying = true;
        if(musicBtn) musicBtn.innerText = '🔇 Pausar Música';
    }
    
    document.removeEventListener('click', unlockAudioOnFirstInteraction);
    document.removeEventListener('touchstart', unlockAudioOnFirstInteraction);
}

document.addEventListener('click', unlockAudioOnFirstInteraction);
document.addEventListener('touchstart', unlockAudioOnFirstInteraction);