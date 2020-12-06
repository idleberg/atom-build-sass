/* eslint-disable */
module.exports = {
  parser: "babel-eslint",
  extends: [
    "atom-build",
    "plugin:json/recommended"
  ],
  rules:{
    "consistent-return": 0,
    "no-console": 0
  },
  ignorePatterns: [
    "lib/**/*",
    "node_modules/**/*"
  ]
};
