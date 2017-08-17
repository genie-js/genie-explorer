const html = require('choo/html')
const css = require('sheetify')
const app = require('choo')()
const expose = require('choo-expose')
const log = require('choo-log')
const DRS = require('genie-drs')
const splashView = require('./views/splashView')
const drsView = require('./views/drsView')
const store = require('./store')

css('tachyons-spacing')
css('tachyons-box-sizing')
css('tachyons-lists')
css('tachyons-font-family')
css('tachyons-font-weight')
css('tachyons-skins')
css('tachyons-floats')
css('tachyons-flexbox')
css('tachyons-widths')
css('tachyons-heights')
css('highlight.js/styles/agate.css')

app.use(expose())
app.use(log())
app.use(store)

app.route('/', mainView)

function mainView (state, emit) {
  let view
  if (state.drs) {
    view = drsView(state, emit)
  } else {
    view = splashView(state, emit)
  }

  return html`
    <body class="ma0">
      ${view}
    </body>
  `
}

app.mount('body')
