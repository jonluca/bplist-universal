# bplist-universal

Binary Mac OS X Plist (property list) parser.

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
  const objFromBuffer = await parseFile(await fs.readFile("myPlist.bplist"));
  console.log(JSON.stringify(obj));
})();
```
