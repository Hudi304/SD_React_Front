module.exports = {
    plugins: ['@typescript-eslint', 'unused-imports'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    rules: {
        'no-console': 'error',
        '@typescript-eslint/no-empty-function': 'off',
        'class-methods-use-this': 'off',
        '@typescript-eslint/array-type': ['error', { default: 'array' }],
        '@typescript-eslint/require-await': 'off',
        'no-console': 'off',
        'no-return-await': 'error',
        'no-mixed-spaces-and-tabs': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-namespace': 'off',
        'unused-imports/no-unused-imports': 'warn',
        '@typescript-eslint/no-var-requires': 0,
        'prefer-const': [
            'warn',
            {
                destructuring: 'any',
                ignoreReadBeforeAssign: false
            }
        ]
    }
}
