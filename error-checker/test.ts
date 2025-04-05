import * as e from "./dist/src/index.js";

const errorChecker = e.errorChecker({
    name: "J"
}, {
    general: {
        name: e.string("Name").min(2, "Name too short!").max(50, "Name too long!")
    }
});

console.log(errorChecker);