const r = require("raylib");

function setup() {
  const world = {
    WIDTH: 1000,
    HEIGHT: 1000,
    centreX: 500,
    centreY: 500,
    cf: 0,
    numOfPoints: 1000,
    colorPalette: {
      patten: r.SKYBLUE,
      bg: r.BLACK
    }
  };

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(world.WIDTH, world.HEIGHT, "Raylib using Trignometry Concepts");
  r.SetTargetFPS(60);

  return world;
}

function calculatePoints(w) {
  const disBetweenVertices = (Math.PI * 2) / w.numOfPoints;
  const vertices = [];

  for (let i = 0; i < Math.PI * 2; i = i + disBetweenVertices) {
    const radian = 2 * i * w.cf + 100;
    const radius = 300 + 2 * Math.tan(radian);
    const x = w.centreX + radius * Math.cos(radian);
    const y = w.centreY + radius * Math.sin(radian);

    vertices.push({ x, y });
  }

  return vertices;
}

function drawPattern(w) {
  const points = calculatePoints(w);

  for (let i = points.length - 1; i >= 0; i--) {
    const point1 = points.at(i);
    const point2 = points.at(i - 1);

    r.DrawLineEx(point1, point2, 2, w.colorPalette.patten);
  }
}

function draw(w) {
  r.BeginDrawing();
  r.ClearBackground(w.colorPalette.bg);
  w.cf++;
  drawPattern(w);

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