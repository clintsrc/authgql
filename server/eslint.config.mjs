import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.node,
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json", // Ensures ESLint aligns with your TypeScript settings
      },
    },
    plugins: { js, "@typescript-eslint": tseslint.plugin },
    extends: [
      "js/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking", // Enables stricter rules that require type checking
    ],
  },
]);
