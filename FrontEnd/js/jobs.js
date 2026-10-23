// ======================================================
// JOBHUB AI - JOBS & APPLICATIONS MASTER JAVASCRIPT
// Handles Job Catalog, Filters, Search, Applications & Storage
// ======================================================

const JOB_CATALOG = [
    {
        id: "job-1",
        title: "Senior Full Stack Engineer",
        company: "Microsoft",
        logo: "M",
        logoClass: "microsoft",
        location: "Bangalore, India",
        type: "Full-time",
        workplace: "Hybrid",
        salary: "₹24–32 LPA",
        salaryMin: 24,
        experience: "4-7 years",
        category: "engineering",
        matchScore: 96,
        description: "Join Microsoft Azure Core team to architect ultra-scalable cloud services. You will build resilient microservices, distributed data pipelines, and developer-facing APIs powering millions of enterprise workloads.",
        skills: ["Java", "Spring Boot", "TypeScript", "React", "Azure", "Microservices", "Docker", "Kubernetes"],
        requirements: [
            "4+ years of solid experience in Java, Spring Boot, and modern cloud architectures.",
            "Strong command of frontend frameworks (React/TypeScript).",
            "Deep understanding of distributed systems, concurrency, and high-throughput databases.",
            "Experience with containerization (Docker, Kubernetes) and CI/CD pipelines."
        ],
        benefits: ["Competitive ESOPs", "Health Insurance for Family", "Flexible Working Hours", "Annual Learning Budget"],
        posted: "2 days ago"
    },
    {
        id: "job-2",
        title: "AI / Machine Learning Engineer",
        company: "Google",
        logo: "G",
        logoClass: "google",
        location: "Hyderabad, India",
        type: "Full-time",
        workplace: "Hybrid",
        salary: "₹28–38 LPA",
        salaryMin: 28,
        experience: "3-6 years",
        category: "ai",
        matchScore: 94,
        description: "Develop cutting-edge generative AI models and intelligent recommendation pipelines. Integrate large language models into enterprise search and consumer AI applications.",
        skills: ["Python", "PyTorch", "TensorFlow", "LLMs", "Java", "Docker", "GCP", "Transformers"],
        requirements: [
            "Bachelors/Masters in Computer Science, AI, or equivalent quantitative field.",
            "3+ years building and deploying deep learning / NLP models at scale.",
            "Strong fluency with PyTorch, Vector databases, and LLM fine-tuning techniques.",
            "Experience optimizing inference latency and GPU utilization."
        ],
        benefits: ["Top-tier compensation & stocks", "World-class cafeteria", "Wellness stipends", "Global mobility options"],
        posted: "1 day ago"
    },
    {
        id: "job-3",
        title: "Data Analyst & Insights Lead",
        company: "Amazon",
        logo: "a",
        logoClass: "amazon",
        location: "Hyderabad, India",
        type: "Full-time",
        workplace: "On-site",
        salary: "₹14–22 LPA",
        salaryMin: 14,
        experience: "2-5 years",
        category: "data",
        matchScore: 89,
        description: "Dive deep into customer behavior patterns, fulfillment metrics, and marketplace revenue data to provide actionable intelligence for executive leadership.",
        skills: ["SQL", "Python", "Power BI", "Tableau", "AWS Redshift", "Statistics", "Excel"],
        requirements: [
            "2+ years extracting insights from large-scale structured & unstructured datasets.",
            "Advanced SQL proficiency and data modeling capabilities.",
            "Hands-on experience creating high-impact executive dashboards in Tableau or PowerBI."
        ],
        benefits: ["Health coverage", "Relocation assistance", "Employee discounts", "Paternal leaves"],
        posted: "3 days ago"
    },
    {
        id: "job-4",
        title: "Lead UI/UX Designer",
        company: "Adobe",
        logo: "A",
        logoClass: "adobe",
        location: "Noida / Bangalore, India",
        type: "Full-time",
        workplace: "Remote",
        salary: "₹18–26 LPA",
        salaryMin: 18,
        experience: "3-5 years",
        category: "design",
        matchScore: 87,
        description: "Reimagine the creative suite collaboration interfaces. Design sleek design systems, interactive prototypes, and intuitive AI-assisted workflows for creators worldwide.",
        skills: ["Figma", "Design Systems", "Prototyping", "User Research", "Wireframing", "HTML/CSS"],
        requirements: [
            "Portfolio showcasing end-to-end design of complex digital web/mobile products.",
            "Expertise in Figma components, tokens, and multi-platform design systems.",
            "Demonstrated capability in conducting usability studies and qualitative interviews."
        ],
        benefits: ["Wellness allowance", "Home office setup grant", "Creative sabbatical", "Stock purchase plan"],
        posted: "4 days ago"
    },
    {
        id: "job-5",
        title: "Backend Java Developer",
        company: "Razorpay",
        logo: "R",
        logoClass: "meta",
        location: "Bangalore, India",
        type: "Full-time",
        workplace: "Hybrid",
        salary: "₹16–25 LPA",
        salaryMin: 16,
        experience: "2-4 years",
        category: "engineering",
        matchScore: 92,
        description: "Scale high-velocity payments infrastructure handling billions of transactions. Write rock-solid Java services with sub-second latency and five-nines availability.",
        skills: ["Java", "Spring Boot", "Kafka", "MySQL", "Redis", "AWS", "REST APIs"],
        requirements: [
            "2+ years building low-latency backend systems in Java & Spring Boot.",
            "Good knowledge of database indexing, query optimization, and caching (Redis).",
            "Familiarity with event-driven architectures using Apache Kafka or RabbitMQ."
        ],
        benefits: ["Comprehensive medical insurance", "Flexible leave policy", "Learning reimbursement"],
        posted: "Just now"
    },
    {
        id: "job-6",
        title: "Cloud DevOps & Platform Engineer",
        company: "Flipkart",
        logo: "F",
        logoClass: "microsoft",
        location: "Bangalore, India",
        type: "Full-time",
        workplace: "Hybrid",
        salary: "₹20–28 LPA",
        salaryMin: 20,
        experience: "3-6 years",
        category: "engineering",
        matchScore: 85,
        description: "Empower hundreds of software engineers with resilient Kubernetes infrastructure, automated Terraform provisioning, and continuous delivery pipelines.",
        skills: ["Kubernetes", "Docker", "Terraform", "AWS", "CI/CD", "Linux", "Python", "Prometheus"],
        requirements: [
            "Strong track record managing multi-cluster Kubernetes in production.",
            "Proficiency with Infrastructure as Code (Terraform) and GitOps.",
            "Solid scripting skills in Bash or Python for automation."
        ],
        benefits: ["Performance bonus", "Gym subsidy", "Annual retreats", "Generous parental benefits"],
        posted: "5 days ago"
    }
];

