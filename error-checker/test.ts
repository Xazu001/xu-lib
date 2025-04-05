import * as e from "./src/index";

// Test string validators
const stringTest = e.errorChecker({
    username: "jo",
    email: "dupa"
}, e.forEvery({
    username: e.string("Username").min(3),
    email: e.string("Email").email(),
}));

console.log(stringTest)