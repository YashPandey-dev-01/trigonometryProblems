const r = require("raylib");

function setup() {
  const world = {
    WIDTH: 600,
    HEIGHT: 600,
    centreX: 300,
    centreY: 200,
    hRadius: 200,
    vRadius: 100,

    colorPalette: {
      bg: r.BLACK,
      ellipse: r.BLUE
    }
  };

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(world.WIDTH, world.HEIGHT, "Raylib using Trignometry Concepts");
  r.SetTargetFPS(60);

  return world;
}

function calcCirclePoints(w) {
  const point = [];

  for (let i = 0; i < Math.PI * 2; i = i + 0.01) {
    const radian = i;
    const x = w.centreX + w.hRadius * Math.cos(radian);
    const y = w.centreY + w.vRadius * Math.sin(radian);

    point.push({ x, y });
  }

  return point;
}

function drawEllipse(w) {
  const points = calcCirclePoints(w);

  for (let i = points.length - 1; i >= 0; i--) {
    const point1 = points.at(i);
    const point2 = points.at(i - 1);

    r.DrawLineEx(point1, point2, 2, w.colorPalette.ellipse);
  }
}

function draw(w) {
  r.BeginDrawing();
  r.ClearBackground(w.colorPalette.bg);

  drawEllipse(w);

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