import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
// import the .env varibles
import dotenv from "dotenv";

dotenv.config();

// add the APP_HOST and APP_PORT variable into our config from the .env file

export default defineConfig({
    server: {
        hmr: {
            host: dotenv.config().parsed.APP_HOST,
        },
        cors: {
            origin: "*",
        },
        host: dotenv.config().parsed.APP_HOST,
        port: "5173",
        watch: {
            usePolling: true,
        },
    },

    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
});
