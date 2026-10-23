// ======================================================
// JOBHUB AI - ARTIFICIAL INTELLIGENCE SUITE JAVASCRIPT
// Powers AI Matcher, ATS Resume Analyzer, Skill Gap & Chat
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname.toLowerCase();

    if (currentPath.includes("ai-matcher.html")) {
        initAiMatcherPage();
    } else if (currentPath.includes("resume-analyzer.html")) {
        initResumeAnalyzerPage();
    } else if (currentPath.includes("skill-gap.html")) {
        initSkillGapPage();
    } else if (currentPath.includes("career-assistant.html")) {
        initCareerAssistantPage();
    }
});

// ======================================================
// 1. AI MATCHER ENGINE (ai-matcher.html)
// ======================================================
function initAiMatcherPage() {
    const scanBtn = document.getElementById("btnTriggerMatcher");
    const radarBeam = document.getElementById("radarBeam");
    const scanStatus = document.getElementById("matcherStatusText");
    const resultsContainer = document.getElementById("matcherResultsContainer");
    const roleSelect = document.getElementById("matcherTargetRole");

    if (!scanBtn) return;

    scanBtn.addEventListener("click", function () {
        scanBtn.disabled = true;
        scanBtn.innerText = "✦ Neural Scanning in Progress...";
        if (radarBeam) radarBeam.style.display = "block";
        if (resultsContainer) resultsContainer.style.opacity = "0.3";

        const steps = [
            "1/3 Vectorizing candidate skills & experience...",
            "2/3 Running cosine similarity across 50,000+ open requisitions...",
            "3/3 Ranking top cultural & technical compatibility scores..."
        ];

        let stepIndex = 0;
        const interval = setInterval(() => {
            if (scanStatus && steps[stepIndex]) {
                scanStatus.innerText = steps[stepIndex];
                scanStatus.style.color = "var(--primary-light)";
            }
            stepIndex++;
            if (stepIndex > steps.length) {
                clearInterval(interval);
                finishMatching();
            }
        }, 600);
    });

    function finishMatching() {
        if (radarBeam) radarBeam.style.display = "none";
        scanBtn.disabled = false;
        scanBtn.innerText = "✦ Run Neural Matching Again";
        if (scanStatus) {
            scanStatus.innerText = "✓ Analysis Complete: Found 4 High-Compatibility Matches";
            scanStatus.style.color = "var(--success)";
        }
        if (resultsContainer) {
            resultsContainer.style.opacity = "1";
            resultsContainer.scrollIntoView({ behavior: "smooth" });
        }
    }
}

// ======================================================
// 2. ATS RESUME ANALYZER ENGINE (resume-analyzer.html)
// ======================================================
function initResumeAnalyzerPage() {
    const runBtn = document.getElementById("btnRunResumeScan");
    const laserLine = document.getElementById("scanLaserLine");
    const dropzone = document.getElementById("resumeDropzone");
    const fileInput = document.getElementById("resumeFilePicker");
    const resumeTextarea = document.getElementById("resumeTextInput");
    const fileNameDisplay = document.getElementById("dropzoneFileName");
    const resultsSection = document.getElementById("resumeScanResults");

    if (dropzone && fileInput) {
        dropzone.addEventListener("click", () => fileInput.click());
        fileInput.addEventListener("change", function () {
            if (this.files.length > 0) {
                if (fileNameDisplay) {
                    fileNameDisplay.innerText = `✓ Attached: ${this.files[0].name}`;
                    fileNameDisplay.style.color = "var(--success)";
                }
                dropzone.style.borderColor = "var(--success)";
            }
        });
    }

    if (runBtn) {
        runBtn.addEventListener("click", function () {
            runBtn.disabled = true;
            runBtn.innerText = "✦ Scanning ATS Criteria...";
            if (laserLine) laserLine.classList.add("active");

            setTimeout(() => {
                if (laserLine) laserLine.classList.remove("active");
                runBtn.disabled = false;
                runBtn.innerText = "✦ Re-Analyze Resume";
                if (resultsSection) {
                    resultsSection.style.display = "flex";
                    resultsSection.scrollIntoView({ behavior: "smooth" });
                    animateAtsBars();
                }
            }, 1800);
        });
    }

    // Bullet Point Optimizer
    const optimizeBtn = document.getElementById("btnOptimizeBullet");
    const bulletInput = document.getElementById("bulletInput");
    const bulletOutput = document.getElementById("bulletOutput");

    if (optimizeBtn && bulletInput && bulletOutput) {
        optimizeBtn.addEventListener("click", function () {
            const raw = bulletInput.value.trim();
            if (!raw) {
                alert("Please enter a bullet point to optimize.");
                return;
            }
            optimizeBtn.innerText = "✦ Rewriting with Action Verbs & Metrics...";
            setTimeout(() => {
                bulletOutput.style.display = "block";
                bulletOutput.innerHTML = `
                    <div style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:14px; margin-top:10px;">
                        <span style="font-size:0.75rem; color:var(--success); font-weight:700; display:block; margin-bottom:4px;">✦ AI OPTIMIZED ATS BULLET:</span>
                        <p style="color:#fff; font-size:0.88rem; line-height:1.5;">
                            "Architected and deployed high-throughput backend microservices handling 2.4M+ daily API requests, reducing p99 latency by 34% and accelerating cloud deployment cycles by 40%."
                        </p>
                    </div>
                `;
                optimizeBtn.innerText = "✦ Optimize Another Bullet";
            }, 800);
        });
    }
}

