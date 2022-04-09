//
const http = require("http");
export function MyAbortController() {
  return {
    agentInstance: null,
    register(agent) {
      this.abortInstance = agent;
    },
    abort() {
      console.log(this.abortInstance);
      this.abortInstance?.destroy();
    },
  };
}
export default function (url, timeout, AbortController) {
  return new Promise((resolve, reject) => {
    const agent = http
      .get(url, (res) => {
        const { statusCode } = res;
        const contentType = res.headers["content-type"];

        let error;
        // 任何 2xx 状态码都表示成功响应，但这里只检查 200。
        if (statusCode !== 200) {
          error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error(
            "Invalid content-type.\n" +
              `Expected application/json but received ${contentType}`
          );
        }
        if (error) {
          reject(error.message);
          // 消费响应数据以释放内存
          res.resume();
          return;
        }

        res.setEncoding("utf8");
        let rawData = "";
        res.on("data", (chunk) => {
          rawData += chunk;
        });
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData);
          } catch (e) {
            reject(e.message);
          }
        });
      })
      .setTimeout(timeout)
      .on("timeout", (e) => {
        reject(`timeout:${timeout}ms`);
      })
      .on("error", (e) => {
        reject(`Got error: ${e.message}`);
      });
    AbortController?.register(agent);
  });
}
