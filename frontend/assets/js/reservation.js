var reservations = [];

// Get today's date in the format YYYY-MM-DD
var today = new Date().toISOString().split("T")[0];

// Set the minimum date for the input field
document.getElementById("reservationDate").setAttribute("min", today);

// Get all tables
getAllTables();

// Initialize form validation
$("#reservationForm").validate({
  rules: {
    email: {
      required: true,
      email: true,
    },
    tableNumber: {
      required: true,
    },
    reservationDate: {
      required: true,
    },
  },
  messages: {
    email: "Please enter a valid email address",
    tableNumber: "Please select a table",
    reservationDate: "Please select a date",
  },
  submitHandler: function (form, event) {
    event.preventDefault();
    $("body").block({
      message: '<div class="spinner-border text-primary" role="status"></div>',
      css: {
        backgroundColor: "transparent",
        color: "0",
        border: "none",
      },
      overlayCSS: {
        backgroundColor: "#000",
        opacity: 0.25,
      },
    });
    //
    let data = serializeForm(form);
    // JSON.stringify is used to convert the object to a string
    console.log(JSON.stringify(data));
    reservations.push(data);
    $("body").unblock();
    toastr.success("Reserved Successfully");
    // Clear form
    $("#reservationForm")[0].reset();
  },
});

serializeForm = (form) => {
  let jsonResult = {};
  $.each($(form).serializeArray(), function () {
    jsonResult[this.name] = this.value;
  });
  return jsonResult;
};

function getAllTables() {
  $.get("data/restauranttable.json", function (data) {
    var html = "";
    for (let i = 0; i < data.restauranttable.length; i++) {
      let item = data.restauranttable[i];
      console.log(item.reserved);
      if (item.reserved !== 1) {
        html +=
          '<option value="' +
          item.tableNumber +
          '">' +
          item.tableNumber +
          "</option>";
      }
    }
    $("#table").html(html);
  });
}
