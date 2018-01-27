import fs from 'fs'
import path from 'path'
import { createFilter } from 'rollup-pluginutils'
import cheerio from 'cheerio'
import pretty from 'pretty'
import { minify } from 'html-minifier'

function loadXml(xml) {
  return cheerio.load(xml, { xmlMode: true })
}

function createSymbol(id, svg) {
  const element = loadXml(svg)
  const svgMarkup = element('svg')

  element('svg').replaceWith('<symbol/>')
  element('symbol')
    .attr('id', id)
    .attr('viewBox', svgMarkup.attr('viewBox'))
    .append(svgMarkup.children())

  return element.html()
}

function createSprite(symbols, prettify) {
  const element = loadXml('<svg xmlns="http://www.w3.org/2000/svg"/>')

  symbols.forEach((symbol) => {
    element('svg').append(symbol)
  })

  return prettify
    ? pretty(element.html())
    : minify(element.html(), { collapseWhitespace: true })
}

export default function svgSprite(options = {}) {
  const filter = createFilter(options.include, options.exclude)
  const prettify = options.prettify || false
  const symbols = new Map()

  return {
    name: 'svg-sprite',
    transform: (code, id) => {
      if (!filter('id') || path.extname(id) !== '.svg') {
        return null
      }

      const svgId = path.parse(id).name

      symbols.set(svgId, createSymbol(svgId, code))

      return {
        code: '',
        map: { mappings: '' }
      }
    },
    onwrite: (details) => {
      if (symbols.size) {
        const outputFolderPath = options.outputFolder || path.dirname(details.file)

        fs.writeFileSync(`${outputFolderPath}/sprites.svg`, createSprite(symbols, prettify))
      }
    }
  }
}
