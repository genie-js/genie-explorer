const html = require('nanohtml')
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
        <button class="bg-dark-pink white br2 bn pv1 ph3 pointer" onclick=${onedit}>✏️</button>
      </p>
    `

    function onedit () {
      self.editing = true
      self.render(self.props)
      const input = self.element.querySelector('input')
      if (input) input.click()
    }
  }

  createInput ({ onselect }) {
    const self = this
    return html`
      <input type="file" accept=".drs" onchange=${onchange} class="w-100" />
    `

    function onchange (event) {
      self.editing = false
      onselect(event.target.files[0])
    }
  }

  update () { return true }
}
