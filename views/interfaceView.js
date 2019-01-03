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
`

function format (content) {
  return html`
    <code>${content.split('\n').map(formatLine)}</code>
  `
  function formatLine (line) {
    const parts = line.split(/([\s\r]+)/).map((part, i, all) => {
      if (i % 2 !== 0) return document.createTextNode(part)

      if (i === 0) return html`<strong>${part}</strong>`
      if (part !== '-1') {
        if (/background\d_file/.test(all[0]) && (i === 6 || i === 8)) {
          return html`<a href="#slp/${part}" title="Jump to SLP file">${part}</a>`
        }
        if (/palette_file|popup_dialog_sin/.test(all[0]) && i === 4) {
          return html`<a href="#bina/${part}" title="Jump to BINA file">${part}</a>`
        }
        if (/button_file/.test(all[0]) && i === 4) {
          return html`<a href="#slp/${part}" title="Jump to SLP file">${part}</a>`
        }
      }
      return document.createTextNode(part)
    })
    return html`<span>${parts}<br></span>`
  }
}

module.exports = function interfaceView (state, emit) {
  const content = state.fileBuffer.toString()

  return html`
    <pre class="${prefix} pa2 ma0">${format(content)}</pre>
  `
}
