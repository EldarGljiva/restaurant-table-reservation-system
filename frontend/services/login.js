var loginService = {
  init: function () {
    $("#loginForm").validate({
      rules: {
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 6,
        },
      },
      messages: {
        email: "Please enter a valid email address",
        password: {
          required: "Please enter a password",
          minlength: "Password must be at least 6 characters long",
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
        let data = loginService.serializeForm(form);
        $.ajax({
          type: "POST",
          url: "../rest/customers/login",
          data: data,
          headers: {
            Authentication: localStorage.getItem("token"),
          },
          success: function (response) {
            $("body").unblock();
            if (response.token) {
              localStorage.setItem("token", response.token);
              toastr.success("Logged in successfully");
              // Clear form
              $("#loginForm")[0].reset();
              window.location.href = "#home";
              location.reload();
            } else {
              toastr.error("Token not received");
            }
          },
          error: function (xhr, status, error) {
            $("body").unblock();
            var errorMessage;
            if (xhr.status === 401) {
              errorMessage = "Invalid email or password";
            } else if (xhr.status === 400) {
              errorMessage = "Email and password are required";
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

  serializeForm: function (form) {
    let jsonResult = {};
    $.each($(form).serializeArray(), function () {
      jsonResult[this.name] = this.value;
    });
    return jsonResult;
  },
};
