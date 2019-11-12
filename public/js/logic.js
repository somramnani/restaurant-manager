// ---------------------------------------------------------------------------
//LOGIN PAGE
// ---------------------------------------------------------------------------
$(document).ready(function() {
  $("#step1button").click(function() {
    $("#step2button").removeClass(" btn-dark");
    $("#step2button").addClass(" btn-light");
    $("#step1button").addClass("btn-dark");

    $("#step1section").css("display", "block");
    $("#step2section").css("display", "none");
  });

  $("#step2button").click(function() {
    $("#step1button").removeClass(" btn-dark");
    $("#step1button").addClass(" btn-light");
    $("#step2button").addClass("btn-dark");

    $("#step1section").css("display", "none");
    $("#step2section").css("display", "block");
  });

  $("#signupbutton").click(function() {
    $(".panel").addClass("flipInY");
    $(".login-panel").css("display", "none");
    $(".signup-panel").css("display", "block");
  });

  $("#back-to-login").click(function() {
    $(".panel").addClass("flipInY");
    $(".login-panel").css("display", "block");
    $(".signup-panel").css("display", "none");
  });
});
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// MEMBERS PAGE
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// EMPLOYEE PAGE
// ---------------------------------------------------------------------------
$(document).ready(function() {
  // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  postCategorySelect.on("change", handleCategoryChange);
  var posts;

  // This function grabs posts from the database and updates the view
  function getPosts(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/posts" + categoryString, function(data) {
      console.log("Posts", data);

      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    }).then(function() {
      getPosts(postCategorySelect.val());
    });
  }

  // Getting the initial list of posts
  getPosts();

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
    $("#numberofemployees").text(posts.length);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card col-md-4 employee-cards");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("X");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    var newPostCategory = $("<h6>");
    newPostCategory.text("Profession: " + post.category);
    newPostCategory.css({});
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostTitle.text(post.title + " ");
    newPostBody.text("Hourly Pay: $" + post.body);
    var formattedDate = new Date(post.createdAt);
    // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newPostDate.text(formattedDate);
    newPostCardHeading.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostCategory);
    newPostCardBody.append(newPostTitle);
    newPostCardBody.append(newPostCategory);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    return newPostCard;
  }

  // This function figures out which post to delete and then calls deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  // This function figures out which post to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/cms?post_id=" + currentPost.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html(
      "No employees yet for this job, navigate <a href='/cms'>here</a> in order to create a new employee."
    );
    blogContainer.append(messageH2);
  }

  // This function handles reloading new posts when the category changes
  function handleCategoryChange() {
    var newPostCategory = $(this).val();
    getPosts(newPostCategory);
  }
});
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// CMS PAGE
// ---------------------------------------------------------------------------
$(document).ready(function() {
  var url = window.location.search;
  var postId;
  // Sets a flag for whether or not the post the post is updating
  var updating = false;

  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId);
  }

  // Getting jQuery references to the post pay, name, form, and job select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");
  var postCategorySelect = $("#category");
  // Giving the postCategorySelect a default value
  postCategorySelect.val("Personal");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!titleInput.val().trim() || !bodyInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newPost = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim(),
      category: postCategorySelect.val()
    };

    console.log(newPost);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    } else {
      submitPost(newPost);
    }
  });

  // Submits a new post and brings user to employees page upon completion
  function submitPost(Post) {
    $.post("/api/posts/", Post, function() {
      window.location.href = "/employees";
    });
  }

  // Gets post data for a post if editing
  function getPostData(id) {
    $.get("/api/posts/" + id, function(data) {
      if (data) {
        // If this post exists, prefill the cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        postCategorySelect.val(data.category);
        // If a post has this id, set a flag to know to update the post
        updating = true;
      }
    });
  }

  // Update a given post, bring user to the employees page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/posts",
      data: post
    }).then(function() {
      window.location.href = "/employees";
    });
  }
});
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// MEMBERS PAGE
// ---------------------------------------------------------------------------

var managerCount = 0;
var cookCount = 0;
var waiterCount = 0;
var hostessCount = 0;

$.ajax({
  url: "/api/posts/",
  method: "GET"
}).then(function(response) {
  for (let i = 0; i < response.length; i++) {
    var profession = response[i].category;

    if (profession === "Manager") {
      managerCount++;
    } else if (profession === "Cook") {
      cookCount++;
    } else if (profession === "Waiter") {
      waiterCount++;
    } else if (profession === "Hostess") {
      hostessCount++;
    }
  }
});
let openTables = 5;
let closedTables = 0;

$.ajax({ url: "/api/tables", method: "GET" }).then(function(tableData) {
  // Loop through and display each of the customers
  for (var i = 0; i < tableData.length; i++) {
    closedTables = tableData.length;
    openTables = 5 - closedTables;
  }
  $("#numberoftables").text(openTables);
});

$.ajax({ url: "/api/waitlist", method: "GET" }).then(function(waitData) {
  // Loop through and display each of the customers
  for (var i = 0; i < waitData.length; i++) {
    $("#numberofwaitlistedtables").text(waitData.length);
  }
});

//Employees Table
google.charts.load("current", { packages: ["table"] });
google.charts.setOnLoadCallback(drawTable);
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawTable() {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Profession");
  data.addColumn("number", "Salary (per hour)");
  data.addColumn("number", "Number of Employees");

  data.addRows([
    ["Manager", { v: 22, f: "$21" }, { v: managerCount }],
    ["Cook", { v: 20, f: "$20" }, { v: cookCount }],
    ["Waiter/Waitress", { v: 10, f: "$10" }, { v: waiterCount }],
    ["Host/Hostess", { v: 7000, f: "$11" }, { v: hostessCount }]
  ]);

  var table = new google.visualization.Table(
    document.getElementById("table_div")
  );

  table.draw(data, { showRowNumber: true, width: "100%", height: "100%" });
}
// Google Pie Chart
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Tables", "Number of tables"],
    ["Open Tables", openTables],
    ["Closed Tables", closedTables]
  ]);

  var options = {
    title: "Tables",
    backgroundColor: "#f5f5f5",
    is3D: true
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart_3d")
  );

  chart.draw(data, options);
}
// ---------------------------------------------------------------------------
