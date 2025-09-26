// client/vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "../server/public",
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/events": {
        target: "http://localhost:3001",
      },
    },
  },
  plugins: [
    {
      name: "rewrite-events-detail-to-event-html",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const wantsHtml =
            req.headers.accept && req.headers.accept.includes("text/html");
          const isDetailRoute = req.url && /^\/events\/\d+\/?$/.test(req.url);

          if (wantsHtml && isDetailRoute) {
            req.url = "/event.html";
          }
          next();
        });
      },
    },
  ],
});