// COMPANIES CATALOG
const COMPANIES_CATALOG = [
    {
        name: "Google",
        logo: "G",
        logoClass: "google",
        industry: "Internet & Technology",
        rating: "4.8 ★",
        location: "Hyderabad, Bangalore, Gurgaon",
        jobsCount: 142,
        description: "Google's mission is to organize the world's information and make it universally accessible and useful.",
        tags: ["Search", "Cloud", "GenAI", "Mobile"]
    },
    {
        name: "Microsoft",
        logo: "M",
        logoClass: "microsoft",
        industry: "Cloud & Software",
        rating: "4.7 ★",
        location: "Bangalore, Hyderabad, Noida",
        jobsCount: 185,
        description: "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge.",
        tags: ["Azure", "AI Copilot", "Enterprise", "Gaming"]
    },
    {
        name: "Amazon",
        logo: "a",
        logoClass: "amazon",
        industry: "E-Commerce & Cloud Computing",
        rating: "4.5 ★",
        location: "Bangalore, Chennai, Hyderabad",
        jobsCount: 210,
        description: "Amazon strives to be Earth's most customer-centric company and best employer.",
        tags: ["AWS", "Logistics", "Cloud", "Alexa"]
    },
    {
        name: "Adobe",
        logo: "A",
        logoClass: "adobe",
        industry: "Creative Software & Media",
        rating: "4.6 ★",
        location: "Noida, Bangalore",
        jobsCount: 64,
        description: "Adobe is changing the world through digital experiences, creative tools, and marketing intelligence.",
        tags: ["Creative Cloud", "Photoshop", "Firefly AI"]
    },
    {
        name: "Razorpay",
        logo: "R",
        logoClass: "meta",
        industry: "FinTech & Payments",
        rating: "4.5 ★",
        location: "Bangalore, Mumbai",
        jobsCount: 48,
        description: "Powering modern payments, banking, and payroll for businesses across India.",
        tags: ["Fintech", "Payment Gateway", "Banking APIs"]
    },
    {
        name: "Flipkart",
        logo: "F",
        logoClass: "microsoft",
        industry: "E-Commerce & Logistics",
        rating: "4.4 ★",
        location: "Bangalore",
        jobsCount: 92,
        description: "India's homegrown e-commerce marketplace creating value for consumers and sellers alike.",
        tags: ["E-Commerce", "Supply Chain", "Fintech"]
    }
];

