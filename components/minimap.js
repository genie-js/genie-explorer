const Nanocomponent = require('nanocomponent')
const unitColors = require('../unitColors.json')

const playerColors = {
  1: '#0000ff',
  2: '#ff0000',
  3: '#00ff00',
  4: '#ffff00',
  5: '#00ffff',
  6: '#ff00ff',
  7: '#434343',
  8: '#ff8201'
}

const terrainColors = [
  '#339727',
  '#305db6',
  '#e8b478',
  '#e4a252',
  '#5492b0',
  '#339727',
  '#e4a252',
  '#82884d',
  '#82884d',
  '#339727',
  '#157615',
  '#e4a252',
  '#339727',
  '#157615',
  '#e8b478',
  '#305db6',
  '#339727',
  '#157615',
  '#157615',
  '#157615',
  '#157615',
  '#157615',
  '#004aa1',
  '#004abb',
  '#e4a252',
  '#e4a252',
  '#ffec49',
  '#e4a252',
  '#305db6',
  '#82884d',
  '#82884d',
  '#82884d',
  '#c8d8ff',
  '#c8d8ff',
  '#c8d8ff',
  '#98c0f0',
  '#c8d8ff',
  '#98c0f0',
  '#c8d8ff',
  '#c8d8ff',
  '#e4a252'
]

module.exports = class Minimap extends Nanocomponent {
  createElement (props) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = 400
    this.canvas.height = 200

    this.update(props)

    return this.canvas
  }

  update ({ map, objects }) {
    const data = this.getImageData(map, objects)
    const temp = document.createElement('canvas')
    temp.width = map.width
    temp.height = map.height
    temp.getContext('2d').putImageData(data, 0, 0)

    const context = this.canvas.getContext('2d')
    context.save()
    context.scale(1, 0.5)
    context.translate(this.canvas.width / 2, 0)
    context.rotate(45 * Math.PI / 180)
    context.drawImage(temp, 0, 0)
    context.restore()

    return false
  }

  getImageData ({ width, height, tiles }, objects) {
    const pixels = new Uint8ClampedArray(width * height * 4)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const tile = tiles[y][x]
        draw(x, y, terrainColors[tile.terrain])
      }
    }

    objects.forEach(({ x, y, type, player }) => {
      if (player && playerColors[player]) {
        drawArea(x, y, playerColors[player], 3)
      } else if (type && unitColors[type]) {
        drawArea(x, y, unitColors[type], 1)
      }
    })

    return new ImageData(pixels, width, height)

    function drawArea (x, y, color, pad) {
      for (let x0 = x - pad; x0 <= x + pad; x0++) {
        for (let y0 = y - pad; y0 <= y + pad; y0++) {
          draw(x0, y0, color)
        }
      }
    }

    function draw (x, y, color) {
      const [r, g, b] = color
        .match(/^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i)
        .slice(1)
        .map((c) => parseInt(c, 16))

      const offs = (width * y + x) * 4
      pixels[offs + 0] = r
      pixels[offs + 1] = g
      pixels[offs + 2] = b
      pixels[offs + 3] = 0xFF
    }
  }
}
