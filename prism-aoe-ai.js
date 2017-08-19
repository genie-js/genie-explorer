// Derived from the Scheme highlighter
module.exports = {
  comment: /;.*/,
  string: /"(?:[^"\\\r\n]|\\.)*?"|'[^('\s]*/,
  conditional: /#(load-if-(not-)?defined|else|end-if)\b/,
  command: {
    pattern: /(\()(?:def(rule|const)|load(-random)?)/,
    lookbehind: true
  },
  number: /[-+]?\d+\b/,
  operator: {
    pattern: /(\()(?:[-+*%\/]|[<>]=?|=>?)/,
    lookbehind: true
  },
  word: {
    pattern: /(\()[^\s()]*(?=\s)/,
    lookbehind: true
  },
  punctuation: /[()]/
}