// INITIALIZE APPLICATIONS IF NOT SET
function initSampleApplications() {
    if (!localStorage.getItem("jobhub_applications")) {
        const sampleApps = [
            {
                id: "app-1",
                jobId: "job-1",
                title: "Senior Full Stack Engineer",
                company: "Microsoft",
                logo: "M",
                logoClass: "microsoft",
                location: "Bangalore, India",
                appliedDate: "Oct 20, 2026",
                status: "interview",
                statusText: "Interview Scheduled",
                salary: "₹24–32 LPA"
            },
            {
                id: "app-2",
                jobId: "job-2",
                title: "AI / Machine Learning Engineer",
                company: "Google",
                logo: "G",
                logoClass: "google",
                location: "Hyderabad, India",
                appliedDate: "Oct 22, 2026",
                status: "screening",
                statusText: "Resume Screening",
                salary: "₹28–38 LPA"
            },
            {
                id: "app-3",
                jobId: "job-4",
                title: "Lead UI/UX Designer",
                company: "Adobe",
                logo: "A",
                logoClass: "adobe",
                location: "Noida, India",
                appliedDate: "Oct 18, 2026",
                status: "applied",
                statusText: "Application Submitted",
                salary: "₹18–26 LPA"
            }
        ];
        localStorage.setItem("jobhub_applications", JSON.stringify(sampleApps));
    }
}

document.addEventListener("DOMContentLoaded", function () {
    initSampleApplications();

    // 1. SETUP MODAL DOM IF NOT PRESENT
    ensureModalExists();

    // 2. CHECK CURRENT PAGE AND INITIALIZE APPROPRIATE VIEW
    const currentPath = window.location.pathname.toLowerCase();

    if (currentPath.includes("job.html") && !currentPath.includes("job-detail")) {
        initJobsListingPage();
    } else if (currentPath.includes("job-detail.html")) {
        initJobDetailPage();
    } else if (currentPath.includes("saved-jobs.html")) {
        initSavedJobsPage();
    } else if (currentPath.includes("application.html")) {
        initApplicationsPage();
    } else if (currentPath.includes("companies.html")) {
        initCompaniesPage();
    }
});

