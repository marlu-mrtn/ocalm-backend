import globals from 'globals';
import pluginJs from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest';

export default [
    {
        languageOptions: {
            globals: {
                ...Object.keys(globals.browser).reduce((acc, key) => ({ ...acc, [key]: 'readonly' }), {}),
                ...Object.keys(globals.node).reduce((acc, key) => ({ ...acc, [key]: 'readonly' }), {}),
                ...Object.keys(globals.jest).reduce((acc, key) => ({ ...acc, [key]: 'readonly' }), {}),
            },
            sourceType: 'module',
        },
    },
    pluginJs.configs.recommended,
    {
        plugins: {
            jest: jestPlugin,
        },
    },
    {
        rules: {
            'indent': ['error', 4],
            'comma-dangle': ['error', 'always-multiline'],
            'eol-last': ['error', 'always'],
            'no-trailing-spaces': 'error',
            'no-unused-vars': 'warn',
            'no-undef': 'warn',
        },
    },
];
