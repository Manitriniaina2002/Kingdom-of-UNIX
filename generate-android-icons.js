const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function createPNG(width, height, drawFn) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  const rawData = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    const offset = y * (width * 4 + 1);
    rawData[offset] = 0;
    for (let x = 0; x < width; x++) {
      const px = offset + 1 + x * 4;
      const [r, g, b, a] = drawFn(x, y, width, height);
      rawData[px] = r; rawData[px+1] = g; rawData[px+2] = b; rawData[px+3] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData, { level: 9 });

  function makeChunk(type, data) {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
    const typeB = Buffer.from(type);
    const crcData = Buffer.concat([typeB, data]);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(crcData) >>> 0, 0);
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
    signature, makeChunk('IHDR', ihdr), makeChunk('IDAT', compressed), makeChunk('IEND', Buffer.alloc(0))
  ]);
}

function d(x1, y1, x2, y2) { return Math.sqrt((x1-x2)**2 + (y1-y2)**2); }
function ell(x, y, cx, cy, rx, ry) { return ((x-cx)/rx)**2 + ((y-cy)/ry)**2 <= 1; }

function drawPenguin(x, y, w, h) {
  const bg = [13, 17, 23, 255];
  const blk = [30, 30, 30, 255];
  const wht = [245, 245, 245, 255];
  const org = [255, 165, 0, 255];
  const ylw = [255, 200, 50, 255];
  const eyW = [255, 255, 255, 255];
  const eyB = [10, 10, 10, 255];
  const grn = [0, 182, 3, 255];
  const pbg = [20, 25, 35, 255];

  const cx = w/2, cy = h/2;
  const bgD = d(x, y, cx, cy);
  if (bgD > w * 0.48) return bg;
  if (bgD > w * 0.44) return grn;

  let px = pbg;

  // Body
  if (ell(x, y, cx, cy + h*0.05, w*0.28, h*0.30)) px = blk;
  // Head
  if (d(x, y, cx, cy - h*0.17) < w*0.19) px = blk;
  // Belly
  if (ell(x, y, cx, cy + h*0.08, w*0.19, h*0.22)) px = wht;
  // Face
  if (ell(x, y, cx, cy - h*0.14, w*0.12, h*0.10)) px = wht;
  // Eyes
  const eY = cy - h*0.16, lX = cx - w*0.07, rX = cx + w*0.07;
  if (d(x,y,lX,eY) < w*0.035) { px = eyW; if (d(x,y,lX+w*0.005,eY) < w*0.018) px = eyB; }
  if (d(x,y,rX,eY) < w*0.035) { px = eyW; if (d(x,y,rX+w*0.005,eY) < w*0.018) px = eyB; }
  // Beak
  if (ell(x, y, cx, cy - h*0.09, w*0.05, h*0.035)) { px = org; if (y < cy - h*0.09) px = ylw; }
  // Wings
  if (ell(x, y, cx - w*0.28, cy + h*0.01, w*0.08, h*0.18)) px = blk;
  if (ell(x, y, cx + w*0.28, cy + h*0.01, w*0.08, h*0.18)) px = blk;
  // Feet
  if (ell(x, y, cx - w*0.10, cy + h*0.33, w*0.07, h*0.025)) px = org;
  if (ell(x, y, cx + w*0.10, cy + h*0.33, w*0.07, h*0.025)) px = org;

  return px;
}

// Foreground only (for adaptive icon - no circle border)
function drawPenguinForeground(x, y, w, h) {
  const transparent = [0, 0, 0, 0];
  const blk = [30, 30, 30, 255];
  const wht = [245, 245, 245, 255];
  const org = [255, 165, 0, 255];
  const ylw = [255, 200, 50, 255];
  const eyW = [255, 255, 255, 255];
  const eyB = [10, 10, 10, 255];

  const cx = w/2, cy = h/2;
  let px = transparent;

  if (ell(x, y, cx, cy + h*0.05, w*0.28, h*0.30)) px = blk;
  if (d(x, y, cx, cy - h*0.17) < w*0.19) px = blk;
  if (ell(x, y, cx, cy + h*0.08, w*0.19, h*0.22)) px = wht;
  if (ell(x, y, cx, cy - h*0.14, w*0.12, h*0.10)) px = wht;
  const eY = cy - h*0.16, lX = cx - w*0.07, rX = cx + w*0.07;
  if (d(x,y,lX,eY) < w*0.035) { px = eyW; if (d(x,y,lX+w*0.005,eY) < w*0.018) px = eyB; }
  if (d(x,y,rX,eY) < w*0.035) { px = eyW; if (d(x,y,rX+w*0.005,eY) < w*0.018) px = eyB; }
  if (ell(x, y, cx, cy - h*0.09, w*0.05, h*0.035)) { px = org; if (y < cy - h*0.09) px = ylw; }
  if (ell(x, y, cx - w*0.28, cy + h*0.01, w*0.08, h*0.18)) px = blk;
  if (ell(x, y, cx + w*0.28, cy + h*0.01, w*0.08, h*0.18)) px = blk;
  if (ell(x, y, cx - w*0.10, cy + h*0.33, w*0.07, h*0.025)) px = org;
  if (ell(x, y, cx + w*0.10, cy + h*0.33, w*0.07, h*0.025)) px = org;

  return px;
}

// Android mipmap sizes
const sizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192,
};

const resDir = path.join(__dirname, 'android/app/src/main/res');

for (const [folder, size] of Object.entries(sizes)) {
  const dir = path.join(resDir, folder);
  
  // ic_launcher.png (full icon with circle)
  const launcher = createPNG(size, size, drawPenguin);
  fs.writeFileSync(path.join(dir, 'ic_launcher.png'), launcher);
  
  // ic_launcher_round.png (same for round)
  fs.writeFileSync(path.join(dir, 'ic_launcher_round.png'), launcher);
  
  // ic_launcher_foreground.png (just the penguin, no background)
  const fg = createPNG(size, size, drawPenguinForeground);
  fs.writeFileSync(path.join(dir, 'ic_launcher_foreground.png'), fg);
  
  console.log(`Generated ${folder}: ${size}x${size}`);
}

console.log('All Android icons generated with penguin!');