// ======================================================
// JOBS LISTING PAGE CONTROLLER (job.html)
// ======================================================
function initJobsListingPage() {
    const jobsGrid = document.getElementById("jobsContainer");
    const searchInput = document.getElementById("jobSearchKeyword");
    const locInput = document.getElementById("jobSearchLocation");
    const sortSelect = document.getElementById("jobSort");
    const salarySlider = document.getElementById("salaryRange");
    const salaryVal = document.getElementById("salaryValue");

    // Pre-populate search from URL params if present
    const urlParams = new URLSearchParams(window.location.search);
    if (searchInput && urlParams.get("q")) {
        searchInput.value = urlParams.get("q");
    }
    if (locInput && urlParams.get("loc")) {
        locInput.value = urlParams.get("loc");
    }

    // Category tags toggle
    let activeCategory = "all";
    const categoryTags = document.querySelectorAll(".filter-tag");
    categoryTags.forEach(tag => {
        tag.addEventListener("click", function () {
            categoryTags.forEach(t => t.classList.remove("active"));
            this.classList.add("active");
            activeCategory = this.getAttribute("data-category") || "all";
            renderFilteredJobs();
        });
    });

    if (salarySlider && salaryVal) {
        salarySlider.addEventListener("input", function () {
            salaryVal.innerText = `₹${salarySlider.value}+ LPA`;
            renderFilteredJobs();
        });
    }

    if (searchInput) searchInput.addEventListener("input", renderFilteredJobs);
    if (locInput) locInput.addEventListener("input", renderFilteredJobs);
    if (sortSelect) sortSelect.addEventListener("change", renderFilteredJobs);

    // Filter Checkboxes (workplace type)
    const workplaceBoxes = document.querySelectorAll("input[name='workplace']");
    workplaceBoxes.forEach(box => box.addEventListener("change", renderFilteredJobs));

    function renderFilteredJobs() {
        if (!jobsGrid) return;

        const q = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const loc = locInput ? locInput.value.toLowerCase().trim() : "";
        const minSalary = salarySlider ? parseInt(salarySlider.value, 10) : 0;
        const selectedWorkplaces = Array.from(document.querySelectorAll("input[name='workplace']:checked")).map(b => b.value.toLowerCase());

        let results = JOB_CATALOG.filter(job => {
            // Category filter
            if (activeCategory !== "all" && job.category !== activeCategory) {
                return false;
            }
            // Keyword filter (title, company, skills)
            if (q) {
                const titleMatch = job.title.toLowerCase().includes(q);
                const companyMatch = job.company.toLowerCase().includes(q);
                const skillMatch = job.skills.some(s => s.toLowerCase().includes(q));
                if (!titleMatch && !companyMatch && !skillMatch) return false;
            }
            // Location filter
            if (loc && !job.location.toLowerCase().includes(loc)) {
                return false;
            }
            // Salary filter
            if (job.salaryMin < minSalary) {
                return false;
            }
            // Workplace filter
            if (selectedWorkplaces.length > 0 && !selectedWorkplaces.includes(job.workplace.toLowerCase())) {
                return false;
            }
            return true;
        });

        // Sorting
        const sortVal = sortSelect ? sortSelect.value : "match";
        if (sortVal === "match") {
            results.sort((a, b) => b.matchScore - a.matchScore);
        } else if (sortVal === "salary") {
            results.sort((a, b) => b.salaryMin - a.salaryMin);
        }

        const countLabel = document.getElementById("jobResultCount");
        if (countLabel) countLabel.innerText = `${results.length} Jobs Found`;

        if (results.length === 0) {
            jobsGrid.innerHTML = `
                <div style="text-align:center; padding:50px 20px; background:var(--dark-card); border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
                    <div style="font-size:2.5rem; margin-bottom:12px;">✦</div>
                    <h3 style="color:#fff; margin-bottom:6px;">No exact jobs matched your search</h3>
                    <p style="color:var(--text-muted); font-size:0.9rem;">Try broadening your keywords or adjusting salary & location filters.</p>
                </div>
            `;
            return;
        }

        const savedJobs = JSON.parse(localStorage.getItem("jobhub_saved_jobs") || "[]");

        jobsGrid.innerHTML = results.map(job => {
            const isSaved = savedJobs.includes(job.title);
            const isHighMatch = job.matchScore >= 90;
            return `
                <div class="job-portal-card" data-id="${job.id}">
                    <div class="card-top-row">
                        <div class="company-job-title">
                            <div class="company-logo ${job.logoClass}">${job.logo}</div>
                            <div class="card-title-meta">
                                <h3>${job.title}</h3>
                                <p>${job.company} · ${job.location}</p>
                            </div>
                        </div>
                        <div class="card-badge-group">
                            <div class="ai-match-pill ${isHighMatch ? 'high' : ''}">
                                <span>✦</span> ${job.matchScore}% AI Match
                            </div>
                            <button class="save-job-btn" style="background:none; border:none; color:${isSaved ? 'var(--primary-light)' : 'var(--text-muted)'}; font-size:1.3rem; cursor:pointer;" data-title="${job.title}">
                                ${isSaved ? '♥' : '♡'}
                            </button>
                        </div>
                    </div>

                    <p class="card-snippet">${job.description}</p>

                    <div class="card-skills-row">
                        ${job.skills.map(s => `<span class="skill-tag ${['Java', 'React', 'Python', 'Docker'].includes(s) ? 'matched' : ''}">${s}</span>`).join('')}
                    </div>

                    <div class="card-bottom-row">
                        <div class="job-salary-location">
                            <strong>${job.salary}</strong>
                            <span>◉ ${job.type} (${job.workplace})</span>
                            <span>⏳ ${job.posted}</span>
                        </div>
                        <div class="card-action-btns">
                            <a href="job-detail.html?id=${job.id}" class="filter-tag" style="padding:6px 16px;">View Details</a>
                            <button class="apply-btn" onclick="openApplyModal('${job.id}')">Easy Apply →</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Attach Card Click and Save Bookmark events
        jobsGrid.querySelectorAll(".job-portal-card").forEach(card => {
            card.addEventListener("click", function (e) {
                if (e.target.closest("button") || e.target.closest("a")) return;
                const jobId = this.getAttribute("data-id");
                window.location.href = `job-detail.html?id=${jobId}`;
            });
        });

        jobsGrid.querySelectorAll(".save-job-btn").forEach(btn => {
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                const title = this.getAttribute("data-title");
                toggleSaveJob(title, this);
            });
        });
    }

    renderFilteredJobs();
}

// ======================================================
// JOB DETAIL PAGE CONTROLLER (job-detail.html)
// ======================================================
function initJobDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get("id") || "job-1";
    const job = JOB_CATALOG.find(j => j.id === jobId) || JOB_CATALOG[0];

    // Populate header banner
    const companyLogo = document.getElementById("detailLogo");
    if (companyLogo) {
        companyLogo.className = `banner-company-logo ${job.logoClass}`;
        companyLogo.innerText = job.logo;
    }

    const titleEl = document.getElementById("detailTitle");
    if (titleEl) titleEl.innerText = job.title;

    const companyEl = document.getElementById("detailCompany");
    if (companyEl) companyEl.innerText = `${job.company} · ${job.location} · ${job.workplace}`;

    const salaryEl = document.getElementById("detailSalary");
    if (salaryEl) salaryEl.innerText = job.salary;

    const descEl = document.getElementById("detailDesc");
    if (descEl) descEl.innerText = job.description;

    const reqList = document.getElementById("detailRequirements");
    if (reqList) {
        reqList.innerHTML = job.requirements.map(r => `<li>${r}</li>`).join('');
    }

    const benefitsList = document.getElementById("detailBenefits");
    if (benefitsList) {
        benefitsList.innerHTML = job.benefits.map(b => `<li>${b}</li>`).join('');
    }

    const skillsRow = document.getElementById("detailSkills");
    if (skillsRow) {
        skillsRow.innerHTML = job.skills.map(s => `<span class="skill-tag matched" style="font-size:0.82rem; padding:6px 12px;">✦ ${s}</span>`).join('');
    }

    // Match Score Gauge
    const scoreVal = document.getElementById("detailMatchScore");
    const scoreMeter = document.getElementById("detailMatchMeter");
    if (scoreVal) scoreVal.innerText = `${job.matchScore}%`;
    if (scoreMeter) scoreMeter.style.setProperty("--percent", job.matchScore);

    // Apply button
    const applyBtn = document.getElementById("detailApplyBtn");
    if (applyBtn) {
        applyBtn.addEventListener("click", () => openApplyModal(job.id));
    }
}

// ======================================================
// SAVED JOBS CONTROLLER (saved-jobs.html)
// ======================================================
function initSavedJobsPage() {
    const container = document.getElementById("savedJobsContainer");
    if (!container) return;

    const savedJobTitles = JSON.parse(localStorage.getItem("jobhub_saved_jobs") || "[]");
    const savedJobs = JOB_CATALOG.filter(j => savedJobTitles.includes(j.title));

    const countHeader = document.getElementById("savedCount");
    if (countHeader) countHeader.innerText = `${savedJobs.length} Bookmarked Positions`;

    if (savedJobs.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding:60px 20px; background:var(--dark-card); border-radius:var(--radius-md); border:1px solid var(--border-subtle); grid-column:1/-1;">
                <div style="font-size:3rem; margin-bottom:14px;">♡</div>
                <h3 style="color:#fff; margin-bottom:8px;">No Saved Jobs Yet</h3>
                <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:20px;">Browse opportunities and tap the heart icon to save roles here for quick review.</p>
                <a href="job.html" class="apply-btn" style="display:inline-block;">Explore Jobs →</a>
            </div>
        `;
        return;
    }

    container.innerHTML = savedJobs.map(job => `
        <div class="job-portal-card">
            <div class="card-top-row">
                <div class="company-job-title">
                    <div class="company-logo ${job.logoClass}">${job.logo}</div>
                    <div class="card-title-meta">
                        <h3>${job.title}</h3>
                        <p>${job.company} · ${job.location}</p>
                    </div>
                </div>
                <button class="save-job-btn" style="background:none; border:none; color:var(--primary-light); font-size:1.3rem; cursor:pointer;" data-title="${job.title}">
                    ♥
                </button>
            </div>
            <div class="job-salary-location">
                <strong>${job.salary}</strong>
                <span>${job.type}</span>
            </div>
            <div class="card-action-btns" style="margin-top:10px;">
                <a href="job-detail.html?id=${job.id}" class="filter-tag">Details</a>
                <button class="apply-btn" onclick="openApplyModal('${job.id}')">Apply Now</button>
            </div>
        </div>
    `).join('');

    container.querySelectorAll(".save-job-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const title = this.getAttribute("data-title");
            let current = JSON.parse(localStorage.getItem("jobhub_saved_jobs") || "[]");
            current = current.filter(t => t !== title);
            localStorage.setItem("jobhub_saved_jobs", JSON.stringify(current));
            initSavedJobsPage();
        });
    });
}

