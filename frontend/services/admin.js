var adminService = {
  getMenuItems: function () {
    $.get("../rest/menuitems", (menuitems) => {
      let output = "";
      if (menuitems) {
        for (let i = 0; i < menuitems.length; i++) {
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
            '<button type="button" class="btn btn-primary btn-sm edit-btn" data-bs-toggle="modal" data-bs-target="#editMenuItemModal" style = "margin-right:5px" onclick="populateEditForm(' +
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
    });
  },

  deleteMenuItem: function () {
    let itemId = $("#delete_menuItem_id").val();
    console.log("Deleting item with ID:", itemId);

    $.ajax({
      url: "../rest/menuitems/" + itemId,
      type: "DELETE",
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
  editMenuItem: function () {
    var id = $("#edit_menuItem_id").val();
    var foodName = $("#edit_foodName").val();
    var foodPrice = $("#edit_foodPrice").val();
    var foodType = $("#edit_foodType").val();
    var description = $("#edit_description").val();

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

function openConfirmationDialog(itemId) {
  $("#deleteMenuItemModal").modal("show");
  $("#delete_menuItem_id").val(itemId);
}
