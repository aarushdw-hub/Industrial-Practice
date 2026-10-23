// ======================================================
// JOBHUB AI - PROFILE JAVASCRIPT
// Handles Candidate Profile, Dynamic Skills, Resume & Storage
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
    // 1. DEFAULT PROFILE DATA
    const defaultProfile = {
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
        phone: "+91 98765 43210",
        location: "Bangalore, India",
        headline: "Full Stack Engineer | Java & React",
        bio: "Passionate software engineer with 4+ years designing robust microservices and interactive web applications. Enthusiastic about distributed systems, cloud architectures, and AI integrations.",
        skills: ["Java", "Spring Boot", "JavaScript", "React", "TypeScript", "SQL", "Docker", "Git"],
        resumeName: "Alex_Morgan_Resume_2026.pdf",
        experience: [
            {
                title: "Software Engineer",
                company: "Tech Mahindra",
                duration: "2023 – Present",
                desc: "Engineered scalable REST microservices handling 2M+ daily requests using Java, Spring Boot, and Redis."
            },
            {
                title: "Junior Full Stack Developer",
                company: "Cognizant",
                duration: "2021 – 2023",
                desc: "Built modern responsive customer portals using React, TypeScript, and Node.js."
            }
        ],
        education: {
            degree: "B.Tech in Computer Science & Engineering",
            institution: "National Institute of Technology",
            year: "2017 – 2021"
        }
    };

    // Load from localStorage or use default
    let storedUser = JSON.parse(localStorage.getItem("jobhub_user") || "{}");
    let profile = Object.assign({}, defaultProfile, storedUser);

    // 2. POPULATE DOM ELEMENTS
    const nameHero = document.getElementById("profileNameHero");
    const headlineHero = document.getElementById("profileHeadlineHero");
    const locationHero = document.getElementById("profileLocationHero");
    const emailHero = document.getElementById("profileEmailHero");
    const avatarLarge = document.getElementById("profileAvatarLarge");

    if (nameHero) nameHero.innerText = profile.name || "Candidate Name";
    if (headlineHero) headlineHero.innerText = profile.headline || "Job Seeker";
    if (locationHero) locationHero.innerText = `📍 ${profile.location || 'Bangalore, India'}`;
    if (emailHero) emailHero.innerText = `✉ ${profile.email || 'user@example.com'}`;

    if (avatarLarge) {
        const initials = (profile.name || "JD").split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
        avatarLarge.innerText = initials;
    }

    // Input fields
    const inputName = document.getElementById("inputName");
    const inputHeadline = document.getElementById("inputHeadline");
    const inputEmail = document.getElementById("inputEmail");
    const inputPhone = document.getElementById("inputPhone");
    const inputLocation = document.getElementById("inputLocation");
    const inputBio = document.getElementById("inputBio");

    if (inputName) inputName.value = profile.name || "";
    if (inputHeadline) inputHeadline.value = profile.headline || "";
    if (inputEmail) inputEmail.value = profile.email || "";
    if (inputPhone) inputPhone.value = profile.phone || "";
    if (inputLocation) inputLocation.value = profile.location || "";
    if (inputBio) inputBio.value = profile.bio || "";

    // 3. SKILLS MANAGER
    const skillsContainer = document.getElementById("skillsContainer");
    const skillInput = document.getElementById("skillInput");
    const addSkillBtn = document.getElementById("addSkillBtn");
    let currentSkills = Array.isArray(profile.skills) ? [...profile.skills] : [...defaultProfile.skills];

    function renderSkills() {
        if (!skillsContainer) return;
        skillsContainer.innerHTML = currentSkills.map((s, index) => `
            <div class="skill-pill-removable">
                <span>✦ ${s}</span>
                <span class="remove-skill-btn" data-index="${index}">✕</span>
            </div>
        `).join('');

        skillsContainer.querySelectorAll(".remove-skill-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const idx = parseInt(this.getAttribute("data-index"), 10);
                currentSkills.splice(idx, 1);
                renderSkills();
                updateProfileStrength();
            });
        });
    }

    renderSkills();

    function addSkill(skillName) {
        const clean = skillName.trim();
        if (clean && !currentSkills.includes(clean)) {
            currentSkills.push(clean);
            renderSkills();
            updateProfileStrength();
        }
    }

    if (addSkillBtn && skillInput) {
        addSkillBtn.addEventListener("click", () => {
            addSkill(skillInput.value);
            skillInput.value = "";
            skillInput.focus();
        });

        skillInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                addSkill(skillInput.value);
                skillInput.value = "";
            }
        });
    }

    // Suggested Skill Chips
    const suggestedChips = document.querySelectorAll(".suggested-skill-chip");
    suggestedChips.forEach(chip => {
        chip.addEventListener("click", function () {
            const skill = this.innerText.replace("+", "").trim();
            addSkill(skill);
        });
    });

    // 4. RESUME UPLOAD SIMULATION
    const resumeDropzone = document.getElementById("profileResumeDropzone");
    const resumeFileInput = document.getElementById("profileResumeInput");
    const resumeFileName = document.getElementById("profileResumeName");

    if (resumeDropzone && resumeFileInput) {
        resumeDropzone.addEventListener("click", () => resumeFileInput.click());

        resumeFileInput.addEventListener("change", function () {
            if (this.files.length > 0) {
                profile.resumeName = this.files[0].name;
                if (resumeFileName) {
                    resumeFileName.innerText = `✓ ${this.files[0].name} (Uploaded)`;
                    resumeFileName.style.color = "var(--success)";
                }
                resumeDropzone.style.borderColor = "var(--success)";
                updateProfileStrength();
                showToast("Resume uploaded & parsed successfully!");
            }
        });
    }

    // 5. PROFILE STRENGTH METER CALCULATION
    function updateProfileStrength() {
        let score = 30; // base score
        if (inputName && inputName.value.trim()) score += 10;
        if (inputHeadline && inputHeadline.value.trim()) score += 10;
        if (inputBio && inputBio.value.trim().length > 30) score += 15;
        if (currentSkills.length >= 5) score += 20;
        else score += currentSkills.length * 3;
        if (profile.resumeName) score += 15;

        score = Math.min(100, score);

        const dial = document.getElementById("profileStrengthDial");
        const dialText = document.getElementById("profileStrengthText");
        if (dial) dial.style.setProperty("--percent", score);
        if (dialText) dialText.innerText = `${score}%`;
    }

    updateProfileStrength();

    // 6. SAVE PROFILE
    const saveBtn = document.getElementById("saveProfileBtn");
    if (saveBtn) {
        saveBtn.addEventListener("click", function () {
            profile.name = inputName ? inputName.value.trim() : profile.name;
            profile.headline = inputHeadline ? inputHeadline.value.trim() : profile.headline;
            profile.email = inputEmail ? inputEmail.value.trim() : profile.email;
            profile.phone = inputPhone ? inputPhone.value.trim() : profile.phone;
            profile.location = inputLocation ? inputLocation.value.trim() : profile.location;
            profile.bio = inputBio ? inputBio.value.trim() : profile.bio;
            profile.skills = currentSkills;

            localStorage.setItem("jobhub_user", JSON.stringify(profile));

            if (nameHero) nameHero.innerText = profile.name;
            if (headlineHero) headlineHero.innerText = profile.headline;

            showToast("Profile changes saved successfully!");
        });
    }

    function showToast(msg) {
        let toast = document.getElementById("jobhub-toast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "jobhub-toast";
            toast.style.cssText = `
                position: fixed;
                bottom: 24px;
                right: 24px;
                background: linear-gradient(135deg, #19192c, #10101f);
                border: 1px solid rgba(139, 92, 246, 0.4);
                color: #fff;
                padding: 12px 20px;
                border-radius: 10px;
                font-size: 0.88rem;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                z-index: 9999;
                transition: opacity 0.3s ease, transform 0.3s ease;
                display: flex;
                align-items: center;
                gap: 10px;
            `;
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<span>✦</span> ${msg}`;
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(10px)";
        }, 3000);
    }
});
