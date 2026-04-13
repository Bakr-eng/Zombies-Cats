const worldSize = 5 // behöver ändra nummret i playPage.css också 
let world = [];

for( let x = 0; x < worldSize; x++){
    world[x] = [];
    for(let y = 0; y <worldSize; y++){
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
  if (activeTile)
  {
    activeTile.classList.add("active")
  }

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
            grid.appendChild(tile);
        }
    }
}

window.onload = function () {
    drawWorld();
    updateView();
  
};
