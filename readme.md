# rollup-plugin-svg-sprite

Create external svg sprite file from your bundle using Rollup.

## Installation

```bash
npm install rollup-plugin-svg-sprite --save-dev
# or
yarn add rollup-plugin-svg-sprite -D
```

## Usage

```js
// rollup.config.js
import svgSprite from 'rollup-plugin-svg-sprite'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/main.js',
    format: 'iife'
  },
  plugins: [
    svgSprite({
      // Optionally, set output folder where svg sprite will be saved
      outputFolder: 'dist/public',

      // Optionally, prettify svg sprite. Default false
      prettify: true
    })
  ]
}
```

## License

MIT
