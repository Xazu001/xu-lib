import * as e from "./src/index";

// Test string validators
const stringTest = e.errorChecker({
    username: "jo",
    email: "dupa"
}, e.forEvery({
    username: e.string("Username")
        .min(3, "Username too short")
        .max(20, "Username too long"),
    email: e.string("Email").email("Invalid email format"),


}));

console.log(stringTest)