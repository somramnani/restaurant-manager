var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
//
module.exports = function(app) {
  // ---------------------------------------------------------------------------
  // HTML ROUTES
  // ---------------------------------------------------------------------------
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/members");
    // }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/members");
    // }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/employees", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/employees.html"));
  });

  app.get("/cms", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  app.get("/reservation", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/reservation.html"));
  });
  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/tables.html"));
  });

  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/reserve.html"));
  });
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // IMAGE ROUTES
  // ---------------------------------------------------------------------------
  app.get("/restaurant-employee", function(req, res) {
    res.sendFile(
      path.join(__dirname, "../public/images/restaurant-employees.jpg")
    );
  });

  app.get("/step1image", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/employee-add.PNG"));
  });

  app.get("/step2image", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/employee-table.PNG"));
  });
  // ---------------------------------------------------------------------------
};
