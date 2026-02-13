const fs = require('fs');
const zlib = require('zlib');

function createPNG(width, height, drawFn) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rawData = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    const offset = y * (width * 4 + 1);
    rawData[offset] = 0; // filter none
    for (let x = 0; x < width; x++) {
      const px = offset + 1 + x * 4;
      const [r, g, b, a] = drawFn(x, y, width, height);
      rawData[px] = r;
      rawData[px + 1] = g;
      rawData[px + 2] = b;
      rawData[px + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData, { level: 9 });

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeB = Buffer.from(type);
    const crcData = Buffer.concat([typeB, data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(crcData) >>> 0, 0);
    return Buffer.concat([len, typeB, data, crc]);
  }

  function crc32(buf) {
    let c = 0xFFFFFFFF;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let j = 0; j < 8; j++) c = (c >>> 1) ^ (c & 1 ? 0xEDB88320 : 0);
    }
    return ~c;
  }

  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

function dist(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

function ellipse(x, y, cx, cy, rx, ry) {
  return ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;
}

// Draw a cute penguin (Linux Tux style)
function drawPenguin(x, y, w, h) {
  const bg = [13, 17, 23, 255];       // dark background #0D1117
  const black = [30, 30, 30, 255];     // penguin body
  const white = [245, 245, 245, 255];  // penguin belly
  const orange = [255, 165, 0, 255];   // beak and feet
  const yellow = [255, 200, 50, 255];  // beak highlight
  const eyeW = [255, 255, 255, 255];   // eye white
  const eyeB = [10, 10, 10, 255];      // eye pupil
  const green = [0, 182, 3, 255];      // #00b603 green accent ring

  // Normalize coords to 0-1
  const nx = x / w;
  const ny = y / h;
  const cx = w / 2;
  const cy = h / 2;

  // Background circle with green accent border
  const bgDist = dist(x, y, cx, cy);
  const outerR = w * 0.48;
  const innerR = w * 0.44;

  if (bgDist > outerR) return bg;
  if (bgDist > innerR) return green;

  // Dark circle background for penguin
  const penguinBg = [20, 25, 35, 255];
  let pixel = penguinBg;

  // Penguin body dimensions (relative to circle center)
  const bodyW = w * 0.28;
  const bodyH = h * 0.30;
  const bodyCY = cy + h * 0.05;

  // Body (black oval)
  if (ellipse(x, y, cx, bodyCY, bodyW, bodyH)) {
    pixel = black;
  }

  // Head (black circle on top)
  const headR = w * 0.19;
  const headCY = cy - h * 0.17;
  if (dist(x, y, cx, headCY) < headR) {
    pixel = black;
  }

  // White belly
  const bellyW = w * 0.19;
  const bellyH = h * 0.22;
  const bellyCY = cy + h * 0.08;
  if (ellipse(x, y, cx, bellyCY, bellyW, bellyH)) {
    pixel = white;
  }

  // White face patch (smaller oval on head)
  const faceW = w * 0.12;
  const faceH = h * 0.10;
  const faceCY = cy - h * 0.14;
  if (ellipse(x, y, cx, faceCY, faceW, faceH)) {
    pixel = white;
  }

  // Left eye
  const eyeY = cy - h * 0.16;
  const leftEyeX = cx - w * 0.07;
  const rightEyeX = cx + w * 0.07;
  const eyeR = w * 0.035;
  const pupilR = w * 0.018;

  if (dist(x, y, leftEyeX, eyeY) < eyeR) {
    pixel = eyeW;
    if (dist(x, y, leftEyeX + w * 0.005, eyeY) < pupilR) pixel = eyeB;
  }

  // Right eye
  if (dist(x, y, rightEyeX, eyeY) < eyeR) {
    pixel = eyeW;
    if (dist(x, y, rightEyeX + w * 0.005, eyeY) < pupilR) pixel = eyeB;
  }

  // Beak (small triangle/diamond shape)
  const beakCY = cy - h * 0.09;
  const beakW = w * 0.05;
  const beakH = h * 0.035;
  if (ellipse(x, y, cx, beakCY, beakW, beakH)) {
    pixel = orange;
    if (y < beakCY) pixel = yellow;
  }

  // Left wing
  const wingW = w * 0.08;
  const wingH = h * 0.18;
  const leftWingX = cx - w * 0.28;
  const wingCY = cy + h * 0.01;
  if (ellipse(x, y, leftWingX, wingCY, wingW, wingH)) {
    pixel = black;
  }

  // Right wing
  const rightWingX = cx + w * 0.28;
  if (ellipse(x, y, rightWingX, wingCY, wingW, wingH)) {
    pixel = black;
  }

  // Left foot
  const footY = cy + h * 0.33;
  const leftFootX = cx - w * 0.10;
  const rightFootX = cx + w * 0.10;
  const footW = w * 0.07;
  const footH = h * 0.025;
  if (ellipse(x, y, leftFootX, footY, footW, footH)) {
    pixel = orange;
  }
  if (ellipse(x, y, rightFootX, footY, footW, footH)) {
    pixel = orange;
  }

  return pixel;
}

// Generate icon (1024x1024)
const icon = createPNG(1024, 1024, drawPenguin);
fs.writeFileSync('assets/icon.png', icon);
fs.writeFileSync('assets/adaptive-icon.png', icon);
console.log('Generated penguin icon.png and adaptive-icon.png');
console.log('Icon size:', fs.statSync('assets/icon.png').size, 'bytes');

// Generate splash with penguin centered on dark bg
function drawSplash(x, y, w, h) {
  const bg = [13, 17, 23, 255];
  // Draw penguin in center area (500x500 region in the middle)
  const penguinSize = 500;
  const ox = (w - penguinSize) / 2;
  const oy = (h - penguinSize) / 2 - 200; // slightly above center

  if (x >= ox && x < ox + penguinSize && y >= oy && y < oy + penguinSize) {
    const px = x - ox;
    const py = y - oy;
    const result = drawPenguin(px, py, penguinSize, penguinSize);
    // If it's the background color from penguin draw, use splash bg
    if (result[0] === 13 && result[1] === 17 && result[2] === 23) return bg;
    return result;
  }

  // Draw "Kingdom-of-UNIX" text area indicator (green bar below penguin)
  const textY = oy + penguinSize + 80;
  const textH = 8;
  const textW = 300;
  const textX = (w - textW) / 2;
  if (x >= textX && x < textX + textW && y >= textY && y < textY + textH) {
    return [0, 182, 3, 255]; // green accent line
  }

  return bg;
}

const splash = createPNG(1284, 2778, drawSplash);
fs.writeFileSync('assets/splash.png', splash);
console.log('Generated splash.png');
console.log('Splash size:', fs.statSync('assets/splash.png').size, 'bytes');
