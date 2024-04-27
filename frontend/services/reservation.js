var reservationService = {
  // Get today's date in the format YYYY-MM-DD
  today: new Date().toISOString().split("T")[0],

  // Set the minimum date for the input field
  setMinDate: function () {
    var reservationDateInput = document.getElementById("reservationDate");
    if (reservationDateInput) {
      reservationDateInput.setAttribute("min", this.today);
    }
  },

  // Get all tables and populate the select dropdown
  getAllTables: function () {
    $.get("../rest/restauranttables", (data) => {
      let html = "";
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
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
  },

  // Initialize form validation and handle form submission for making reservations
  initFormValidation: function () {
    $("#reservationForm").validate({
      errorPlacement: function (error, element) {
        error.insertAfter(element); // Place error message after the input element
      },
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
        event.stopImmediatePropagation();
        $("body").block({
          message:
            '<div class="spinner-border text-primary" role="status"></div>',
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

        let data = reservationService.serializeForm(form);
        $.ajax({
          type: "POST",
          url: "../rest/reservations",
          data: data,
          success: function (response) {
            toastr.success("Reserved Successfully");
            // Clear form
            $("#reservationForm")[0].reset();

            // Update the displayed bookings after successful reservation
            reservationService.getBookings();
            $("body").unblock();
          },
          error: function (xhr, status, error) {
            $("body").unblock();
            toastr.error("Error in reservation: " + xhr.responseText);
          },
        });
      },
    });
  },

  // Serialize form data into JSON
  serializeForm: function (form) {
    let jsonResult = {};
    $.each($(form).serializeArray(), function () {
      jsonResult[this.name] = this.value;
    });
    return jsonResult;
  },

  // Display existing reservations
  getReservations: function () {
    $.get("../rest/reservations", (data) => {
      console.log("pocinjemo");
      let html = "";
      if (data) {
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          html +=
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
      } else {
        html = "No reservations found.";
      }
      console.log("data: ", data);
      $("#reservationsContent").html(html);
    });
  },
};
reservationService.setMinDate();
reservationService.initFormValidation();
reservationService.getReservations();