// ======================================================
// APPLICATIONS PIPELINE CONTROLLER (application.html)
// ======================================================
function initApplicationsPage() {
    const apps = JSON.parse(localStorage.getItem("jobhub_applications") || "[]");

    const appliedCol = document.getElementById("colApplied");
    const screeningCol = document.getElementById("colScreening");
    const interviewCol = document.getElementById("colInterview");
    const offerCol = document.getElementById("colOffer");

    const colMap = {
        applied: appliedCol,
        screening: screeningCol,
        interview: interviewCol,
        offer: offerCol
    };

    // Clear columns
    Object.values(colMap).forEach(col => {
        if (col) col.innerHTML = "";
    });

    // Counts
    const counts = { applied: 0, screening: 0, interview: 0, offer: 0 };

    apps.forEach(app => {
        const targetCol = colMap[app.status] || appliedCol;
        counts[app.status] = (counts[app.status] || 0) + 1;

        if (targetCol) {
            const card = document.createElement("div");
            card.className = "pipeline-card";
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; gap:10px; align-items:center;">
                        <div class="company-logo ${app.logoClass || 'microsoft'}" style="width:34px; height:34px; font-size:0.9rem;">${app.logo || 'C'}</div>
                        <div>
                            <strong style="font-size:0.88rem; color:#fff; display:block;">${app.title}</strong>
                            <span style="font-size:0.75rem; color:var(--text-muted);">${app.company}</span>
                        </div>
                    </div>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-secondary); margin-top:6px;">
                    <span>📍 ${app.location}</span>
                    <span class="pipeline-status-badge status-${app.status}">${app.statusText}</span>
                </div>
                <div style="font-size:0.72rem; color:var(--text-muted); border-top:1px solid var(--border-subtle); padding-top:8px; display:flex; justify-content:space-between;">
                    <span>Applied on: ${app.appliedDate}</span>
                    <span style="color:var(--danger); cursor:pointer;" onclick="withdrawApplication('${app.id}')">Withdraw</span>
                </div>
            `;
            targetCol.appendChild(card);
        }
    });

    // Update count labels
    document.querySelectorAll(".pipeline-column").forEach(col => {
        const status = col.getAttribute("data-status");
        const countSpan = col.querySelector(".pipeline-count");
        if (status && countSpan) {
            countSpan.innerText = counts[status] || 0;
        }
    });
}

function withdrawApplication(appId) {
    if (confirm("Are you sure you want to withdraw this application?")) {
        let apps = JSON.parse(localStorage.getItem("jobhub_applications") || "[]");
        apps = apps.filter(a => a.id !== appId);
        localStorage.setItem("jobhub_applications", JSON.stringify(apps));
        initApplicationsPage();
    }
}

// ======================================================
// COMPANIES CONTROLLER (companies.html)
// ======================================================
function initCompaniesPage() {
    const container = document.getElementById("companiesContainer");
    const searchInput = document.getElementById("companySearch");

    function renderCompanies(list) {
        if (!container) return;
        container.innerHTML = list.map(comp => `
            <div class="company-card">
                <div class="company-card-top">
                    <div class="company-logo ${comp.logoClass}" style="width:52px; height:52px; font-size:1.4rem;">${comp.logo}</div>
                    <div>
                        <h3 style="font-size:1.15rem; color:#fff; margin-bottom:2px;">${comp.name}</h3>
                        <p style="font-size:0.8rem; color:var(--text-muted);">${comp.industry} · <strong style="color:var(--warning);">${comp.rating}</strong></p>
                    </div>
                </div>
                <p style="font-size:0.86rem; color:var(--text-secondary); line-height:1.5;">${comp.description}</p>
                <div class="company-meta-tags">
                    ${comp.tags.map(t => `<span class="company-tag">✦ ${t}</span>`).join('')}
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-subtle); padding-top:14px;">
                    <span style="font-size:0.82rem; color:var(--primary-light); font-weight:600;">${comp.jobsCount} Open Positions</span>
                    <a href="job.html?q=${encodeURIComponent(comp.name)}" class="apply-btn" style="padding:6px 16px;">View Jobs →</a>
                </div>
            </div>
        `).join('');
    }

    renderCompanies(COMPANIES_CATALOG);

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const val = searchInput.value.toLowerCase().trim();
            const filtered = COMPANIES_CATALOG.filter(c => 
                c.name.toLowerCase().includes(val) || 
                c.industry.toLowerCase().includes(val) ||
                c.tags.some(t => t.toLowerCase().includes(val))
            );
            renderCompanies(filtered);
        });
    }
}

// ======================================================
// EASY APPLY MODAL
// ======================================================
let currentApplyJobId = null;

function ensureModalExists() {
    if (document.getElementById("easyApplyModal")) return;

    const modalHtml = `
        <div class="modal-backdrop" id="easyApplyModal">
            <div class="modal-dialog">
                <button class="modal-close-btn" id="closeApplyModal">✕</button>
                <div style="margin-bottom:20px;">
                    <span style="font-size:0.75rem; letter-spacing:0.1em; color:var(--primary-light); font-weight:700;">JOBHUB AI EASY APPLY</span>
                    <h2 style="font-size:1.35rem; color:#fff; margin-top:4px;" id="modalJobTitle">Apply for Position</h2>
                    <p style="font-size:0.82rem; color:var(--text-muted);" id="modalCompanyInfo">Submitting profile with AI match analysis</p>
                </div>

                <form id="applyForm">
                    <div style="margin-bottom:16px;">
                        <label style="display:block; font-size:0.82rem; color:var(--text-secondary); margin-bottom:6px;">Full Name</label>
                        <input type="text" id="applyName" required style="width:100%; background:rgba(255,255,255,0.04); border:1px solid var(--border-subtle); border-radius:8px; padding:10px 14px; color:#fff; font-size:0.9rem;">
                    </div>
                    <div style="margin-bottom:16px;">
                        <label style="display:block; font-size:0.82rem; color:var(--text-secondary); margin-bottom:6px;">Email Address</label>
                        <input type="email" id="applyEmail" required style="width:100%; background:rgba(255,255,255,0.04); border:1px solid var(--border-subtle); border-radius:8px; padding:10px 14px; color:#fff; font-size:0.9rem;">
                    </div>
                    <div style="margin-bottom:16px;">
                        <label style="display:block; font-size:0.82rem; color:var(--text-secondary); margin-bottom:6px;">Upload Resume (PDF, DOCX)</label>
                        <div class="file-dropzone" id="applyDropzone">
                            <span style="font-size:1.8rem; display:block; margin-bottom:4px;">📄</span>
                            <span style="font-size:0.85rem; color:#fff; font-weight:600;" id="dropzoneText">Drag resume here or click to browse</span>
                            <input type="file" id="resumeFileInput" style="display:none;" accept=".pdf,.doc,.docx">
                        </div>
                    </div>
                    <div style="margin-bottom:20px;">
                        <label style="display:block; font-size:0.82rem; color:var(--text-secondary); margin-bottom:6px;">AI Cover Note (Optional)</label>
                        <textarea id="applyNote" rows="3" placeholder="Why are you a great match for this role?" style="width:100%; background:rgba(255,255,255,0.04); border:1px solid var(--border-subtle); border-radius:8px; padding:10px 14px; color:#fff; font-size:0.85rem; resize:vertical;"></textarea>
                    </div>
                    <button type="submit" class="apply-btn" style="width:100%; padding:14px; font-size:0.95rem;">
                        ✦ Submit Application
                    </button>
                </form>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHtml);

    const modal = document.getElementById("easyApplyModal");
    const closeBtn = document.getElementById("closeApplyModal");
    const dropzone = document.getElementById("applyDropzone");
    const fileInput = document.getElementById("resumeFileInput");
    const applyForm = document.getElementById("applyForm");

    if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("open"));

    if (dropzone && fileInput) {
        dropzone.addEventListener("click", () => fileInput.click());
        fileInput.addEventListener("change", function () {
            if (this.files.length > 0) {
                document.getElementById("dropzoneText").innerText = `✓ ${this.files[0].name} attached`;
                dropzone.style.borderColor = "var(--success)";
            }
        });
    }

    if (applyForm) {
        applyForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const job = JOB_CATALOG.find(j => j.id === currentApplyJobId) || JOB_CATALOG[0];
            const name = document.getElementById("applyName").value.trim();
            const email = document.getElementById("applyEmail").value.trim();

            const newApp = {
                id: "app-" + Date.now(),
                jobId: job.id,
                title: job.title,
                company: job.company,
                logo: job.logo,
                logoClass: job.logoClass,
                location: job.location,
                appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                status: "applied",
                statusText: "Application Submitted",
                salary: job.salary
            };

            const existingApps = JSON.parse(localStorage.getItem("jobhub_applications") || "[]");
            existingApps.unshift(newApp);
            localStorage.setItem("jobhub_applications", JSON.stringify(existingApps));

            const submitBtn = applyForm.querySelector("button[type='submit']");
            submitBtn.innerText = "✓ Application Transmitted!";
            submitBtn.style.background = "var(--success)";

            setTimeout(() => {
                modal.classList.remove("open");
                alert(`Congratulations ${name}! Your application for ${job.title} at ${job.company} was submitted successfully.`);
                submitBtn.innerText = "✦ Submit Application";
                submitBtn.style.background = "";
            }, 800);
        });
    }
}

