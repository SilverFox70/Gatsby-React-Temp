import { findKey } from 'lodash'
import colors from '@ibmduo/colors'

const findColorInPalette = color => {
  const colorGroup = Object.keys(colors).reduce((result, key) => {
    const foundIndex = findKey(
      colors[key],
      o => o.toUpperCase() === color.toUpperCase()
    )
    if (foundIndex) {
      result = { index: foundIndex, label: key }
    }
    return result
  }, undefined)
  return colorGroup || false
}

export default findColorInPalette
