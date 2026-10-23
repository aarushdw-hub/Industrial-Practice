// ======================================================
// JOBHUB AI - MAIN JAVASCRIPT
// Purple / Black / White AI Theme & Real-time Neural Finder
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    // ==================================================
    // 1. BACKGROUND AI PARTICLES
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

    const particleCount = 35;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "ai-particle";
        const size = Math.random() * 4 + 2;

        particle.style.position = "absolute";
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = "50%";
        particle.style.background = Math.random() > 0.5 ? "#8b5cf6" : "#c084fc";
        particle.style.boxShadow = "0 0 12px rgba(139, 92, 246, 0.8)";
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.transition = "transform 3s ease-out";
        particleContainer.appendChild(particle);

        animateParticle(particle);
    }

    function animateParticle(particle) {
        const moveX = (Math.random() - 0.5) * 180;
        const moveY = (Math.random() - 0.5) * 180;
        const duration = Math.random() * 5000 + 5000;

        particle.animate(
            [
                { transform: "translate(0px, 0px)" },
                { transform: `translate(${moveX}px, ${moveY}px)` },
                { transform: "translate(0px, 0px)" }
            ],
            {
                duration: duration,
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );
    }

    // Mouse Parallax
    const particles = document.querySelectorAll(".ai-particle");
    document.addEventListener("mousemove", function (event) {
        const mouseX = (event.clientX / window.innerWidth) - 0.5;
        const mouseY = (event.clientY / window.innerHeight) - 0.5;

        particles.forEach(function (particle, index) {
            const strength = (index % 5 + 1) * 4;
            const x = mouseX * strength;
            const y = mouseY * strength;
            particle.style.marginLeft = `${x}px`;
            particle.style.marginTop = `${y}px`;
        });
    });

    // ==================================================
    // 2. HERO AI SKILL FINDER & REQUISITION MATCHER
    // ==================================================
    initHeroSkillFinder();

    // ==================================================
    // 3. OMNIPRESENT FLOATING AI CHATBOT WIDGET
    // ==================================================
    initFloatingChatbot();

    // ==================================================
    // 4. NAVIGATION & CTA BUTTONS
    // ==================================================
    const loginButton = document.querySelector(".login-btn");
    if (loginButton) {
        loginButton.addEventListener("click", () => window.location.href = "pages/login.html");
    }

    const signupButton = document.querySelector(".signup-btn");
    if (signupButton) {
        signupButton.addEventListener("click", () => window.location.href = "pages/signup.html");
    }

    const hearts = document.querySelectorAll(".heart, .bookmark");
    hearts.forEach(function (heart) {
        heart.addEventListener("click", function (e) {
            e.stopPropagation();
            if (this.textContent.trim() === "♡") {
                this.textContent = "♥";
                this.style.color = "#c084fc";
                this.style.textShadow = "0 0 12px rgba(192,132,252,0.7)";
            } else {
                this.textContent = "♡";
                this.style.color = "";
                this.style.textShadow = "";
            }
        });
    });

    const navLinks = document.querySelectorAll(".navbar nav a");
    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const href = this.getAttribute("href");
            if (href === "#" || href === "index.html") {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    });

    const viewJobsLink = document.querySelector(".section-heading > a");
    if (viewJobsLink) {
        viewJobsLink.addEventListener("click", () => window.location.href = "pages/job.html");
    }

    const jobCards = document.querySelectorAll(".job-card-item");
    jobCards.forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener("click", function (e) {
            if (!e.target.closest(".heart")) {
                window.location.href = "pages/job-detail.html";
            }
        });
    });

    console.log("✦ JobHub AI platform loaded successfully.");
});

