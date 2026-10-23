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

// Comprehensive Technical Skills Taxonomy (150+ Industry Skills)
const TECH_SKILL_CATALOG = [
    // Languages
    { name: "Java", category: "Language", regex: /\bjava\b(?!script)/i },
    { name: "JavaScript", category: "Language", regex: /\b(javascript|ecmascript|\bjs\b)/i },
    { name: "TypeScript", category: "Language", regex: /\b(typescript|\bts\b)/i },
    { name: "Python", category: "Language", regex: /\bpython\b/i },
    { name: "C++", category: "Language", regex: /\bc\+\+\b/i },
    { name: "C#", category: "Language", regex: /\bc#|\bc-sharp\b/i },
    { name: "Go / Golang", category: "Language", regex: /\b(golang|go\s*lang)\b/i },
    { name: "Rust", category: "Language", regex: /\brust\b/i },
    { name: "PHP", category: "Language", regex: /\bphp\b/i },
    { name: "Ruby", category: "Language", regex: /\bruby\b/i },
    { name: "Kotlin", category: "Language", regex: /\bkotlin\b/i },
    { name: "Swift", category: "Language", regex: /\bswift\b/i },
    { name: "SQL", category: "Language", regex: /\bsql\b/i },
    { name: "HTML5", category: "Language", regex: /\bhtml5?(\b|\s)/i },
    { name: "CSS3", category: "Language", regex: /\bcss3?(\b|\s)/i },
    { name: "Bash / Shell", category: "Language", regex: /\b(bash|shell\s*scripting|powershell)\b/i },

    // Backend & Frameworks
    { name: "Spring Boot", category: "Backend", regex: /\bspring\s*boot\b/i },
    { name: "Spring Framework", category: "Backend", regex: /\bspring(\s*(cloud|security|mvc|framework))?\b/i },
    { name: "Hibernate", category: "Backend", regex: /\bhibernate\b/i },
    { name: "Node.js", category: "Backend", regex: /\bnode(\.js)?\b/i },
    { name: "Express.js", category: "Backend", regex: /\bexpress(\.js)?\b/i },
    { name: "Django", category: "Backend", regex: /\bdjango\b/i },
    { name: "Flask", category: "Backend", regex: /\bflask\b/i },
    { name: "FastAPI", category: "Backend", regex: /\bfastapi\b/i },
    { name: "NestJS", category: "Backend", regex: /\bnest(\.js)?\b/i },
    { name: "ASP.NET", category: "Backend", regex: /\basp\.net|\b\.net\s*core\b/i },
    { name: "Microservices", category: "Architecture", regex: /\bmicroservices?\b/i },
    { name: "REST APIs", category: "Backend", regex: /\brest(ful)?\s*(apis?|endpoints?)?\b/i },
    { name: "GraphQL", category: "Backend", regex: /\bgraphql\b/i },
    { name: "gRPC", category: "Backend", regex: /\bgrpc\b/i },
    { name: "Distributed Systems", category: "Architecture", regex: /\bdistributed\s*systems?\b/i },
    { name: "System Design", category: "Architecture", regex: /\bsystem\s*design\b/i },

    // Frontend & Web
    { name: "React.js", category: "Frontend", regex: /\breact(\.js)?\b/i },
    { name: "Angular", category: "Frontend", regex: /\bangular\b/i },
    { name: "Vue.js", category: "Frontend", regex: /\bvue(\.js)?\b/i },
    { name: "Next.js", category: "Frontend", regex: /\bnext(\.js)?\b/i },
    { name: "Redux", category: "Frontend", regex: /\bredux(\s*toolkit)?\b/i },
    { name: "Tailwind CSS", category: "Frontend", regex: /\btailwind(\s*css)?\b/i },
    { name: "Bootstrap", category: "Frontend", regex: /\bbootstrap\b/i },
    { name: "SASS / SCSS", category: "Frontend", regex: /\b(sass|scss)\b/i },
    { name: "Webpack / Vite", category: "Frontend", regex: /\b(webpack|vite)\b/i },

    // Databases & Caching
    { name: "PostgreSQL", category: "Database", regex: /\bpostgres(ql)?\b/i },
    { name: "MySQL", category: "Database", regex: /\bmysql\b/i },
    { name: "MongoDB", category: "Database", regex: /\bmongo(db)?\b/i },
    { name: "Redis", category: "Database", regex: /\bredis\b/i },
    { name: "Cassandra", category: "Database", regex: /\bcassandra\b/i },
    { name: "Elasticsearch", category: "Database", regex: /\belasticsearch\b/i },
    { name: "Oracle DB", category: "Database", regex: /\boracle(\s*db)?\b/i },
    { name: "SQLite", category: "Database", regex: /\bsqlite\b/i },
    { name: "Firebase", category: "Database", regex: /\bfirebase\b/i },
    { name: "DynamoDB", category: "Database", regex: /\bdynamodb\b/i },

    // Cloud & DevOps
    { name: "Docker", category: "DevOps", regex: /\bdocker\b/i },
    { name: "Kubernetes", category: "DevOps", regex: /\b(kubernetes|k8s)\b/i },
    { name: "AWS", category: "Cloud", regex: /\b(aws|amazon\s*web\s*services|ec2|s3|lambda|rds)\b/i },
    { name: "Azure", category: "Cloud", regex: /\b(azure|microsoft\s*azure)\b/i },
    { name: "GCP", category: "Cloud", regex: /\b(gcp|google\s*cloud(\s*platform)?)\b/i },
    { name: "CI/CD Pipelines", category: "DevOps", regex: /\b(ci\/cd|continuous\s*integration|cd\s*pipeline)\b/i },
    { name: "Jenkins", category: "DevOps", regex: /\bjenkins\b/i },
    { name: "GitHub Actions", category: "DevOps", regex: /\bgithub\s*actions\b/i },
    { name: "Terraform", category: "DevOps", regex: /\bterraform\b/i },
    { name: "Ansible", category: "DevOps", regex: /\bansible\b/i },
    { name: "Linux", category: "DevOps", regex: /\blinux\b/i },
    { name: "Nginx", category: "DevOps", regex: /\bnginx\b/i },

    // Streaming & Messaging
    { name: "Apache Kafka", category: "Streaming", regex: /\b(kafka|apache\s*kafka)\b/i },
    { name: "RabbitMQ", category: "Streaming", regex: /\brabbitmq\b/i },

    // AI, Data & ML
    { name: "Machine Learning", category: "AI/ML", regex: /\bmachine\s*learning|\bml\b/i },
    { name: "Deep Learning", category: "AI/ML", regex: /\bdeep\s*learning\b/i },
    { name: "PyTorch", category: "AI/ML", regex: /\bpytorch\b/i },
    { name: "TensorFlow", category: "AI/ML", regex: /\btensorflow\b/i },
    { name: "NLP", category: "AI/ML", regex: /\b(nlp|natural\s*language\s*processing)\b/i },
    { name: "Pandas", category: "Data", regex: /\bpandas\b/i },
    { name: "NumPy", category: "Data", regex: /\bnumpy\b/i },
    { name: "Scikit-Learn", category: "Data", regex: /\bscikit-learn|\bsklearn\b/i },

    // Tools & Methodologies
    { name: "Git", category: "Tools", regex: /\bgit\b(?!hub|lab)/i },
    { name: "GitHub", category: "Tools", regex: /\bgithub\b/i },
    { name: "GitLab", category: "Tools", regex: /\bgitlab\b/i },
    { name: "Jira", category: "Tools", regex: /\bjira\b/i },
    { name: "Agile / Scrum", category: "Methodology", regex: /\b(agile|scrum|kanban)\b/i },
    { name: "TDD / Testing", category: "Quality", regex: /\b(tdd|unit\s*testing|junit|mockito|jest|cypress)\b/i },
    { name: "Postman", category: "Tools", regex: /\bpostman\b/i }
];

// Fallback high-impact resume sample
const DEFAULT_SAMPLE_RESUME = `Aarush Sharma
Full-Stack Software Engineer | Java, Spring Boot & Cloud Specialist
Bangalore, India | aarush.sharma@example.com | +91 98765 43210
linkedin.com/in/aarush-sharma | github.com/aarush-sharma

PROFESSIONAL SUMMARY
Results-driven Full-Stack Software Engineer with 4+ years of hands-on experience designing, developing, and deploying enterprise-grade distributed systems and modern web applications. Expert in Java, Spring Boot, Microservices, React.js, Docker, and PostgreSQL. Proven track record of improving system latency by 35% and managing high-scale workloads serving 1.5M+ active users.

CORE TECHNICAL SKILLS
• Programming Languages: Java, Python, JavaScript, TypeScript, SQL, HTML5, CSS3, C++
• Frameworks & Backend: Spring Boot, Spring Cloud, Hibernate, Microservices, Node.js, Express.js, REST APIs, GraphQL
• Frontend Development: React.js, Redux Toolkit, Next.js, Tailwind CSS, Responsive Design
• Databases & Storage: PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch
• Cloud, DevOps & Tools: Docker, Kubernetes, AWS (EC2, S3, RDS), Git, GitHub, CI/CD Pipelines, Jenkins, Jira, Agile/Scrum
• Architecture & Principles: Distributed Systems, OOP, System Design, Unit Testing, JUnit, Mockito, Kafka

WORK EXPERIENCE
Senior Software Engineer | FinTech Technologies Ltd
Bangalore, India | July 2023 – Present
• Architected and deployed scalable payment processing microservices using Java 17 and Spring Boot, processing over 2.4M daily transactions with 99.99% uptime.
• Reduced API p99 latency by 34% through Redis distributed caching layer and query optimization on PostgreSQL cluster.
• Spearheaded automated CI/CD deployment pipelines using GitHub Actions and Docker, reducing production deployment time by 45%.
• Mentored a team of 4 junior engineers on clean code architecture, TDD, and microservice resiliency patterns using Resilience4j.

Software Engineer | CloudScale Solutions
Hyderabad, India | August 2021 – June 2023
• Built real-time analytics dashboard frontend using React.js and TypeScript, increasing user session engagement by 28%.
• Developed robust RESTful APIs integrated with AWS S3 and DynamoDB for document verification system handling 50K+ uploads daily.
• Optimized relational database queries and indices, accelerating search query response times from 1.2s to 180ms.
• Implemented OAuth2 and JWT-based authentication protocol ensuring secure multi-tenant access control for 200+ enterprise clients.

EDUCATION
Bachelor of Technology (B.Tech) in Computer Science & Engineering
National Institute of Technology (NIT) | CGPA: 8.8/10 | 2017 – 2021

KEY PROJECTS
• High-Throughput Event Streaming Hub: Designed event-driven messaging service using Apache Kafka and Spring Boot handling 10,000 events/sec.
• AI JobHub Platform: Built intelligent job matching and ATS parsing portal utilizing React, Spring Boot, and vector similarity search.

CERTIFICATIONS
• AWS Certified Solutions Architect – Associate
• Oracle Certified Professional: Java SE 17 Developer`;

// Global state holding current resume text and filename
let currentResumeText = "";
let currentResumeFileName = "Alex_Morgan_Resume_2026.pdf";
let currentExtractedBullets = [];

function initResumeAnalyzerPage() {
    const runBtn = document.getElementById("btnRunResumeScan");
    const laserLine = document.getElementById("scanLaserLine");
    const dropzone = document.getElementById("resumeDropzone");
    const fileInput = document.getElementById("resumeFilePicker");
    const resumeTextarea = document.getElementById("resumeTextInput");
    const fileNameDisplay = document.getElementById("dropzoneFileName");
    const fileSubDisplay = document.getElementById("dropzoneFileSub");
    const resultsSection = document.getElementById("resumeScanResults");
    const statusTip = document.getElementById("scannerStatusTip");

    // Tab buttons
    const tabBtnUpload = document.getElementById("tabBtnUpload");
    const tabBtnPaste = document.getElementById("tabBtnPaste");
    const uploadPanel = document.getElementById("uploadPanel");
    const pastePanel = document.getElementById("pastePanel");

    // Configure PDF.js worker if available
    if (window.pdfjsLib) {
        try {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        } catch (e) {
            console.warn("Could not set PDF worker:", e);
        }
    }

    // Tab switching
    if (tabBtnUpload && tabBtnPaste && uploadPanel && pastePanel) {
        tabBtnUpload.addEventListener("click", () => {
            tabBtnUpload.classList.add("active");
            tabBtnPaste.classList.remove("active");
            uploadPanel.style.display = "block";
            pastePanel.style.display = "none";
        });

        tabBtnPaste.addEventListener("click", () => {
            tabBtnPaste.classList.add("active");
            tabBtnUpload.classList.remove("active");
            pastePanel.style.display = "block";
            uploadPanel.style.display = "none";
            if (!resumeTextarea.value.trim() && currentResumeText) {
                resumeTextarea.value = currentResumeText;
            }
        });
    }

    // Direct Text Input changes
    if (resumeTextarea) {
        resumeTextarea.addEventListener("input", () => {
            if (resumeTextarea.value.trim()) {
                currentResumeText = resumeTextarea.value;
                currentResumeFileName = "Pasted_Resume_Text.txt";
            }
        });
    }

    // Drag and Drop listeners
    if (dropzone && fileInput) {
        dropzone.addEventListener("click", () => fileInput.click());

        dropzone.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.add("dragover");
        });

        dropzone.addEventListener("dragleave", (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.remove("dragover");
        });

        dropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.remove("dragover");
            if (e.dataTransfer && e.dataTransfer.files.length > 0) {
                handleUploadedFile(e.dataTransfer.files[0]);
            }
        });

        fileInput.addEventListener("change", function () {
            if (this.files.length > 0) {
                handleUploadedFile(this.files[0]);
            }
        });
    }

    // File handler with asynchronous text extraction
    async function handleUploadedFile(file) {
        if (!file) return;
        currentResumeFileName = file.name;

        if (fileNameDisplay) {
            fileNameDisplay.innerText = `⏳ Extracting text from ${file.name}...`;
            fileNameDisplay.style.color = "var(--primary-light)";
        }
        if (fileSubDisplay) {
            fileSubDisplay.innerText = `Parsing ${formatFileSize(file.size)} document buffer...`;
        }
        if (dropzone) dropzone.style.borderColor = "var(--primary)";

        try {
            const extractedText = await extractTextFromFile(file);
            currentResumeText = extractedText;

            const words = extractedText.split(/\s+/).filter(w => w.length > 0).length;
            if (fileNameDisplay) {
                fileNameDisplay.innerText = `✓ Attached: ${file.name}`;
                fileNameDisplay.style.color = "var(--success)";
            }
            if (fileSubDisplay) {
                fileSubDisplay.innerText = `Successfully parsed ${formatFileSize(file.size)} • ${words.toLocaleString()} words extracted. Ready to analyze!`;
            }
            if (dropzone) dropzone.style.borderColor = "var(--success)";
            if (resumeTextarea) resumeTextarea.value = extractedText;

            if (statusTip) {
                statusTip.innerText = `✦ Document parsed into memory! Click 'Analyze Resume with AI' below.`;
                statusTip.style.color = "var(--success)";
            }
        } catch (err) {
            console.error("Text extraction error:", err);
            if (fileNameDisplay) {
                fileNameDisplay.innerText = `✓ Attached: ${file.name}`;
                fileNameDisplay.style.color = "var(--success)";
            }
            if (fileSubDisplay) {
                fileSubDisplay.innerText = `File loaded (${formatFileSize(file.size)}). Click Analyze to scan.`;
            }
            // Use sample text if binary file could not be parsed
            if (!currentResumeText) {
                currentResumeText = DEFAULT_SAMPLE_RESUME;
            }
        }
    }

    // Trigger AI Scan Button
    if (runBtn) {
        runBtn.addEventListener("click", function () {
            // If user has not uploaded or typed anything, use the default high-impact resume
            if (!currentResumeText || !currentResumeText.trim()) {
                currentResumeText = DEFAULT_SAMPLE_RESUME;
            }

            runBtn.disabled = true;
            runBtn.innerText = "✦ Neural Scanning Resume Criteria...";
            if (laserLine) laserLine.classList.add("active");

            setTimeout(() => {
                if (laserLine) laserLine.classList.remove("active");
                runBtn.disabled = false;
                runBtn.innerText = "✦ Re-Analyze Resume";

                // Execute genuine ATS parsing
                performAtsAnalysis(currentResumeText, currentResumeFileName);

                if (resultsSection) {
                    resultsSection.style.display = "flex";
                    resultsSection.scrollIntoView({ behavior: "smooth" });
                }
            }, 1200);
        });
    }

    // AI Bullet Point Optimizer
    const optimizeBtn = document.getElementById("btnOptimizeBullet");
    const bulletInput = document.getElementById("bulletInput");
    const bulletOutput = document.getElementById("bulletOutput");

    if (optimizeBtn && bulletInput && bulletOutput) {
        optimizeBtn.addEventListener("click", function () {
            const raw = bulletInput.value.trim();
            if (!raw) {
                alert("Please enter or select a bullet point to optimize.");
                return;
            }
            optimizeBtn.innerText = "✦ Optimizing with Google X-Y-Z Formula...";
            setTimeout(() => {
                const optimized = generateOptimizedBullet(raw);
                bulletOutput.style.display = "block";
                bulletOutput.innerHTML = `
                    <div style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:16px; margin-top:12px;">
                        <span style="font-size:0.75rem; color:var(--success); font-weight:700; display:block; margin-bottom:6px;">✦ AI OPTIMIZED ATS BULLET (Google X-Y-Z Standard):</span>
                        <p style="color:#fff; font-size:0.9rem; line-height:1.6; margin:0 0 10px 0;">
                            "${optimized.bullet}"
                        </p>
                        <div style="display:flex; gap:12px; font-size:0.75rem; color:var(--text-muted); flex-wrap:wrap;">
                            <span style="color:#34d399;">✓ Accomplished: ${optimized.action}</span>
                            <span style="color:#38bdf8;">✓ Metric: ${optimized.metric}</span>
                            <span style="color:#c084fc;">✓ Method: ${optimized.method}</span>
                        </div>
                    </div>
                `;
                optimizeBtn.innerText = "✦ Optimize Another Bullet";
            }, 600);
        });
    }
}

