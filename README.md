# ObjectHashcode

This package is used to get hashcode of a object.

## Install

```
npm install --save object-hashcode
```

## Usage

```
import getObjectHashcode, { getObjectHashcode, defineObjectHashcodeProperty, createHashcodeObject } from 'object-hashcode'
```

## API

### getObjectHashcode(obj)

Get hash code from a given object/array.

```
import getObjectHashcode from 'object-hashcode'
let hashcode = getObjectHashcode({ a: [ 1, 3, 4 ] })
```

### defineObjectHashcodeProperty(obj)

Use `defineProperty` to set a new property to the given object/array, so that you can use readonly property `obj.hashcode` to get hashcode.

Hash code is cached on `obj._hashCodeCache`, the first time you call `obj.hashcode`, caculation will be run, but the second time, cache will be used.

If you change a property of this object, cache will be clear, caculation will be run again the next time you call `obj.hashcode`.

### createHashcodeObject(obj)

`defineObjectHashcodeProperty` listen to the top level properties, however, some objects have children in which there are objects too. For example:

```
var obj = {
  x: 1,
  children: {
    y: 2,
  },
}
```

This is not fit to use `defineObjectHashcodeProperty`, it is better to use `createHashcodeObject`.

```
import { createHashcodeObject } from 'object-hashcode'
createHashcodeObject(obj)
obj.children.y = 3 // obj.hashcode changed
```
