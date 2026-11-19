// World coordinates stay separate from the canvas's pixel coordinates.
function drawGraph(canvas, mode, parameter, sample = "right") {
  const ctx = canvas.getContext("2d");
  const { width, height } = canvas;
  const signed = mode === "concavity" || mode === "tangent";
  const range = signed ? { left: -3, right: 3, low: -5, high: 7 } : { left: -.42, right: 4.65, low: -.6, high: 5.4 };
  const x = (value) => (value - range.left) / (range.right - range.left) * width;
  const y = (value) => height - (value - range.low) / (range.high - range.low) * height;
  const f = mode === "tangent" ? (t) => t * t / 2
    : mode === "concavity" ? (t) => t * t * t / 4 - t
      : (t) => t * t / 4;
  const line = (x1, y1, x2, y2, color, weight = 1) => {
    ctx.beginPath();
    ctx.moveTo(x(x1), y(y1));
    ctx.lineTo(x(x2), y(y2));
    ctx.strokeStyle = color;
    ctx.lineWidth = weight;
    ctx.stroke();
  };
  ctx.clearRect(0, 0, width, height);
  for (let tick = Math.ceil(range.left); tick <= range.right; tick++) line(tick, range.low, tick, range.high, "#3d5b4c");
  for (let tick = Math.ceil(range.low); tick <= range.high; tick++) line(range.left, tick, range.right, tick, "#3d5b4c");
  line(range.left, 0, range.right, 0, "#a4c2af", 1.5);
  line(0, range.low, 0, range.high, "#a4c2af", 1.5);
  ctx.fillStyle = "#d9eadf";
  ctx.font = "17px system-ui";
  for (let tick = Math.ceil(range.left); tick <= range.right; tick++) {
    if (tick) ctx.fillText(String(tick), x(tick) - 5, y(0) + 21);
  }
  let approximation = 0;
  if (mode === "riemann") {
    const delta = 4 / parameter;
    const offset = { left: 0, middle: .5, right: 1 }[sample];
    for (let i = 0; i < parameter; i++) {
      const left = i * delta;
      const top = f(left + offset * delta);
      approximation += delta * top;
      const box = [x(left), y(top), x(left + delta) - x(left), y(0) - y(top)];
      ctx.fillStyle = "#b1e3a84a";
      ctx.fillRect(...box);
      ctx.strokeStyle = "#b1e3a8";
      ctx.strokeRect(...box);
    }
  }
  ctx.beginPath();
  for (let i = 0; i <= 240; i++) {
    const point = range.left + (range.right - range.left) * i / 240;
    if (i === 0) ctx.moveTo(x(point), y(f(point)));
    else ctx.lineTo(x(point), y(f(point)));
  }
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#f5ce82";
  ctx.stroke();
  if (signed) {
    const t = parameter;
    if (mode === "tangent") {
      const tangent = (v) => f(t) + t * (v - t);
      line(range.left, tangent(range.left), range.right, tangent(range.right), "#b1e3a8", 2);
    }
    ctx.beginPath();
    ctx.arc(x(t), y(f(t)), 6, 0, 2 * Math.PI);
    ctx.fillStyle = "#e4f5df";
    ctx.fill();
  }
  return approximation;
}