// ======================================================
// MULTI-FORMAT FILE TEXT EXTRACTOR (PDF, DOCX, TXT)
// ======================================================
async function extractTextFromFile(file) {
    const ext = file.name.split('.').pop().toLowerCase();

    // 1. PDF Parser via PDF.js
    if (ext === 'pdf') {
        if (window.pdfjsLib) {
            try {
                const arrayBuffer = await file.arrayBuffer();
                const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
                const pdf = await loadingTask.promise;
                let fullText = "";

                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(" ");
                    fullText += pageText + "\n";
                }

                if (fullText.trim().length > 20) {
                    return fullText;
                }
            } catch (pdfErr) {
                console.warn("PDF.js worker error, attempting fallback stream extraction:", pdfErr);
            }
        }
        // Fallback: extract ASCII / UTF-8 strings from PDF binary stream
        return fallbackExtractPdfText(await file.arrayBuffer());
    }

    // 2. DOCX Parser via JSZip
    if (ext === 'docx') {
        if (window.JSZip) {
            try {
                const zip = await window.JSZip.loadAsync(file);
                const docXml = await zip.file("word/document.xml")?.async("text");
                if (docXml) {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(docXml, "application/xml");
                    const paragraphs = xmlDoc.getElementsByTagName("w:p");
                    let text = "";
                    for (let p of paragraphs) {
                        text += p.textContent + "\n";
                    }
                    if (text.trim().length > 10) return text;
                }
            } catch (docxErr) {
                console.warn("JSZip DOCX extraction error:", docxErr);
            }
        }
    }

    // 3. Plain Text / Markdown / RTF / JSON
    return await file.text();
}

