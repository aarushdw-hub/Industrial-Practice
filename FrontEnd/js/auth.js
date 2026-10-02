// ======================================================
// JOBHUB AI - AUTHENTICATION JAVASCRIPT
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    // ==================================================
    // GET ELEMENTS
    // ==================================================

    const loginForm = document.getElementById("loginForm");

    const emailInput = document.getElementById("loginEmail");

    const passwordInput = document.getElementById("loginPassword");

    const togglePassword = document.getElementById("togglePassword");


    // ==================================================
    // PASSWORD SHOW / HIDE
    // ==================================================

    if (togglePassword && passwordInput) {

        togglePassword.addEventListener("click", function (event) {

            event.preventDefault();

            if (passwordInput.type === "password") {

                // SHOW PASSWORD
                passwordInput.type = "text";

                togglePassword.textContent = "🙈";

                togglePassword.style.color = "#c084fc";

            } else {

                // HIDE PASSWORD
                passwordInput.type = "password";

                togglePassword.textContent = "👁";

                togglePassword.style.color = "";

            }

        });

    }


    // ==================================================
    // LOGIN FORM
    // ==================================================

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            // Stop the browser's default form validation
            event.preventDefault();


            const email = emailInput.value.trim();

            const password = passwordInput.value.trim();


            // ==================================================
            // EMPTY EMAIL
            // ==================================================

            if (email === "") {

                alert("Please enter your email address.");

                emailInput.focus();

                return;

            }


            // ==================================================
            // EMAIL VALIDATION
            // ==================================================

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                alert("Please enter a valid email address.");

                emailInput.focus();

                return;

            }


            // ==================================================
            // EMPTY PASSWORD
            // ==================================================

            if (password === "") {

                alert("Please enter your password.");

                passwordInput.focus();

                return;

            }


            // ==================================================
            // PASSWORD LENGTH
            // ==================================================

            if (password.length < 6) {

                alert(
                    "Your password must contain at least 6 characters."
                );

                passwordInput.focus();

                return;

            }


            // ==================================================
            // SUCCESS
            // ==================================================

            console.log("Login attempt");
            console.log("Email:", email);

            alert(
                "Login successful! Dashboard will be connected soon."
            );


        });

    }


    // ==================================================
    // FORGOT PASSWORD
    // ==================================================

    const forgotPassword =
        document.querySelector(".password-label a");


    if (forgotPassword) {

        forgotPassword.addEventListener("click", function (event) {

            event.preventDefault();

            alert(
                "Password recovery will be connected soon."
            );

        });

    }


    // ==================================================
    // PAGE LOADED
    // ==================================================

    console.log(
        "✦ JobHub AI authentication system loaded successfully."
    );

});