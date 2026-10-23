# ✦ JobHub AI — Next-Generation Intelligent Career Portal

> **JobHub AI** is an AI-powered job matching, candidate evaluation, and career intelligence platform designed with a modern purple neon dark glassmorphic design system and high-velocity moving elements. Built purely using **Java**, **JavaScript**, **HTML5**, and **CSS3**.

---

## 🌟 Key Features & AI Suite

### 1. 🎯 AI Job Matcher (`pages/ai-matcher.html`)
- Multi-dimensional semantic alignment engine comparing candidate profile skills against active job postings.
- Dynamic **neural radar sweep animation** with real-time status updates and confidence percentage gauges.
- Provides granular breakdown: *"Why AI Picked This"*, matched skills, and priority criteria.

### 2. ▤ ATS Resume Analyzer (`pages/resume-analyzer.html`)
- Automated Applicant Tracking System (ATS) benchmark scanner.
- **Cybernetic laser scanning line animation** traveling across uploaded resume previews.
- Calculates an ATS Score out of 100 with category meters for *Impact & Metrics*, *Keywords & Tech*, *ATS Hierarchy*, and *Brevity*.
- Interactive **AI Bullet Point Optimizer** using the Google X-Y-Z formula.

### 3. ◈ AI Skill Gap Analysis (`pages/skill-gap.html`)
- Career transition roadmap tool for roles like *Lead Full Stack Architect*, *Senior AI/ML Engineer*, and *Principal Cloud DevOps Engineer*.
- Three-tier competency breakdown: **Mastered** (Green), **In-Progress** (Yellow), and **Critical Missing** (Purple).
- Generates an actionable **6-Month Milestones Roadmap** with curated technical topics.

### 4. ☼ AI Career Coach & Assistant (`pages/career-assistant.html`)
- Interactive real-time conversational AI coach.
- Ambient glowing AI avatar with online status pulse.
- One-click prompt starters for mock interview prep, compensation negotiations, and resume tuning.
- Real-time **typewriter text generation effect** with streaming indicators.

### 5. ⌕ Intelligent Job Catalog (`pages/job.html` & `pages/job-detail.html`)
- Search by keywords, title, skills, or location.
- Multi-factor filtering: Workplace (Remote, Hybrid, On-site), Minimum Salary slider (LPA), Experience, and Category pills.
- Deep-dive Job Detail page with salary benchmark, key requirements, and **Easy Apply Modal** with resume attachment.

### 6. ▣ Applications Kanban Pipeline (`pages/application.html`)
- Live application status board across four stages: **Applied**, **Screening**, **Interviewing**, and **Offers Received**.
- Real-time application submission from any job card or detail view.

### 7. ♡ Bookmarked / Saved Jobs (`pages/saved-jobs.html`)
- Interactive heart bookmarking system with instant persistence.

### 8. ▦ Top Tech Companies (`pages/companies.html`)
- Employer directory featuring Microsoft, Google, Amazon, Adobe, Razorpay, Flipkart with culture tags, ratings, and active open requisitions.

### 9. ♙ Candidate Profile Portfolio (`pages/profile.html`)
- Candidate personal details, headline, bio, avatar, and experience timeline.
- Interactive **Skills Manager**: add skills via enter key or suggested chips, remove pills with one-click, triggering live **Profile Strength Meter** recalculation.

### 10. 🔐 Authentication Flow (`pages/login.html` & `pages/signup.html`)
- Role selector (*Job Seeker* vs *Recruiter*).
- Live animated **Password Strength Bar** (Weak, Fair, Good, Strong).
- Session storage with seamless redirection into the Candidate Dashboard.

---

## 💻 Tech Stack (Strictly Enforced)

- **Java** (Java 25 LTS Standard Library): Standalone REST API and web server using `com.sun.net.httpserver.HttpServer`. Zero external Maven/Gradle dependencies required.
- **JavaScript (ES6+)**: Custom dynamic UI logic, particle systems, neural sweep animations, simulated streaming responses, search filtering, and state persistence.
- **CSS3**: Vanilla CSS with custom properties (`--primary: #8b5cf6`), glassmorphism, animated floating orbs, cybernetic laser lines, and responsive layout.
- **HTML5**: Semantic web architecture with descriptive IDs, accessible tags, and clean component structures.

---

## 🚀 How to Run

### Option 1: Standalone Java Server (Full Stack Mode)
Run the built-in Java server to host both the REST API and the Frontend on `http://localhost:8080/`:

```bash
# 1. Compile Java sources
javac -encoding UTF-8 -d Backend/bin -sourcepath Backend/src Backend/src/com/jobhub/ai/Main.java

# 2. Start the server
java -cp Backend/bin com.jobhub.ai.Main
```
Open **`http://localhost:8080/`** in your browser.

### Option 2: Direct Static Browser Mode
Simply open **`FrontEnd/index.html`** in any web browser. All pages, state persistence (`localStorage`), AI matchers, and moving animations work out of the box!

---

## 📁 Repository Structure

```
├── Backend/
│   ├── build.bat
│   ├── run.bat
│   └── src/com/jobhub/ai/
│       ├── Main.java
│       ├── handler/
│       │   ├── ApiHandler.java
│       │   └── StaticFileHandler.java
│       ├── model/
│       │   ├── Application.java
│       │   ├── Job.java
│       │   └── User.java
│       └── service/
│           ├── AiService.java
│           └── JobService.java
├── FrontEnd/
│   ├── index.html
│   ├── css/
│   │   ├── ai.css
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   ├── job.css
│   │   ├── profile.css
│   │   └── style.css
│   ├── js/
│   │   ├── ai.js
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── jobs.js
│   │   ├── profile.js
│   │   └── script.js
│   └── pages/
│       ├── ai-matcher.html
│       ├── application.html
│       ├── career-assistant.html
│       ├── companies.html
│       ├── dashboard.html
│       ├── job-detail.html
│       ├── job.html
│       ├── login.html
│       ├── profile.html
│       ├── resume-analyzer.html
│       ├── saved-jobs.html
│       ├── signup.html
│       └── skill-gap.html
└── README.md
```

---

## ✦ Design Aesthetics
- **Color Palette**: Neon Violet (`#8b5cf6`), Deep Dark (`#050508`, `#0a0a12`, `#131322`), Bright Emerald (`#10b981`), Cyber Blue (`#38bdf8`), and High-Contrast White (`#f8fafc`).
- **Moving Elements**: Continuous floating ambient background orbs, particle physics on landing, rotating neural radar beam on AI Matcher, cybernetic laser line scanner on Resume Analyzer, and live typewriter stream on AI Career Coach.
