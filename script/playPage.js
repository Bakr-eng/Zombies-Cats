const worldSize = 5 // behöver ändra nummret i playPage.css också, om man ska ändra
let catImage = []
let world = [];
let player = { x: 2, y: 2 };
let catsLeft = 3;
let hittadeKatter = 0;


const placeImages = [
    "images/img (1).jpg",
    "images/img (2).jpg",
    "images/img (3).jpg",
    "images/img (4).jpg",
    "images/img (5).jpg",
    "images/img (6).jpg",
    "images/img (7).jpg",
    "images/img (8).jpg",
    "images/img (9).jpg",
    "images/img (10).jpg",
    "images/img (11).jpg",
    "images/img (12).jpg",
    "images/img (13).jpg",
    "images/img (14).jpg",
    "images/img (15).jpg",
    "images/img (16).jpg",
    "images/img (17).jpg",
    "images/img (18).jpg",
    "images/img (19).jpg",
    "images/img (20).jpg",
    "images/img (21).jpg"
];


for (let x = 0; x < worldSize; x++) {
    world[x] = [];
    for (let y = 0; y < worldSize; y++) {

        const randomIndex = Math.floor(Math.random() * placeImages.length); //slumpa bild

        world[x][y] = {
            hasCat: false,
            hasZombie: false,
            image: placeImages[randomIndex]
        };
    }
}

async function initGame() {
    const url = "https://api.pexels.com/v1/search?query=cat+outside&per_page=10";
    const apiKey = "CjpiMDz8dzJ3LhrdACOHD1Nm1FSRxkdjGrF03KWWsbW5w2E3JhZdgPIJ";

    try {
        const response = await fetch(url, {
            headers: { Authorization: apiKey }
        });

        const data = await response.json();
        catImage = data.photos.map(p => p.src.medium);

    } catch (error) {
        console.error("error: ", error)
    }
    placeCat(3);
    placeZombi(1);
    drawWorld();
    updateView();
}
window.onload = initGame;


//-------------------------------------add cats & zombies

function placeCat(amount) {
    let placed = 0;

    while (placed < amount) {
        let x = Math.floor(Math.random() * worldSize);
        let y = Math.floor(Math.random() * worldSize);

        if (x === player.x && y === player.y) continue;

        if (!world[x][y].hasCat) {
            world[x][y].hasCat = true;

            if (catImage.length > 0) {
                const randomIndex = Math.floor(Math.random() * catImage.length);
                world[x][y].image = catImage[randomIndex];
            }

            placed++;
        }

    }
}

function placeZombi(amount) {
    let placed = 0;
    while (placed < amount) {
        let x = Math.floor(Math.random() * worldSize);
        let y = Math.floor(Math.random() * worldSize);
        if (x === player.x && y === player.y) {
            continue;
        }
        if (!world[x][y].hasZombie) {
            world[x][y].hasZombie = true;
            placed++;
        }
    }
}

//-------------------------------

function updateView() {
    const placeImg = document.getElementById("placeImage");
    placeImg.src = world[player.x][player.y].image; // Byter bild till den bild som finns på spelarens plats

    // Ta bort aktiv markering från alla rutor
    document.querySelectorAll(".tile").forEach(t => t.classList.remove("active"));

    const activeTile = document.getElementById(`tile-${player.x}-${player.y}`);
    if (activeTile) {
        activeTile.classList.add("active")
    }

    document.getElementById("east").disabled = (player.y >= worldSize - 1);
    document.getElementById("west").disabled = (player.y <= 0);
    document.getElementById("north").disabled = (player.x <= 0);
    document.getElementById("south").disabled = (player.x >= worldSize - 1);

}

