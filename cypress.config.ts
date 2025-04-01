import { defineConfig } from "cypress";
import viteConfig from "./vite.config";
import path from "path";
import { renameSync, mkdirSync, existsSync, readdirSync } from "fs";

// Helper to get __dirname in an ES module context
const getDirname = (importMetaUrl: string) => {
  return path.dirname(new URL(importMetaUrl).pathname);
};

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports", // Set the base report directory
    overwrite: false, // Do not overwrite the reports
    json: true, // Generate JSON reports
    html: false, // Do not generate HTML reports
  },

  component: {
    port: 5173,
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig,
    },
    setupNodeEvents(on, config) {
      on("after:run", () => {
        const baseDir = getDirname(import.meta.url); // Use import.meta.url to get the current directory
        const jsonDir = path.join(baseDir, "cypress/reports/.jsons"); // Actual JSON reports directory
        const componentDir = path.join(baseDir, "cypress/reports/component"); // Target directory for component reports

        // Ensure the component report directory exists
        if (!existsSync(componentDir)) {
          mkdirSync(componentDir, { recursive: true });
        }

        // List all mochawesome JSON files in the .jsons directory
        const reports = readdirSync(jsonDir).filter((file) =>
          file.startsWith("mochawesome") && file.endsWith(".json")
        );

        reports.forEach((file, index) => {
          // Construct the new filename (mochawesome_001.json, mochawesome_002.json, etc.)
          const newFilename = `mochawesome.json`;

          // Full paths for source and destination
          const oldPath = path.join(jsonDir, file);
          const newPath = path.join(componentDir, newFilename);

          // Rename (move) the reports to the component directory
          renameSync(oldPath, newPath);
        });
      });
    },
  },

  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("after:run", () => {
        const baseDir = getDirname(import.meta.url); // Use import.meta.url to get the current directory
        const jsonDir = path.join(baseDir, "cypress/reports/.jsons"); // Actual JSON reports directory
        const e2eDir = path.join(baseDir, "cypress/reports/e2e"); // Target directory for e2e reports

        // Ensure the e2e report directory exists
        if (!existsSync(e2eDir)) {
          mkdirSync(e2eDir, { recursive: true });
        }

        // List all mochawesome JSON files in the .jsons directory
        const reports = readdirSync(jsonDir).filter((file) =>
          file.startsWith("mochawesome") && file.endsWith(".json")
        );

        reports.forEach((file, index) => {
          // Construct the new filename (mochawesome_001.json, mochawesome_002.json, etc.)
          const newFilename = `mochawesome.json`;

          // Full paths for source and destination
          const oldPath = path.join(jsonDir, file);
          const newPath = path.join(e2eDir, newFilename);

          // Rename (move) the reports to the e2e directory
          renameSync(oldPath, newPath);
        });
      });
    },
  },
});
