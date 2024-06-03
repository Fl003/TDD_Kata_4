// username
let username;
do {
    username = prompt("Bitte gib deinen Namen ein:");
} while (username == null || username === "");

document.getElementById("username").innerHTML = username;

// timer
let seconds = 0;
let time = document.getElementById("time");
let timerReferenz;

function updateTime() {
    seconds += 1;
    time.innerText = seconds + "s";
}

function endOfGame() {
    clearInterval(timerReferenz);
}

// init memory
let versuche = document.getElementById("versuche");
const pairPath = "url('../pics/memoryBg1.png')";
const singlePath = "url('../pics/memoryBg.png')";
let cards;
let rnd, i, trys;

initGame();

function initGame() {
    timerReferenz = setInterval(updateTime, 1000);
    clearCards();
    cards = [];
    i = 0;
    trys = 0;
    seconds = 0;
    time.innertText = seconds + "s";
    versuche.innerText = trys;


    do {
        rnd = Math.floor(Math.random() * 8) + 1;
        let tmpCount = 0;
        for (let j = 0; j < cards.length; j++) {
            if (cards[j] == rnd) {
                tmpCount++;
            }
        }
        if (tmpCount < 2) {
            cards.push(rnd);
            createCard(rnd);
        }
        i++;
    } while (cards.length < 16);
}

function clearCards() {
    let spielbereich = document.getElementById("spielbereich");

    console.log(spielbereich);

    while (spielbereich.hasChildNodes()) {
        spielbereich.removeChild(spielbereich.childNodes[0]);
    }
}

function createCard(number) {
    let spielbereich = document.getElementById("spielbereich");

    let karte = document.createElement("div");
    karte.classList.add("karte");
    karte.setAttribute("number", number);
    karte.style.backgroundImage = singlePath;
    spielbereich.appendChild(karte);
}

// gamelogic
let isFlipable = true;
let karten = document.getElementsByClassName("karte");
let karte1, karte2;

Array.from(karten).forEach(karte => {
    karte.addEventListener("click", () => {
        flipCard(karte);
    });
});

function flipCard(karte) {
    if (!isFlipable) {
        console.log("not flipable");
        return;
    }
    if (!cards.includes(parseInt(karte.getAttribute("number")))) {
        return;
    }
    if (karte1 == karte.getAttribute("number")) {
        return;
    }

    karte.style.backgroundImage = "url('../pics/card" + karte.getAttribute("number") + ".png')";
    if (karte1 == null) {
        karte1 = karte;
        return;
    }

    karte2 = karte;
    isFlipable = false;
    versuche.innerText = ++trys;
    setTimeout(() => {
        checkPair();
    }, 1000);
}

function checkPair() {
    isFlipable = true;
    if (karte1.getAttribute("number") == karte2.getAttribute("number")) {
        karte1.style.backgroundImage = pairPath;
        karte2.style.backgroundImage = pairPath;
        removeNumber(karte1.getAttribute("number"));
        resetSelectedKarten();

        if (cards.length == 0) {
            endOfGame();
            alert("Gratulation!\nDeine Zeit: " + seconds + "s\nNeues Spiel starten?");
            initGame();
        }
        return;
    }
    karte1.style.backgroundImage = singlePath;
    karte2.style.backgroundImage = singlePath;
    resetSelectedKarten();
}

function resetSelectedKarten() {
    karte1 = null;
    karte2 = null;
}

function removeNumber(number) {
    cards.splice(cards.findIndex(x => x === number), 1);
    cards.splice(cards.findIndex(x => x == number), 1);
}