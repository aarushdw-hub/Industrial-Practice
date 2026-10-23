package com.jobhub.ai.model;

import java.util.List;

/**
 * Job Opportunity Model for JobHub AI Portal
 */
public class Job {
    private String id;
    private String title;
    private String company;
    private String location;
    private String type;
    private String workplace;
    private String salary;
    private int salaryMinLpa;
    private String experience;
    private String category;
    private int matchScore;
    private String description;
    private List<String> skills;
    private List<String> requirements;
    private List<String> benefits;
    private String posted;

    public Job(String id, String title, String company, String location, String type, 
               String workplace, String salary, int salaryMinLpa, String experience, 
               String category, int matchScore, String description, List<String> skills, 
               List<String> requirements, List<String> benefits, String posted) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.location = location;
        this.type = type;
        this.workplace = workplace;
        this.salary = salary;
        this.salaryMinLpa = salaryMinLpa;
        this.experience = experience;
        this.category = category;
        this.matchScore = matchScore;
        this.description = description;
        this.skills = skills;
        this.requirements = requirements;
        this.benefits = benefits;
        this.posted = posted;
    }

    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getCompany() { return company; }
    public String getLocation() { return location; }
    public String getType() { return type; }
    public String getWorkplace() { return workplace; }
    public String getSalary() { return salary; }
    public int getSalaryMinLpa() { return salaryMinLpa; }
    public String getExperience() { return experience; }
    public String getCategory() { return category; }
    public int getMatchScore() { return matchScore; }
    public String getDescription() { return description; }
    public List<String> getSkills() { return skills; }
    public List<String> getRequirements() { return requirements; }
    public List<String> getBenefits() { return benefits; }
    public String getPosted() { return posted; }

    public String toJson() {
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        sb.append("\"id\":\"").append(id).append("\",");
        sb.append("\"title\":\"").append(escape(title)).append("\",");
        sb.append("\"company\":\"").append(escape(company)).append("\",");
        sb.append("\"location\":\"").append(escape(location)).append("\",");
        sb.append("\"type\":\"").append(escape(type)).append("\",");
        sb.append("\"workplace\":\"").append(escape(workplace)).append("\",");
        sb.append("\"salary\":\"").append(escape(salary)).append("\",");
        sb.append("\"salaryMin\":").append(salaryMinLpa).append(",");
        sb.append("\"experience\":\"").append(escape(experience)).append("\",");
        sb.append("\"category\":\"").append(escape(category)).append("\",");
        sb.append("\"matchScore\":").append(matchScore).append(",");
        sb.append("\"description\":\"").append(escape(description)).append("\",");
        sb.append("\"skills\":[");
        for (int i = 0; i < skills.size(); i++) {
            sb.append("\"").append(escape(skills.get(i))).append("\"");
            if (i < skills.size() - 1) sb.append(",");
        }
        sb.append("],");
        sb.append("\"requirements\":[");
        for (int i = 0; i < requirements.size(); i++) {
            sb.append("\"").append(escape(requirements.get(i))).append("\"");
            if (i < requirements.size() - 1) sb.append(",");
        }
        sb.append("],");
        sb.append("\"benefits\":[");
        for (int i = 0; i < benefits.size(); i++) {
            sb.append("\"").append(escape(benefits.get(i))).append("\"");
            if (i < benefits.size() - 1) sb.append(",");
        }
        sb.append("],");
        sb.append("\"posted\":\"").append(escape(posted)).append("\"");
        sb.append("}");
        return sb.toString();
    }

    private static String escape(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "");
    }
}
