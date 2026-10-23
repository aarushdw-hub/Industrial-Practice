package com.jobhub.ai.service;

import com.jobhub.ai.model.Application;
import com.jobhub.ai.model.Job;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * Service managing Job Catalog & Applications Storage
 */
public class JobService {
    private final Map<String, Job> jobsMap = new ConcurrentHashMap<>();
    private final List<Application> applications = Collections.synchronizedList(new ArrayList<>());

    public JobService() {
        seedSampleJobs();
        seedSampleApplications();
    }

    private void seedSampleJobs() {
        addJob(new Job(
                "job-1",
                "Senior Full Stack Engineer",
                "Microsoft",
                "Bangalore, India",
                "Full-time",
                "Hybrid",
                "₹24–32 LPA",
                24,
                "4-7 years",
                "engineering",
                96,
                "Join Microsoft Azure Core team to architect ultra-scalable cloud services. Build resilient microservices, distributed data pipelines, and developer-facing APIs powering millions of enterprise workloads.",
                Arrays.asList("Java", "Spring Boot", "TypeScript", "React", "Azure", "Microservices", "Docker", "Kubernetes"),
                Arrays.asList("4+ years in Java, Spring Boot, and cloud architectures", "Strong frontend React/TypeScript skills", "Deep understanding of distributed systems and high-throughput databases"),
                Arrays.asList("Competitive ESOPs", "Health Insurance", "Flexible Hours", "Learning Budget"),
                "2 days ago"
        ));

        addJob(new Job(
                "job-2",
                "AI / Machine Learning Engineer",
                "Google",
                "Hyderabad, India",
                "Full-time",
                "Hybrid",
                "₹28–38 LPA",
                28,
                "3-6 years",
                "ai",
                94,
                "Develop cutting-edge generative AI models and intelligent recommendation pipelines. Integrate large language models into enterprise search and consumer AI applications.",
                Arrays.asList("Python", "PyTorch", "TensorFlow", "LLMs", "Java", "Docker", "GCP", "Transformers"),
                Arrays.asList("Bachelors/Masters in CS, AI, or equivalent", "3+ years deploying deep learning models at scale", "Proficiency in PyTorch and vector databases"),
                Arrays.asList("Top compensation & equity", "World-class cafeteria", "Global mobility options"),
                "1 day ago"
        ));

        addJob(new Job(
                "job-3",
                "Data Analyst & Insights Lead",
                "Amazon",
                "Hyderabad, India",
                "Full-time",
                "On-site",
                "₹14–22 LPA",
                14,
                "2-5 years",
                "data",
                89,
                "Dive deep into customer behavior patterns, fulfillment metrics, and marketplace revenue data to provide actionable intelligence for executive leadership.",
                Arrays.asList("SQL", "Python", "Power BI", "Tableau", "AWS Redshift", "Statistics", "Excel"),
                Arrays.asList("2+ years in large-scale structured data analytics", "Advanced SQL and data modeling", "Executive Tableau/PowerBI dashboard creation"),
                Arrays.asList("Comprehensive health coverage", "Relocation assistance", "Employee discounts"),
                "3 days ago"
        ));

        addJob(new Job(
                "job-4",
                "Lead UI/UX Designer",
                "Adobe",
                "Noida / Bangalore, India",
                "Full-time",
                "Remote",
                "₹18–26 LPA",
                18,
                "3-5 years",
                "design",
                87,
                "Reimagine the creative suite collaboration interfaces. Design sleek design systems, interactive prototypes, and intuitive AI-assisted workflows for creators worldwide.",
                Arrays.asList("Figma", "Design Systems", "Prototyping", "User Research", "Wireframing", "HTML/CSS"),
                Arrays.asList("Portfolio showcasing complex digital products", "Figma design system expertise", "Usability testing experience"),
                Arrays.asList("Creative sabbatical", "Home office grant", "Stock purchase plan"),
                "4 days ago"
        ));

        addJob(new Job(
                "job-5",
                "Backend Java Developer",
                "Razorpay",
                "Bangalore, India",
                "Full-time",
                "Hybrid",
                "₹16–25 LPA",
                16,
                "2-4 years",
                "engineering",
                92,
                "Scale high-velocity payments infrastructure handling billions of transactions. Write rock-solid Java services with sub-second latency and five-nines availability.",
                Arrays.asList("Java", "Spring Boot", "Kafka", "MySQL", "Redis", "AWS", "REST APIs"),
                Arrays.asList("2+ years building low-latency backend systems in Java & Spring Boot", "Database indexing and Redis caching", "Event-driven architecture with Kafka"),
                Arrays.asList("Comprehensive medical insurance", "Flexible leaves", "Learning allowance"),
                "Just now"
        ));

        addJob(new Job(
                "job-6",
                "Cloud DevOps & Platform Engineer",
                "Flipkart",
                "Bangalore, India",
                "Full-time",
                "Hybrid",
                "₹20–28 LPA",
                20,
                "3-6 years",
                "engineering",
                85,
                "Empower hundreds of software engineers with resilient Kubernetes infrastructure, automated Terraform provisioning, and continuous delivery pipelines.",
                Arrays.asList("Kubernetes", "Docker", "Terraform", "AWS", "CI/CD", "Linux", "Python", "Prometheus"),
                Arrays.asList("Multi-cluster Kubernetes in production", "Infrastructure as Code with Terraform", "Bash or Python automation"),
                Arrays.asList("Performance bonus", "Gym subsidy", "Annual retreats"),
                "5 days ago"
        ));
    }

