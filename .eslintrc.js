/*
 * Eslint config file
 * Documentation: https://eslint.org/docs/user-guide/configuring/
 * Install the Eslint extension before using this feature.
 */
module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  ecmaFeatures: {
    modules: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      modules: true,
      spread: true,
      restParams: true
    }
  },
  globals: {
    wx: true,
    App: true,
    Page: true,
    getCurrentPages: true,
    getApp: true,
    Component: true,
    requirePlugin: true,
    requireMiniProgram: true,
  },
  extends: 'eslint:recommended',
  rules: {
    'no-unused-vars': 'off',
    'no-console': 'off',
    'generator-star-spacing': 'off',
    'no-mixed-operators': 0,
    'quotes': [ // 改双引号为单引号
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    'semi': [ // 去结尾分号
      2,
      'never',
      {
        beforeStatementContinuationChars: 'never'
      }
    ],
    'no-delete-var': [
      2
    ],
    'object-curly-spacing': ['error', 'never'], // 强制在花括号中使用一致的空格
    'array-bracket-spacing': ['error', 'never'], // 禁止或强制在括号内使用空格
    'array-bracket-newline': ['error', { multiline: true }], // 强制数组元素间出现换行 (array-element-newline)
    'eol-last': [2, 'never'], // 要求或禁止文件末尾保留一行空行 (eol-last)
    'func-call-spacing': [2, 'never'], // 要求或禁止在函数标识符和其调用之间有空格
    'indent': ['error', 2], // 强制在对象字面量的键和值之间使用一致的空格
    'key-spacing': ['error', { 'beforeColon': false }],
    'keyword-spacing': ['error', { 'before': true }], // 强制关键字周围空格的一致性
    // 'linebreak-style': ['error', 'windows'], // 强制使用一致的换行符风格
    'no-trailing-spaces': 'error', // 禁用行尾空白
    'no-whitespace-before-property': 'error', // 禁止属性前有空白
    'semi-spacing': 'error', // 强制分号前后有空格
    'space-before-blocks': 'error', // 要求或禁止语句块之前的空格
    'space-before-function-paren': 'error', // 要求或禁止函数圆括号之前有一个空格
    'space-in-parens': ['error', 'never'], // 禁止或强制圆括号内的空格
    'space-infix-ops': 'error', // 要求中缀操作符周围有空格
    'switch-colon-spacing': 'error', // 强制在 switch 的冒号左右有空格,
    'comma-spacing': ['error', { before: false, after: true }],
    'quotes': [1, 'single'], // 引号类型 `` "" ''
    'dot-notation': ['error'], // 强制尽可能地使用点号
    'eqeqeq': ['error', 'always'], // 要求使用 === 和 !==
    'no-dupe-keys': 'error', // 禁止对象字面量中出现重复的 key
    'arrow-spacing': "error", // es6箭头函数空格
    "eslint.enable": true,
    "editor.codeActionsOnSave": { "source.fixAll.eslint": true }
  },

}
