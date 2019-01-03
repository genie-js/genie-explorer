const html = require('nanohtml')
const css = require('sheetify')

const prefix = css`
  :host {
    background: #333;
    color: white;
  }

  :host a, :host a:visited {
    color: white;
    text-decoration: underline;
  }

  .not-found {
    color: #cf6a6a;
    text-decoration: underline;
  }
`

function FileLink (drs, type, id, title) {
  if (!drs.getFile(id)) {
    return html`
      <span title="This ${type} file is not in this DRS archive." class="not-found">${title}</span>
    `
  }
  return html`
    <a href="#${type}/${id}" title="Jump to ${type} file">${title}</a>
  `
}

function format (drs, content) {
  return html`
    <code>${content.split('\n').map(formatLine)}</code>
  `
  function formatLine (line) {
    const parts = line.split(/([\s\r]+)/).map((part, i, all) => {
      if (i % 2 !== 0) return document.createTextNode(part)

      if (i === 0) return html`<strong>${part}</strong>`
      if (part !== '-1') {
        if (/background\d_file/.test(all[0]) && (i === 6 || i === 8)) {
          return FileLink(drs, 'slp', parseInt(part,  10), part)
        }
        if (/palette_file|popup_dialog_sin/.test(all[0]) && i === 4) {
          return FileLink(drs, 'bina', parseInt(part,  10), part)
        }
        if (/button_file/.test(all[0]) && i === 4) {
          return FileLink(drs, 'slp', parseInt(part,  10), part)
        }
      }
      return document.createTextNode(part)
    })
    return html`<span>${parts}<br></span>`
  }
}

module.exports = function interfaceView (state, emit) {
  const drs = state.drs
  const content = state.fileBuffer.toString()

  return html`
    <pre class="${prefix} pa2 ma0">${format(drs, content)}</pre>
  `
}