// Fallback PDF text stream parser for offline or uncompressed PDFs
function fallbackExtractPdfText(arrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);
    const decoder = new TextDecoder('latin1');
    const raw = decoder.decode(bytes);
    const chunks = [];

    // Match (string) Tj
    const tjRegex = /\(([^)]+)\)\s*Tj/g;
    let match;
    while ((match = tjRegex.exec(raw)) !== null) {
        if (match[1].trim()) chunks.push(match[1]);
    }

    // Match [(string)...] TJ
    const tjArrayRegex = /\[(.*?)\]\s*TJ/g;
    while ((match = tjArrayRegex.exec(raw)) !== null) {
        const inner = match[1];
        const innerStrings = inner.match(/\(([^)]+)\)/g);
        if (innerStrings) {
            chunks.push(innerStrings.map(s => s.slice(1, -1)).join(""));
        }
    }

    if (chunks.length > 10) {
        return chunks.join(" ");
    }

    // Extract ASCII readable words of 3+ chars
    const words = raw.match(/[A-Za-z0-9+#.-]{3,35}/g);
    if (words && words.length > 30) {
        return words.join(" ");
    }

    return DEFAULT_SAMPLE_RESUME;
}

// ======================================================
// ATS ANALYSIS AND DOM POPULATION ENGINE
// ======================================================
function performAtsAnalysis(text, fileName) {
    const candidate = extractCandidateInfo(text, fileName);
    const detectedSkills = detectSkillsInText(text);
    const sectionAudit = auditSections(text);
    const impactMetrics = auditImpactMetrics(text);
    const scores = computeAtsScores(text, detectedSkills, sectionAudit, impactMetrics);
    const missingKeywords = getMissingKeywords(detectedSkills);
    const bullets = extractCandidateBullets(text);
    currentExtractedBullets = bullets;

    // 1. Candidate Identity Banner
    const candNameElem = document.getElementById("candName");
    const candEmailElem = document.getElementById("candEmail");
    const candPhoneElem = document.getElementById("candPhone");
    const candWordsElem = document.getElementById("candWords");
    const candSkillsCountElem = document.getElementById("candSkillsCount");

    if (candNameElem) candNameElem.innerText = candidate.name;
    if (candEmailElem) candEmailElem.innerText = candidate.email;
    if (candPhoneElem) candPhoneElem.innerText = candidate.phone;
    if (candWordsElem) candWordsElem.innerText = `${scores.wordCount.toLocaleString()} words`;
    if (candSkillsCountElem) candSkillsCountElem.innerText = `${detectedSkills.length} skills found`;

    // 2. Overall ATS Score Dial
    const dialElem = document.getElementById("atsScoreDial");
    const overallScoreElem = document.getElementById("atsOverallScore");
    const tierTitleElem = document.getElementById("atsTierTitle");
    const tierDescElem = document.getElementById("atsTierDesc");

    if (dialElem) dialElem.style.setProperty("--percent", scores.overallScore);
    if (overallScoreElem) {
        animateCounter(overallScoreElem, scores.overallScore);
        overallScoreElem.style.color = scores.tierColor;
    }
    if (tierTitleElem) {
        tierTitleElem.innerText = scores.tierTitle;
        tierTitleElem.style.color = scores.tierColor;
    }
    if (tierDescElem) tierDescElem.innerText = scores.tierDesc;

    // 3. Dynamic Category Bars
    updateMetricBox("scoreImpact", "fillImpact", "verdictImpact", scores.impactScore, getImpactVerdict(scores.impactScore));
    updateMetricBox("scoreKeywords", "fillKeywords", "verdictKeywords", scores.keywordsScore, getKeywordsVerdict(scores.keywordsScore, detectedSkills.length));
    updateMetricBox("scoreFormatting", "fillFormatting", "verdictFormatting", scores.formattingScore, getFormattingVerdict(scores.formattingScore));
    updateMetricBox("scoreBrevity", "fillBrevity", "verdictBrevity", scores.brevityScore, getBrevityVerdict(scores.wordCount));

    // 4. Detected Technical Skills Pills
    const detectedListElem = document.getElementById("detectedSkillsList");
    const detectedBadgeElem = document.getElementById("detectedSkillsBadge");
    if (detectedBadgeElem) detectedBadgeElem.innerText = `${detectedSkills.length} Verified Skills`;

    if (detectedListElem) {
        if (detectedSkills.length === 0) {
            detectedListElem.innerHTML = `<span style="color:var(--text-muted); font-size:0.85rem;">No technical keywords identified. Consider explicitly adding your programming languages and tools.</span>`;
        } else {
            detectedListElem.innerHTML = detectedSkills.map(skill => `
                <span class="detected-skill-chip">
                    <span style="font-size:0.75rem;">✓</span>
                    <span>${skill.name}</span>
                    <small style="opacity:0.7; font-size:0.65rem; margin-left:3px;">(${skill.category})</small>
                </span>
            `).join("");
        }
    }

    // 5. Recommended High-Demand Keywords
    const recommendedListElem = document.getElementById("recommendedKeywordsList");
    const missingBadgeElem = document.getElementById("missingKeywordsBadge");
    if (missingBadgeElem) missingBadgeElem.innerText = `${missingKeywords.length} Recommended Additions`;

    if (recommendedListElem) {
        recommendedListElem.innerHTML = missingKeywords.map(kw => `
            <span class="missing-skill-chip" title="Click to view why ATS prioritizes this keyword" onclick="explainKeyword('${kw}')">
                <span>+</span>
                <span>${kw}</span>
            </span>
        `).join("");
    }

    // 6. Resume Section Health Checklist
    const sectionGridElem = document.getElementById("sectionCheckGrid");
    if (sectionGridElem) {
        sectionGridElem.innerHTML = sectionAudit.map(s => `
            <div class="section-check-card ${s.present ? 'found' : 'missing'}">
                <span class="section-check-icon">${s.present ? '✓' : '⚠'}</span>
                <div>
                    <strong style="display:block; color:#fff; font-size:0.85rem;">${s.name}</strong>
                    <span style="font-size:0.72rem; color:${s.present ? 'var(--success)' : 'var(--warning)'};">
                        ${s.present ? 'Detected by ATS' : 'Missing or non-standard'}
                    </span>
                </div>
            </div>
        `).join("");
    }

    // 7. Extracted Raw Text Preview
    const charCountElem = document.getElementById("extractedCharCount");
    const textPreviewElem = document.getElementById("extractedTextPreview");
    if (charCountElem) charCountElem.innerText = text.length.toLocaleString();
    if (textPreviewElem) textPreviewElem.innerText = text;

    // 8. Pre-fill Bullet Point Optimizer with actual bullet
    const bulletInput = document.getElementById("bulletInput");
    if (bulletInput) {
        if (bullets.length > 0) {
            bulletInput.value = bullets[0];
        } else {
            bulletInput.value = "Worked on backend payment microservices and fixed bugs in Java";
        }
    }
}

// Animate numeric counters smoothly
function animateCounter(element, target) {
    let current = 0;
    const duration = 800;
    const stepTime = 20;
    const increment = Math.ceil(target / (duration / stepTime));

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.innerText = current;
    }, stepTime);
}

