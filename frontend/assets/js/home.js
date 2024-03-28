// Define the getMenuItems function
getMenuItems = () => {
  $.get("data/menuitems.json", (menuitems) => {
    let output = "";
    for (let i = 0; i <= 2 && i < menuitems.menuitems.length; i++) {
      let item = menuitems.menuitems[i];
      output +=
        '<div class="col-lg-4 col-md-4 mb-2">' +
        '<div class="card">' +
        '<img src="images/' +
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
    // Log menuitems array to console
    console.log("data: ", menuitems.menuitems);

    // Update the HTML content of the element with ID 'menuItems'
    $("#menuItems").html(output);
  });
};

// Call the getMenuItems function
getMenuItems();
