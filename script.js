const app = document.getElementById("app");
const bat = document.getElementById("bat");
const batFound = document.getElementById("batFound");
const call = document.getElementById("call");
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
    batFound.style.left = `${newPos.x}px`;
    batFound.style.top = `${newPos.y}px`;
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

    call.style.left = `${x - 100}px`;
    call.style.top = `${y - 100}px`;
    call.style.display = "block";
    setTimeout(() => {
        call.style.display = "none";
    }, 1000);

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
        setTimeout(() => {
            bat.style.opacity = 0;
        }, 1000);
    }, 1000);

    if (event.target === bat) {
        bat.style.display = "none";
        batFound.style.display = "block";
        foundAudio.play();
        setTimeout(() => {
            bat.style.display = "block";
            batFound.style.display = "none";
            moveBat();
        }, 4000);
    }
});

moveBat();
