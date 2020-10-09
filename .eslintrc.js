module.exports = {
  root: true,

  env: {
    browser: true,
    jest: true,
    node: true,
    es6: true
  },

  parser: 'babel-eslint',

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],

  plugins: [
    'react'
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    quotes: [
      'error',
      'single',
      { avoidEscape: true },
    ],
    semi: [
      'error',
      'always'
    ],
    'space-before-function-paren': 'error',
  },
    
  settings: {
    react: {
      version: "detect"
    },
  },
};
