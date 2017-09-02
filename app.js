const html = require('choo/html')
const css = require('sheetify')
const app = require('choo')()
const expose = require('choo-expose')
const log = require('choo-log')
const splashView = require('./views/splashView')
const drsView = require('./views/drsView')
const store = require('./store')

css('tachyons-border-radius')
css('tachyons-borders')
css('tachyons-box-shadow')
css('tachyons-box-sizing')
css('tachyons-flexbox')
css('tachyons-floats')
css('tachyons-font-family')
css('tachyons-font-weight')
css('tachyons-heights')
css('tachyons-hovers')
css('tachyons-lists')
css('tachyons-skins')
css('tachyons-spacing')
css('tachyons-text-align')
css('tachyons-widths')

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
    <body class="ma0 sans-serif">
      ${view}
    </body>
  `
}

app.mount('body')
