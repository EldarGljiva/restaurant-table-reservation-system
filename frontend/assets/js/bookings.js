// Define the getBookings function
getBookings = () => {
  $.get("data/bookings.json", (bookings) => {
    let output = "";
    for (let i = 0; i < bookings.bookings.length; i++) {
      let item = bookings.bookings[i];

      output +=
        '<div class="booking-box col-lg-3 col-md-4 col-sm-6 col-xs-6 mb-2">' +
        '<div class="card">' +
        '<div class="card-body">' +
        '<h5 class="card-title"> Customer ID: ' +
        item.customerId +
        "</h5>" +
        '<p class="card-text"> Table ID: ' +
        item.tableId +
        "</p>" +
        '<p class="card-text"> <span style="color: green; font-weight: bold; display:block">Reservation Date</span> ' +
        item.reservationDate +
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
