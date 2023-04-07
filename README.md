# bplist-universal

Binary Mac OS X Plist (property list) parser. This should work universally on all platforms, and cross browser. `fs` is imported within `parseFile`, so reading a buffer using `parseBuffer` should work in the browser.

## Installation

```bash
$ npm install bplist-universal
```

## Quick Examples

```javascript
import { parseBuffer, parseFile } from "bplist-universal";
import * as fs from "fs/promises";
(async () => {
  const obj = await parseFile("myPlist.bplist");
  const objFromBuffer = parseBuffer(await fs.readFile("myPlist.bplist"));
  console.log(JSON.stringify(obj));
})();
```
