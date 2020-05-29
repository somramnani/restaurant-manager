require("dotenv").config();
const accountSid = "AC0cd1dd92db1f221da9dcf8d41dcc2311";
const authToken = "5011d4d126b7c208206faa6abed97707";

const client = require("twilio")(accountSid, authToken);
var statusCode;

client.messages
  .create({
    from: "+12056279983",
    to: "+14089609932",
    body: "Test",
  })
  .then((message) => {
    statusCode = message.status;
    console.log(message.status);
  });

exports.statusCode = statusCode;
