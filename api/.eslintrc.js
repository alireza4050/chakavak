module.exports = {
  'parserOptions': {
    'ecmaVersion': 8
  },
  'env': {
    'browser': false,
    'node': true,
  },
  'extends': [
    'nodejs',
    'airbnb-base',
  ],
  'plugins': [
    'standard',
    'async-await',
    'import',
    'promise',
  ],
  'rules': {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-invalid-this': 0,
    'strict': 0,
    'object-curly-newline': 0,
  }
}
