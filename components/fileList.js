const html = require('choo/html')
const prettyBytes = require('prettier-bytes')
const Nanocomponent = require('nanocomponent')

module.exports = class FileList extends Nanocomponent {
  createElement ({ files, emit }) {
    this.files = files
    return html`
      <ul class="list pa0">
        ${files.map((file) => FileView(file, emit))}
      </ul>
    `
  }

  update ({ files }) {
    if (!areSameFiles(files, this.files)) {
      return true
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

function FileView (file, emit) {
  return html`
    <li onclick=${onclick} class="code">
      ${file.id}.${file.type}
      <span class="mid-gray fr">${prettyBytes(file.size)}</span>
    </li>
  `

  function onclick () {
    emit('view', file.id)
  }
}
