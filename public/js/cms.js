$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
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
