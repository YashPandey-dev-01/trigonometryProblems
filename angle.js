const r = require("raylib");

function setup() {
  const world = {
    WIDTH: 1000,
    HEIGHT: 1000,
    pointA: { x: 100, y: 300 },
    pointB: { x: 350, y: 150 },
    pointSize: 5,
    lineWidth: 3,

    colorPalette: {
      line: r.SKYBLUE,
      point: r.WHITE,
      bg: r.BLACK
    }
  };

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(world.WIDTH, world.HEIGHT, "Raylib using Trignometry Concepts");
  r.SetTargetFPS(60);

  return world;
}

function drawPoints(w) {
  r.DrawCircleV(w.pointA, w.pointSize, w.colorPalette.point);
  r.DrawCircleV(w.pointB, w.pointSize, w.colorPalette.point);
}

function round(num) {
  num = num * 100;
  num = Math.floor(num);
  num = num / 100;
  return num;
}

function radianToDegree(rad) {
  return round((180 / Math.PI) * rad);
}

function calcTriangleAngle(y, x) {
  const angle = Math.atan2(y, x);
  return radianToDegree(angle);
}

function drawTriangle(w) {
  const horzDiffBtwPoints = w.pointB["x"] - w.pointA["x"];
  const verDiffBtwPoints = w.pointA["y"] - w.pointB["y"];
  const horzEndPoint = {
    x: w.pointA["x"] + horzDiffBtwPoints,
    y: w.pointA["y"]
  }
  const verEndPoint = {
    x: w.pointB["x"],
    y: w.pointB["y"] + verDiffBtwPoints
  }
  const triangleAngle = calcTriangleAngle(verDiffBtwPoints, horzDiffBtwPoints);

  r.DrawLineEx(w.pointA, w.pointB, w.lineWidth, w.colorPalette.line);
  r.DrawLineEx(w.pointA, horzEndPoint, w.lineWidth, w.colorPalette.line);
  r.DrawLineEx(w.pointB, verEndPoint, w.lineWidth, w.colorPalette.line);
  r.DrawText(triangleAngle + "", w.pointA["x"] - 20, w.pointA["y"] + 20, 10, r.BLUE);
}

function draw(w) {
  r.BeginDrawing();
  r.ClearBackground(w.colorPalette.bg);

  drawPoints(w);
  drawTriangle(w);

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