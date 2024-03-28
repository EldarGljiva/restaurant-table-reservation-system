// Define the getBookings function
getBookings = () => {
  $.get("data/bookings.json", (bookings) => {
    let output = "";
    for (let i = 0; i < bookings.bookings.length; i++) {
      let item = bookings.bookings[i];

      output +=
        '<div class="col-lg-2 col-md-4 col-xs-6">' +
        '<div class="card">' +
        '<div class="card-body">' +
        '<h5 class="card-title">' +
        item.customerId +
        "</h5>" +
        '<p class="card-text">' +
        item.tableId +
        "</p>" +
        "</div>" +
        "</div>" +
        "</div>";
    }
    // Log menuitems array to console
    console.log("data: ", bookings.bookings);

    // Update the HTML content of the element with ID 'menuItems'
    $("#bookingsContent").html(output);
  });
};
getBookings();
