// ==========================================
// JobHub AI - Landing Page JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // SEARCH JOBS
    // ==========================================

    const searchButton = document.querySelector(".search-btn");
    const searchInputs = document.querySelectorAll(".search-field input");

    if (searchButton) {
        searchButton.addEventListener("click", function () {

            const jobTitle = searchInputs[0].value.trim();
            const location = searchInputs[1].value.trim();

            if (jobTitle === "" && location === "") {
                alert("Please enter a job title, skill, keyword, or location.");
                return;
            }

            if (jobTitle !== "" && location !== "") {
                alert(
                    `Searching for "${jobTitle}" jobs in "${location}"...`
                );
            } else if (jobTitle !== "") {
                alert(
                    `Searching for "${jobTitle}" jobs...`
                );
            } else {
                alert(
                    `Searching for jobs in "${location}"...`
                );
            }

            // Actual job search will be connected to the backend later.
            console.log("Job:", jobTitle);
            console.log("Location:", location);
        });
    }


    // ==========================================
    // POPULAR SEARCHES
    // ==========================================

    const popularSearches = document.querySelectorAll(".popular-searches a");

    popularSearches.forEach(function (search) {

        search.addEventListener("click", function (event) {

            event.preventDefault();

            const searchText = this.textContent.trim();

            searchInputs[0].value = searchText;

            // Move cursor to the search field
            searchInputs[0].focus();

            console.log("Popular search selected:", searchText);
        });

    });


    // ==========================================
    // LOGIN BUTTON
    // ==========================================

    const loginButton = document.querySelector(".login-btn");

    if (loginButton) {
        loginButton.addEventListener("click", function () {

            alert("Login page will be available soon.");

            // Later we will use:
            // window.location.href = "pages/login.html";

        });
    }


    // ==========================================
    // GET STARTED BUTTON
    // ==========================================

    const signupButton = document.querySelector(".signup-btn");

    if (signupButton) {
        signupButton.addEventListener("click", function () {

            alert("Sign Up page will be available soon.");

            // Later we will use:
            // window.location.href = "pages/signup.html";

        });
    }


    // ==========================================
    // BOOKMARK / HEART BUTTONS
    // ==========================================

    const hearts = document.querySelectorAll(".heart, .bookmark");

    hearts.forEach(function (heart) {

        heart.addEventListener("click", function () {

            if (this.textContent.trim() === "♡") {
                this.textContent = "♥";
                this.classList.add("saved");

                alert("Job saved to your favorites!");
            } else {
                this.textContent = "♡";
                this.classList.remove("saved");

                alert("Job removed from your favorites.");
            }

        });

    });


    // ==========================================
    // NAVIGATION LINKS
    // ==========================================

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            const page = this.textContent.trim();

            if (page === "Home") {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            } else {
                alert(`${page} page will be added soon.`);
            }

        });

    });


    // ==========================================
    // VIEW ALL JOBS
    // ==========================================

    const viewJobsLink = document.querySelector(".section-heading a");

    if (viewJobsLink) {

        viewJobsLink.addEventListener("click", function (event) {

            event.preventDefault();

            alert("All jobs page will be available soon.");

        });

    }


    // ==========================================
    // FEATURE CARDS
    // ==========================================

    const features = document.querySelectorAll(".feature");

    features.forEach(function (feature) {

        feature.addEventListener("click", function () {

            const featureName =
                this.querySelector("h3").textContent.trim();

            console.log("Feature selected:", featureName);

        });

    });


    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================

    console.log("JobHub AI landing page loaded successfully.");

});