const Nanocomponent = require('nanocomponent')

module.exports = class SLPFrameViewer extends Nanocomponent {
  createElement (props) {
    const canvas = document.createElement('canvas')

    this.canvas = canvas
    this.context = canvas.getContext('2d')

    this.update(props)

    return canvas
  }

  update ({ slp, frameId, palette, player }) {
    const frame = slp.getFrame(frameId)
    if (frame !== this.frame || palette !== this.palette || player !== this.player) {
      const imageData = slp.renderFrame(frameId, palette, { player })
      this.canvas.width = imageData.width
      this.canvas.height = imageData.height
      this.context.putImageData(imageData, 0, 0)

      this.frame = frame
      this.palette = palette
      this.player = player
    }
    return false
  }
}
