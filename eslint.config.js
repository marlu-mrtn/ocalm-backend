import globals from "globals";
import pluginJs from "@eslint/js";
import js from "@eslint/js";

export default [
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    js.configs.recommended,

    {
        rules: {
            indent: ["error", 4],
            "comma-dangle": ["error", "always-multiline"],
            "eol-last": ["error", "always"],
            "no-trailing-spaces": "error",
            "no-unused-vars": "warn",
            "no-undef": "warn",
        },
    },
];