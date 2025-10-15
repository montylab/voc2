module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/generated/**/*", // Ignore generated files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "quotes": ["error", "single", { "allowTemplateLiterals": true }],
    "semi": ["error", "never"],
    "import/no-unresolved": 0,
    "indent": ["error", "tab"],
    "max-len": ["error", { "code": 100, "tabWidth": 4, "ignoreStrings": true, "ignoreTemplateLiterals": true }],
  },
};
