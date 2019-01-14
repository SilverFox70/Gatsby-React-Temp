import findColorInPalette from './findColorInPalette'
import colors from '@ibmduo/colors'
import color from 'color'

const DARKER_ON_HOVER_CUTOFF_POINT = 70

/**
 * @desc Returns the hover color for a color in the @ibmduo/colors package by adding 60% of the next step color. Returns same color if it can't find it in the color package.
 *       Usage: calculateHoverColor(colors.blue[60])
 * @param {String} hexColor
 */
const calculateHoverColor = hexColor => {
  let colorFromLibrary = findColorInPalette(hexColor)
  if (colorFromLibrary) {
    let nextShade
    const label = colorFromLibrary.label
    const index = parseInt(colorFromLibrary.index, 10)
    const offset = index > DARKER_ON_HOVER_CUTOFF_POINT ? -10 : 10
    switch (label) {
      case 'black':
        nextShade = colors.gray[index + offset]
        break
      case 'white':
        nextShade = colors.gray[20]
        break
      default:
        nextShade = colors[label][index + offset]
        break
    }
    if (nextShade) {
      return color(hexColor)
        .mix(color(nextShade), 0.6)
        .rgb()
        .string()
    }
  }
  return hexColor
}

export default calculateHoverColor
