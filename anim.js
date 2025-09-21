// Sincronizar las letras con la canción (versión limpia y única)

const player = document.getElementById('audio') || document.querySelector('audio');
const display = document.getElementById('lyrics') || document.querySelector('#lyrics');

const LYRICS = [
  { text: 'At the time', time: 15 },
  { text: 'The whisper of birds', time: 18 },
  { text: "Lonely before the sun cried", time: 27 },
  { text: 'Fell from the sky', time: 32 },
  { text: 'Like water drops', time: 33 },
  { text: "Where I'm now? I don't know why", time: 41 },
  { text: 'Nice butterflies in my hands', time: 47 },
  { text: 'Too much light for twilight', time: 54 },
  { text: 'In the mood for the flowers love', time: 59 },
  { text: 'That vision', time: 67 },
  { text: 'Really strong, blew my mind', time: 72 },
  { text: 'Silence Let me see what it was', time: 78 },
  { text: 'I only want to live in clouds', time: 83 },
  { text: "Where I'm now? I don't know why", time: 91 },
  { text: 'Nice butterflies in my hands', time: 97 },
  { text: 'Too much light for twilight', time: 104 },
  { text: 'In the mood for the flowers love', time: 108 },
  { text: 'Love.', time: 140 },
  { text: 'At the time', time: 144 },
  { text: 'The whisper of birds', time: 148 },
  { text: 'Lonely before the sun cried', time: 153 },
  { text: 'Fell from the sky', time: 158 },
  { text: 'Like water drops', time: 164 },
  { text: "Where I'm now? I don't know why", time: 169 },
  { text: 'Nice butterflies in my hands', time: 176 },
  { text: 'Too much light for twilight', time: 183 },
  { text: 'In the mood for the flowers', time: 188 }
];

if (!player || !display) {
  console.warn('anim.js: elemento <audio> o #lyrics no encontrado. Abortando sincronización de letras.');
} else {
  // Intentar reproducir (autoplay puede ser bloqueado por el navegador)
  player.play().catch(() => {
    console.info('anim.js: autoplay bloqueado o no permitido por el navegador.');
  });

  function update() {
    const t = player.currentTime;
    if (isNaN(t)) return;

    let idx = -1;
    for (let i = 0; i < LYRICS.length; i++) {
      const start = LYRICS[i].time;
      const end = i + 1 < LYRICS.length ? LYRICS[i + 1].time : Infinity;
      if (t >= start && t < end) { idx = i; break; }
    }

    if (idx !== -1) {
      const line = LYRICS[idx];
      const fade = 0.5;
      const elapsed = t - line.time;
      const op = Math.min(1, Math.max(0, elapsed / fade));
      display.style.opacity = op;
      display.textContent = line.text;
    } else {
      display.style.opacity = 0;
      display.textContent = '';
    }
  }

  player.addEventListener('timeupdate', update);
  player.addEventListener('playing', update);

  function ocultarTitulo() {
    const titulo = document.querySelector('.titulo');
    if (!titulo) return;
    titulo.style.animation = 'fadeOut 3s ease-in-out forwards';
    setTimeout(() => { titulo.style.display = 'none'; }, 3000);
  }

  setTimeout(ocultarTitulo, 216000);
}
// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  { text: "At the time", time: 15 },
  { text: "The whisper of birds", time: 18 },
  { text: "Lonely before the sun cried", time: 27 },
  { text: "Fell from the sky", time: 32 },
  { text: "Like water drops", time: 33 },
  { text: "Where I'm now? I don't know why", time: 41 },
  { text: "Nice butterflies in my hands", time: 47 },
  { text: "Too much light for twilight", time: 54 },
  { text: "In the mood for the flowers love", time: 59 },
  { text: "That vision", time: 67 },
  { text: "Really strong, blew my mind", time: 72 },
  { text: "Silence Let me see what it was", time: 78 },
  { text: "I only want to live in clouds", time: 83 },
  { text: "Where I'm now? I don't know why", time: 91 },
  { text: "Nice butterflies in my hands", time: 97 },
  { text: "Too much light for twilight", time: 104 },
  { text: "In the mood for the flowers love", time: 108 },
  { text: "At the time", time: 144 },
  { text: "The whisper of birds", time: 148 },
  { text: "Lonely before the sun cried", time: 153 },
  { text: "Fell from the sky", time: 158 },
  { text: "Like water drops", time: 164 },
  { text: "Where I'm now? I don't know why", time: 169 },
  { text: "Nice butterflies in my hands", time: 176 },
  { text: "Too much light for twilight", time: 183 },
  { text: "In the mood for the flowers", time: 188 },
  { text: "Love.", time: 140 },
];