function drawWorld() {
    const grid = document.getElementById("worldGrid");
    grid.innerHTML = "" // tömma grid

    for (let x = 0; x < worldSize; x++) {
        for (let y = 0; y < worldSize; y++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.id = `tile-${x}-${y}`;
            tile.innerText = `${x},${y}`;

            // man kan se var katterna ligger shift-Alt-A

            if (world[x][y].hasCat) {
                tile.style.backgroundColor = "rgb(82, 121, 226)";
            }
            if (world[x][y].hasZombie) {
                tile.style.backgroundColor = "rgb(196, 0, 0)";
            }

            grid.appendChild(tile);
        }
    }
}


//---------------------------------- meeting cat or zombie
 const restartBtn = document.getElementById("restart");
 const closeGame = document.getElementById("closeGame");
 const meetingText = document.getElementById("Meet");
 const endScrean = document.getElementById("endScrean");


 function showEndScrean() {
    document.querySelector(".endBackground").style.display = "flex";

    restartBtn.onclick = () => window.location.href = "playPage.html";
    closeGame.onclick = () => window.location.href = "index.html";

    gameOver();
 }
function meeting() {

    if (world[player.x][player.y].hasZombie) {

        meetingText.innerText = "💀 Du mötte en zombie! GAME OVER";
        endScrean.src = "images/zombie.png";

        showEndScrean();
        return;
    }

    if (world[player.x][player.y].hasCat) {

        meetingText.innerText = "🐱 Du hittade en katt!";
        world[player.x][player.y].hasCat = false;

        hittadeKatter ++;
        document.getElementById("foundCatNum").innerText = "Hittade katter: " + hittadeKatter;

        const randomIndex = Math.floor(Math.random() * placeImages.length); //random bild efter att hitade katten
        world[player.x][player.y].image = placeImages[randomIndex];

        catsLeft--;
    }
    else {
        meetingText.innerText = "Här finns inget speciellt.";
    }

    if (catsLeft == 0) {

        meetingText.innerText = "du vann!!!!";
        endScrean.src = "images/SavingCats.jpg";

        showEndScrean();
        return;

    }
}
function zombieMoves() {
    // 40% chans att zombien INTE rör sig
if (Math.random() < 0.5) {
    return; // zombien står still
}
    let newPositions = [];
    for (let x = 0; x < worldSize; x++) {
        for (let y = 0; y < worldSize; y++) {
            if (world[x][y].hasZombie) {
                let newX = x;
                let newY = y;

                if (x < player.x) {
                    newX++;
                }
                else if (x > player.x) {
                    newX--;
                }
                else {
                    if (y < player.y) {
                        newY++;
                    }
                    else if (y > player.y) {
                        newY--;
                    }
                }
                newPositions.push({ x: newX, y: newY });
            }
        }
    }
    // Rensa alla zombies
    for (let x = 0; x < worldSize; x++) {
        for (let y = 0; y < worldSize; y++) {
            world[x][y].hasZombie = false;
        }
    }
    // Placera zombies på nya positioner
    newPositions.forEach(pos => {
        world[pos.x][pos.y].hasZombie = true;
    });
}
function gameOver() {
    document.getElementById("east").disabled = true;
    document.getElementById("west").disabled = true;
    document.getElementById("north").disabled = true;
    document.getElementById("south").disabled = true;
}

//---------------------------------- moving
document.getElementById("east").addEventListener("click", function () {
    if (player.y < worldSize - 1) {
        player.y++;
    }
    zombieMoves();
    drawWorld();
    updateView();
    meeting();

})
document.getElementById("west").addEventListener("click", function () {
    if (player.y > 0) {
        player.y--
    }
    zombieMoves();
    drawWorld();
    updateView();
    meeting();
})
document.getElementById("north").addEventListener("click", function () {
    if (player.x > 0) {
        player.x--
    }
    zombieMoves();
    drawWorld();
    updateView();
    meeting();
})
document.getElementById("south").addEventListener("click", function () {
    if (player.x < worldSize - 1) {
        player.x++
    }
    zombieMoves();
    drawWorld();
    updateView();
    meeting();
})