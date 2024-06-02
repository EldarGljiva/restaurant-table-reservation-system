var registerService = {
  // Initialize form validation
  init: function () {
    $("#registerForm").validate({
      rules: {
        fName: { required: true, minlength: 2 },
        lName: { required: true, minlength: 2 },
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 6,
        },
        phone: { required: true, digits: true },
      },
      messages: {
        fName: {
          required: "Please enter your first name",
          minlength: "First name must be at least 2 characters long",
        },
        lName: {
          required: "Please enter your last name",
          minlength: "Last name must be at least 2 characters long",
        },
        email: "Please enter a valid email address",
        password: {
          required: "Please enter a password",
          minlength: "Password must be at least 6 characters long",
        },
        phone: {
          required: "Please enter your phone number",
          digits: "Phone number must contain only digits",
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

        // Serialize form data using registerService.serializeForm(form)
        let data = registerService.serializeForm(form);

        $.ajax({
          type: "POST",
          url: "../rest/customers/register",
          data: data,
          success: function () {
            $("body").unblock();
            toastr.success("Registered Successfully");
            // Clear form
            $("#registerForm")[0].reset();
            window.location.href = "#login";
          },
          error: function (xhr, status, error) {
            $("body").unblock();
            var errorMessage;
            if (xhr.status === 400) {
              errorMessage = "Email is taken";
            } else {
              errorMessage = "An error occurred";
            }
            toastr.error(errorMessage);
            console.log(xhr.responseText);
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
};
