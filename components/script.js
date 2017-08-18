const html = require('choo/html')
const Nanocomponent = require('nanocomponent')
const hljs = require('highlight.js/lib/highlight')
hljs.registerLanguage('rms', require('../hljs-aoe-rms'))
// Using `lisp` for now because its syntax is similar
hljs.registerLanguage('ai', require('highlight.js/lib/languages/lisp'))

function hasLanguage (language) {
  return language && !!hljs.getLanguage(language)
}

function highlight (language, src) {
  return hljs.highlight(language, src).value
}

module.exports = class ScriptRenderer extends Nanocomponent {
  createElement ({ source, language }) {
    this.source = source
    this.code = html`<code></code>`
    if (hasLanguage(language)) {
      this.code.innerHTML = highlight(language, source)
    } else {
      this.code.textContent = source
    }
    return html`<pre class="hljs pa2 ma0">${this.code}</pre>`
  }

  update ({ source, language }) {
    if (source !== this.source) {
      if (hasLanguage(language)) {
        this.code.innerHTML = highlight(language, source)
      } else {
        this.code.textContent = source
      }
    }
    return false
  }
}