function animateAtsBars() {
    const fills = document.querySelectorAll(".ats-metric-fill");
    fills.forEach(fill => {
        const target = fill.getAttribute("data-target") || "85";
        fill.style.width = "0%";
        setTimeout(() => {
            fill.style.width = `${target}%`;
        }, 100);
    });
}

// ======================================================
// 3. SKILL GAP ENGINE (skill-gap.html)
// ======================================================
function initSkillGapPage() {
    const analyzeBtn = document.getElementById("btnRunSkillGap");
    const targetSelect = document.getElementById("targetCareerRole");
    const resultsContainer = document.getElementById("skillGapResults");

    const ROLE_BENCHMARKS = {
        "fullstack-lead": {
            title: "Lead Full Stack Architect",
            mastered: ["Java", "JavaScript", "HTML5/CSS3", "React", "REST APIs", "SQL"],
            inProgress: ["Spring Boot", "TypeScript", "Docker"],
            missing: ["Kubernetes", "Microservices Design Patterns", "System Design (HLD/LLD)", "AWS Architecture", "Kafka"],
            matchPct: 68
        },
        "ai-engineer": {
            title: "Senior AI & Machine Learning Engineer",
            mastered: ["Python", "SQL", "Git"],
            inProgress: ["PyTorch", "Java"],
            missing: ["Large Language Models (LLMs)", "Vector DBs (Pinecone/Milvus)", "LangChain", "GPU Optimization (CUDA)", "MLOps & Kubeflow"],
            matchPct: 45
        },
        "cloud-devops": {
            title: "Principal Cloud DevOps Engineer",
            mastered: ["Linux", "Git", "Networking Basics"],
            inProgress: ["Docker", "Bash Scripting"],
            missing: ["Kubernetes Multi-Cluster", "Terraform IAC", "CI/CD Pipelines", "AWS Solutions Architecture", "Prometheus & Grafana"],
            matchPct: 52
        }
    };

    if (analyzeBtn && targetSelect && resultsContainer) {
        analyzeBtn.addEventListener("click", function () {
            analyzeBtn.innerText = "✦ Computing Skill Graph...";
            analyzeBtn.disabled = true;

            setTimeout(() => {
                const selectedKey = targetSelect.value;
                const data = ROLE_BENCHMARKS[selectedKey] || ROLE_BENCHMARKS["fullstack-lead"];
                renderSkillGapData(data);
                analyzeBtn.innerText = "✦ Re-Calculate Skill Gap";
                analyzeBtn.disabled = false;
                resultsContainer.style.display = "flex";
                resultsContainer.scrollIntoView({ behavior: "smooth" });
            }, 700);
        });
    }

    function renderSkillGapData(data) {
        const titleEl = document.getElementById("gapTargetTitle");
        const scoreEl = document.getElementById("gapScorePct");
        const masteredList = document.getElementById("gapMasteredList");
        const inProgressList = document.getElementById("gapInProgressList");
        const missingList = document.getElementById("gapMissingList");

        if (titleEl) titleEl.innerText = data.title;
        if (scoreEl) scoreEl.innerText = `${data.matchPct}%`;

        if (masteredList) {
            masteredList.innerHTML = data.mastered.map(s => `
                <span class="skill-tag" style="background:rgba(16,185,129,0.15); border-color:rgba(16,185,129,0.4); color:var(--success);">✓ ${s}</span>
            `).join('');
        }

        if (inProgressList) {
            inProgressList.innerHTML = data.inProgress.map(s => `
                <span class="skill-tag" style="background:rgba(245,158,11,0.15); border-color:rgba(245,158,11,0.4); color:var(--warning);">◈ ${s}</span>
            `).join('');
        }

        if (missingList) {
            missingList.innerHTML = data.missing.map(s => `
                <span class="skill-tag" style="background:rgba(139,92,246,0.18); border-color:rgba(139,92,246,0.4); color:var(--primary-light);">✦ ${s}</span>
            `).join('');
        }
    }
}

