
import * as e from "./src/hono-openapi-zod/index";
import { Context } from "hono";

// Define the error input structure
const errorInput = {
    password: {
        password: e
            .string()
            .min(6)
            .max(64)
    }
};

// Test the errorChecker
const errorCheckerResult = e.errorChecker({
    password: "Chuj32132",
}, errorInput);

console.log("Error Checker Result:", errorCheckerResult);

// Test the resolver
const resolverResult = e.resolver(errorInput);
console.log("Resolver Result:", resolverResult);

// Test the validator
const validatorResult = e.validator('json', errorInput);
console.log("Validator Result:", validatorResult);

// Example of how to use the validator in a Hono app
console.log("\nExample usage in a Hono app:")
console.log(`
app.post('/login', validatorResult, (c) => {
  const data = c.req.valid('json');
  // Process the validated data
  return c.json({ success: true, data });
});
`);
