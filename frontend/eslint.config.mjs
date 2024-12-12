import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config} */
export default {
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs,jsx}"],
      languageOptions: {
        globals: globals.browser,
      },
      extends: [
        pluginJs.configs.recommended,
        pluginReact.configs.flat.recommended,
        "plugin:prettier/recommended", // Use Prettier as the code formatter
      ],
      rules: {
        "no-unused-vars": "off",
        "no-undef": "off",
        semi: ["error", "always"], // Enforce semicolons
        "prettier/prettier": [
          "error",
          {
            semi: true, // Ensure Prettier adds semicolons
          },
        ],
      },
    },
  ],
};
