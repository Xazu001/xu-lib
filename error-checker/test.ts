
import * as e from "./src/hono-openapi-zod/index";

const errorInput = {
    password: {
        password: e
            .string()
            .min(6)
            .max(64)
    }
}

const errorChecker = e.errorChecker({
    password: "Chuj32132",
}, errorInput);


console.log(errorChecker)
const resolve = e.resolver(errorInput);


