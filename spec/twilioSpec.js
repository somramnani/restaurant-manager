var request = require("request");
// var myMockTest = require("./mockTest");
const user = "AC0cd1dd92db1f221da9dcf8d41dcc2311";
const password = "5011d4d126b7c208206faa6abed97707";

var base_url =
  "https://api.twilio.com/2010-04-01/Accounts/AC0cd1dd92db1f221da9dcf8d41dcc2311/Messages";

describe("Twilio App", function () {
  it("should send sms", function () {
    // var statusCode = myMockTest.statusCode;
    request.post(base_url(user, password), function (error, response, body) {
      expect(response.status).toMatch("");
    });
  });
});
