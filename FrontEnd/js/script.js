// ======================================================
// JOBHUB AI - MAIN JAVASCRIPT
// Purple / Black / White AI Theme
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    // ==================================================
    // BACKGROUND AI PARTICLES
    // ==================================================

    const particleContainer = document.createElement("div");

    particleContainer.className = "particle-container";

    particleContainer.style.position = "fixed";
    particleContainer.style.top = "0";
    particleContainer.style.left = "0";
    particleContainer.style.width = "100%";
    particleContainer.style.height = "100%";
    particleContainer.style.pointerEvents = "none";
    particleContainer.style.overflow = "hidden";
    particleContainer.style.zIndex = "-1";

    document.body.appendChild(particleContainer);


    // Create particles
    const particleCount = 35;

    for (let i = 0; i < particleCount; i++) {

        const particle = document.createElement("div");

        particle.className = "ai-particle";

        const size = Math.random() * 4 + 2;

        particle.style.position = "absolute";
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.borderRadius = "50%";

        particle.style.background =
            Math.random() > 0.5
                ? "#8b5cf6"
                : "#c084fc";

        particle.style.boxShadow =
            "0 0 12px rgba(139, 92, 246, 0.8)";

        particle.style.opacity =
            Math.random() * 0.5 + 0.2;

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${Math.random() * 100}%`;

        particle.style.transition =
            "transform 3s ease-out";

        particleContainer.appendChild(particle);


        // Random floating animation
        animateParticle(particle);
    }


    // ==================================================
    // PARTICLE FLOATING FUNCTION
    // ==================================================

    function animateParticle(particle) {

        const moveX =
            (Math.random() - 0.5) * 180;

        const moveY =
            (Math.random() - 0.5) * 180;

        const duration =
            Math.random() * 5000 + 5000;

        particle.animate(
            [
                {
                    transform: "translate(0px, 0px)"
                },
                {
                    transform:
                        `translate(${moveX}px, ${moveY}px)`
                },
                {
                    transform: "translate(0px, 0px)"
                }
            ],
            {
                duration: duration,
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );
    }


    // ==================================================
    // MOUSE PARALLAX EFFECT
    // ==================================================

    const particles =
        document.querySelectorAll(".ai-particle");

    document.addEventListener("mousemove", function (event) {

        const mouseX =
            (event.clientX / window.innerWidth) - 0.5;

        const mouseY =
            (event.clientY / window.innerHeight) - 0.5;

        particles.forEach(function (particle, index) {

            const strength =
                (index % 5 + 1) * 4;

            const x =
                mouseX * strength;

            const y =
                mouseY * strength;

            particle.style.marginLeft =
                `${x}px`;

            particle.style.marginTop =
                `${y}px`;
        });

    });


    // ==================================================
    // SEARCH JOBS
    // ==================================================

    const searchButton =
        document.querySelector(".search-btn");

    const searchInputs =
        document.querySelectorAll(".search-field input");


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            function () {

                const jobTitle =
                    searchInputs[0]
                        ? searchInputs[0].value.trim()
                        : "";

                const location =
                    searchInputs[1]
                        ? searchInputs[1].value.trim()
                        : "";


                if (
                    jobTitle === "" &&
                    location === ""
                ) {
                    window.location.href = "pages/job.html";
                    return;
                }

                const params = new URLSearchParams();
                if (jobTitle) params.set("q", jobTitle);
                if (location) params.set("loc", location);
                window.location.href = `pages/job.html?${params.toString()}`;


                console.log(
                    "Job Search:",
                    jobTitle
                );

                console.log(
                    "Location:",
                    location
                );

            }
        );
    }


    // ==================================================
    // POPULAR SEARCHES
    // ==================================================

    const popularSearches =
        document.querySelectorAll(
            ".popular-searches a"
        );


    popularSearches.forEach(function (search) {

        search.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const searchText =
                    this.textContent.trim();


                if (searchInputs[0]) {

                    searchInputs[0].value =
                        searchText;

                    searchInputs[0].focus();
                }


                console.log(
                    "Popular search selected:",
                    searchText
                );

            }
        );

    });


    // ==================================================
    // LOGIN BUTTON
    // ==================================================

    const loginButton =
        document.querySelector(".login-btn");

    if (loginButton) {
        loginButton.addEventListener(
            "click",
            function () {
                window.location.href = "pages/login.html";
            }
        );
    }


    // ==================================================
    // GET STARTED / SIGN UP BUTTON
    // ==================================================

    const signupButton =
        document.querySelector(".signup-btn");

    if (signupButton) {
        signupButton.addEventListener(
            "click",
            function () {
                window.location.href = "pages/signup.html";
            }
        );
    }


    // ==================================================
    // HEART / BOOKMARK BUTTONS
    // ==================================================

    const hearts =
        document.querySelectorAll(
            ".heart, .bookmark"
        );

    hearts.forEach(function (heart) {
        heart.addEventListener(
            "click",
            function (e) {
                e.stopPropagation();
                if (
                    this.textContent.trim() === "♡"
                ) {
                    this.textContent = "♥";
                    this.style.color =
                        "#c084fc";
                    this.style.textShadow =
                        "0 0 12px rgba(192,132,252,0.7)";
                } else {
                    this.textContent = "♡";
                    this.style.color = "";
                    this.style.textShadow = "";
                }
            }
        );
    });


    // ==================================================
    // NAVIGATION
    // ==================================================

    const navLinks =
        document.querySelectorAll(
            ".navbar nav a"
        );

    navLinks.forEach(function (link) {
        link.addEventListener(
            "click",
            function (event) {
                const href = this.getAttribute("href");
                if (href === "#" || href === "index.html") {
                    event.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }
                // Allow normal navigation for real links
            }
        );
    });


    // ==================================================
    // VIEW ALL JOBS & JOB CARD CLICKS
    // ==================================================

    const viewJobsLink =
        document.querySelector(
            ".section-heading > a"
        );

    if (viewJobsLink) {
        viewJobsLink.addEventListener(
            "click",
            function (event) {
                window.location.href = "pages/job.html";
            }
        );
    }

    const jobCards = document.querySelectorAll(".job-card-item");
    jobCards.forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener("click", function(e) {
            if (!e.target.closest(".heart")) {
                window.location.href = "pages/job-detail.html";
            }
        });
    });


    // ==================================================
    // FEATURE CARDS
    // ==================================================

    const features =
        document.querySelectorAll(
            ".feature"
        );


    features.forEach(function (feature) {

        feature.addEventListener(
            "mouseenter",
            function () {

                this.style.boxShadow =
                    "0 0 25px rgba(139,92,246,0.10)";

            }
        );


        feature.addEventListener(
            "mouseleave",
            function () {

                this.style.boxShadow = "";

            }
        );

    });


    // ==================================================
    // CONSOLE MESSAGE
    // ==================================================

    console.log(
        "✦ JobHub AI loaded successfully."
    );

    console.log(
        "Purple AI interface activated."
    );

});