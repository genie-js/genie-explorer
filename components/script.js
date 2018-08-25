const html = require('nanohtml')
const css = require('sheetify')
const Nanocomponent = require('nanocomponent')
const prism = require('prismjs/components/prism-core')
prism.languages.rms = require('../prism-aoe-rms')
prism.languages.ai = require('../prism-aoe-ai')

const prefix = css`
  :host {
    background: #333;
    color: white;
  }

  /* RMS */
  :host .section { color: #ffa; }
  :host .number { color: #d36363; }
  :host .word { color: #ade5fc; }
  :host .punctuation,
  :host .command { color: #fc9b9b; }
  :host .attribute { color: #fff; }
  :host .define,
  :host .include,
  :host .conditional { color: #fcc28c; }
  :host .comment { color: #888; }
`

function hasLanguage (language) {
  return language && typeof prism.languages[language] === 'object'
}

function highlight (language, src) {
  return prism.highlight(src, prism.languages[language], language)
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
    return html`<pre class="${prefix} pa2 ma0">${this.code}</pre>`
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
