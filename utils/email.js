import { pass, user } from "../email.json";
const log4js = require("log4js");
const nodemailer = require("nodemailer");
export default function (msg, cb) {
  let transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: "QQ", // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
      user,
      // 这里密码不是qq密码，是你设置的smtp授权码，去qq邮箱后台开通、查看
      pass,
    },
  });

  let mailOptions = {
    from: user, // sender address
    to: user, // list of receivers
    subject: "ipAddr", // Subject line
    // 发送text或者html格式
    // text: 'Hello world?', // plain text body
    html: `<h1>Ip:${msg}</h1>`, // html body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      log4js.getLogger("ip").warn(`some bad:${JSON.stringify(error)}`);
      return;
    }
    transporter.close();
    cb();
  });
}