// Sincronizar las letras con la canción
const audio = document.getElementById("audio") || document.querySelector("audio");
const lyrics = document.getElementById("lyrics") || document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
let lyricsData = [

  if (currentLine) {
    // Calcula la opacidad basada en el tiempo en la línea actual
    var fadeInDuration = 0.1; // Duración del efecto de aparición en segundos
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    // Sincronizar las letras con la canción
    // Versión robusta: valida elementos DOM, usa timeupdate y maneja autoplay bloqueado.

    const audioEl = document.getElementById('audio') || document.querySelector('audio');
    const lyricsEl = document.getElementById('lyrics') || document.querySelector('#lyrics');

    const lyricsData = [
      { text: 'At the time', time: 15 },
      { text: 'The whisper of birds', time: 18 },
      { text: "Lonely before the sun cried", time: 27 },
      { text: 'Fell from the sky', time: 32 },
      { text: 'Like water drops', time: 33 },
      { text: "Where I'm now? I don't know why", time: 41 },
      { text: 'Nice butterflies in my hands', time: 47 },
      { text: 'Too much light for twilight', time: 54 },
      { text: 'In the mood for the flowers love', time: 59 },
      { text: 'That vision', time: 67 },
      { text: 'Really strong, blew my mind', time: 72 },
      { text: 'Silence Let me see what it was', time: 78 },
      { text: 'I only want to live in clouds', time: 83 },
      { text: "Where I'm now? I don't know why", time: 91 },
      { text: 'Nice butterflies in my hands', time: 97 },
      { text: 'Too much light for twilight', time: 104 },
      { text: 'In the mood for the flowers love', time: 108 },
      { text: 'Love.', time: 140 },
      { text: 'At the time', time: 144 },
      { text: 'The whisper of birds', time: 148 },
      { text: 'Lonely before the sun cried', time: 153 },
      { text: 'Fell from the sky', time: 158 },
      { text: 'Like water drops', time: 164 },
      { text: "Where I'm now? I don't know why", time: 169 },
      { text: 'Nice butterflies in my hands', time: 176 },
      { text: 'Too much light for twilight', time: 183 },
      { text: 'In the mood for the flowers', time: 188 }
    ];

    if (!audioEl || !lyricsEl) {
      console.warn('anim.js: elemento <audio> o #lyrics no encontrado. Abortando sincronización de letras.');
    } else {
      // Intentar reproducir (si autoplay está permitido)
      audioEl.play().catch(() => {
        // Autoplay bloqueado — el usuario puede usar los controles
        console.info('anim.js: autoplay bloqueado o no permitido por el navegador.');
      });

      function updateLyrics() {
        const time = audioEl.currentTime;
        if (isNaN(time)) return;

        // Buscar la línea actual usando el tiempo de inicio y el inicio de la siguiente
        let currentIndex = -1;
        for (let i = 0; i < lyricsData.length; i++) {
          const start = lyricsData[i].time;
          const end = i + 1 < lyricsData.length ? lyricsData[i + 1].time : Infinity;
          if (time >= start && time < end) {
            currentIndex = i;
            break;
          }
        }

        if (currentIndex !== -1) {
          const currentLine = lyricsData[currentIndex];
          const fadeInDuration = 0.5; // segundos
          const elapsed = time - currentLine.time;
          const opacity = Math.min(1, Math.max(0, elapsed / fadeInDuration));
          lyricsEl.style.opacity = opacity;
          lyricsEl.textContent = currentLine.text;
        } else {
          lyricsEl.style.opacity = 0;
          lyricsEl.textContent = '';
        }
      }

      audioEl.addEventListener('timeupdate', updateLyrics);
      audioEl.addEventListener('playing', updateLyrics);

      // Ocultar título después de un tiempo fijo (opcional)
      function ocultarTitulo() {
        const titulo = document.querySelector('.titulo');
        if (!titulo) return;
        titulo.style.animation = 'fadeOut 3s ease-in-out forwards';
        setTimeout(() => { titulo.style.display = 'none'; }, 3000);
      }

      // Llama a la función después de 216 segundos si el elemento existe
      setTimeout(ocultarTitulo, 216000);
    }
  setTimeout(ocultarTitulo, 216000);
}