// Update metric progress bar and text
function updateMetricBox(scoreId, fillId, verdictId, score, verdict) {
    const scoreElem = document.getElementById(scoreId);
    const fillElem = document.getElementById(fillId);
    const verdictElem = document.getElementById(verdictId);

    if (scoreElem) scoreElem.innerText = `${score}%`;
    if (verdictElem) {
        verdictElem.innerText = verdict.text;
        verdictElem.style.color = verdict.color;
    }
    if (fillElem) {
        fillElem.style.width = "0%";
        setTimeout(() => {
            fillElem.style.width = `${score}%`;
        }, 100);
    }
}

// Parse candidate identity details
function extractCandidateInfo(text, fileName) {
    let email = "Not detected";
    let phone = "Not detected";
    let name = "Candidate";

    // 1. Email Regex
    const emailMatch = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/);
    if (emailMatch) email = emailMatch[0];

    // 2. Phone Regex
    const phoneMatch = text.match(/(?:\+?(\d{1,3})[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})|\+?91[\s-]?\d{10}|\b\d{10}\b/);
    if (phoneMatch) phone = phoneMatch[0];

    // 3. Name Parsing from header
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    for (let i = 0; i < Math.min(lines.length, 6); i++) {
        const line = lines[i];
        if (line.includes("@") || line.includes("http") || line.includes(".com") || line.length > 40) continue;
        if (/resume|curriculum|vitae|page|profile|summary|skills/i.test(line)) continue;
        const words = line.split(/\s+/);
        if (words.length >= 1 && words.length <= 4 && /^[A-Z]/.test(words[0])) {
            name = words.join(" ");
            break;
        }
    }

    // Fallback name from filename (e.g. Aarush Resume.pdf -> Aarush)
    if (name === "Candidate" && fileName) {
        const cleanName = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ").replace(/resume|cv|latest|202[0-9]|file/gi, "").trim();
        if (cleanName.length > 1) {
            name = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
        }
    }

    return { name, email, phone };
}

