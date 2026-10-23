// ======================================================
// JOBHUB AI - AUTHENTICATION JAVASCRIPT
// Handles Login, Signup, Password Validation & Sessions
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    // ==================================================
    // 1. PASSWORD TOGGLE HELPER
    // ==================================================
    function setupPasswordToggle(toggleId, inputId) {
        const toggleBtn = document.getElementById(toggleId);
        const passInput = document.getElementById(inputId);

        if (toggleBtn && passInput) {
            toggleBtn.addEventListener("click", function (e) {
                e.preventDefault();
                if (passInput.type === "password") {
                    passInput.type = "text";
                    toggleBtn.textContent = "🙈";
                    toggleBtn.style.color = "#c084fc";
                } else {
                    passInput.type = "password";
                    toggleBtn.textContent = "👁";
                    toggleBtn.style.color = "";
                }
            });
        }
    }

    setupPasswordToggle("togglePassword", "loginPassword");
    setupPasswordToggle("toggleSignupPassword", "signupPassword");

    // ==================================================
    // 2. SIGNUP ROLE SELECTOR
    // ==================================================
    let selectedRole = "seeker";
    const roleOptions = document.querySelectorAll(".role-option");
    roleOptions.forEach(opt => {
        opt.addEventListener("click", function () {
            roleOptions.forEach(o => o.classList.remove("active"));
            this.classList.add("active");
            selectedRole = this.getAttribute("data-role");
        });
    });

    // ==================================================
    // 3. PASSWORD STRENGTH METER (SIGNUP)
    // ==================================================
    const signupPasswordInput = document.getElementById("signupPassword");
    const strengthFill = document.getElementById("strengthFill");
    const strengthText = document.getElementById("strengthText");

    if (signupPasswordInput && strengthFill && strengthText) {
        signupPasswordInput.addEventListener("input", function () {
            const val = signupPasswordInput.value;
            let score = 0;

            if (val.length >= 8) score++;
            if (/[A-Z]/.test(val)) score++;
            if (/[0-9]/.test(val)) score++;
            if (/[^A-Za-z0-9]/.test(val)) score++;

            if (val.length === 0) {
                strengthFill.style.width = "0%";
                strengthText.innerText = "Password strength: Enter password";
                strengthText.style.color = "var(--muted)";
            } else if (score <= 1) {
                strengthFill.style.width = "25%";
                strengthFill.style.backgroundColor = "#ef4444";
                strengthText.innerText = "Password strength: Weak";
                strengthText.style.color = "#ef4444";
            } else if (score === 2) {
                strengthFill.style.width = "50%";
                strengthFill.style.backgroundColor = "#f59e0b";
                strengthText.innerText = "Password strength: Fair";
                strengthText.style.color = "#f59e0b";
            } else if (score === 3) {
                strengthFill.style.width = "75%";
                strengthFill.style.backgroundColor = "#8b5cf6";
                strengthText.innerText = "Password strength: Good";
                strengthText.style.color = "#8b5cf6";
            } else {
                strengthFill.style.width = "100%";
                strengthFill.style.backgroundColor = "#10b981";
                strengthText.innerText = "Password strength: Strong & Secure ✨";
                strengthText.style.color = "#10b981";
            }
        });
    }

    // ==================================================
    // 4. LOGIN FORM SUBMISSION
    // ==================================================
    const loginForm = document.getElementById("loginForm");
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = loginEmail ? loginEmail.value.trim() : "";
            const password = loginPassword ? loginPassword.value.trim() : "";

            if (!email) {
                alert("Please enter your email address.");
                loginEmail.focus();
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                loginEmail.focus();
                return;
            }

            if (!password) {
                alert("Please enter your password.");
                loginPassword.focus();
                return;
            }

            // Derive name from email if not already stored
            const existingUser = JSON.parse(localStorage.getItem("jobhub_user") || "{}");
            const displayName = existingUser.name || email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());

            const userSession = {
                name: displayName,
                email: email,
                role: existingUser.role || "Job Seeker",
                isLoggedIn: true,
                loginTime: new Date().toISOString()
            };

            localStorage.setItem("jobhub_user", JSON.stringify(userSession));

            // Visual feedback
            const submitBtn = loginForm.querySelector(".auth-submit");
            if (submitBtn) {
                submitBtn.innerText = "✦ Authenticating with AI...";
                submitBtn.disabled = true;
            }

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 600);
        });
    }

    // ==================================================
    // 5. SIGNUP FORM SUBMISSION
    // ==================================================
    const signupForm = document.getElementById("signupForm");
    const signupName = document.getElementById("signupName");
    const signupEmail = document.getElementById("signupEmail");
    const agreeTerms = document.getElementById("agreeTerms");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = signupName ? signupName.value.trim() : "";
            const email = signupEmail ? signupEmail.value.trim() : "";
            const password = signupPasswordInput ? signupPasswordInput.value.trim() : "";

            if (!name) {
                alert("Please enter your full name.");
                signupName.focus();
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                signupEmail.focus();
                return;
            }

            if (password.length < 8) {
                alert("Your password must be at least 8 characters long.");
                signupPasswordInput.focus();
                return;
            }

            if (agreeTerms && !agreeTerms.checked) {
                alert("Please agree to the Terms of Service and Privacy Policy.");
                return;
            }

            const userSession = {
                name: name,
                email: email,
                role: selectedRole === "recruiter" ? "Employer / Recruiter" : "Job Seeker",
                isLoggedIn: true,
                profileMatch: "85%",
                skills: ["JavaScript", "HTML5", "CSS3", "React", "Node.js", "Java"],
                signupTime: new Date().toISOString()
            };

            localStorage.setItem("jobhub_user", JSON.stringify(userSession));

            const submitBtn = signupForm.querySelector(".auth-submit");
            if (submitBtn) {
                submitBtn.innerText = "✦ Setting up your AI profile...";
                submitBtn.disabled = true;
            }

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 700);
        });
    }

    // ==================================================
    // 6. FORGOT PASSWORD
    // ==================================================
    const forgotPassword = document.querySelector(".password-label a");
    if (forgotPassword) {
        forgotPassword.addEventListener("click", function (e) {
            e.preventDefault();
            const email = prompt("Enter your registered email address to receive password reset link:");
            if (email) {
                alert(`Password reset instructions have been sent to ${email}`);
            }
        });
    }
});