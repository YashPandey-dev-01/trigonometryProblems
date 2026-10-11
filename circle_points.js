const r = require("raylib");

function setup() {
  const world = {
    WIDTH: 400,
    HEIGHT: 400,
    cirCentreX: 200,
    cirCentreY: 200,
    cirRadius: 150,
    pointRadius: 10,
    numOfPoints: 12,

    colorPalette: {
      circle: r.SKYBLUE,
      point: r.BLACK
    }
  };

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(world.WIDTH, world.HEIGHT, "Raylib using Trignometry Concepts");
  r.SetTargetFPS(60);

  return world;
}

function drawPoints(w) {
  const disBetweenPoints = (Math.PI * 2) / w.numOfPoints;

  for (let i = 1; i <= w.numOfPoints; i++) {
    const radian = disBetweenPoints * i;
    const x = w.cirCentreX + w.cirRadius * Math.cos(radian);
    const y = w.cirCentreY + w.cirRadius * Math.sin(radian);

    r.DrawCircle(x, y, w.pointRadius, r.BLACK);
  }
}

function draw(w) {
  r.BeginDrawing();
  r.ClearBackground(r.WHITE);

  r.DrawCircle(w.cirCentreX, w.cirCentreY, w.cirRadius, r.RED);
  drawPoints(w);

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