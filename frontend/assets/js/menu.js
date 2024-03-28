// Define the getMenuItems function
getMenuItems = (foodType) => {
  $.get("data/menuitems.json", (menuitems) => {
    let output = "";
    for (let i = 0; i < menuitems.menuitems.length; i++) {
      let item = menuitems.menuitems[i];
      if (item.foodType === foodType) {
        output +=
          '<div class="col-lg-4 col-md-4 mb-2">' +
          '<div class="card">' +
          '<img src="' +
          item.image_url +
          '" class="card-img-top img-fluid" alt="food"/>' +
          '<div class="card-body">' +
          '<h5 class="card-title">' +
          item.foodName +
          "</h5>" +
          '<p class="card-text">' +
          item.description +
          "</p>" +
          "</div>" +
          "</div>" +
          "</div>";
      }
    }
    // Log menuitems array to console
    console.log("data: ", menuitems.menuitems);

    // Update the HTML content of the element with ID 'menuItemsPage'
    $("#menuItemsPage").html(output);
  });
};

// Calling function to get menu items
$(document).ready(function () {
  $("#main_courses").click(function () {
    getMenuItems("Main Courses"); // Corrected function name
  });
  $("#side_dishes").click(function () {
    getMenuItems("Side Dishes"); // Corrected function name
  });
  $("#desserts").click(function () {
    getMenuItems("Desserts");
  });
  $("#beverages").click(function () {
    getMenuItems("Beverages");
  });
});
