var MenuItemsService = {
  // General function to get menu items based on food type
  getMenuItems: function (foodType) {
    $.get("../rest/menuitems", (menuitems) => {
      let output = "";
      if (menuitems) {
        for (let i = 0; i < menuitems.length; i++) {
          let item = menuitems[i];
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
      } else {
        output = "No menu items found.";
      }
      // Log menuitems array to console
      console.log("data: ", menuitems);
      $("#menuItemsPage").html(output);
    });
  },

  // Function to get only 3 menu items
  getLimitedMenuItems: function () {
    $.get("../rest/menuitems", (menuitems) => {
      let output = "";
      if (menuitems) {
        for (let i = 0; i <= 2 && i < menuitems.length; i++) {
          let item = menuitems[i];
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
      } else {
        output = "No menu items found."; // Handle empty response
      }
      // Log menuitems array to console
      console.log("data: ", menuitems);

      // Update the HTML content of the element with ID 'menuItems'
      $("#menuItems").html(output);
    });
  },
};
