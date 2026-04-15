const worldSize = 5 // behöver ändra nummret i playPage.css också, om man ska ändra
let world = [];

for (let x = 0; x < worldSize; x++) {
    world[x] = [];
    for (let y = 0; y < worldSize; y++) {
        world[x][y] = {
            hasCat: false,
            hasZombie: false,
            image: "images/test.jpg"
        };
    }
}
let player = { x: 0, y: 0 };

function updateView() {
    const placeImg = document.getElementById("place");
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

window.onload = function () {
    updateView();
};

function drawWorld() {
    const grid = document.getElementById("worldGrid");

    for (let x = 0; x < worldSize; x++) {
        for (let y = 0; y < worldSize; y++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.id = `tile-${x}-${y}`;
            tile.innerText = `${x},${y}`;

            // man kan se var katterna ligger 
            if (world[x][y].hasCat) {
                tile.style.backgroundColor = "pink"; // eller valfri färg
            }
            if (world[x][y].hasZombie) {
                tile.style.backgroundColor = "rgb(0, 78, 4)";
            }

            grid.appendChild(tile);
        }
    }
}
window.onload = function () {
    placeCat(3);
    placeZombi(4);
    drawWorld();
    updateView();
};

//-------------------------------------add cats & zombies

function placeCat(amount) {
    let placed = 0;

    while (placed < amount) {
        let x = Math.floor(Math.random() * worldSize);
        let y = Math.floor(Math.random() * worldSize);

        if (x === player.x && y === player.y) {
            continue;
        }
        if (world[x][y].hasCat === false) {
            world[x][y].hasCat = true;
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
        if (world[x][y].hasZombie === false) {
            world[x][y].hasZombie = true;
            placed++;
        }
    }
}

//---------------------------------- meeting cat and zombie

function meetingCat() {
    if (world[player.x][player.y].hasCat) {
        document.getElementById("SavingCat").innerText = "Du hittade katten!";
    }
}


//---------------------------------- moving
document.getElementById("east").addEventListener("click", function () {
    if (player.y < worldSize - 1) {
        player.y++;

    }
    updateView();
    meetingCat();
})

document.getElementById("west").addEventListener("click", function () {
    if (player.y > 0) {
        player.y--
    }
    updateView();
    meetingCat();
})

document.getElementById("north").addEventListener("click", function () {
    if (player.x > 0) {
        player.x--
    }
    updateView();
    meetingCat();
})

document.getElementById("south").addEventListener("click", function () {
    if (player.x < worldSize - 1) {
        player.x++
    }
    updateView();
    meetingCat();
})
