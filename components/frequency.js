const rafloop = require('raf-loop')
const Nanocomponent = require('nanocomponent')

module.exports = class AudioVisualizer extends Nanocomponent {
  createElement (props) {
    this.audioContext = new AudioContext()

    this.canvas = document.createElement('canvas')
    this.canvas.width = props.width || 400
    this.canvas.height = props.height || 240
    this.context = this.canvas.getContext('2d')

    this.update(props)

    return this.canvas
  }

  update ({ audio, color, width, height }) {
    this.color = color

    if (width == null) width = 400
    if (height == null) height = 240
    if (width !== this.canvas.width) {
      this.canvas.width = width
    }
    if (height !== this.canvas.height) {
      this.canvas.height = height
    }

    if (audio !== this.audio) {
      if (this.loop) {
        this.loop.stop()
      }

      const { canvas, context } = this

      this.audio = audio
      const analyser = this.audioContext.createAnalyser()
      analyser.fftSize = 256
      const source = this.audioContext.createMediaElementSource(audio)
      source.connect(analyser)
      source.connect(this.audioContext.destination)
      this.loop = rafloop(() => {
        const buffer = new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(buffer)
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.fillStyle = this.color || 'hotpink'
        const width = Math.floor(canvas.width / (buffer.length + 1))
        for (let i = 0; i < buffer.length; i++) {
          const height = canvas.height / 255 * buffer[i]
          context.fillRect((width + 1) * i, canvas.height - height - 2, width, height + 2)
        }
      })
      this.loop.start()
    }
    return false
  }

  unload () {
    if (this.loop) {
      this.loop.stop()
    }
  }
}
