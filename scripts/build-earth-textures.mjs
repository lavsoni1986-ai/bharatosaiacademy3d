import fs from 'fs'
import path from 'path'
import zlib from 'zlib'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicTexturesDir = path.join(__dirname, '..', 'public', 'textures')
if (!fs.existsSync(publicTexturesDir)) {
  fs.mkdirSync(publicTexturesDir, { recursive: true })
}

// --- CRC32 FOR PNG CHUNKS ---
const crcTable = []
for (let n = 0; n < 256; n++) {
  let c = n
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1)
    else c = c >>> 1
  }
  crcTable[n] = c >>> 0
}

function crc32(buf) {
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    crc = (crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8)) >>> 0
  }
  return (crc ^ 0xffffffff) >>> 0
}

function makeChunk(type, data) {
  const len = data.length
  const buf = Buffer.alloc(4 + 4 + len + 4)
  buf.writeUInt32BE(len, 0)
  buf.write(type, 4)
  data.copy(buf, 8)
  const crc = crc32(buf.subarray(4, 8 + len))
  buf.writeUInt32BE(crc, 8 + len)
  return buf
}

function createPNG(width, height, getPixelRGBA) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // 8-bit
  ihdr[9] = 6 // RGBA
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  const ihdrChunk = makeChunk('IHDR', ihdr)

  const scanlineLength = width * 4 + 1
  const rawData = Buffer.alloc(height * scanlineLength)

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineLength
    rawData[rowOffset] = 0 // Filter 0
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixelRGBA(x, y, width, height)
      const pxOffset = rowOffset + 1 + x * 4
      rawData[pxOffset] = r
      rawData[pxOffset + 1] = g
      rawData[pxOffset + 2] = b
      rawData[pxOffset + 3] = a
    }
  }

  const compressedData = zlib.deflateSync(rawData)
  const idatChunk = makeChunk('IDAT', compressedData)
  const iendChunk = makeChunk('IEND', Buffer.alloc(0))

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk])
}

// Pseudo noise for landmass generation
function noise2D(x, y) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123
  return n - Math.floor(n)
}

function smoothNoise(x, y) {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const fx = x - ix
  const fy = y - iy

  const a = noise2D(ix, iy)
  const b = noise2D(ix + 1, iy)
  const c = noise2D(ix, iy + 1)
  const d = noise2D(ix + 1, iy + 1)

  const ux = fx * fx * (3 - 2 * fx)
  const uy = fy * fy * (3 - 2 * fy)

  return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy
}

function fractalNoise(x, y, octaves = 5) {
  let val = 0
  let amp = 0.5
  let freq = 1
  for (let i = 0; i < octaves; i++) {
    val += smoothNoise(x * freq, y * freq) * amp
    freq *= 2
    amp *= 0.5
  }
  return val
}

const width = 1024
const height = 512

console.log('Generating local Earth textures (1024x512)...')

// 1. Blue Marble Texture
const blueMarbleBuf = createPNG(width, height, (x, y, w, h) => {
  const lat = (y / h - 0.5) * Math.PI
  const lon = (x / w - 0.5) * 2 * Math.PI

  // Ice caps
  if (Math.abs(lat) > 1.3) {
    return [240, 248, 255, 255]
  }

  const n = fractalNoise(lon * 1.5 + 5, lat * 1.5 + 5, 5)
  if (n > 0.48) {
    // Land
    const elevation = (n - 0.48) * 2
    const r = Math.min(255, Math.floor(30 + elevation * 100))
    const g = Math.min(255, Math.floor(80 + elevation * 120))
    const b = Math.min(255, Math.floor(50 + elevation * 60))
    return [r, g, b, 255]
  } else {
    // Ocean
    const depth = (0.48 - n) * 2
    const r = Math.max(5, Math.floor(15 - depth * 10))
    const g = Math.max(20, Math.floor(60 - depth * 40))
    const b = Math.max(60, Math.floor(140 - depth * 60))
    return [r, g, b, 255]
  }
})
fs.writeFileSync(path.join(publicTexturesDir, 'earth-blue-marble.png'), blueMarbleBuf)
fs.writeFileSync(path.join(publicTexturesDir, 'earth-blue-marble.jpg'), blueMarbleBuf)
console.log('Created earth-blue-marble.png & .jpg')

// 2. Topology Bump Texture
const topologyBuf = createPNG(width, height, (x, y, w, h) => {
  const lat = (y / h - 0.5) * Math.PI
  const lon = (x / w - 0.5) * 2 * Math.PI

  if (Math.abs(lat) > 1.3) {
    return [220, 220, 220, 255]
  }

  const n = fractalNoise(lon * 1.5 + 5, lat * 1.5 + 5, 5)
  const val = Math.min(255, Math.max(0, Math.floor(n * 255)))
  return [val, val, val, 255]
})
fs.writeFileSync(path.join(publicTexturesDir, 'earth-topology.png'), topologyBuf)
console.log('Created earth-topology.png')

// 3. Clouds Texture (Transparent PNG)
const cloudsBuf = createPNG(width, height, (x, y, w, h) => {
  const lat = (y / h - 0.5) * Math.PI
  const lon = (x / w - 0.5) * 2 * Math.PI

  const n = fractalNoise(lon * 2 + 10, lat * 2 + 10, 4)
  if (n > 0.52) {
    const alpha = Math.min(200, Math.floor((n - 0.52) * 450))
    return [255, 255, 255, alpha]
  }
  return [255, 255, 255, 0]
})
fs.writeFileSync(path.join(publicTexturesDir, 'earth-clouds.png'), cloudsBuf)
console.log('Created earth-clouds.png')

console.log('All local Earth textures generated successfully!')
