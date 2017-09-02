const html = require('choo/html')
const Nanocomponent = require('nanocomponent')

module.exports = class CurrentFile extends Nanocomponent {
  createElement ({ file, onselect }) {
    this.props = { file, onselect }
    return html`
      <div>
        ${this.editing ? (
          this.createInput({ onselect })
        ) : (
          this.createName({ file })
        )}
      </div>
    `
  }
  createName ({ file }) {
    const self = this
    return html`
      <p class="b code mt0 flex justify-between items-center">
        ${file.name}
        <button class="fr" onclick=${onedit}>✏️</button>
      </p>
    `

    function onedit () {
      self.editing = true
      self.render(self.props)
      if (self.input) self.input.click()
    }
  }
  createInput ({ onselect }) {
    const self = this
    return this.input = html`
      <input type="file" accept=".drs" onchange=${onchange} class="w-100" />
    `

    function onchange (event) {
      self.editing = false
      onselect(event.target.files[0])
    }
  }
  update () { return true }
}


