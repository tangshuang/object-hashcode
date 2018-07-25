
import { foreach } from './utils'
import defineObjectHashcodeProperty from './defineObjectHashcodeProperty'

export default function createHashcodeObject(obj, parent) {
  foreach(obj, (key, value) => {
    if (typeof value === 'object') {
      createHashcodeObject(value, obj)
    }
  })
  return defineObjectHashcodeProperty(obj, parent)
}