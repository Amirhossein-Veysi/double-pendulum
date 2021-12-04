let r1 = 200;
let r2 = 200;
let m1 = 40;
let m2 = 40;
let a1 = Math.PI / 2;
let a2 = Math.PI / 2;
let a1_v = 0;
let a2_v = 0;
let a1_a = 0.01;
let a2_a = 0.001;
let g = 1;
let points = [];
let cx, xy;

function setup() {
  createCanvas(1000, 600);
  cx = width / 2;
  cy = 50;
}

function draw() {
  let n1 = -g * (2 * m1 + m2) * Math.sin(a1);
  let n2 = -m2 * g * Math.sin(a1 - 2 * a2);
  let n3 = -2 * Math.sin(a1 - a2) * m2;
  let n4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * Math.cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
  let a1_a = (n1 + n2 + n3 * n4) / den;

  n1 = 2 * Math.sin(a1-a2);
  n2 = (a1_v * a1_v * r1 * (m1+m2));
  n3 = g * (m1 + m2) * Math.cos(a1);
  n4 = a2_v * a2_v * r2 * m2 * Math.cos(a1 - a2_v);
  den = r2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));

  let a2_a = (n1 * (n2 + n3 + n4)) / den;

  background(255);
  stroke(0);
  strokeWeight(2);

  translate(cx, cy);

  let x1 = r1 * Math.sin(a1);
  let y1 = r1 * Math.cos(a1);

  let x2 = x1 + r2 * Math.sin(a2);
  let y2 = y1 + r2 * Math.cos(a2);

  line(0, 0, x1, y1);
  fill(0);
  ellipse(x1, y1, m1, m1);

  line(x1, y1, x2, y2);
  fill(0);
  ellipse(x2, y2, m2, m2);
  
  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;

  points.push({ x: x2, y: y2 });

  if (points.length > 600) points.shift();

  points.map((el, i) => {
    strokeWeight(1);
    stroke(0);
    if (i > 0) {
        line(points[i - 1].x, points[i - 1].y, el.x, el.y);
    }
  });
}
