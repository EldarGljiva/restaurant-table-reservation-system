var users = [];

// Initialize form validation
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
    toastr.success("Registered Successfully");
    // Clear form
    $("#registerForm")[0].reset();
  },
});

serializeForm = (form) => {
  let jsonResult = {};
  $.each($(form).serializeArray(), function () {
    jsonResult[this.name] = this.value;
  });
  return jsonResult;
};
