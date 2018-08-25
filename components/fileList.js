const html = require('nanohtml')
const d = require('defined')
const prettyBytes = require('prettier-bytes')
const Nanocomponent = require('nanocomponent')

module.exports = class FileList extends Nanocomponent {
  createElement ({ drs, tableStates, selected, emit }) {
    this.files = drs.getFiles()
    this.tableStates = JSON.stringify(tableStates)
    this.selected = selected
    return html`
      <div>
        ${drs.tables.map((table) =>
          Table({
            table,
            selected,
            isOpen: d(tableStates[table.ext], true)
          }, emit)
        )}
      </div>
    `
  }

  getItem (id) {
    return this.element.querySelector(`li[data-id="${id}"]`)
  }

  update ({ drs, tableStates, selected }) {
    if (!areSameFiles(drs.getFiles(), this.files) || JSON.stringify(tableStates) !== this.tableStates) {
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

function Table ({ table, selected, isOpen }, emit) {
  return html`
    <div>
      ${TableHeader(table.ext, isOpen, ontoggle)}
      ${isOpen ? html`<ul class="list pa0 ma0">
        ${table.files.map((file) =>
          FileItem({ file, selected: selected === file.id }, emit)
        )}
      </ul>` : null}
    </div>
  `

  function ontoggle () {
    emit('collapseDrsTable', {
      table: table.ext,
      value: !isOpen
    })
  }
}

function TableHeader (name, isOpen, onToggle) {
  return html`
    <p class="code b ma0 mt3" onclick=${onToggle}>
      ${isOpen ? '▼' : '▶'}
      ${name}
    </p>
  `
}

function FileItem ({ file, selected }, emit) {
  return html`
    <li class="code${selected ? ' b' : ''}" data-id="${file.id}">
      <a href="#${file.type.trim()}/${file.id}" class="link black">
        ${file.id}.${file.type}
        <span class="mid-gray fr">${prettyBytes(file.size)}</span>
      </a>
    </li>
  `
}
