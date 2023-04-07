# bplist-universal

Binary Mac OS X Plist (property list) parser. This should work universally on all platforms, and cross browser. `fs` is imported within `parseFile`, so reading a buffer using `parseBuffer` should work in the browser.

## Installation

```bash
$ npm install bplist-universal
```

## Quick Examples

```javascript
import { parseBuffer } from "bplist-universal";
import fs from "fs";
const objFromBuffer = parseBuffer(fs.readFileSync("myPlist.bplist"));
console.log(JSON.stringify(obj));
```
