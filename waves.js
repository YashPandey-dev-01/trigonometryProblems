const r = require("raylib");

function setup() {
  const world = {
    WIDTH: 600,
    HEIGHT: 400,
    graphX: 50,
    garphY: 200,
    waveWidth: 450,
    numOfPoints: 50,
    scaleRatio: 100,

    colorPalette: {
      bg: r.BLACK,
      sin: r.BLUE,
      cos: r.RED,
      graph: r.WHITE,
      text: r.GRAY
    }
  };

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(world.WIDTH, world.HEIGHT, "Raylib using Trignometry Concepts");
  r.SetTargetFPS(60);

  return world;
}

function drawGraphStruct(w) {
  r.DrawLine(w.graphX, 20, w.graphX, w.HEIGHT - 20, w.colorPalette.graph);
  r.DrawLine(w.graphX, w.garphY, w.WIDTH - 20, w.garphY, w.colorPalette.graph);

  r.DrawText("0", w.graphX - 15, w.garphY - 15, 18, w.colorPalette.text);
  r.DrawText("1", w.graphX - 15, w.garphY - w.scaleRatio - 15, 18, w.colorPalette.text);
  r.DrawText("-1", w.graphX - 15, w.garphY + w.scaleRatio - 15, 18, w.colorPalette.text);
}

function calcSinValues(w) {
  const angDiff = (2 * Math.PI) / w.numOfPoints;
  const xDiff = w.waveWidth / w.numOfPoints;
  const sinValues = [];
  let degOnGraph = w.graphX;
  let angle;

  for (let i = 0; i <= w.numOfPoints; i++) {
    angle = i * angDiff;
    const x = degOnGraph
    const y = w.garphY - (Math.sin(angle) * w.scaleRatio);

    sinValues.push([x, y]);

    degOnGraph += xDiff
  }

  return sinValues;
}

function drawSinWave(w) {
  const sinValues = calcSinValues(w);

  for (let i = 0; i < sinValues.length - 1; i++) {
    const x1 = sinValues[i][0];
    const y1 = sinValues[i][1];
    const x2 = sinValues[i + 1][0];
    const y2 = sinValues[i + 1][1];

    r.DrawLine(x1, y1, x2, y2, w.colorPalette.sin);
  }
}

function calcCosValues(w) {
  const angDiff = (2 * Math.PI) / w.numOfPoints;
  const xDiff = w.waveWidth / w.numOfPoints;
  const cosValues = [];
  let degOnGraph = w.graphX;
  let angle;

  for (let i = 0; i <= w.numOfPoints; i++) {
    angle = i * angDiff;
    const x = degOnGraph
    const y = w.garphY - (Math.cos(angle) * w.scaleRatio);

    cosValues.push([x, y]);

    degOnGraph += xDiff
  }

  return cosValues;
}

function drawCosWave(w) {
  const cosValues = calcCosValues(w);

  for (let i = 0; i < cosValues.length - 1; i++) {
    const x1 = cosValues[i][0];
    const y1 = cosValues[i][1];
    const x2 = cosValues[i + 1][0];
    const y2 = cosValues[i + 1][1];

    r.DrawLine(x1, y1, x2, y2, w.colorPalette.cos);
  }
}

function draw(w) {
  r.BeginDrawing();
  r.ClearBackground(w.colorPalette.bg);

  drawGraphStruct(w);
  drawSinWave(w);
  drawCosWave(w);

  r.EndDrawing();
}

function loop(w) {
  while (!r.WindowShouldClose()) {
    draw(w);
  }
}

function teardown() {
  r.CloseWindow();
}

function main() {
  const w = setup();
  loop(w);
  teardown();
}

main();
