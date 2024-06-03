var adminService = {
  getMenuItems: function () {
    $.ajax({
      url: "../rest/menuitems",
      type: "GET",
      headers: {
        Authentication: localStorage.getItem("token"),
      },
      success: function (menuitems) {
        let output = "";
        if (menuitems && menuitems.length > 0) {
          for (let i = 0; i < menuitems.length; i++) {
            let item = menuitems[i];
            output +=
              '<div class="col-lg-4 col-md-4 mb-2">' +
              '<div class="card">' +
              '<img src="' +
              item.image_url +
              '" class="card-img-top img-fluid custom-img" alt="food"/>' +
              '<div class="card-body">' +
              '<h5 class="card-title">' +
              item.foodName +
              "</h5>" +
              '<p class="card-text">' +
              '<span style="color: green;">$' +
              item.foodPrice +
              "</span>" +
              "</p>" +
              '<p class="card-text">' +
              item.description +
              "</p>" +
              '<button type="button" class="btn btn-primary btn-sm edit-btn" data-bs-toggle="modal" data-bs-target="#editMenuItemModal" style="margin-right:5px" onclick="populateEditForm(' +
              item.id +
              ')" data-id="' +
              item.id +
              '">Edit</button>' +
              '<button type="button" class="btn btn-danger btn-sm delete-btn" data-bs-toggle="modal" data-bs-target="#deleteMenuItemModal" onclick="openConfirmationDialog(' +
              item.id +
              ')" data-id="' +
              item.id +
              '">Delete</button>' +
              "</div>" +
              "</div>" +
              "</div>";
          }
        } else {
          output = "No menu items found.";
        }
        console.log("data: ", menuitems);
        $("#adminMenuItems").html(output);
      },
      error: function (xhr, status, error) {
        // handle error
      },
    });
  },

  deleteMenuItem: function () {
    let itemId = $("#delete_menuItem_id").val();
    console.log("Deleting item with ID:", itemId);

    $.ajax({
      url: "../rest/menuitems/" + itemId,
      type: "DELETE",
      headers: {
        Authentication: localStorage.getItem("token"),
      },
      success: function () {
        toastr.success("Menu Item Deleted Successfully");
        console.log("Menu Item Deleted Successfully");
        $("#deleteMenuItemModal").modal("hide");
        adminService.getMenuItems(); // Update menu items after deletion
      },
      error: function () {
        toastr.error("Error deleting menu item");
        console.log("Error deleting menu item");
      },
    });
  },
  deleteReservation: function () {
    let itemId = $("#delete_reservation_id").val();
    console.log("Deleting item with ID:", itemId);

    $.ajax({
      url: "../rest/reservations/" + itemId,
      type: "DELETE",
      headers: {
        Authentication: localStorage.getItem("token"),
      },
      success: function () {
        toastr.success("Reservation Deleted Successfully");
        console.log("Reservation Deleted Successfully");
        $("#deleteReservationModal").modal("hide");
        adminService.getReservationsAdmin();
      },
      error: function () {
        toastr.error("Error deleting reservation");
        console.log("Error deleting reservation");
      },
    });
  },
  editMenuItem: function () {
    var id = $("#edit_menuItem_id").val();
    var foodName = $("#edit_foodName").val();
    var foodPrice = $("#edit_foodPrice").val();
    var foodType = $("#edit_foodType").val();
    var description = $("#edit_description").val();
    var image_url = $("#edit_image_url").val();

    var updatedMenuItem = {
      id: id,
      foodName: foodName,
      foodPrice: foodPrice,
      foodType: foodType,
      description: description,
    };

    $.ajax({
      url: "../rest/menuitems/" + id,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(updatedMenuItem),
      headers: {
        Authentication: localStorage.getItem("token"),
      },
      success: function () {
        toastr.success("Menu Item Updated Successfully");
        console.log("Menu Item Updated Successfully");
        $("#editMenuItemModal").modal("hide");
        adminService.getMenuItems(); // Update menu items after edit
      },
      error: function () {
        toastr.error("Error updating menu item");
        console.log("Error updating menu item");
      },
    });
  },
  editReservation: function () {
    var id = $("#edit_reservation_id").val();
    var reservationDate = $("#edit_reservationDate").val();

    var updatedReservation = {
      id: id,
      reservationDate: reservationDate,
    };

    $.ajax({
      url: "../rest/reservations/" + id,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(updatedReservation),
      headers: {
        Authentication: localStorage.getItem("token"),
      },
      success: function () {
        toastr.success("Reservation Updated Successfully");
        console.log("Reservation Updated Successfully");
        $("#editReservationModal").modal("hide");
        adminService.getReservationsAdmin();
      },
      error: function () {
        toastr.error("Error updating reservation");
        console.log("Error updating reservation");
      },
    });
  },
  // Display existing reservations
  getReservationsAdmin: function () {
    $.ajax({
      url: "../rest/reservations",
      type: "GET",
      headers: {
        Authentication: localStorage.getItem("token"),
      },
      success: function (data) {
        let html = "";
        if (data && data.length > 0) {
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
              '<button type="button" class="btn btn-primary btn-sm edit-btn" data-bs-toggle="modal" data-bs-target="#editReservationModal" style="margin-right:5px" onclick="populateEditReservationForm(' +
              item.id +
              ')" data-id="' +
              item.id +
              '">Edit</button>' +
              '<button type="button" class="btn btn-danger btn-sm delete-btn" data-bs-toggle="modal" data-bs-target="#deleteReservationModal" onclick="openConfirmationReservationDialog(' +
              item.id +
              ')" data-id="' +
              item.id +
              '">Delete</button>' +
              "</div>" +
              "</div>" +
              "</div>";
          }
        } else {
          html = "No reservations found.";
        }
        console.log("data: ", data);
        $("#reservationsContentAdmin").html(html);
      },
      error: function (xhr, status, error) {
        // handle error
      },
    });
  },

  init: function () {
    $("#addMenuItemForm").validate({
      rules: {
        foodName: {
          required: true,
        },
        foodPrice: {
          required: true,
        },
        foodType: {
          required: true,
        },
        description: {
          required: true,
        },
        image_url: {
          required: true,
        },
      },
      messages: {
        foodName: {
          required: "Please enter the food name",
        },
        foodPrice: {
          required: "Please enter the food price",
        },
        foodType: {
          required: "Please select the food type",
        },
        description: {
          required: "Please enter a description",
        },
        image_url: {
          required: "Please enter an image URL",
        },
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

        let data = adminService.serializeForm(form);
        console.log("Serialized data: ", data);
        console.log(JSON.stringify(data));
        $.ajax({
          type: "POST",
          url: "../rest/menuitems",
          data: data,
          headers: {
            Authentication: localStorage.getItem("token"),
          },
          success: function (response) {
            console.log("ajax response: " + response);
            $("body").unblock();
            toastr.success("Added Successfully");
            $("#addMenuItemForm")[0].reset();
            $("#addMenuItemModal").modal("hide");
            adminService.getMenuItems();
          },
          error: function (xhr, status, error) {
            $("body").unblock();
            toastr.error("Error occurred");
            console.log(xhr.responseText);
          },
        });
      },
    });
  },

  serializeForm: function (form) {
    let jsonResult = {};
    $.each($(form).serializeArray(), function () {
      jsonResult[this.name] = this.value;
    });
    return jsonResult;
  },
};

function populateEditForm(itemId) {
  console.log("Editing item with ID:", itemId);
  $.get("../rest/menuitems/" + itemId, function (menuItem) {
    $("#edit_menuItem_id").val(menuItem.id);
    $("#edit_foodName").val(menuItem.foodName);
    $("#edit_foodPrice").val(menuItem.foodPrice);
    $("#edit_foodType").val(menuItem.foodType);
    $("#edit_description").val(menuItem.description);
    $("#editMenuItemModal").modal("show");
  }).fail(function () {
    toastr.error("Failed to fetch menu item details.");
  });
}

function populateEditReservationForm(reservationId) {
  console.log("Editing reservation with ID:", reservationId);
  $("#edit_reservation_id").val(reservationId);
}

function openConfirmationDialog(itemId) {
  $("#deleteMenuItemModal").modal("show");
  $("#delete_menuItem_id").val(itemId);
}
function openConfirmationReservationDialog(itemId) {
  $("#deleteReservationModal").modal("show");
  $("#delete_reservation_id").val(itemId);
}
