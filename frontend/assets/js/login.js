var users = [];

// Initialize form validation
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
    users.push(data);
    $("body").unblock();
    toastr.success("Logged In Successfully");
    // Clear form
    $("#loginForm")[0].reset();
  },
});

serializeForm = (form) => {
  let jsonResult = {};
  $.each($(form).serializeArray(), function () {
    jsonResult[this.name] = this.value;
  });
  return jsonResult;
};
