module.exports = {
  // 当前文件目录是否为规则执行的根目录
  root: true,
  // 设置环境，会预定义所有环境对应的全局变量
  env: {
    node: true,
    browser: true,
    // 启用除 modules 模块以外所有的 ES6 功能，
    // 自动设置 `ecmaVersion` parser 选项为 6
    es6: true
  },
  // 启动除 ES5 之外的其他 ECMAScript 版本的支持 
  parserOptions: {
    parser: "babel-eslint",
    /*
    * ECMAScript 版本号
    * 2015 - 6
    * ...
    * 2018 - 9
      * */
    ecmaVersion: '9',
    // 启动 modules 模块功能
    sourceType: 'module',
    // 启动其他语言功能
    ecmaFeatures: {
      // JSX
      jsx: true
    }
  },
  extends: ["plugin:vue/recommended", "eslint:recommended"],
  /*
  * "off" or 0 - 关闭规则
  * "warn" or 1 - 开启规则，只警告
  * "error" or 2 - 开启规则，报错
  * */
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/require-default-prop": 'off',
    "vue/component-definition-name-casing": ["error", "PascalCase"],
    "vue/attribute-hyphenation": ["error", "always"],
    // "vue/attribute-hyphenation": 'off',
    "vue/max-attributes-per-line": [2, {
      "singleline": 7,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    'semi': [2, 'never'],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: false
    }],
    'keyword-spacing': [2, {
      'before': true,
      'after': true
    }],
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }],
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    'comma-style': [2, 'last'],
    'comma-dangle': [2, 'never'],
    'comma-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'block-spacing': [2, 'always'],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, 'always'],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }],
    'spaced-comment': [2, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'padded-blocks': [2, 'never'],
    'template-curly-spacing': [2, 'never'],
    'eqeqeq': ["error", "always", {"null": "ignore"}],
    'no-trailing-spaces': 2,
    'new-parens': 2,
    'no-array-constructor': 2,
    'no-caller': 2,
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 0,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [2, {
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-multiple-empty-lines': [2, {
      'max': 1
    }],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-undef': 2,
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [2, {
      'defaultAssignment': false
    }],
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': [2, {
      'vars': 'all',
      'args': 'none'
    }],
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
  },
};
