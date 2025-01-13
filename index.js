/* Features
- [x] Size setting (slider, buttons, dropdown)
- [x] Different brush modes (gray, color, rainbow)
- [x] color picker
- [-] Eraser brush (full eraser, lightening brush)
- [-] Clear (option for shake animation)
- [x] Single click to draw
- [x] color picker
*/

const gridBoardEl = document.querySelector(".grid-board");
const clearBtnEl = document.querySelector("#clear");
const controlPanelEl = document.querySelector(".control-panel form");

const state = {
  gridSize: "small",
  brushType: "solid",
  color: "black",
  shadingMode: false,
  gridlines: true,
  isDrawing: false,
};

controlPanelEl.addEventListener("change", (e) => {
  updateSettings(e);
  updateGridSize(e);
  updateGridlines(e);
});

controlPanelEl.addEventListener("click", (e) => {
  if (e.target.id === "clear") {
    gridBoardEl.querySelectorAll(".grid-square div").forEach((square) => {
      square.style.backgroundColor = "";
      square.style.opacity = "";
    });
  }
});
// -------------------------
// Draw Events
// -------------------------

gridBoardEl.addEventListener("dblclick", () => {
  // double click to start sticky mode
  state.isDrawing = true;
});

gridBoardEl.addEventListener("mousedown", (e) => {
  fillSquare(e); // to start filling the very first square
  state.isDrawing = true;
});

gridBoardEl.addEventListener("mouseup", () => {
  // Also fires when single-clicking in sticky mode.
  state.isDrawing = false;
});

gridBoardEl.addEventListener("mouseover", (e) => {
  if (state.isDrawing) fillSquare(e);
});

gridBoardEl.addEventListener("mouseleave", () => {
  // Solves bug when cursor keeps drawing when comes back from out of grid
  state.isDrawing = false;
});

// -------------------------
// Event Handlers
// -------------------------
function updateSettings(e) {
  if (e.target.name) {
    state[e.target.name] = e.target.value;
  } else if (e.target.id) {
    state[e.target.id] = e.target.checked;
  }
  console.table(state);
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

function updateGridlines(e) {
  if (e.target.id === "gridlines") {
    gridBoardEl.querySelectorAll(".grid-square").forEach((square) => {
      square.style.border = e.target.checked ? "" : "none";
    });
  }
}

function fillSquare(e) {
  if (!e.target.matches(".grid-square div")) return;
  switch (state.brushType) {
    case "solid":
      e.target.style.backgroundColor = state.color;
      if (!state.shadingMode) {
        e.target.style.opacity = "";
      } else {
        if (e.target.style.opacity) {
          const newOpacity = parseFloat(e.target.style.opacity) + 0.1;
          e.target.style.opacity = Math.min(1, newOpacity);
        } else {
          e.target.style.opacity = 0.1;
        }
      }

      break;
    case "rainbow":
      e.target.style.opacity = "";
      e.target.style.backgroundColor = randomColor();
      break;
    // "rgb(248, 73, 111)"
    case "eraser":
      if (!state.shadingMode) {
        e.target.style.backgroundColor = "";
      } else {
        {
          if (e.target.style.opacity) {
            const newOpacity = parseFloat(e.target.style.opacity) - 0.1;
            e.target.style.opacity = Math.max(0, newOpacity);
          } else {
            e.target.style.opacity = 0.9;
          }
        }
      }
      break;
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
    let innerSquareEl = document.createElement("div");
    gridSquareEl.classList.add("grid-square");
    gridSquareEl.style.width = `${gridSquareSize}px`;
    gridSquareEl.style.height = `${gridSquareSize}px`;

    gridSquareEl.appendChild(innerSquareEl);
    gridBoardEl.appendChild(gridSquareEl);
  }
}

// -------------------------
// Utiliy Functions
// -------------------------
function randomColor() {
  const randomRed = Math.floor(Math.random() * 255);
  const randomGreen = Math.floor(Math.random() * 255);
  const randomBlue = Math.floor(Math.random() * 255);
  return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}

drawGrid(16);
