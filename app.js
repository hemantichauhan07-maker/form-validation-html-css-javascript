const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");


const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const mobileError = document.getElementById("mobileError");
const confirmError = document.getElementById("confirmError");
const passwordError = document.getElementById("passwordError");

const reqLength = document.getElementById("req-length");
const reqLower = document.getElementById("req-lower");
const reqUpper = document.getElementById("req-upper");
const reqNumber = document.getElementById("req-number");
const reqSpecial = document.getElementById("req-special");


const togglePassword = document.getElementById("togglePassword");
const toggleConfirm = document.getElementById("toggleConfirm");

togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.classList.toggle("bi-eye-fill");
    togglePassword.classList.toggle("bi-eye-slash-fill");

});

toggleConfirm.addEventListener("click", () => {
    const type = confirmInput.getAttribute("type") === "password" ? "text" : "password";
    confirmInput.setAttribute("type",type);
    toggleConfirm.classList.toggle("bi-eye-fill")
    toggleConfirm.classList.toggle("bi-eye-slash-fill")
})

passwordInput.addEventListener("input", () => {
    const val = passwordInput.value;
    reqLength.classList.toggle("text-danger", val.length < 8);
    reqLength.classList.toggle("text-success", val.length >= 8);

    reqLower.classList.toggle("text-danger", !/[a-z]/.test(val));
    reqLower.classList.toggle("text-success", /[a-z]/.test(val));

    reqUpper.classList.toggle("text-danger", !/[A-Z]/.test(val));
    reqUpper.classList.toggle("text-success", /[A-Z]/.test(val));

    reqNumber.classList.toggle("text-danger", !/[0-9]/.test(val));
    reqNumber.classList.toggle("text-success", /[0-9]/.test(val));

    reqSpecial.classList.toggle("text-danger", !/[@!#*?&]/.test(val));
    reqSpecial.classList.toggle("text-success", /[@!#*?&]/.test(val));
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    const namePattern = /^[A-Za-z]+$/;
    if (nameInput.value.trim() === "") {
        nameError.textContent = "Name is required!";
        valid = false;
    }
    else if (!namePattern.test(nameInput.value.trim())) {
        nameError.textContent = "only alphabets allowed!"
        valid = false;
    }
    else {
        nameError.textContent = "";
    }


    //email

   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "") {
        emailError.textContent = "email is required!";
        valid = false;
    }
    else if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = "invalid email format!"
        valid = false;
    }
    else {
        emailError.textContent = "";
    }

    //mobile

    const mobilePattern = /^[0-9]{10}$/;
    if (mobileInput.value.trim() === "") {
        mobileError.textContent = "MobileNumber is required!";
        valid = false;
    }
    else if (!mobilePattern.test(mobileInput.value.trim())) {
        mobileError.textContent = "Enter 10 digit number!"
        valid = false;
    }
    else {
        mobileError.textContent = "";
    }

    //pass
    const passval = passwordInput.value;
    const passValid = passval.length >= 8 &&
        /[a-z]/.test(passval) &&
        /[A-Z]/.test(passval) &&
        /[0-9]/.test(passval) &&
        /[@!%*?&]/.test(passval);

    if (!passValid) {
        passwordError.textContent = "Password must be 8 chars, include upparcase,lowercase,number& special char";
        valid = false;
    } else {
        passwordError.textContent = "";
    }
if (confirmInput.value === "") {

    confirmError.textContent = "Please confirm your password!";
    valid = false;

} else if (confirmInput.value !== passval) {

    confirmError.textContent = "Passwords do not match!";
    valid = false;

} else {

    confirmError.textContent = "";

}
    if (valid) {
        const successAlert = document.getElementById("successAlert");
        successAlert.classList.add("show");

        setTimeout(() => {
            successAlert.classList.remove("show");
        }, 3000);
        form.reset();
        [reqLength, reqLower, reqUpper, reqNumber,reqSpecial].forEach((li) => {
            li.classList.remove("text-success");
            li.classList.add("text-danger");
        })
    }

});


