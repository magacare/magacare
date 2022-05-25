module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'keyword-spacing': ['error', {
      overrides: {
        try: { after: true },
        catch: { after: false },
        if: { after: false },
        else: { after: false },
      },
    }],
    'max-len': ['error', { code: 150 }],
  },
};
