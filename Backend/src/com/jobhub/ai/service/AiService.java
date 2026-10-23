package com.jobhub.ai.service;

import com.jobhub.ai.model.Job;

import java.util.*;

/**
 * Service providing Semantic AI Matching, ATS Resume Scoring, and Career Assistant
 */
public class AiService {

    public int calculateMatchScore(List<String> candidateSkills, Job job) {
        if (candidateSkills == null || candidateSkills.isEmpty()) {
            return 70; // baseline
        }

        Set<String> candSet = new HashSet<>();
        for (String s : candidateSkills) {
            candSet.add(s.trim().toLowerCase());
        }

        int matchedCount = 0;
        for (String reqSkill : job.getSkills()) {
            if (candSet.contains(reqSkill.trim().toLowerCase())) {
                matchedCount++;
            }
        }

        double ratio = (double) matchedCount / Math.max(1, job.getSkills().size());
        int computedScore = (int) (65 + (ratio * 33));
        return Math.min(99, Math.max(50, computedScore));
    }

    public String analyzeResumeText(String resumeText) {
        String text = (resumeText != null) ? resumeText.toLowerCase() : "";
        int wordCount = text.isEmpty() ? 0 : text.split("\\s+").length;

        // Skill dictionary
        String[] allSkills = {
            "Java", "Python", "JavaScript", "TypeScript", "C++", "C#", "Go", "Rust", "SQL",
            "Spring Boot", "Hibernate", "Node.js", "Express", "Django", "FastAPI", "React",
            "Angular", "Vue", "Next.js", "Redux", "Docker", "Kubernetes", "AWS", "Azure",
            "GCP", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka", "Microservices",
            "REST APIs", "GraphQL", "Git", "CI/CD", "Linux"
        };

        List<String> detectedSkills = new ArrayList<>();
        for (String skill : allSkills) {
            String sLower = skill.toLowerCase();
            if (text.contains(sLower)) {
                detectedSkills.add(skill);
            }
        }

        // Section presence
        boolean hasSummary = text.contains("summary") || text.contains("objective");
        boolean hasExperience = text.contains("experience") || text.contains("employment");
        boolean hasEducation = text.contains("education") || text.contains("degree") || text.contains("college");
        boolean hasSkills = text.contains("skill") || text.contains("technology");
        boolean hasProjects = text.contains("project");

        int sectionsFound = (hasSummary ? 1 : 0) + (hasExperience ? 1 : 0) + (hasEducation ? 1 : 0) + (hasSkills ? 1 : 0) + (hasProjects ? 1 : 0);
        int formattingScore = Math.min(98, Math.max(50, (sectionsFound * 18) + 10));

        // Keywords score based on detected skills
        int keywordsScore = Math.min(98, Math.max(45, 50 + (detectedSkills.size() * 3)));

        // Metrics presence (% or numbers)
        int metricCount = 0;
        java.util.regex.Matcher m = java.util.regex.Pattern.compile("\\b\\d+(\\.\\d+)?\\s*(%|\\$|lpa|k|m|users|ms)\\b").matcher(text);
        while (m.find()) metricCount++;
        int impactScore = Math.min(98, Math.max(45, 55 + (metricCount * 5)));

        // Brevity score
        int brevityScore = (wordCount >= 350 && wordCount <= 850) ? 94 : 80;

        // Overall ATS score
        int overallScore = (int) Math.round((keywordsScore * 0.35) + (formattingScore * 0.25) + (impactScore * 0.25) + (brevityScore * 0.15));
        String rating = overallScore >= 85 ? "Tier 1 Interview Ready" : (overallScore >= 70 ? "Competitive Profile" : "Needs Optimization");

        // Missing recommendations
        List<String> missing = new ArrayList<>();
        String[] topKeywords = {"Kafka", "Kubernetes", "Docker", "Microservices", "Distributed Caching", "CI/CD Pipelines", "AWS", "Redis"};
        for (String kw : topKeywords) {
            if (!text.contains(kw.toLowerCase()) && missing.size() < 4) {
                missing.add(kw);
            }
        }

        StringBuilder sb = new StringBuilder("{");
        sb.append("\"atsScore\":").append(overallScore).append(",");
        sb.append("\"rating\":\"").append(rating).append("\",");
        sb.append("\"wordCount\":").append(wordCount).append(",");
        sb.append("\"metrics\":{");
        sb.append("\"impact\":").append(impactScore).append(",");
        sb.append("\"keywords\":").append(keywordsScore).append(",");
        sb.append("\"formatting\":").append(formattingScore).append(",");
        sb.append("\"brevity\":").append(brevityScore);
        sb.append("},");

        sb.append("\"detectedSkills\":[");
        for (int i = 0; i < detectedSkills.size(); i++) {
            sb.append("\"").append(detectedSkills.get(i)).append("\"");
            if (i < detectedSkills.size() - 1) sb.append(",");
        }
        sb.append("],");

        sb.append("\"recommendedKeywords\":[");
        for (int i = 0; i < missing.size(); i++) {
            sb.append("\"").append(missing.get(i)).append("\"");
            if (i < missing.size() - 1) sb.append(",");
        }
        sb.append("]");
        sb.append("}");

        return sb.toString();
    }

    public String getChatbotResponse(String userPrompt) {
        String p = (userPrompt != null) ? userPrompt.toLowerCase() : "";

        if (p.contains("interview") || p.contains("java") || p.contains("spring")) {
            return "For senior Java technical interviews: Focus on concurrency (Virtual Threads, ConcurrentHashMap), Garbage Collection tuning (G1/ZGC), and distributed system design (Cache-aside with Redis, Kafka partitioning, idempotent consumers).";
        } else if (p.contains("salary") || p.contains("negotiat") || p.contains("lpa")) {
            return "For salary negotiations: Anchor your expectation around the 75th percentile of industry benchmarks (₹28–36 LPA). Emphasize past quantified wins and request sign-on bonuses or performance equity milestones if base salary bands are strict.";
        } else if (p.contains("resume") || p.contains("ats")) {
            return "To maximize your ATS score: Use the Google X-Y-Z formula ('Accomplished [X] measured by [Y] doing [Z]'), maintain a single-column layout, and incorporate high-frequency keywords like Docker, Microservices, and Cloud Architecture.";
        }

        return "Hello! I am your JobHub AI Career Assistant. I can help with mock interview prep, compensation benchmarks, resume optimization, and transition roadmaps. What would you like to explore?";
    }
}