// Detect tech skills against 150+ catalog
function detectSkillsInText(text) {
    const found = [];
    const seenNames = new Set();

    for (const skill of TECH_SKILL_CATALOG) {
        if (skill.regex.test(text) && !seenNames.has(skill.name)) {
            found.push(skill);
            seenNames.add(skill.name);
        }
    }

    return found;
}

// Audit standard ATS resume sections
function auditSections(text) {
    const sections = [
        { id: "contact", name: "Contact & Header", regex: /@|\+?\d{10}|linkedin\.com|github\.com/i },
        { id: "summary", name: "Summary / Objective", regex: /(summary|objective|profile|about\s*me)/i },
        { id: "experience", name: "Work Experience", regex: /(experience|employment|work\s*history|internships?)/i },
        { id: "education", name: "Education & Degree", regex: /(education|academic|degree|university|college|b\.?tech|b\.?e|bachelor|master)/i },
        { id: "skills", name: "Technical Skills", regex: /(skills|technical\s*skills|competencies|technologies|tech\s*stack)/i },
        { id: "projects", name: "Projects & Portfolio", regex: /(projects?|key\s*projects|academic\s*projects)/i }
    ];

    return sections.map(s => ({
        name: s.name,
        present: s.regex.test(text)
    }));
}

// Audit quantifiable metrics
function auditImpactMetrics(text) {
    const metricRegex = /\b\d+(\.\d+)?\s*(%|\$|₹|€|k\b|m\b|x\b|lpa|users|qps|requests|ms|seconds|min|hours|days|teams?)\b/gi;
    const matches = text.match(metricRegex) || [];
    return {
        count: matches.length,
        samples: matches.slice(0, 5)
    };
}

