import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default [
  /* =====================================================
   * BASE CONFIG — WAJIB UNTUK SEMUA FILE
   * ===================================================== */
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  /* =====================================================
   * TYPESCRIPT
   * ===================================================== */
  ...tseslint.configs.recommended,

  /* =====================================================
   * REACT / NEXT.JS
   * ===================================================== */
  {
    files: ["**/*.{tsx,jsx}"],
    plugins: { react },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  /* =====================================================
   * PROJECT RULES
   * ===================================================== */
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/ban-ts-comment": [
        "warn",
        {
          "ts-ignore": "allow-with-description",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-empty": "warn",
    },
  },

  /* =====================================================
   * API ROUTES — RELAXED
   * ===================================================== */
  {
    files: ["app/api/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-empty": "off",
    },
  },
];
