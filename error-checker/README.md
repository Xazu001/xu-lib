# error checker

## BASIC USAGE

**Function errorChecker**

errorChecker is basic function where you provide data and things to check. Something like this -

```ts
import * as e from "xu-lib-error-checker";

const data = {
  email: "John.Doe@Gmail.com",
  message: "Test",
};

const errors = e.errorChecker(data, {
  email: {
    email: e
      .string("Email")
      .email("Invalid email format")
      .max(255, "Email cannot be longer than 255 characters!"),
  },
  message: {
    message: e
      .string("Message")
      .min(5, "Message must be at least 5 characters!")
      .max(255, "Message cannot be longer than 255 characters!"),
  },
});

console.log(errors);
// and log looks like this because message is shorter than 5 characters!
// {
//   message: "Message must be at least 5 characters!";
// }
```
