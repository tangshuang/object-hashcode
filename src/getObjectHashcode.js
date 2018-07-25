import { sort, stringify, getStringHashcode } from './utils'

export default function getObjectHashcode(obj) {
  let o = stringify(obj)
  let n = JSON.parse(o)
  let m = sort(n)
  let str = JSON.stringify(m)
  let hash = getStringHashcode(str)
  return hash
}