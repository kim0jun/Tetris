module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/jsx-no-bind": "off",
        "jsx-a11y/href-no-hash": "off",
        "indent": ["error", 4],
        "quotes": ["error", "double"],
        "max-len": ["error", 350],
        "no-unused-vars": ["warn", { "vars": "local" }],
        "no-use-before-define" : "off",
        "class-methods-use-this":"off",
        "no-return-assign":"off",
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "jquery": true,
    },
};