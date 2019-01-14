import calculateHoverColor from './calculateHoverColor'
import colors from '@ibmduo/colors'

test('it calculates a hover color if the original color exists in @ibmduo/color', () => {
  expect(calculateHoverColor(colors.blue[60])).toBe('rgb(3, 84, 233)')
})

test("it returns the same color if the original color doesn't exist in @ibmduo/color", () => {
  expect(calculateHoverColor('#936804')).toBe('#936804') // Some random color
})
