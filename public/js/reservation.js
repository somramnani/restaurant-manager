// ---------------------------------------------------------------------------
//RESERVE PAGE
// ---------------------------------------------------------------------------

$(".submit").on("click", function(event) {
  event.preventDefault();

  // Here we grab the form elements
  var newReservation = {
    customerName: $("#reserve-name")
      .val()
      .trim(),
    phoneNumber: $("#reserve-phone")
      .val()
      .trim(),
    customerEmail: $("#reserve-email")
      .val()
      .trim()
  };

  console.log(newReservation);

  $.post("/api/tables", newReservation, function(data) {
    // If a table is available, tell user they are booked.
    if (data) {
      alert("You have booked a table");
      window.location.href = "/tables";
    }

    // If a table is available, tell user they on the waiting list.
    else {
      alert("Sorry you are on the wait list");
      window.location.href = "/tables";
    }

    // Clear the form when submitting
    $("#reserve-name").val("");
    $("#reserve-phone").val("");
    $("#reserve-email").val("");
    $("#reserve-unique-id").val("");
  });
});
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// TABLES PAGE
// ---------------------------------------------------------------------------

function runTableQuery() {
  $.ajax({ url: "/api/tables", method: "GET" }).then(function(tableData) {
    // Here we then log the tableData to console, where it will show up as an object.
    console.log(tableData);
    console.log("------------------------------------");

    // Loop through and display each of the customers
    for (var i = 0; i < tableData.length; i++) {
      // Get a reference to the tableList element and populate it with tables
      var tableList = $("#tableList");

      // Then display the fields in the HTML (Section Name, Date, URL)
      var listItem = $("<li class='list-group-item mt-4'>");

      listItem.append(
        $("<h2>").text("Table #" + (i + 1)),
        $("<hr>"),
        $("<h2>").text("Name: " + tableData[i].customerName),
        $("<h2>").text("Email: " + tableData[i].customerEmail),
        $("<h2>").text("Phone: " + tableData[i].phoneNumber)
      );

      tableList.append(listItem);
    }
  });
}

function runWaitListQuery() {
  $.ajax({ url: "/api/waitlist", method: "GET" }).then(function(waitData) {
    // Here we then log the waitlistData to console, where it will show up as an object.
    console.log(waitData);
    console.log("------------------------------------");

    // Loop through and display each of the customers
    for (var i = 0; i < waitData.length; i++) {
      // Get a reference to the waitList element and populate it with tables
      var waitList = $("#waitList");

      // Then display the fields in the HTML (Section Name, Date, URL)
      var listItem = $("<li class='list-group-item mt-4'>");

      listItem.append(
        $("<h2>").text("Table #" + (i + 1)),
        $("<hr>"),
        $("<h2>").text("Name: " + waitData[i].customerName),
        $("<h2>").text("Email: " + waitData[i].customerEmail),
        $("<h2>").text("Phone: " + waitData[i].phoneNumber)
      );

      waitList.append(listItem);
    }
  });
}

// This function resets all of the data in the tables.
function clearTable() {
  alert("Clearing...");

  // Clear the tables on the server and then empty the elements on the client
  $.ajax({ url: "/api/clear", method: "POST" }).then(function() {
    $("#waitList").empty();
    $("#tableList").empty();
  });
}

$("#clear").on("click", clearTable);

runTableQuery();
runWaitListQuery();
// ---------------------------------------------------------------------------
