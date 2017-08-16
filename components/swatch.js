const Nanocomponent = require('nanocomponent')

module.exports = class Swatch extends Nanocomponent {
  createElement (palette) {
    if (!this.canvas) {
      this.canvas = document.createElement('canvas')
      this.canvas.width = 240
      this.canvas.height = 240
      this.context = this.canvas.getContext('2d')

      this.update(palette)
    }

    return this.canvas
  }

  update (palette) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    const tilesPerRow = Math.ceil(Math.sqrt(palette.length))
    const tileSize = 240 / tilesPerRow
    let x = 0
    let y = 0
    let i = 0
    palette.forEach((color) => {
      if (x >= 240) {
        y += tileSize
        x = 0
      }
      this.context.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
      this.context.fillRect(x, y, tileSize, tileSize)
      x += tileSize
    })
  }
}
