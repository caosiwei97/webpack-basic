module.exports = {
  parser: 'vue-eslint-parser', // 解析 <template> ...
  env: {
    browser: true,
    node: true,
    es2021: true,
    'vue/setup-compiler-macros': true // Vue 3 编译宏
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser', // 解析 SFC 中的 script
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'prettier/prettier': 'error',
    'vue/multi-word-component-names': 'off'
  }
}
