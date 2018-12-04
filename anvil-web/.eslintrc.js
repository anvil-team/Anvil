module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  plugins: ['jsx-a11y'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true
  },
  rules: {
    'no-console': 0
  }
}