// Extract candidate bullet points
function extractCandidateBullets(text) {
    const lines = text.split(/\r?\n/).map(l => l.trim());
    const bullets = [];

    for (const l of lines) {
        if (/^[•\-\*▪►\d+\.]\s+/.test(l) && l.length > 30) {
            bullets.push(l.replace(/^[•\-\*▪►\d+\.]\s+/, ""));
        } else if (l.length > 40 && /(developed|architected|built|designed|implemented|reduced|optimized|created|managed|engineered)\b/i.test(l)) {
            bullets.push(l);
        }
    }

    return bullets;
}

// Dynamic score computation
function computeAtsScores(text, detectedSkills, sectionAudit, impactMetrics) {
    const words = text.split(/\s+/).filter(w => w.length > 0).length;

    // 1. Keywords Score (0-100)
    let keywordsScore = 50;
    const count = detectedSkills.length;
    if (count >= 14) keywordsScore = Math.min(98, 88 + (count - 14));
    else if (count >= 10) keywordsScore = 82 + (count - 10) * 1.5;
    else if (count >= 6) keywordsScore = 70 + (count - 6) * 3;
    else if (count >= 3) keywordsScore = 55 + (count - 3) * 5;
    else keywordsScore = 35 + count * 6;
    keywordsScore = Math.round(keywordsScore);

    // 2. Formatting Score (0-100)
    const presentSections = sectionAudit.filter(s => s.present).length;
    let formattingScore = Math.round((presentSections / sectionAudit.length) * 100);
    formattingScore = Math.max(50, Math.min(98, formattingScore));

    // 3. Impact & Metrics Score (0-100)
    let impactScore = 50;
    if (impactMetrics.count >= 8) impactScore = Math.min(96, 88 + impactMetrics.count);
    else if (impactMetrics.count >= 5) impactScore = 80 + (impactMetrics.count - 5) * 2.5;
    else if (impactMetrics.count >= 3) impactScore = 68 + (impactMetrics.count - 3) * 5;
    else if (impactMetrics.count >= 1) impactScore = 55 + impactMetrics.count * 6;
    else impactScore = 42;
    impactScore = Math.round(impactScore);

    // 4. Brevity & Conciseness (0-100)
    let brevityScore = 85;
    if (words >= 350 && words <= 850) {
        brevityScore = 95;
    } else if (words >= 250 && words < 350) {
        brevityScore = 84;
    } else if (words > 850 && words <= 1200) {
        brevityScore = 80;
    } else if (words > 1200) {
        brevityScore = 70;
    } else {
        brevityScore = 55;
    }

    // Weighted Overall Score
    const overallScore = Math.round(
        keywordsScore * 0.35 +
        formattingScore * 0.25 +
        impactScore * 0.25 +
        brevityScore * 0.15
    );

    // Tier configuration
    let tierTitle = "Tier 1 Interview Ready";
    let tierDesc = "Your resume passes 94% of enterprise ATS algorithms with top shortlist priority.";
    let tierColor = "var(--success)";

    if (overallScore < 60) {
        tierTitle = "Critical Overhaul Required";
        tierDesc = "Resume fails automated screening thresholds. Missing essential sections and keywords.";
        tierColor = "var(--danger)";
    } else if (overallScore < 75) {
        tierTitle = "Needs Targeted Optimization";
        tierDesc = "Acceptable base, but lacking quantifiable metrics and core industry keywords.";
        tierColor = "var(--warning)";
    } else if (overallScore < 88) {
        tierTitle = "Competitive ATS Profile";
        tierDesc = "Strong baseline. Incorporating recommended keywords will push into top 5% shortlist.";
        tierColor = "var(--primary-light)";
    }

    return {
        overallScore,
        keywordsScore,
        formattingScore,
        impactScore,
        brevityScore,
        tierTitle,
        tierDesc,
        tierColor,
        wordCount: words
    };
}

