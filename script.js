const app = document.getElementById("app");
const bat = document.getElementById("bat");
const callAudio = document.getElementById("callAudio");
const soundAudio = document.getElementById("soundAudio");
const foundAudio = document.getElementById("foundAudio");

function randomPosition() {
    const xPos = Math.floor(Math.random() * (app.clientWidth - bat.clientWidth));
    const yPos = Math.floor(Math.random() * (app.clientHeight - bat.clientHeight));
    return { x: xPos, y: yPos };
}

function moveBat() {
    const newPos = randomPosition();
    bat.style.left = `${newPos.x}px`;
    bat.style.top = `${newPos.y}px`;
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function playSoundProximity(volume) {
    soundAudio.volume = volume;
    soundAudio.currentTime = 0;
    soundAudio.play();
}

app.addEventListener("click", (event) => {
    const rect = app.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    callAudio.play();
    const batPos = {
        x: parseInt(bat.style.left, 10) + bat.clientWidth / 2,
        y: parseInt(bat.style.top, 10) + bat.clientHeight / 2,
    };

    const dist = distance(x, y, batPos.x, batPos.y);
    const proximity = 1 - dist / Math.sqrt(Math.pow(app.clientWidth, 2) + Math.pow(app.clientHeight, 2));
    const opacity = Math.max(proximity, 0);

    setTimeout(() => {
        bat.style.opacity = opacity;
        playSoundProximity(opacity);
    }, 1000);

    if (event.target === bat) {
        bat.style.opacity = 1;
        foundAudio.play();
        setTimeout(() => {
            moveBat();
            bat.style.opacity = 0;
        }, 4000);
    }
});

moveBat();
