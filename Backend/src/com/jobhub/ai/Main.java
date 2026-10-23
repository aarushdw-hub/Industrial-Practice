package com.jobhub.ai;

import com.jobhub.ai.handler.ApiHandler;
import com.jobhub.ai.handler.StaticFileHandler;
import com.jobhub.ai.service.AiService;
import com.jobhub.ai.service.JobService;
import com.sun.net.httpserver.HttpServer;

import java.io.File;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.concurrent.Executors;

/**
 * Main Entry Point for JobHub AI Java Application
 */
public class Main {
    public static final int DEFAULT_PORT = 8080;

    public static void main(String[] args) {
        int port = DEFAULT_PORT;
        if (args.length > 0) {
            try {
                port = Integer.parseInt(args[0]);
            } catch (NumberFormatException ignored) {}
        }

        try {
            HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

            JobService jobService = new JobService();
            AiService aiService = new AiService();

            // Locate FrontEnd directory
            File frontEndDir = new File("FrontEnd");
            if (!frontEndDir.exists()) {
                frontEndDir = new File("../FrontEnd");
            }
            if (!frontEndDir.exists()) {
                frontEndDir = new File(".");
            }

            // Register Handlers
            server.createContext("/api", new ApiHandler(jobService, aiService));
            server.createContext("/", new StaticFileHandler(frontEndDir));

            server.setExecutor(Executors.newFixedThreadPool(10));
            server.start();

            printBanner(port, frontEndDir.getAbsolutePath());

        } catch (IOException e) {
            System.err.println("❌ Failed to start JobHub AI server: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void printBanner(int port, String frontEndPath) {
        System.out.println("==================================================================");
        System.out.println("   ✦ JOBHUB AI - ENTERPRISE CAREER & MATCHING PLATFORM ✦   ");
        System.out.println("==================================================================");
        System.out.println(" ✅ Java Backend Engine Started Successfully!");
        System.out.println(" 🌐 Web Portal URL  : http://localhost:" + port + "/");
        System.out.println(" 📊 REST API Root   : http://localhost:" + port + "/api/jobs");
        System.out.println(" 📂 Static Assets   : " + frontEndPath);
        System.out.println(" ⚡ Tech Stack      : Java (Backend) | HTML5 | CSS3 | JavaScript");
        System.out.println("==================================================================");
        System.out.println(" Server is running. Press Ctrl+C to terminate.");
    }
}
