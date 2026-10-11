const r = require("raylib");

function setup() {
  const world = {
    WIDTH: 400,
    HEIGHT: 400,
    centreX: 200,
    centreY: 200,
    radius: 150,
    numOfSides: 7,

    colorPalette: {
      bg: r.BLACK,
      polygon: r.BLUE
    }
  };

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(world.WIDTH, world.HEIGHT, "Raylib using Trignometry Concepts");
  r.SetTargetFPS(60);

  return world;
}

function calculateVertices(w) {
  const disBetweenVertices = (Math.PI * 2) / w.numOfSides;
  const vertices = [];

  for (let i = 0; i < Math.PI * 2; i = i + disBetweenVertices) {
    const radian = i;
    const x = w.centreX + w.radius * Math.cos(radian);
    const y = w.centreY + w.radius * Math.sin(radian);

    vertices.push({ x, y });
  }

  return vertices;
}

function drawPolygon(w) {
  const vertices = calculateVertices(w);

  for (let i = w.numOfSides - 1; i >= 0; i--) {
    const point1 = vertices.at(i);
    const point2 = vertices.at(i - 1);

    r.DrawLineEx(point1, point2, 2, w.colorPalette.polygon);
  }
}

function draw(w) {
  r.BeginDrawing();
  r.ClearBackground(w.colorPalette.bg);

  drawPolygon(w);

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