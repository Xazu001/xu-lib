import * as e from "./src/index";

const errorChecker = e.errorChecker({
    name: "Jeeee",
    x: "test"
}, {
    general: {
        name: e.string("Name").min(2, "Name too short!").max(50, "Name too long!"),
        x: e.any("X").optional()
    }
});

console.log(errorChecker);