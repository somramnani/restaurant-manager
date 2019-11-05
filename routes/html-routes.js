var path = require("path");

module.exports = function(app) {
  // HTML ROUTES
  // ---------------------------------------------------------------------------

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/homepage.html"));
  });

  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  app.get("/employees", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/employees.html"));
  });

  app.get("/top-restaurant", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images/top-restauraunt.jpg"));
  });

  app.get("/reservation", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/reservation.html"));
  });

  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/tables.html"));
  });

  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/reserve.html"));
  });
  app.get("/memebers", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
  });
  // ---------------------------------------------------------------------------

  //IMAGE ROUTES
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