// ======================================================
// 4. CAREER ASSISTANT CHATBOT (career-assistant.html)
// ======================================================
function initCareerAssistantPage() {
    const chatInput = document.getElementById("chatInput");
    const sendBtn = document.getElementById("chatSendBtn");
    const messagesArea = document.getElementById("chatMessages");
    const starterChips = document.querySelectorAll(".starter-chip");
    const clearBtn = document.getElementById("clearChatBtn");

    const KNOWLEDGE_RESPONSES = {
        "interview": `Here is an action-oriented technical prep framework for senior Java & Cloud roles:
1. **Core Java & Concurrency:** Review virtual threads (Java 21+), memory management, garbage collectors (G1, ZGC), and ConcurrentHashMap internals.
2. **System Design (HLD):** Practice rate limiters, distributed caching (Redis cache-aside), message queues (Kafka vs RabbitMQ), and data partitioning.
3. **Behavioral (STAR Method):** Prepare 2 examples of handling production outages and mentoring junior developers.`,

        "salary": `To negotiate a competitive tech compensation package (e.g. ₹28–36 LPA):
1. **Anchor on Market Data:** State your research showing 75th percentile benchmarks for your tier and stack.
2. **Quantify Your Impact:** Highlight past architectural wins (e.g. latency reductions, revenue enablement).
3. **Negotiate the Whole Package:** If fixed base has ceilings, ask for sign-on bonuses, performance milestones, or accelerated equity vesting.`,

        "resume": `Top 3 ATS optimizations to elevate your resume immediately:
1. **Lead with Metrics:** Replace "worked on payment API" with "Architected payment microservice processing ₹15Cr+ monthly with 99.99% uptime".
2. **Match Keyword Density:** Ensure required terms (e.g., Spring Boot, Docker, CI/CD) appear in both your Skills list and Experience bullet points.
3. **Eliminate Tables/Columns:** Complex multi-column layouts frequently break legacy ATS parsing engines.`,

        "default": `I'm your JobHub AI Career Coach! I can help you with:
- 🎯 Mock interview technical questions (Java, Cloud, System Design)
- 💼 Salary negotiation tactics & counter-offer scripts
- 📝 Bullet point rewriting for maximum ATS score
- 🚀 Skill gap analysis for Staff & Architect roles

What would you like to prepare for today?`
    };

    function appendUserMessage(text) {
        if (!messagesArea) return;
        const msgRow = document.createElement("div");
        msgRow.className = "chat-message-row user";
        msgRow.innerHTML = `<div class="chat-bubble">${escapeHtml(text)}</div>`;
        messagesArea.appendChild(msgRow);
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    function appendAiTypingIndicator() {
        if (!messagesArea) return null;
        const ind = document.createElement("div");
        ind.className = "chat-message-row ai";
        ind.id = "activeTypingIndicator";
        ind.innerHTML = `
            <div class="chat-bubble typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        messagesArea.appendChild(ind);
        messagesArea.scrollTop = messagesArea.scrollHeight;
        return ind;
    }

    function appendAiMessage(fullText) {
        const ind = document.getElementById("activeTypingIndicator");
        if (ind) ind.remove();

        if (!messagesArea) return;
        const msgRow = document.createElement("div");
        msgRow.className = "chat-message-row ai";
        const bubble = document.createElement("div");
        bubble.className = "chat-bubble";
        msgRow.appendChild(bubble);
        messagesArea.appendChild(msgRow);

        // Typewriter animation
        let i = 0;
        const speed = 15;
        const timer = setInterval(() => {
            bubble.innerHTML = fullText.slice(0, i).replace(/\n/g, "<br>");
            i += 2;
            messagesArea.scrollTop = messagesArea.scrollHeight;
            if (i > fullText.length) {
                bubble.innerHTML = fullText.replace(/\n/g, "<br>");
                clearInterval(timer);
            }
        }, speed);
    }

    function handleSend() {
        if (!chatInput) return;
        const text = chatInput.value.trim();
        if (!text) return;

        appendUserMessage(text);
        chatInput.value = "";
        appendAiTypingIndicator();

        // Determine response
        const lower = text.toLowerCase();
        let reply = KNOWLEDGE_RESPONSES["default"];
        if (lower.includes("interview") || lower.includes("java") || lower.includes("question")) {
            reply = KNOWLEDGE_RESPONSES["interview"];
        } else if (lower.includes("salary") || lower.includes("negotiat") || lower.includes("lpa") || lower.includes("offer")) {
            reply = KNOWLEDGE_RESPONSES["salary"];
        } else if (lower.includes("resume") || lower.includes("ats") || lower.includes("cv")) {
            reply = KNOWLEDGE_RESPONSES["resume"];
        }

        setTimeout(() => {
            appendAiMessage(reply);
        }, 800);
    }

    if (sendBtn) sendBtn.addEventListener("click", handleSend);
    if (chatInput) {
        chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
            }
        });
    }

    starterChips.forEach(chip => {
        chip.addEventListener("click", function () {
            if (chatInput) {
                chatInput.value = this.innerText;
                handleSend();
            }
        });
    });

    if (clearBtn && messagesArea) {
        clearBtn.addEventListener("click", () => {
            messagesArea.innerHTML = `
                <div class="chat-message-row ai">
                    <div class="chat-bubble">
                        ✦ Hello! I'm your JobHub AI Career Coach. How can I help you accelerate your job search today?
                    </div>
                </div>
            `;
        });
    }

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
}
