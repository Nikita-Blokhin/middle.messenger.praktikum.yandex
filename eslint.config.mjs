import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        rules: {
            indent: ['error', 4],
            semi: ['error', 'always'],
            quotes: ['error', 'single'],
            'no-console': 'off',

            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-this-alias': 'off',

            'no-unused-expressions': 'error',
            'prefer-const': 'error',
            'no-var': 'error',
        }
    }
);
