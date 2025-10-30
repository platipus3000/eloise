const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreElement = document.getElementById("score");

let isJumping = false;
let position = 0;
let velocity = 0;
const gravity = 0.6;  // accélération vers le bas
let score = 0;
let cactusSpeed = 2; // vitesse initiale du cactus

const jumpSound = new Audio('../assets/jump.mp3'); // chemin vers le fichier audio

// Fonction de saut
function jump() {
    if (isJumping) return;
    isJumping = true;
    velocity = 12;  // vitesse initiale du saut
    jumpSound.play(); // jouer le son du saut
}

// Boucle de jeu
function gameLoop() {
    // Appliquer la gravité
    if (isJumping || position > 0) {
        velocity -= gravity;
        position += velocity;
        if (position <= 0) {
            position = 0;
            velocity = 0;
            isJumping = false;
        }
        dino.style.bottom = position + "px";
    }

    // Augmenter la vitesse du cactus progressivement
    cactus.style.animationDuration = (2 / cactusSpeed) + "s";

    checkCollision();
    requestAnimationFrame(gameLoop);
}

// Détection collision
function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
        dinoRect.right > cactusRect.left &&
        dinoRect.left < cactusRect.right &&
        dinoRect.bottom > cactusRect.top
    ) {
        alert("Game Over! Score: " + score);
        document.location.reload();
    }
}

// Mise à jour du score et augmentation de la vitesse
setInterval(() => {
    score++;
    scoreElement.textContent = "Score: " + score;

    // Augmenter la vitesse du cactus toutes les 100 unités de score
    if (score % 100 === 0) {
        cactusSpeed += 0.2;
    }
}, 100);

// Écoute du clavier pour le saut
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") jump();
});

// Démarrer la boucle de jeu
gameLoop();