/* Features
- Size setting (slider, buttons, dropdown)
- Different brush modes (gray, color, rainbow)
- color picker
- Eraser brush (full eraser, lightening brush)
- Clear (option for shake animation)
- Trace on hover
- Single click to draw
- color picker
*/

const gridBoardEl = document.querySelector(".grid-board");
const clearBtnEl = document.querySelector("#clear");
const controlPanelEl = document.querySelector(".control-panel form");

const settings = {
  gridSize: "small",
  brushType: "solid",
  color: "black",
  sticky: false,
  additive: false,
  gridlines: true,
  isDrawing: false,
  previousColor: "",
};

controlPanelEl.addEventListener("change", (e) => {
  updateSettings(e);
  updateGridSize(e);
  console.table(settings);
});

// -------------------------
// Draw Events
// -------------------------
gridBoardEl.addEventListener("mouseover", (e) => {
  settings.previousColor = e.target.style.backgroundColor;
  if (settings.isDrawing) return;
  fillSquare(e);
});

gridBoardEl.addEventListener("mouseout", (e) => {
  if (settings.isDrawing) return;
  clearSquare(e);
});

gridBoardEl.addEventListener("mousedown", () => {
  settings.isDrawing = true;
});

gridBoardEl.addEventListener("mousemove", (e) => {
  e.preventDefault();
  if (settings.isDrawing) {
    fillSquare(e);
    e.target.classList.add("filled");
  }
});

gridBoardEl.addEventListener("mouseup", (e) => {
  settings.isDrawing = false;
  console.log(e.target.style.backgroundColor);
});

gridBoardEl.addEventListener("click", (e) => {});

// -------------------------
// Event Handlers
// -------------------------
function updateSettings(e) {
  if (e.target.name) {
    settings[e.target.name] = e.target.value;
  } else if (e.target.id) {
    settings[e.target.id] = e.target.checked;
  }
}

function updateGridSize(e) {
  if (e.target.name === "gridSize") {
    let gridSize = 0;
    switch (e.target.value) {
      case "small":
        gridSize = 16;
        break;
      case "medium":
        gridSize = 32;
        break;
      case "large":
        gridSize = 64;
    }
    drawGrid(gridSize);
  }
}

function fillSquare(e) {
  if (e.target.classList.contains("grid-square")) {
    e.target.style.backgroundColor = settings.color;
  }
}

function clearSquare(e) {
  if (e.target.classList.contains("grid-square")) {
    e.target.style.backgroundColor = settings.previousColor;
  }
}

// -------------------------
// UI Functions
// -------------------------

function drawGrid(size) {
  gridBoardEl.innerHTML = "";
  let gridSquareSize = gridBoardEl.offsetWidth / size;
  for (let i = 0; i < size ** 2; i++) {
    let gridSquareEl = document.createElement("div");
    gridSquareEl.classList.add("grid-square");
    gridSquareEl.style.width = `${gridSquareSize}px`;
    gridSquareEl.style.height = `${gridSquareSize}px`;
    gridBoardEl.appendChild(gridSquareEl);
  }
}

drawGrid(16);