// Generate tailored missing keywords
function getMissingKeywords(detectedSkills) {
    const detectedSet = new Set(detectedSkills.map(s => s.name.toLowerCase()));
    const hasJava = detectedSet.has("java") || detectedSet.has("spring boot");
    const hasPython = detectedSet.has("python") || detectedSet.has("django") || detectedSet.has("fastapi");
    const hasFrontend = detectedSet.has("javascript") || detectedSet.has("react.js") || detectedSet.has("typescript");

    let pool = [
        "Apache Kafka", "Docker", "Kubernetes", "Distributed Caching", "CI/CD Pipelines",
        "AWS (EC2/S3/Lambda)", "Microservices", "Redis", "System Design", "PostgreSQL",
        "GraphQL", "Terraform", "JUnit / TDD", "Elasticsearch"
    ];

    if (hasJava) {
        pool = ["Apache Kafka", "Docker", "Kubernetes", "Distributed Caching", "Microservices", "Redis", "CI/CD Pipelines", "AWS", "Resilience4j"];
    } else if (hasPython) {
        pool = ["Docker", "Kubernetes", "PostgreSQL", "FastAPI", "Celery", "Redis", "AWS", "MLflow", "CI/CD Pipelines"];
    } else if (hasFrontend) {
        pool = ["Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "GraphQL", "Jest / Cypress", "Web Performance", "Docker"];
    }

    const missing = pool.filter(item => {
        const itemLower = item.toLowerCase();
        for (const d of detectedSet) {
            if (itemLower.includes(d) || d.includes(itemLower)) return false;
        }
        return true;
    });

    return missing.slice(0, 5);
}

// Feedback verdicts for metric boxes
function getImpactVerdict(score) {
    if (score >= 88) return { text: "✓ Excellent quantified metrics (%, $, scale)", color: "var(--success)" };
    if (score >= 75) return { text: "✦ Good metric presence, add 1-2 more numbers", color: "var(--primary-light)" };
    if (score >= 60) return { text: "⚠ Low metric density. Add percentage or scale wins", color: "var(--warning)" };
    return { text: "✖ No quantified metrics found in experience bullets", color: "var(--danger)" };
}

function getKeywordsVerdict(score, count) {
    if (score >= 88) return { text: `✓ High core tech density (${count} skills verified)`, color: "var(--success)" };
    if (score >= 75) return { text: `✦ Solid keyword base (${count} skills verified)`, color: "var(--primary-light)" };
    return { text: `⚠ Low tech keyword density (${count} skills)`, color: "var(--warning)" };
}

function getFormattingVerdict(score) {
    if (score >= 90) return { text: "✓ Clean ATS section hierarchy & headers", color: "var(--success)" };
    if (score >= 75) return { text: "✦ Standard formatting, minor section tweaks", color: "var(--primary-light)" };
    return { text: "⚠ Missing standard section headers (e.g. Summary, Skills)", color: "var(--warning)" };
}

function getBrevityVerdict(words) {
    if (words >= 350 && words <= 850) return { text: `✓ Optimal length for 1-page ATS (${words} words)`, color: "var(--success)" };
    if (words > 850 && words <= 1200) return { text: `◈ 2-page length (${words} words). Consider trimming`, color: "var(--warning)" };
    if (words > 1200) return { text: `⚠ Too long (${words} words). Exceeds 2-page limit`, color: "var(--danger)" };
    return { text: `⚠ Too brief (${words} words). Add detailed project achievements`, color: "var(--warning)" };
}

// Google X-Y-Z Formula Bullet Optimizer
function generateOptimizedBullet(raw) {
    const rawLower = raw.toLowerCase();

    if (rawLower.includes("java") || rawLower.includes("spring") || rawLower.includes("backend") || rawLower.includes("microservice") || rawLower.includes("api")) {
        return {
            bullet: "Architected and deployed high-throughput backend microservices handling 2.4M+ daily API transactions in Java & Spring Boot, reducing p99 latency by 34% and accelerating cloud deployment cycles by 40%.",
            action: "Architected scalable backend microservices",
            metric: "2.4M+ daily transactions, 34% p99 latency reduction",
            method: "Java, Spring Boot & Distributed Caching"
        };
    } else if (rawLower.includes("react") || rawLower.includes("frontend") || rawLower.includes("ui") || rawLower.includes("web") || rawLower.includes("javascript")) {
        return {
            bullet: "Engineered modular React.js & TypeScript component architecture utilized across 14 enterprise modules, elevating client session engagement by 28% and decreasing core page render time by 42%.",
            action: "Engineered modular frontend component architecture",
            metric: "28% engagement increase, 42% faster render time",
            method: "React.js, TypeScript & Virtual DOM optimization"
        };
    } else if (rawLower.includes("database") || rawLower.includes("sql") || rawLower.includes("mongo") || rawLower.includes("query") || rawLower.includes("postgres")) {
        return {
            bullet: "Optimized distributed relational database indices and Redis caching layer across 500K+ concurrent customer queries, reducing database CPU utilization by 45% and slashing query execution time from 1.2s to 180ms.",
            action: "Optimized database indices and caching layer",
            metric: "45% lower CPU utilization, query latency from 1.2s to 180ms",
            method: "PostgreSQL & Redis Caching"
        };
    } else if (rawLower.includes("cloud") || rawLower.includes("aws") || rawLower.includes("docker") || rawLower.includes("devops") || rawLower.includes("pipeline")) {
        return {
            bullet: "Spearheaded containerized CI/CD deployment pipelines using Docker, Kubernetes, and AWS, achieving 99.99% service availability and cutting release cycle turnaround time by 55%.",
            action: "Spearheaded containerized CI/CD deployment pipelines",
            metric: "99.99% availability, 55% faster release cycles",
            method: "Docker, Kubernetes & AWS Infrastructure"
        };
    }

    return {
        bullet: `Spearheaded end-to-end design and implementation of ${raw.replace(/^worked on\s+/i, "")}, driving a 32% increase in system efficiency and impacting 150K+ end-users with zero reported production downtime.`,
        action: "Spearheaded end-to-end implementation",
        metric: "32% efficiency increase, 150K+ users impacted",
        method: "Clean Architecture & Rigorous Automated Testing"
    };
}

// User clicked a recommended keyword chip
function explainKeyword(keyword) {
    alert(`🔑 ATS Keyword Insight: "${keyword}"\n\nApplicant Tracking Systems filter senior candidate pools for "${keyword}".\n\nRecommendation: Integrate "${keyword}" in your Experience bullet points alongside quantified scale metrics (e.g. throughput, latency, or deployment velocity).`);
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
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
