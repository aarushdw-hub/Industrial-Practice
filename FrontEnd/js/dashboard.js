// ======================================================
// JOBHUB AI - DASHBOARD JAVASCRIPT
// Interactive elements, notifications, search & animations
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    // 1. DYNAMIC GREETING BASED ON LOCAL TIME
    const welcomeHeading = document.querySelector(".welcome-section h1");
    if (welcomeHeading) {
        const hour = new Date().getHours();
        let greeting = "Welcome back,";
        if (hour < 12) greeting = "Good morning,";
        else if (hour < 18) greeting = "Good afternoon,";
        else greeting = "Good evening,";

        // Read stored user name if exists
        const storedUser = JSON.parse(localStorage.getItem("jobhub_user") || "{}");
        const userName = storedUser.name || "Job Seeker";

        welcomeHeading.innerHTML = `${greeting} <span>${userName}!</span>`;
    }

    // 2. STATS COUNTER ANIMATION
    const statCards = document.querySelectorAll(".stat-card strong");
    statCards.forEach((counter) => {
        const text = counter.innerText.trim();
        const hasPercent = text.includes("%");
        const targetValue = parseInt(text.replace(/[^0-9]/g, ""), 10);

        if (!isNaN(targetValue)) {
            let start = 0;
            const duration = 1200;
            const stepTime = 25;
            const stepCount = duration / stepTime;
            const increment = targetValue / stepCount;

            const timer = setInterval(() => {
                start += increment;
                if (start >= targetValue) {
                    counter.innerText = targetValue + (hasPercent ? "%" : "");
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.floor(start) + (hasPercent ? "%" : "");
                }
            }, stepTime);
        }
    });

    // 3. BOOKMARK / SAVE JOB TOGGLE
    const saveButtons = document.querySelectorAll(".save-job");
    saveButtons.forEach((btn, index) => {
        // Load saved state
        const savedJobs = JSON.parse(localStorage.getItem("jobhub_saved_jobs") || "[]");
        const jobTitle = btn.closest(".job-item")?.querySelector("h3")?.innerText || `job_${index}`;

        if (savedJobs.includes(jobTitle)) {
            btn.innerHTML = "♥";
            btn.classList.add("saved");
            btn.style.color = "var(--primary-light)";
        }

        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            let currentSaved = JSON.parse(localStorage.getItem("jobhub_saved_jobs") || "[]");
            if (currentSaved.includes(jobTitle)) {
                currentSaved = currentSaved.filter(item => item !== jobTitle);
                btn.innerHTML = "♡";
                btn.classList.remove("saved");
                btn.style.color = "";
                showToast("Job removed from saved list");
            } else {
                currentSaved.push(jobTitle);
                btn.innerHTML = "♥";
                btn.classList.add("saved");
                btn.style.color = "var(--primary-light)";
                showToast("Job saved to your bookmarks!");
            }
            localStorage.setItem("jobhub_saved_jobs", JSON.stringify(currentSaved));
        });
    });

    // 4. TOPBAR SEARCH REDIRECTION & FILTERING
    const searchInput = document.getElementById("dashboardSearch");
    if (searchInput) {
        searchInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `job.html?q=${encodeURIComponent(query)}`;
                }
            }
        });

        // Live filter for the job items on dashboard
        searchInput.addEventListener("input", function () {
            const val = searchInput.value.toLowerCase();
            const jobItems = document.querySelectorAll(".job-item");
            jobItems.forEach(item => {
                const text = item.innerText.toLowerCase();
                if (text.includes(val)) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
            });
        });
    }

    // 5. NOTIFICATION DROPDOWN MODAL
    const notifBtn = document.getElementById("notificationBtn");
    if (notifBtn) {
        // Create popup element
        const popover = document.createElement("div");
        popover.className = "notifications-popover";
        popover.style.cssText = `
            position: absolute;
            top: 60px;
            right: 70px;
            width: 320px;
            background: rgba(19, 19, 34, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(139, 92, 246, 0.3);
            border-radius: 14px;
            padding: 18px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.6);
            display: none;
            flex-direction: column;
            gap: 12px;
            z-index: 100;
            animation: fadeIn 0.2s ease-out;
        `;

        popover.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px;">
                <strong style="font-size:0.92rem; color:#fff;">Notifications</strong>
                <span style="font-size:0.75rem; color:var(--primary-light); cursor:pointer;" id="clearNotifs">Mark read</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:10px; font-size:0.82rem;">
                <div style="padding:8px; background:rgba(139,92,246,0.1); border-radius:8px;">
                    <strong style="color:#c084fc; display:block;">✦ 3 New AI Matches</strong>
                    <span style="color:#94a3b8;">New Software Engineer roles in Bangalore match 94%.</span>
                </div>
                <div style="padding:8px; background:rgba(255,255,255,0.03); border-radius:8px;">
                    <strong style="color:#10b981; display:block;">✓ Application Status Update</strong>
                    <span style="color:#94a3b8;">Microsoft moved your profile to Interview Stage!</span>
                </div>
                <div style="padding:8px; background:rgba(255,255,255,0.03); border-radius:8px;">
                    <strong style="color:#38bdf8; display:block;">▤ Resume Score: 87%</strong>
                    <span style="color:#94a3b8;">AI scanned your uploaded profile and added keywords.</span>
                </div>
            </div>
        `;
        document.querySelector(".topbar-right").appendChild(popover);

        notifBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            const isOpen = popover.style.display === "flex";
            popover.style.display = isOpen ? "none" : "flex";
            const dot = notifBtn.querySelector(".notification-dot");
            if (dot) dot.style.display = "none";
        });

        document.addEventListener("click", function (e) {
            if (!popover.contains(e.target) && e.target !== notifBtn) {
                popover.style.display = "none";
            }
        });

        const clearBtn = popover.querySelector("#clearNotifs");
        if (clearBtn) {
            clearBtn.addEventListener("click", () => {
                popover.innerHTML = `<p style="color:#94a3b8; font-size:0.8rem; text-align:center; padding:12px;">All notifications cleared</p>`;
            });
        }
    }

    // 6. PROFILE MENU DROPDOWN
    const profileMenu = document.getElementById("profileMenu");
    if (profileMenu) {
        profileMenu.addEventListener("click", function () {
            window.location.href = "profile.html";
        });
    }

    // 7. TOAST NOTIFICATION UTILITY
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

    // 8. FLOATING CHATBOT CONTROLLER (IF PRESENT)
    const launcher = document.getElementById("floatingChatLauncher");
    const windowEl = document.getElementById("floatingChatWindow");
    const closeBtn = document.getElementById("floatingChatCloseBtn");
    const sendBtn = document.getElementById("floatingChatSendBtn");
    const input = document.getElementById("floatingChatInput");
    const bodyArea = document.getElementById("floatingChatBody");
    const chips = document.querySelectorAll(".floating-chip");

    if (launcher && windowEl) {
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

        if (closeBtn) closeBtn.addEventListener("click", () => windowEl.classList.remove("open"));

        const BOT_RESPONSES = {
            "java": "For Java backend positions, recruiters focus heavily on Java 21+ Virtual Threads, Spring Boot microservices, distributed caching with Redis, Kafka streaming, and sub-second p99 latency optimization.",
            "salary": "For ₹30 LPA compensation negotiation: Anchor your research at the 75th percentile of enterprise tech salaries in India. Emphasize architectural milestones, team leadership, and ask for sign-on bonuses or equity refreshes if the fixed salary band has caps.",
            "ats": "To pass automated ATS resume screeners: Use clean single-column structure, lead every bullet with quantifiable metrics (e.g. 'reduced latency by 35%'), and ensure keywords like Spring Boot, Docker, and Microservices appear in both your Skills list and Experience sections.",
            "default": "I'm your JobHub AI Career Assistant! I can help you find jobs matching your exact skills, practice technical interview questions, optimize your resume for ATS, or script your salary negotiations. What would you like to explore?"
        };

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

            let idx = 0;
            const timer = setInterval(() => {
                msg.innerText = fullText.slice(0, idx);
                idx += 3;
                bodyArea.scrollTop = bodyArea.scrollHeight;
                if (idx > fullText.length) {
                    msg.innerText = fullText;
                    clearInterval(timer);
                }
            }, 15);
        }

        function handleSend() {
            if (!input) return;
            const text = input.value.trim();
            if (!text) return;

            appendUserMessage(text);
            input.value = "";

            const lower = text.toLowerCase();
            let reply = BOT_RESPONSES["default"];
            if (lower.includes("java") || lower.includes("interview")) reply = BOT_RESPONSES["java"];
            else if (lower.includes("salary") || lower.includes("lpa") || lower.includes("negotiat")) reply = BOT_RESPONSES["salary"];
            else if (lower.includes("ats") || lower.includes("resume")) reply = BOT_RESPONSES["ats"];

            setTimeout(() => {
                appendAiMessage(reply);
            }, 500);
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
});
