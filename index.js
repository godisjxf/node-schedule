import http from "./utils/httpGet";
import sendEmail from "./utils/email";
import  DDNS from './utils/resetDns'
// const a = require("./ip.json");
var log4js = require("log4js");
const fs = require("fs");

//log4js 设置
log4js.configure({
  appenders: {
    fileout: { type: "file", filename: "./log/fileout.log" },
    datafileout: {
      type: "dateFile",
      filename: "./log/datafileout.log",
      pattern: ".yyyy-MM-dd",
      daysToKeep: 15,
    },
    consoleout: { type: "console" },
  },
  categories: {
    default: { appenders: ["fileout", "consoleout"], level: "debug" },
    ip: { appenders: ["datafileout"], level: "debug" },
    anything: { appenders: ["consoleout"], level: "debug" },
  },
});
let logger = log4js.getLogger("ip");

function recordIp(newIp, oldIp) {
  if (newIp !== oldIp) {
    console.log("diff");
    console.log(
      "%c [newIp]: ",
      "color: #bf2c9f; background: pink; font-size: 13px;",
      newIp
    );
    sendEmail(newIp, () => {
      fs.writeFileSync(
        "./ip.json",
        JSON.stringify({ ip: newIp || "127.0.0.1" })
      );
      logger.info(`now ip->${newIp}`);
    });
    let options = JSON.parse(fs.readFileSync("./ddns.json", "utf-8"));
    DDNS(options,newIp).then((res) => {
      console.log(res.data);
      logger.info(`change cloudFare`);
    })
    .catch((e) => {
      console.log(e)//e.response.data ||
      logger.warn(`some bad:${JSON.stringify(e)}`);
    });
  }
  logger.info('ip no change')
}
try {
  let { ip: oldIp } = JSON.parse(fs.readFileSync("./ip.json", "utf-8"));
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
      logger.warn(`some bad:${e}`);
    });
} catch (e) {
  logger.warn(`some bad:${e}`);
}