function openApplyModal(jobId) {
    currentApplyJobId = jobId;
    ensureModalExists();
    const job = JOB_CATALOG.find(j => j.id === jobId) || JOB_CATALOG[0];

    const titleEl = document.getElementById("modalJobTitle");
    const compEl = document.getElementById("modalCompanyInfo");
    if (titleEl) titleEl.innerText = `Apply for ${job.title}`;
    if (compEl) compEl.innerText = `${job.company} · ${job.location} · ${job.salary}`;

    // Autofill user info if available
    const user = JSON.parse(localStorage.getItem("jobhub_user") || "{}");
    const nameInput = document.getElementById("applyName");
    const emailInput = document.getElementById("applyEmail");
    if (nameInput && user.name) nameInput.value = user.name;
    if (emailInput && user.email) emailInput.value = user.email;

    const modal = document.getElementById("easyApplyModal");
    if (modal) modal.classList.add("open");
}

function toggleSaveJob(title, btn) {
    let saved = JSON.parse(localStorage.getItem("jobhub_saved_jobs") || "[]");
    if (saved.includes(title)) {
        saved = saved.filter(t => t !== title);
        btn.innerText = "♡";
        btn.style.color = "var(--text-muted)";
    } else {
        saved.push(title);
        btn.innerText = "♥";
        btn.style.color = "var(--primary-light)";
    }
    localStorage.setItem("jobhub_saved_jobs", JSON.stringify(saved));
}
