export function foreach(obj, callback) {
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => callback(i, item))
  }
  else if (typeof obj === 'object') {
    let keys = Object.keys(obj)
    keys.forEach(key => {
      let value = obj[key]
      callback(key, value)
    })
  }
}

export function sort(obj) {
  let keys = Object.keys(obj)
  keys.sort()
  let o = {}
  keys.forEach(key => {
    let value = obj[key]
    if (typeof value === 'object' && !Array.isArray(value)) {
      value = sort(value)
    }
    o[key] = value
  })
  return o
}

export function stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serialize(replacer, cycleReplacer), spaces)
}

export function serialize(replacer, cycleReplacer) {
  let stack = []
  let keys = []

  if (cycleReplacer == null) {
    cycleReplacer = function(key, value) {
      if (stack[0] === value) {
        return "[Circular ~]"
      }
      return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
    }
  }

  return function(key, value) {
    if (stack.length > 0) {
      let thisPos = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~stack.indexOf(value)) {
        value = cycleReplacer.call(this, key, value)
      }
    }
    else {
      stack.push(value)
    }

    return replacer == null ? value : replacer.call(this, key, value)
  }
}

// https://github.com/darkskyapp/string-hash/blob/master/index.js
export function getStringHashcode(str) {
  let hash = 5381
  let i = str.length

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }

  return hash >>> 0
}