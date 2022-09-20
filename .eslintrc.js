// Eslint config file
// Documentation: https://eslint.org/docs/user-guide/configuring/
// Install the Eslint extension before using this feature.
module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
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
  rules: {
    'no-extra-parens': 'off',
    '@typescript-eslint/no-extra-parens': ['error'], // 禁止冗余的括号
    'no-console': 'error', // 不允许打印console.log
    'no-alert': 'error', // 不允许弹窗
    'no-template-curly-in-string': 'error', // 禁止在常规字符串中出现模板字符串语法${xxx}
    // --以下是Best Practices 最佳实践
    'default-case': 'off', // 强制switch要有default分支
    'dot-location': ['error', 'property'], // 要求对象的点要跟属性同一行
    eqeqeq: 'error', // 要求使用 === 和 !==
    'no-else-return': 'error', // 禁止在else前有return，return和else不能同时存在
    'no-empty-function': 'error', // 禁止出现空函数，有意而为之的可以在函数内部加条注释
    'no-multi-spaces': 'error', // 禁止出现多个空格，如===前后可以有一个空格，但是不能有多个空格
    'no-multi-str': 'error', // 禁止出现多行字符串，可以使用模板字符串换行
    'no-self-compare': 'error', // 禁止自身比较
    'no-unmodified-loop-condition': 'error', // 禁止一成不变的循环条件，如while条件，防止死循环
    'no-useless-concat': 'error', // 禁止没有必要的字符串拼接，如"a"+"b"应该写成"ab"
    'require-await': 'off', // 禁止使用不带await的async表达式
    // --以下是Stylistic Issues 主观的代码风格
    'array-element-newline': ['error', 'consistent'], // 数组元素要一致的换行或者不换行
    'block-spacing': 'error', // 强制函数/循环等块级作用域中的花括号内前后有一个空格（对象除外）
    'brace-style': 'off',
    '@typescript-eslint/brace-style': [
      'error',
      '1tbs',
      { allowSingleLine: true },
    ], // if/elseif/else左花括号要跟if..同行，右花括号要换行；或者全部同一行
    'comma-dangle': 'off', // 允许在对象或数组的最后一项（不与结束括号同行）加个逗号
    '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': 'error', // 要求在逗号后面加个空格，禁止在逗号前面加一个空格
    'comma-style': 'error', // 要求逗号放在数组元素、对象属性或变量声明之后，且在同一行
    'computed-property-spacing': 'error', // 禁止在计算属性中出现空格，如obj[ "a" ]是错的，obj["a"]是对的
    'eol-last': 'error', // 强制文件的末尾有一个空行
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': 'error', // 禁止函数名和括号之间有个空格
    'function-paren-newline': 'error', // 强制函数括号内的参数一致换行或一致不换行
    'implicit-arrow-linebreak': 'error', // 禁止箭头函数的隐式返回 在箭头函数体之前出现换行
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2, { SwitchCase: 1 }], // 使用一致的缩进，2个空格
    'jsx-quotes': 'error', // 强制在jsx中使用双引号
    'key-spacing': 'error', // 强制对象键值冒号后面有一个空格
    'lines-around-comment': 'error', // 要求在块级注释/**/之前有一个空行
    'multiline-comment-style': ['error', 'separate-lines'], // 多行注释同一个风格
    'new-cap': ['error', { capIsNew: false }], // 要求构造函数首字母大写
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 1 }], // 链式调用长度超过2时，强制要求换行
    'no-lonely-if': 'error', // 禁止else中出现单独的if
    'no-multiple-empty-lines': 'error', // 限制最多出现两个空行
    'no-trailing-spaces': 'error', // 禁止在空行使用空白字符
    'no-unneeded-ternary': 'error', // 禁止多余的三元表达式，如a === 1 ? true : false应缩写为a === 1
    'no-whitespace-before-property': 'error', // 禁止属性前有空白，如console. log(obj["a"])，log前面的空白有问题
    'nonblock-statement-body-position': 'error', // 强制单行语句不换行
    'object-curly-newline': ['error', { multiline: true }], // 对象数属性要有一致的换行，都换行或都不换行
    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': ['error', 'always'], // 强制对象/解构赋值/import等花括号前后有空格
    'object-property-newline': [
      'error',
      { allowAllPropertiesOnSameLine: true },
    ], // 强制对象的属性在同一行或全换行
    'one-var-declaration-per-line': 'error', // 强制变量初始化语句换行
    'operator-assignment': 'error', // 尽可能的简化赋值操作，如x=x+1 应简化为x+=1
    quotes: 'off',
    '@typescript-eslint/quotes': ['error', 'single'], // 要求字符串尽可能的使用单引号
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'always'], // 结尾需要分号
    'semi-spacing': 'error', // 强制分号后面有空格，如for (let i=0; i<20; i++)
    'semi-style': 'error', // 强制分号出现在句末
    'space-before-blocks': 'off',
    '@typescript-eslint/space-before-blocks': 'error', // 强制块（for循环/if/函数等）前面有一个空格，如for(...){}是错的，花括号前面要空格：for(...) {}
    'space-infix-ops': 'off',
    '@typescript-eslint/space-infix-ops': 'error', // 强制操作符（+-/*）前后有一个空格
    'spaced-comment': 'error', // 强制注释（//或/*）后面要有一个空格
    // --以下是ECMAScript 6 ES6相关的
    'arrow-body-style': 'error', // 当前头函数体的花括号可以省略时，不允许出现花括号
    'arrow-parens': ['error', 'as-needed'], // 箭头函数参数只有一个时，不允许写圆括号
    'arrow-spacing': 'error', // 要求箭头函数的=>前后有空格
    'no-confusing-arrow': 'error', // 禁止在可能与比较操作符混淆的地方使用箭头函数
    'no-useless-computed-key': 'error', // 禁止不必要的计算属性，如obj3={["a"]: 1},其中["a"]是不必要的，直接写"a"
    'no-useless-escape': 'off', // 禁止转义符
    'no-var': 'error', // 要求使用let或const，而不是var
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'], // 禁止出现未使用的变量
    'no-unreachable': 'error', // 禁止在return等语句后面出现代码
    'object-shorthand': 'error', // 要求对象字面量使用简写
    'prefer-const': 'error', // 要求使用const声明不会被修改的变量
    'prefer-destructuring': [
      'off',
      {
        array: false,
        object: false,
      },
      { enforceForRenamedProperties: true },
    ], // 要求优先使用解构赋值,enforceForRenamedProperties为true将规则应用于重命名的变量
    'prefer-template': 'error', // 使用模板字符串，而不是字符串拼接
    'rest-spread-spacing': 'error', // 扩展运算符...和表达式之间不允许有空格，如... re1错误，应该是...re1
    'template-curly-spacing': 'error', // 禁止模板字符串${}内前后有空格
    '@typescript-eslint/no-explicit-any': 'off',
    'no-new-object': 'error', // 禁止用new Object()创建对象
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': 'error', // 禁止用new Array()创建数组
    'no-prototype-builtins': 'off', // 禁止直接在对象上调用某些方法
    'import/no-unresolved': 'error',
  },
  settings: {
    'import/parsers': { '@typescript-eslint/parser': ['.ts'] },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './miniprogram/',
      },
    },
  },
};
