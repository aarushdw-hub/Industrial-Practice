package com.jobhub.ai.handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.nio.file.Files;

/**
 * Serves FrontEnd HTML, CSS, JavaScript, and asset files
 */
public class StaticFileHandler implements HttpHandler {
    private final File baseDir;

    public StaticFileHandler(File baseDir) {
        this.baseDir = baseDir;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        URI uri = exchange.getRequestURI();
        String path = uri.getPath();

        if (path == null || path.equals("/") || path.isEmpty()) {
            path = "/index.html";
        }

        File file = new File(baseDir, path.replace("/", File.separator));

        // If file doesn't exist, check inside FrontEnd folder
        if (!file.exists() && !baseDir.getName().equalsIgnoreCase("FrontEnd")) {
            File alt = new File(new File(baseDir, "FrontEnd"), path.replace("/", File.separator));
            if (alt.exists()) {
                file = alt;
            }
        }

        if (!file.exists() || file.isDirectory()) {
            String notFound = "<h1>404 - JobHub AI Page Not Found</h1><p>The requested static path could not be resolved: " + path + "</p>";
            byte[] bytes = notFound.getBytes();
            exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
            exchange.sendResponseHeaders(404, bytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(bytes);
            }
            return;
        }

        String mimeType = getMimeType(file.getName());
        exchange.getResponseHeaders().set("Content-Type", mimeType);
        exchange.sendResponseHeaders(200, file.length());

        try (FileInputStream fis = new FileInputStream(file); OutputStream os = exchange.getResponseBody()) {
            byte[] buffer = new byte[8192];
            int read;
            while ((read = fis.read(buffer)) != -1) {
                os.write(buffer, 0, read);
            }
        }
    }

    private String getMimeType(String filename) {
        String lower = filename.toLowerCase();
        if (lower.endsWith(".html") || lower.endsWith(".htm")) return "text/html; charset=UTF-8";
        if (lower.endsWith(".css")) return "text/css; charset=UTF-8";
        if (lower.endsWith(".js")) return "application/javascript; charset=UTF-8";
        if (lower.endsWith(".json")) return "application/json; charset=UTF-8";
        if (lower.endsWith(".svg")) return "image/svg+xml";
        if (lower.endsWith(".png")) return "image/png";
        if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
        if (lower.endsWith(".ico")) return "image/x-icon";
        return "text/plain; charset=UTF-8";
    }
}
