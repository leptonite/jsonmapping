module.exports = {
   root: true,
   ignorePatterns: ['/*', '!/src'],
   extends: [
      '@leptonite/eslint-config',
   ],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      project: './tsconfig.json',
   },
   plugins: [
      '@typescript-eslint',
      'only-warn',
   ],
   rules: {
      // project specific rule configuration goes here
      '@typescript-eslint/member-ordering': 'off',
      '@typescript-eslint/sort-type-constituents': 'off',
   },
};
