const html = require('nanohtml')
const css = require('sheetify')
const app = require('nanochoo')()
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
css('tachyons-overflow')
css('tachyons-skins')
css('tachyons-spacing')
css('tachyons-text-align')
css('tachyons-widths')

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}

app.use(store)

app.view(mainView)
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
