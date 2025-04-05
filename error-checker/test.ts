import * as e from "./src/index";

// Test string validators
const everyTest = e.errorChecker(
    {
        username: "jo",
        email: "dupa"
    }, e.forEvery({
        username: e.string("Username").min(3),
        email: e.string("Email").email(),
    }
    ));

console.log(everyTest)

const normalTest = e.errorChecker(
    {
        email: "email",
        message: "m",
    },
    {
        general: {
            email: e
                .string("Email")
                .email("Must be email format!")
                .max(255, "Email must have less than 255 characters!"),
        },
        message: {
            message: e
                .string("Message")
                .min(2)
                .max(255),
        },
    })

// console.log(normalTest);