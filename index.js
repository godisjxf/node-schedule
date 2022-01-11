import http from "./utils/httpGet";
import sendEmail from "./utils/email";
// const a = require("./ip.json");
const fs = require("fs");


function recordIp(newIp, oldIp) {
  if (newIp !== oldIp) {
    console.log("diff");
    console.log(
      "%c [newIp]: ",
      "color: #bf2c9f; background: pink; font-size: 13px;",
      newIp
    );
    sendEmail(newIp,()=>{ fs.writeFileSync("./ip.json", JSON.stringify({ ip: newIp || "127.0.0.1" }));});
  }
}
try{
  let { ip:oldIp } = JSON.parse(fs.readFileSync("./ip.json", "utf-8"));
  // import a from "./ip.json";
  console.log(
    "%c [ oldIp ]: ",
    "color: #bf2c9f; background: pink; font-size: 13px;",
    oldIp
  );
  
  let newIp;
  http("http://ip-api.com/json")
    .then((res) => {
      console.log(res);
      newIp = res.query;
      recordIp(newIp, oldIp);
    })
    .catch((e) => {
      console.log(e);
    });
}catch(e){
  console.log(e);
}

