import axios from "axios";
const os = require("os");
const https = require("https");

// function getIPAdress() {
//     var interfaces = os.networkInterfaces();
//     for (var devName in interfaces) {
//       var iface = interfaces[devName];
//       for (var i = 0; i < iface.length; i++) {
//         var alias = iface[i];
//         if (
//           alias.family === "IPv4" &&
//           alias.address !== "127.0.0.1" &&
//           !alias.internal
//         ) {
//           return alias.address;
//         }
//       }
//     }
//   }

export default function DDNS(options, url) {
  if (!options) {
    return;
  }
  // let port = options.map[getIPAdress()]
  const postData = JSON.stringify({
    type: "A",
    name: "lj",
    content: `${url}`, //`${url}:${port}`,
    ttl: 1,
    proxied: false,
  });
  let httpsOption = {
    hostname: "api.cloudflare.com",
    port: 443,
    // host:'104.19.192.29',
    path: `/client/v4/zones/${options.zones}/dns_records/${options.dns_records}`,
    method: "PUT",
    headers: {
      "X-Auth-Email": options.email,
      "X-Auth-Key": options.global,
      "Content-Type": "Application/json",
      //  'Content-Length': Buffer.byteLength(postData)
    },
  };
  // return new Promise((resolve, reject) => {
  //   let req = https
  //     .request(httpsOption, (res) => {
  //       const { statusCode } = res;
  //       const contentType = res.headers["content-type"];

  //       let error;
  //       // 任何 2xx 状态码都表示成功响应，但这里只检查 200。
  //       if (statusCode !== 200) {
  //         error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
  //       } else if (!/^application\/json/.test(contentType)) {
  //         error = new Error(
  //           "Invalid content-type.\n" +
  //             `Expected application/json but received ${contentType}`
  //         );
  //       }

  //       res.setEncoding("utf8");
  //       let rawData = "";
  //       res.on("data", (chunk) => {
  //         rawData += chunk;
  //       });
  //       res.on("end", () => {
  //         try {
  //           const parsedData = JSON.parse(rawData);
  //           if (error) {
  //             reject(parsedData);
  //             // 消费响应数据以释放内存
  //             res.resume();
  //             return;
  //           }
  //           resolve(parsedData);
  //         } catch (e) {
  //           reject(e.message);
  //         }
  //       });
  //     })
  //     .on("error", (e) => {
  //       reject(`Got error: ${e.message}`);
  //     });
  //   req.write(postData);
  //   req.end();
  // });
  return axios({
    method: "PUT",
    url: `https://api.cloudflare.com/client/v4/zones/${options.zones}/dns_records/${options.dns_records}`,
    headers: {
      "X-Auth-Email": options.email,
      "X-Auth-Key": options.global,
      //  'Content-Length': Buffer.byteLength(postData)
    },
    data: postData,
  });
}
