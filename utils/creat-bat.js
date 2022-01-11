const fs = require("fs");
const path = require("path");
let absolutePath = path.resolve(__dirname, "../");
console.log(absolutePath);
let file = `${absolutePath.slice(0, 2)}\r\ncd ${absolutePath}\r\npnpm test`;
fs.writeFileSync(path.resolve(absolutePath, "./run-bat.bat"), file);
