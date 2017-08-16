const html = require('choo/html')
const Nanocomponent = require('nanocomponent')
const hljs = require('highlight.js/lib/highlight')
// Using `lisp` for now because its syntax is similar
hljs.registerLanguage('aoe-ai', require('highlight.js/lib/languages/lisp'))

function highlight (src) {
  return hljs.highlight('aoe-ai', src).value
}

module.exports = class AIScript extends Nanocomponent {
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