// ======================================================
// MODULE: HERO AI SKILL FINDER
// ======================================================
function initHeroSkillFinder() {
    const skillsMenu = document.getElementById("homeSkillsMenu");
    const selectedTray = document.getElementById("selectedSkillsTray");
    const countBadge = document.getElementById("selectedSkillsCount");
    const customInput = document.getElementById("customSkillInput");
    const clearBtn = document.getElementById("clearSelectedSkillsBtn");
    const matchBtn = document.getElementById("btnHomeAiMatch");
    const scannerOverlay = document.getElementById("homeNeuralScanner");
    const ticker = document.getElementById("homeScannerTicker");
    const resultsContainer = document.getElementById("homeMatchedResultsContainer");
    const jobsList = document.getElementById("homeMatchedJobsList");
    const countHeader = document.getElementById("homeMatchedCountHeader");
    const categoryTabs = document.querySelectorAll(".category-tab-btn");

    if (!skillsMenu || !selectedTray) return;

    // SKILLS DICTIONARY
    const SKILLS_CATALOG = {
        backend: ["Java", "Spring Boot", "Python", "Node.js", "SQL", "Microservices", "C++", "Go", "Redis", "PostgreSQL", "Kafka"],
        frontend: ["React", "JavaScript", "TypeScript", "HTML5/CSS3", "Next.js", "Figma", "Vue.js", "Tailwind CSS"],
        cloud: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux", "Terraform", "Azure", "GCP", "Prometheus"],
        ai: ["PyTorch", "LLMs", "TensorFlow", "Machine Learning", "Data Analytics", "LangChain", "NLP", "Vector DBs"]
    };

    // Candidate's active skills (pre-load popular starter stack)
    let selectedSkills = ["Java", "Spring Boot", "React", "Docker"];
    let currentCategory = "all";

    function getVisibleSkills() {
        if (currentCategory === "all") {
            const all = [];
            Object.values(SKILLS_CATALOG).forEach(arr => {
                arr.forEach(s => {
                    if (!all.includes(s)) all.push(s);
                });
            });
            return all;
        }
        return SKILLS_CATALOG[currentCategory] || [];
    }

    // Render Skills Menu Chips
    function renderSkillsMenu() {
        const visible = getVisibleSkills();
        skillsMenu.innerHTML = visible.map(skill => {
            const isSelected = selectedSkills.includes(skill);
            return `
                <div class="menu-skill-chip ${isSelected ? 'selected' : ''}" data-skill="${skill}">
                    <span>${isSelected ? '✓' : '+'}</span>
                    ${skill}
                </div>
            `;
        }).join('');

        skillsMenu.querySelectorAll(".menu-skill-chip").forEach(chip => {
            chip.addEventListener("click", function () {
                const skill = this.getAttribute("data-skill");
                toggleSkill(skill);
            });
        });
    }

    // Render Selected Skills Tray
    function renderSelectedTray() {
        // Keep the custom input box at the end
        const existingInput = selectedTray.querySelector(".custom-skill-input-box");
        selectedTray.innerHTML = "";

        selectedSkills.forEach(skill => {
            const pill = document.createElement("div");
            pill.className = "selected-skill-pill";
            pill.innerHTML = `
                <span>✦ ${skill}</span>
                <span class="remove-skill" data-skill="${skill}">✕</span>
            `;
            selectedTray.appendChild(pill);
        });

        if (existingInput) {
            selectedTray.appendChild(existingInput);
        }

        if (countBadge) countBadge.innerText = selectedSkills.length;

        // Attach remove events
        selectedTray.querySelectorAll(".remove-skill").forEach(btn => {
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                const skill = this.getAttribute("data-skill");
                removeSkill(skill);
            });
        });

        // Re-render menu to update checkmarks
        renderSkillsMenu();
    }

    function toggleSkill(skill) {
        if (selectedSkills.includes(skill)) {
            removeSkill(skill);
        } else {
            selectedSkills.push(skill);
            renderSelectedTray();
        }
    }

    function removeSkill(skill) {
        selectedSkills = selectedSkills.filter(s => s !== skill);
        renderSelectedTray();
    }

    function addCustomSkill(skill) {
        const clean = skill.trim();
        if (clean && !selectedSkills.includes(clean)) {
            selectedSkills.push(clean);
            renderSelectedTray();
        }
    }

    // Category Tabs Switching
    categoryTabs.forEach(tab => {
        tab.addEventListener("click", function () {
            categoryTabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");
            currentCategory = this.getAttribute("data-cat") || "all";
            renderSkillsMenu();
        });
    });

    // Custom Skill Input (Enter Key)
    if (customInput) {
        customInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                addCustomSkill(customInput.value);
                customInput.value = "";
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", function () {
            selectedSkills = [];
            renderSelectedTray();
        });
    }

    // Initial render
    renderSelectedTray();

    // ==================================================
    // AI NEURAL MATCHING EXECUTION
    // ==================================================
    if (matchBtn) {
        matchBtn.addEventListener("click", function () {
            if (selectedSkills.length === 0) {
                alert("Please select at least 1 skill from the menu to run AI Job Matching!");
                return;
            }

            matchBtn.disabled = true;
            matchBtn.innerHTML = `<span>⏳</span> AI Scanning Requisitions...`;

            if (scannerOverlay) scannerOverlay.style.display = "block";
            if (resultsContainer) resultsContainer.style.display = "none";
            scannerOverlay.scrollIntoView({ behavior: "smooth", block: "center" });

            const scanSteps = [
                `1/3 Vectorizing your ${selectedSkills.length} skills [${selectedSkills.slice(0, 3).join(", ")}${selectedSkills.length > 3 ? "..." : ""}]...`,
                `2/3 Comparing against 50,000+ active enterprise requisition vectors...`,
                `3/3 Calculating semantic similarity, salary benchmarks & culture fits...`
            ];

            let step = 0;
            const timer = setInterval(() => {
                if (ticker && scanSteps[step]) {
                    ticker.innerText = scanSteps[step];
                }
                step++;
                if (step >= scanSteps.length) {
                    clearInterval(timer);
                    displayMatchedResults();
                }
            }, 650);
        });
    }

    // JOB CATALOG DATA FOR REAL-TIME MATCHING
    const HOME_JOBS = [
        {
            id: "job-1",
            title: "Senior Full Stack Engineer",
            company: "Microsoft",
            logo: "M",
            logoClass: "microsoft",
            location: "Bangalore, India",
            workplace: "Hybrid",
            salary: "₹24–32 LPA",
            skills: ["Java", "Spring Boot", "React", "TypeScript", "Docker", "Microservices", "Azure", "Kubernetes"],
            experience: "senior"
        },
        {
            id: "job-5",
            title: "Backend Java Developer",
            company: "Razorpay",
            logo: "R",
            logoClass: "meta",
            location: "Bangalore, India",
            workplace: "Hybrid",
            salary: "₹16–25 LPA",
            skills: ["Java", "Spring Boot", "Kafka", "MySQL", "Redis", "REST APIs"],
            experience: "mid"
        },
        {
            id: "job-2",
            title: "AI / Machine Learning Engineer",
            company: "Google",
            logo: "G",
            logoClass: "google",
            location: "Hyderabad, India",
            workplace: "Hybrid",
            salary: "₹28–38 LPA",
            skills: ["Python", "PyTorch", "TensorFlow", "LLMs", "Java", "Docker", "GCP"],
            experience: "mid"
        },
        {
            id: "job-3",
            title: "Data Analyst & Insights Lead",
            company: "Amazon",
            logo: "a",
            logoClass: "amazon",
            location: "Hyderabad, India",
            workplace: "On-site",
            salary: "₹14–22 LPA",
            skills: ["SQL", "Python", "Power BI", "Tableau", "AWS Redshift", "Statistics"],
            experience: "fresher"
        },
        {
            id: "job-4",
            title: "Lead UI/UX Designer",
            company: "Adobe",
            logo: "A",
            logoClass: "adobe",
            location: "Noida, India",
            workplace: "Remote",
            salary: "₹18–26 LPA",
            skills: ["Figma", "Design Systems", "Prototyping", "User Research", "HTML5/CSS3"],
            experience: "mid"
        },
        {
            id: "job-6",
            title: "Cloud DevOps & Platform Engineer",
            company: "Flipkart",
            logo: "F",
            logoClass: "microsoft",
            location: "Bangalore, India",
            workplace: "Hybrid",
            salary: "₹20–28 LPA",
            skills: ["Kubernetes", "Docker", "Terraform", "AWS", "CI/CD", "Linux", "Python"],
            experience: "senior"
        }
    ];

    function calculateJobScore(jobSkills) {
        const candidateSet = new Set(selectedSkills.map(s => s.toLowerCase()));
        let matched = 0;
        jobSkills.forEach(js => {
            if (candidateSet.has(js.toLowerCase())) matched++;
        });

        const ratio = matched / Math.max(1, jobSkills.length);
        const score = Math.round(62 + (ratio * 36));
        return Math.min(98, Math.max(55, score));
    }

    function displayMatchedResults() {
        if (scannerOverlay) scannerOverlay.style.display = "none";
        matchBtn.disabled = false;
        matchBtn.innerHTML = `<span>✦</span> AI Match My Opportunities →`;

        const workplacePref = document.getElementById("homeWorkplacePref")?.value || "all";
        const expPref = document.getElementById("homeExperiencePref")?.value || "all";

        // Score and filter jobs
        let scored = HOME_JOBS.map(job => {
            return {
                ...job,
                matchScore: calculateJobScore(job.skills)
            };
        });

        // Filter if specific mode selected
        if (workplacePref !== "all") {
            scored = scored.filter(j => j.workplace.toLowerCase() === workplacePref);
        }
        if (expPref !== "all") {
            scored = scored.filter(j => j.experience === expPref);
        }

        // Sort by highest match score
        scored.sort((a, b) => b.matchScore - a.matchScore);

        if (countHeader) {
            countHeader.innerText = `Found ${scored.length} Positions Aligned with Your Skills`;
        }

        const candidateSet = new Set(selectedSkills.map(s => s.toLowerCase()));
        const savedJobs = JSON.parse(localStorage.getItem("jobhub_saved_jobs") || "[]");

        if (jobsList) {
            if (scored.length === 0) {
                jobsList.innerHTML = `
                    <div style="text-align:center; padding:36px; background:var(--dark-card); border-radius:14px;">
                        <h4 style="color:#fff; margin-bottom:6px;">No exact jobs matched your workplace/experience filter</h4>
                        <p style="color:var(--text-muted); font-size:0.85rem;">Try setting Mode to 'All Modes' or Experience to 'All Levels'.</p>
                    </div>
                `;
            } else {
                jobsList.innerHTML = scored.map(job => {
                    const isSaved = savedJobs.includes(job.title);
                    return `
                        <div class="home-job-matched-card" onclick="window.location.href='pages/job-detail.html?id=${job.id}'">
                            <div class="home-card-top">
                                <div class="home-company-info">
                                    <div class="company-logo ${job.logoClass}">${job.logo}</div>
                                    <div>
                                        <h4 style="font-size:1.05rem; font-weight:700; color:#fff; margin-bottom:2px;">${job.title}</h4>
                                        <p style="font-size:0.82rem; color:var(--text-muted);">${job.company} · ${job.location} · <strong>${job.workplace}</strong></p>
                                    </div>
                                </div>
                                <div style="display:flex; align-items:center; gap:10px;">
                                    <div class="home-match-badge">
                                        <span>✦</span> ${job.matchScore}% Match
                                    </div>
                                    <button class="save-job-btn" style="background:none; border:none; font-size:1.2rem; color:${isSaved ? 'var(--primary-light)' : 'var(--text-muted)'}; cursor:pointer;" data-title="${job.title}">
                                        ${isSaved ? '♥' : '♡'}
                                    </button>
                                </div>
                            </div>

                            <div style="display:flex; flex-wrap:wrap; gap:6px;">
                                ${job.skills.map(s => {
                                    const isMatch = candidateSet.has(s.toLowerCase());
                                    return `
                                        <span class="skill-tag ${isMatch ? 'matched' : ''}" style="font-size:0.75rem; padding:4px 10px; ${isMatch ? 'color:#10b981; border-color:rgba(16,185,129,0.4); background:rgba(16,185,129,0.1);' : ''}">
                                            ${isMatch ? '✓ ' : ''}${s}
                                        </span>
                                    `;
                                }).join('')}
                            </div>

                            <div class="home-card-bottom">
                                <div style="font-size:0.88rem; color:#fff; font-weight:700;">
                                    ${job.salary} <span style="font-size:0.75rem; color:var(--text-muted); font-weight:400;">(Verified Requisition)</span>
                                </div>
                                <div style="display:flex; gap:8px;">
                                    <a href="pages/job-detail.html?id=${job.id}" class="filter-tag" style="padding:6px 14px; font-size:0.8rem;">Details</a>
                                    <button class="apply-btn" style="padding:6px 16px; font-size:0.8rem;" onclick="handleQuickApply(event, '${job.id}', '${job.title}', '${job.company}')">
                                        ✦ Easy Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');

                // Bookmark click handler
                jobsList.querySelectorAll(".save-job-btn").forEach(btn => {
                    btn.addEventListener("click", function (e) {
                        e.stopPropagation();
                        const title = this.getAttribute("data-title");
                        let current = JSON.parse(localStorage.getItem("jobhub_saved_jobs") || "[]");
                        if (current.includes(title)) {
                            current = current.filter(t => t !== title);
                            this.innerText = "♡";
                            this.style.color = "var(--text-muted)";
                        } else {
                            current.push(title);
                            this.innerText = "♥";
                            this.style.color = "var(--primary-light)";
                        }
                        localStorage.setItem("jobhub_saved_jobs", JSON.stringify(current));
                    });
                });
            }
        }

        if (resultsContainer) {
            resultsContainer.style.display = "flex";
            resultsContainer.scrollIntoView({ behavior: "smooth" });
        }
    }
}

// Quick Apply Handler from Homepage
window.handleQuickApply = function (event, jobId, title, company) {
    event.stopPropagation();
    const storedUser = JSON.parse(localStorage.getItem("jobhub_user") || "{}");
    const candidateName = storedUser.name || prompt("Enter your Name to submit application:") || "Candidate";
    const candidateEmail = storedUser.email || "applicant@example.com";

    const newApp = {
        id: "app-" + Date.now(),
        jobId: jobId,
        title: title,
        company: company,
        appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: "applied",
        statusText: "Application Submitted"
    };

    const apps = JSON.parse(localStorage.getItem("jobhub_applications") || "[]");
    apps.unshift(newApp);
    localStorage.setItem("jobhub_applications", JSON.stringify(apps));

    alert(`🎉 Application transmitted!\n\nRole: ${title}\nCompany: ${company}\nCandidate: ${candidateName}\n\nTrack your review in the Applications pipeline!`);
};

// ======================================================
// MODULE: OMNIPRESENT FLOATING AI CHATBOT WIDGET
// ======================================================
function initFloatingChatbot() {
    const launcher = document.getElementById("floatingChatLauncher");
    const windowEl = document.getElementById("floatingChatWindow");
    const closeBtn = document.getElementById("floatingChatCloseBtn");
    const sendBtn = document.getElementById("floatingChatSendBtn");
    const input = document.getElementById("floatingChatInput");
    const bodyArea = document.getElementById("floatingChatBody");
    const chips = document.querySelectorAll(".floating-chip");

    if (!launcher || !windowEl) return;

    launcher.addEventListener("click", () => {
        const isOpen = windowEl.classList.contains("open");
        if (isOpen) {
            windowEl.classList.remove("open");
        } else {
            windowEl.classList.add("open");
            const badge = launcher.querySelector(".launcher-badge");
            if (badge) badge.style.display = "none";
            if (input) input.focus();
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", () => windowEl.classList.remove("open"));
    }

    function getAiChatResponse(query) {
        const q = query.toLowerCase();

        if (q.includes("java") || q.includes("spring") || q.includes("backend")) {
            return "For senior Java & Backend opportunities: Enterprise hiring bars emphasize Java 21+ Virtual Threads, Spring Boot microservices, high-throughput distributed caching (Redis), asynchronous streaming via Kafka, and sub-100ms p99 latency optimization. Be prepared for live system design and concurrency troubleshooting rounds.";
        }
        if (q.includes("python") || q.includes("django") || q.includes("fastapi") || q.includes("data") || q.includes("ml") || q.includes("ai")) {
            return "For Python & AI/ML opportunities: Top teams test expertise in FastAPI asynchronous endpoints, PostgreSQL query planning, Celery task workers, PyTorch/TensorFlow model inference optimization, and vectorized embeddings with Pinecone or pgvector.";
        }
        if (q.includes("react") || q.includes("frontend") || q.includes("ui") || q.includes("next") || q.includes("javascript") || q.includes("typescript")) {
            return "For Frontend & Full-Stack roles: High-paying roles focus on Next.js App Router, React Server Components (RSC), TypeScript strict type architectures, State Management (Zustand/Redux Toolkit), and Core Web Vitals optimization (LCP under 2.5s).";
        }
        if (q.includes("docker") || q.includes("kubernetes") || q.includes("cloud") || q.includes("aws") || q.includes("devops") || q.includes("ci/cd")) {
            return "For Cloud & DevOps roles: Key interview benchmarks include multi-stage Docker builds, Kubernetes Pod autoscaling (HPA), Terraform Infrastructure as Code (IaC), AWS multi-AZ architectures, and zero-downtime blue/green deployment pipelines.";
        }
        if (q.includes("salary") || q.includes("lpa") || q.includes("negotiat") || q.includes("offer") || q.includes("compensation")) {
            return "Salary Negotiation Strategy for Tech: 1) Anchor your expectation around the 75th percentile of industry benchmarks (₹28–36 LPA for senior engineers). 2) Lead with past business impact metrics (e.g. latency slashed by 35%, 1M+ active users supported). 3) If fixed base salary bands are strict, negotiate sign-on bonuses, performance milestones, or accelerated ESOP vesting schedules.";
        }
        if (q.includes("ats") || q.includes("resume") || q.includes("cv") || q.includes("scanner")) {
            return "To achieve a 90+ ATS Score: 1) Keep a clean single-column format without nested tables or images. 2) Structure every bullet with Google's X-Y-Z formula: 'Accomplished [X] as measured by [Y], by doing [Z]'. 3) Ensure skills like Spring Boot, Docker, and Microservices appear in both your Skills list and Experience bullet points.";
        }
        if (q.includes("interview") || q.includes("system design") || q.includes("prep") || q.includes("question")) {
            return "Technical Interview Preparation: 1) System Design: Practice designing URL shorteners, distributed rate limiters, notification services, and newsfeeds. 2) Data Structures: Master HashMaps, Trees, Graphs, and Sliding Window techniques. 3) Behavioral: Prepare 3 STAR stories highlighting conflict resolution, production incident response, and cross-team leadership.";
        }
        if (q.includes("skill") || q.includes("match") || q.includes("job") || q.includes("apply")) {
            return "You can select your skills directly from our interactive Skill Menu on the homepage, and our neural matcher will calculate real-time compatibility scores for open requisitions across Google, Microsoft, Amazon, and top startups!";
        }

        return `Great question regarding "${query}". For tech professionals targeting Tier-1 opportunities, our AI recommends: 1) Tailoring your resume bullets with quantified scale metrics (e.g. throughput, latency, revenue). 2) Verifying ATS keyword density on our Resume Analyzer page. 3) Practicing system design architecture for high-concurrency systems. Would you like specific tips on interview prep, salary benchmarks, or job matching?`;
    }

    function appendUserMessage(text) {
        if (!bodyArea) return;
        const msg = document.createElement("div");
        msg.className = "floating-msg user";
        msg.innerText = text;
        bodyArea.appendChild(msg);
        bodyArea.scrollTop = bodyArea.scrollHeight;
    }

    function appendAiMessage(fullText) {
        if (!bodyArea) return;
        const msg = document.createElement("div");
        msg.className = "floating-msg ai";
        bodyArea.appendChild(msg);

        // Typewriter streaming effect
        let idx = 0;
        const timer = setInterval(() => {
            msg.innerText = fullText.slice(0, idx);
            idx += 4;
            bodyArea.scrollTop = bodyArea.scrollHeight;
            if (idx > fullText.length) {
                msg.innerText = fullText;
                clearInterval(timer);
            }
        }, 12);
    }

    function handleSend() {
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;

        appendUserMessage(text);
        input.value = "";

        const reply = getAiChatResponse(text);
        setTimeout(() => {
            appendAiMessage(reply);
        }, 350);
    }

    if (sendBtn) sendBtn.addEventListener("click", handleSend);
    if (input) {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
            }
        });
    }

    chips.forEach(chip => {
        chip.addEventListener("click", function () {
            if (input) {
                input.value = this.innerText;
                handleSend();
            }
        });
    });
}