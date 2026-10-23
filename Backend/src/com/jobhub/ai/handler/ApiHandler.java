package com.jobhub.ai.handler;

import com.jobhub.ai.model.Application;
import com.jobhub.ai.model.Job;
import com.jobhub.ai.service.AiService;
import com.jobhub.ai.service.JobService;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

/**
 * Handles JobHub AI REST API Endpoints
 */
public class ApiHandler implements HttpHandler {
    private final JobService jobService;
    private final AiService aiService;

    public ApiHandler(JobService jobService, AiService aiService) {
        this.jobService = jobService;
        this.aiService = aiService;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        // Enable CORS
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type, Authorization");

        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            return;
        }

        URI uri = exchange.getRequestURI();
        String path = uri.getPath();
        String query = uri.getQuery();
        String method = exchange.getRequestMethod();

        String responseBody = "{}";
        int statusCode = 200;

        try {
            if (path.equals("/api/health") || path.equals("/api/health/")) {
                responseBody = "{\"status\":\"UP\",\"service\":\"JobHub AI Core Server\",\"version\":\"2.0\"}";
            } else if (path.equals("/api/jobs") || path.equals("/api/jobs/")) {
                if ("GET".equalsIgnoreCase(method)) {
                    String q = getQueryParam(query, "q");
                    String loc = getQueryParam(query, "loc");
                    String cat = getQueryParam(query, "cat");
                    List<Job> jobs = jobService.filterJobs(q, loc, cat, null);

                    StringBuilder sb = new StringBuilder("[");
                    for (int i = 0; i < jobs.size(); i++) {
                        sb.append(jobs.get(i).toJson());
                        if (i < jobs.size() - 1) sb.append(",");
                    }
                    sb.append("]");
                    responseBody = sb.toString();
                }
            } else if (path.startsWith("/api/jobs/apply")) {
                if ("POST".equalsIgnoreCase(method)) {
                    String body = readRequestBody(exchange);
                    String jobId = getJsonValue(body, "jobId");
                    String name = getJsonValue(body, "name");
                    String email = getJsonValue(body, "email");
                    if (jobId.isEmpty()) jobId = "job-1";
                    if (name.isEmpty()) name = "Candidate";
                    if (email.isEmpty()) email = "candidate@example.com";

                    Application app = jobService.submitApplication(jobId, name, email);
                    responseBody = app.toJson();
                }
            } else if (path.startsWith("/api/jobs/")) {
                String id = path.substring("/api/jobs/".length());
                Optional<Job> opt = jobService.getJobById(id);
                if (opt.isPresent()) {
                    responseBody = opt.get().toJson();
                } else {
                    statusCode = 404;
                    responseBody = "{\"error\":\"Job not found\"}";
                }
            } else if (path.equals("/api/applications") || path.equals("/api/applications/")) {
                List<Application> apps = jobService.getApplications();
                StringBuilder sb = new StringBuilder("[");
                for (int i = 0; i < apps.size(); i++) {
                    sb.append(apps.get(i).toJson());
                    if (i < apps.size() - 1) sb.append(",");
                }
                sb.append("]");
                responseBody = sb.toString();
            } else if (path.equals("/api/ai/analyze-resume")) {
                String body = readRequestBody(exchange);
                responseBody = aiService.analyzeResumeText(body);
            } else if (path.equals("/api/ai/chat")) {
                String body = readRequestBody(exchange);
                String prompt = getJsonValue(body, "prompt");
                String aiReply = aiService.getChatbotResponse(prompt);
                responseBody = "{\"reply\":\"" + escape(aiReply) + "\"}";
            } else {
                statusCode = 404;
                responseBody = "{\"error\":\"Endpoint not found\"}";
            }
        } catch (Exception e) {
            statusCode = 500;
            responseBody = "{\"error\":\"" + escape(e.getMessage()) + "\"}";
        }

        byte[] bytes = responseBody.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
        exchange.sendResponseHeaders(statusCode, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }

    private String readRequestBody(HttpExchange exchange) throws IOException {
        InputStreamReader isr = new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8);
        BufferedReader br = new BufferedReader(isr);
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }
        return sb.toString();
    }

    private String getQueryParam(String query, String param) {
        if (query == null) return null;
        for (String pair : query.split("&")) {
            String[] parts = pair.split("=");
            if (parts.length > 1 && parts[0].equalsIgnoreCase(param)) {
                return parts[1];
            }
        }
        return null;
    }

    private String getJsonValue(String json, String key) {
        if (json == null) return "";
        String pattern = "\"" + key + "\":\"";
        int start = json.indexOf(pattern);
        if (start != -1) {
            start += pattern.length();
            int end = json.indexOf("\"", start);
            if (end != -1) {
                return json.substring(start, end);
            }
        }
        return "";
    }

    private static String escape(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "");
    }
}
