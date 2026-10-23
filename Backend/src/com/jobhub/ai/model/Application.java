package com.jobhub.ai.model;

/**
 * Job Application Tracking Model for JobHub AI Portal
 */
public class Application {
    private String id;
    private String jobId;
    private String jobTitle;
    private String company;
    private String candidateName;
    private String candidateEmail;
    private String appliedDate;
    private String status; // applied, screening, interview, offer
    private String statusText;

    public Application(String id, String jobId, String jobTitle, String company, 
                       String candidateName, String candidateEmail, String appliedDate, 
                       String status, String statusText) {
        this.id = id;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.company = company;
        this.candidateName = candidateName;
        this.candidateEmail = candidateEmail;
        this.appliedDate = appliedDate;
        this.status = status;
        this.statusText = statusText;
    }

    public String getId() { return id; }
    public String getJobId() { return jobId; }
    public String getJobTitle() { return jobTitle; }
    public String getCompany() { return company; }
    public String getCandidateName() { return candidateName; }
    public String getCandidateEmail() { return candidateEmail; }
    public String getAppliedDate() { return appliedDate; }
    public String getStatus() { return status; }
    public String getStatusText() { return statusText; }

    public void setStatus(String status, String statusText) {
        this.status = status;
        this.statusText = statusText;
    }

    public String toJson() {
        return "{" +
                "\"id\":\"" + escape(id) + "\"," +
                "\"jobId\":\"" + escape(jobId) + "\"," +
                "\"title\":\"" + escape(jobTitle) + "\"," +
                "\"company\":\"" + escape(company) + "\"," +
                "\"candidateName\":\"" + escape(candidateName) + "\"," +
                "\"candidateEmail\":\"" + escape(candidateEmail) + "\"," +
                "\"appliedDate\":\"" + escape(appliedDate) + "\"," +
                "\"status\":\"" + escape(status) + "\"," +
                "\"statusText\":\"" + escape(statusText) + "\"" +
                "}";
    }

    private static String escape(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "");
    }
}
