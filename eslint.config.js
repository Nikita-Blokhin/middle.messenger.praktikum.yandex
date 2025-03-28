import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2023,
      sourceType: "module"
    }
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"]
  },
  tseslint.configs.recommended,
  {
    rules: {
      // Стили кода
      "indent": ["error", 4],
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "no-console": "off",
      
      // Типизация
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-this-alias": "off",
      
      // Общие правила
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-var": "error",
      
      // Импорты
      "import/extensions": "off",
    }
  },
]);
