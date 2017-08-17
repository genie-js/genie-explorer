const html = require('choo/html')
const prettyBytes = require('prettier-bytes')
const Nanocomponent = require('nanocomponent')

module.exports = class FileList extends Nanocomponent {
  createElement ({ files, selected, emit }) {
    this.files = files
    this.selected = selected
    return html`
      <ul class="list pa0">
        ${files.map((file) => FileView({ file, selected: selected === file.id }, emit))}
      </ul>
    `
  }

  getItem (id) {
    let item = this.element.firstElementChild
    while (item) {
      if (item.dataset.id == id) return item
      item = item.nextElementSibling
    }
  }

  update ({ files, selected }) {
    if (!areSameFiles(files, this.files)) {
      return true
    }
    if (selected !== this.selected) {
      const previous = this.getItem(this.selected)
      if (previous) previous.classList.remove('b')
      const next = this.getItem(selected)
      if (next) next.classList.add('b')
      this.selected = selected
    }
    return false
  }
}

function areSameFiles (a, b) {
  for (var i = 0; i < a.length; i++) {
    var self = a[i]
    var other = b[i]
    if (self.id !== other.id || self.type !== other.type || self.offset !== other.offset || self.size !== other.size) {
      return false
    }
  }
  return true
}

function FileView ({ file, selected }, emit) {
  return html`
    <li onclick=${onclick} class="code${selected ? ' b' : ''}" data-id="${file.id}">
      ${file.id}.${file.type}
      <span class="mid-gray fr">${prettyBytes(file.size)}</span>
    </li>
  `

  function onclick () {
    emit('view', file.id)
  }
}
