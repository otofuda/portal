// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: ['*.js', '*.ts', '*.vue'],
    rules: {
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/max-statements-per-line': 'off'
    }
  }
)
