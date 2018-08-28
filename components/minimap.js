const Nanocomponent = require('nanocomponent')

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
    this.canvas.height = 400

    this.update(props)

    return this.canvas
  }

  update ({ width, height, tiles }) {
    const data = this.getImageData({ width, height, tiles })
    const temp = document.createElement('canvas')
    temp.width = width
    temp.height = height
    temp.getContext('2d').putImageData(data, 0, 0)

    const context = this.canvas.getContext('2d')
    context.save()
    context.scale(1, 0.5)
    context.rotate(45 * Math.PI / 180)
    context.drawImage(temp, 0, 0)
    context.restore()

    return false
  }

  getImageData () {
    const pixels = new Uint8ClampedArray(width * height * 4)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const tile = tiles[y][x]

        let color = terrainColors[tile.terrain]

        color = color
          .match(/^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i)
          .slice(1)
          .map((c) => parseInt(c, 16))

        const b = (width * y + x) * 4
        pixels[b + 0] = color[0]
        pixels[b + 1] = color[1]
        pixels[b + 2] = color[2]
        pixels[b + 3] = 0xFF
      }
    }

    return new ImageData(pixels, width, height)
  }
}
