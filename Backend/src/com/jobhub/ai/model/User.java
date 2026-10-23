package com.jobhub.ai.model;

import java.util.List;

/**
 * User / Candidate Profile Model for JobHub AI Portal
 */
public class User {
    private String id;
    private String name;
    private String email;
    private String role;
    private String headline;
    private String location;
    private List<String> skills;

    public User(String id, String name, String email, String role, String headline, String location, List<String> skills) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.headline = headline;
        this.location = location;
        this.skills = skills;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public String getHeadline() { return headline; }
    public String getLocation() { return location; }
    public List<String> getSkills() { return skills; }

    public String toJson() {
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        sb.append("\"id\":\"").append(id).append("\",");
        sb.append("\"name\":\"").append(escape(name)).append("\",");
        sb.append("\"email\":\"").append(escape(email)).append("\",");
        sb.append("\"role\":\"").append(escape(role)).append("\",");
        sb.append("\"headline\":\"").append(escape(headline)).append("\",");
        sb.append("\"location\":\"").append(escape(location)).append("\",");
        sb.append("\"skills\":[");
        for (int i = 0; i < skills.size(); i++) {
            sb.append("\"").append(escape(skills.get(i))).append("\"");
            if (i < skills.size() - 1) sb.append(",");
        }
        sb.append("]");
        sb.append("}");
        return sb.toString();
    }

    private static String escape(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "");
    }
}
