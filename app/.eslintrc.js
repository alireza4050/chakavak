// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    jquery: true,
    browser: true,
  },
  extends: 'airbnb-base',
  // add your custom rules here
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 'prefer-arrow-callback': 0,
    'arrow-body-style': 0,
    'no-param-reassign': 0,
    'no-console': 0,
  }
}
