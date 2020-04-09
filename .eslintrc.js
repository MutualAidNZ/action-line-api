// module.exports = {
//   env: {
//     es6: true,
//     node: true,
//     jest: true,
//   },
//   extends: [
//     'airbnb-base',
//   ],
//   globals: {
//     Atomics: 'readonly',
//     SharedArrayBuffer: 'readonly',
//   },
//   parserOptions: {
//     ecmaVersion: 2018,
//     sourceType: 'module',
//   },
//   rules: {
//     "consistent-return": "off",
//     "import/no-cycle": "off",
//     "max-len": [
//       "error", { "code": 140 }
//     ]
//   },
// };

module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],

  plugins: ['prettier'],

  rules: {
    'prettier/prettier': 'error',
    'consistent-return': 'off',
    'import/no-cycle': 'off',
    'max-len': ['error', { code: 140 }],
    'no-underscore-dangle': 'off'
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};
