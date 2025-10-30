const music = document.getElementById('bg-music');

// Démarre la musique dès la première action
document.addEventListener('click', startMusic, { once: true });
document.addEventListener('keydown', startMusic, { once: true });

function startMusic() {
  music.volume = 0.4; // volume doux
  music.play().catch(err => console.log("Lecture auto bloquée :", err));
}