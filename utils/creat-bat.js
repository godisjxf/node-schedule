const fs = require("fs");
const path = require("path");
let absolutePath = path.resolve(__dirname, "../");
console.log(absolutePath);
let file = `${absolutePath.slice(0, 2)}\r\ncd ${absolutePath}\r\npnpm test`;
let email = {
  user: "your email account",
  pass: "your pass",
};
let ip = { ip: "" };
let ddns = {
  zones:"",
  dns_records:"",
  email:"",
  global:""
}
fs.writeFileSync(path.resolve(absolutePath, "./run-bat.bat"), file);
fs.writeFileSync(
  path.resolve(absolutePath, "./email.json"),
  JSON.stringify(email)
);
fs.writeFileSync(path.resolve(absolutePath, "./ip.json"), JSON.stringify(ip));
fs.writeFileSync(path.resolve(absolutePath, "./ddns.json"), JSON.stringify(ddns));
