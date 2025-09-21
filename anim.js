/* anim.js
   Responsabilidades:
   - Sincronizar #lyrics con el elemento audio#audio usando timeupdate
   - Controlar el botón Play/Pause accesible
   - Manejar ausencia de elementos y autoplay bloqueado
*/

(function () {
  'use strict';

  const audio = document.getElementById('audio') || document.querySelector('audio');
  const lyricsEl = document.getElementById('lyrics') || document.querySelector('#lyrics');
  const btn = document.getElementById('playPause');

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

  if (!audio || !lyricsEl) {
    console.warn('anim.js: elemento <audio> o #lyrics no encontrado. Abortando sincronización de letras.');
    return;
  }

  // Accessibility: anuncie cambios en la letra a lectores de pantalla
  try {
    lyricsEl.setAttribute('aria-live', 'polite');
    lyricsEl.style.visibility = 'visible';
  } catch (e) { /* ignore */ }

  // Asegura que el control nativo no sea visible (doble seguridad)
  try {
    audio.style.display = 'none';
    audio.setAttribute('aria-hidden', 'true');
  } catch (e) {
    /* ignore */
  }

  // Intenta reproducir (autoplay puede estar bloqueado por el navegador)
  audio.play().catch(() => {
    console.info('anim.js: autoplay bloqueado o no permitido por el navegador.');
  });

  function updateLyrics() {
    const t = audio.currentTime;
    if (isNaN(t)) return;

    // pre-show: muestra la línea hasta N segundos antes
    const preShow = 3; // segundos antes de la marca para empezar a mostrar
    const fade = 0.6; // segundos para aparecer plenamente una vez iniciada la marca

    let index = -1;
    for (let i = 0; i < LYRICS.length; i++) {
      const start = LYRICS[i].time;
      const end = i + 1 < LYRICS.length ? LYRICS[i + 1].time : Infinity;
      if (t >= (start - preShow) && t < end) { index = i; break; }
    }

    console.debug('anim.js:updateLyrics time=', t, 'index=', index);
    if (index !== -1) {
      const line = LYRICS[index];
      const elapsed = t - line.time;
      let opacity;
      if (elapsed >= 0) {
        opacity = Math.min(1, Math.max(0, elapsed / fade));
      } else {
        // mostrado antes de la marca: aumentamos opacidad desde 0 hasta 1 en el rango preShow
        opacity = Math.min(1, Math.max(0, (preShow + elapsed) / preShow));
      }
      lyricsEl.style.opacity = opacity;
      lyricsEl.textContent = line.text;
    } else {
      lyricsEl.style.opacity = 0;
      lyricsEl.textContent = '';
    }
  }

  audio.addEventListener('timeupdate', updateLyrics);
  audio.addEventListener('playing', updateLyrics);
  // Llamada inicial tras cargar metadatos para asignar estado inicial
  audio.addEventListener('loadedmetadata', () => {
    console.debug('anim.js: loadedmetadata duration=', audio.duration);
    updateLyrics();
  });

  // Polling fallback: si por alguna razón `timeupdate` no cubre el caso,
  // ejecutar updateLyrics periódicamente mientras se reproduce.
  let lyricsInterval = null;
  function startPolling() {
    if (lyricsInterval) return;
    lyricsInterval = setInterval(updateLyrics, 500);
  }
  function stopPolling() {
    if (!lyricsInterval) return;
    clearInterval(lyricsInterval);
    lyricsInterval = null;
  }

  audio.addEventListener('play', () => {
    updateLyrics();
    startPolling();
  });
  audio.addEventListener('pause', () => {
    stopPolling();
  });
  audio.addEventListener('ended', () => {
    stopPolling();
  });

  // Ocultar título tras un tiempo (opcional)
  function ocultarTitulo() {
    const titulo = document.querySelector('.titulo');
    if (!titulo) return;
    titulo.style.animation = 'fadeOut 3s ease-in-out forwards';
    setTimeout(() => { titulo.style.display = 'none'; }, 3000);
  }
  setTimeout(ocultarTitulo, 216000);

  // Play / Pause accesible
  if (btn) {
    // Init button state
    function updateButton() {
      const playing = !audio.paused && !audio.ended;
      btn.setAttribute('aria-pressed', String(playing));
      btn.textContent = playing ? 'Pausar' : 'Reproducir';
      btn.setAttribute('aria-label', playing ? 'Pausar reproducción' : 'Reproducir');
    }

    btn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(() => { /* autoplay blocked */ });
      } else {
        audio.pause();
      }
      updateButton();
    });

    // Support keyboard activation
    btn.addEventListener('keydown', (ev) => {
      if (ev.key === ' ' || ev.key === 'Enter') {
        ev.preventDefault();
        btn.click();
      }
    });

    // Keep button in sync with audio events
    audio.addEventListener('play', updateButton);
    audio.addEventListener('pause', updateButton);
    audio.addEventListener('ended', updateButton);

    // Initialize UI
    updateButton();
  }

})();