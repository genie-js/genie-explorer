const html = require('choo/html')
const Nanocomponent = require('nanocomponent')
const css = require('sheetify')
const hljs = require('highlight.js/lib/highlight')
hljs.registerLanguage('aoe-rms', require('../hljs-aoe-rms'))

function highlight (src) {
  return hljs.highlight('aoe-rms', src).value
}

css('highlight.js/styles/agate.css')
css('tachyons-spacing')

module.exports = class RMSScript extends Nanocomponent {
  createElement (source) {
    this.source = source
    this.code = html`<code></code>`
    this.code.innerHTML = highlight(source)
    return html`<pre class="hljs pa2 ma0">${this.code}</pre>`
  }

  update (source) {
    if (source !== this.source) {
      this.code.innerHTML = highlight(source)
    }
    return false
  }
}
