module.exports = {
    "roots": [
        "./public/assets/ts/jest/index/jest-index.js"
    ],
    "transform": {
        "^.+\\.tsx?$": "./public/assets/ts/jest/index/jest-index.js"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
}
