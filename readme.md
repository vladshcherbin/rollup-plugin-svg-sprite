# rollup-plugin-svg-sprite

[![Build Status](https://travis-ci.org/vladshcherbin/rollup-plugin-svg-sprite.svg?branch=master)](https://travis-ci.org/vladshcherbin/rollup-plugin-svg-sprite)
[![Codecov](https://codecov.io/gh/vladshcherbin/rollup-plugin-svg-sprite/branch/master/graph/badge.svg)](https://codecov.io/gh/vladshcherbin/rollup-plugin-svg-sprite)

Create external svg sprite file from your bundle using Rollup and optimize it using [SVGO](https://github.com/svg/svgo).

## Installation

```bash
# yarn
yarn add rollup-plugin-svg-sprite -D

# npm
npm install rollup-plugin-svg-sprite -D
```

## Usage

```js
// rollup.config.js
import svgSprite from 'rollup-plugin-svg-sprite'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/app.js',
    format: 'iife'
  },
  plugins: [
    svgSprite({
      outputFolder: 'dist/public'
    })
  ]
}
```

Next, import svg files in your project:

```js
import './svg/trash.svg'
import './svg/user.svg'
```

### Configuration

There are some useful options:

#### outputFolder

Type: `string`

Folder where generated svg sprite will be saved.

```js
svgSprite({
  outputFolder: 'dist/public'
})
```

#### minify

Type: `boolean` | Default: `true`

Minify generated svg sprite.

```js
svgSprite({
  outputFolder: 'dist/public',
  minify: false
})
```

All other options are passed to [svgo package](https://github.com/svg/svgo) which is used inside.

## License

MIT