    private void seedSampleApplications() {
        applications.add(new Application(
                "app-1", "job-1", "Senior Full Stack Engineer", "Microsoft", 
                "Alex Morgan", "alex.morgan@example.com", "Oct 20, 2026", 
                "interview", "Interview Scheduled"
        ));
        applications.add(new Application(
                "app-2", "job-2", "AI / Machine Learning Engineer", "Google", 
                "Alex Morgan", "alex.morgan@example.com", "Oct 22, 2026", 
                "screening", "Resume Screening"
        ));
    }

    public void addJob(Job job) {
        jobsMap.put(job.getId(), job);
    }

    public List<Job> getAllJobs() {
        return new ArrayList<>(jobsMap.values());
    }

    public Optional<Job> getJobById(String id) {
        return Optional.ofNullable(jobsMap.get(id));
    }

    public List<Job> filterJobs(String query, String location, String category, Integer minSalary) {
        return jobsMap.values().stream()
                .filter(job -> {
                    if (query != null && !query.trim().isEmpty()) {
                        String q = query.toLowerCase().trim();
                        boolean matches = job.getTitle().toLowerCase().contains(q) ||
                                job.getCompany().toLowerCase().contains(q) ||
                                job.getSkills().stream().anyMatch(s -> s.toLowerCase().contains(q));
                        if (!matches) return false;
                    }
                    if (location != null && !location.trim().isEmpty()) {
                        if (!job.getLocation().toLowerCase().contains(location.toLowerCase().trim())) return false;
                    }
                    if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("all")) {
                        if (!job.getCategory().equalsIgnoreCase(category.trim())) return false;
                    }
                    if (minSalary != null && job.getSalaryMinLpa() < minSalary) {
                        return false;
                    }
                    return true;
                })
                .sorted((a, b) -> Integer.compare(b.getMatchScore(), a.getMatchScore()))
                .collect(Collectors.toList());
    }

    public Application submitApplication(String jobId, String candidateName, String candidateEmail) {
        Job job = jobsMap.get(jobId);
        String title = (job != null) ? job.getTitle() : "Software Engineer";
        String company = (job != null) ? job.getCompany() : "Tech Partner";

        Application app = new Application(
                "app-" + System.currentTimeMillis(),
                jobId,
                title,
                company,
                candidateName,
                candidateEmail,
                "Today",
                "applied",
                "Application Submitted"
        );
        applications.add(0, app);
        return app;
    }

    public List<Application> getApplications() {
        return new ArrayList<>(applications);
    }
}
