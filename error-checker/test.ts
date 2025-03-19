import * as e from "xu-lib-error-checker";

const data = {
  email: "John.Doe@Gmail.com",
  message: "Test Message",
};

const errors = e.errorChecker(data, {
  email: {
    email: e
      .string("Email")
      .email("Email must be in")
      .max(255, "Email cannot be longer than 255 characters!"),
  },
  message: {
    message: e
      .string("Message")
      .min(5, "Message must be at least 5 characters!")
      .max(255, "Message cannot be longer than 255 characters!"),
  },
});
