const urlRegExp = new RegExp('^(?:[a-z]+:)?//', 'i')

const isGatsbyLink = path => {
  return !urlRegExp.test(path)
}

export default isGatsbyLink
