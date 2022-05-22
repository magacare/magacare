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
    'keyword-spacing': ['error', {
      overrides: {
        try: { after: true },
        catch: { after: true },
        if: { after: false },
        else: { after: false },
      },
    }],
  },
};
