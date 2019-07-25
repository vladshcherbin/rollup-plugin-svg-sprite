import { rollup } from 'rollup'
import fs from 'fs-extra'
import svgSprite from '../src'

process.chdir(`${__dirname}/fixtures`)

async function build(pluginOptions, buildOptions = {}) {
  const bundle = await rollup({
    input: buildOptions.input || 'src/index.js',
    plugins: [
      svgSprite(pluginOptions)
    ]
  })

  await bundle.write({
    dir: 'dist',
    format: 'esm'
  })
}

async function readFile(path) {
  return fs.readFile(path, 'utf8')
}

afterEach(async () => {
  await fs.remove('dist')
})

describe('Generate sprite file', () => {
  test('Throw error if "outputFolder" is not set', async () => {
    await expect(build()).rejects.toThrow('"outputFolder" must be set')
  })

  test('No file if no svg imports', async () => {
    await build({
      outputFolder: 'dist'
    }, {
      input: 'src/no-svg-imports.js'
    })

    expect(await fs.pathExists('dist/sprites.svg')).toBe(false)
  })

  test('Minified', async () => {
    await build({
      outputFolder: 'dist'
    })

    expect(await fs.pathExists('dist/sprites.svg')).toBe(true)
    expect(await readFile('dist/sprites.svg')).toBe(await readFile('samples/minified.svg'))
  })

  test('Not minified', async () => {
    await build({
      outputFolder: 'dist',
      minify: false
    })

    expect(await fs.pathExists('dist/sprites.svg')).toBe(true)
    expect(await readFile('dist/sprites.svg')).toBe(await readFile('samples/not-minified.svg'))
  })

  test('SVGO options', async () => {
    await build({
      outputFolder: 'dist',
      minify: false,
      removeTitle: false
    })

    expect(await fs.pathExists('dist/sprites.svg')).toBe(true)
    expect(await readFile('dist/sprites.svg')).toBe(await readFile('samples/svgo-options.svg'))
  })
})
