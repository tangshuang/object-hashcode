import getObjectHashcode from './getObjectHashcode'

export default function defineObjectHashcodeProperty(obj, parent) {
  Object.defineProperty(obj, '_hashCodeCache', {
    enumerable: false,
    value: undefined,
  })
  Object.defineProperty(obj, 'hashcode', {
    enumerable: false,
    get() {
      let hashCodeCache = obj._hashCodeCache
      if (hashCodeCache !== undefined) {
        return hashCodeCache
      }
      let hash = getObjectHashcode(obj)
      obj._hashCodeCache = hash
      return hash
    },
  })
  let proxyObj = new Proxy(obj, {
    set(obj, key, value) {
      if (key === 'hashCode') {
        obj._hashCodeCache = value
      }
      if (parent) {
        parent._hashCodeCache = undefined
      }
    },
  })
  return obj
}
