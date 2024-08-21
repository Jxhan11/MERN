const { z } = require("zod");
//Creating signup schema
const signupSchema = z.object({
    username: z
        .string({ required_error: "Username is requried" })
        .trim()
        .min(3, { message: "Name must be atleast 3 characters long" })
        .max(255, { message: "Username should not be more than 255 words" }),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid Email" })
        .min(3, { message: "Email must be atleast 3 characters" })
        .max(255, { message: "Email must not exceed 255 characters" }),
    phone: z
        .string({ required_error: "Phone no. is requried" })
        .trim()
        .min(10, { message: "Phoneno must be atleast 10 characters long" })
        .max(10, { message: "Phone number must not exceed 10 characters" }),
    password: z
        .string({ required_error: "Password is requried" })
        .min(8, { message: "Password should be atleast 8 characters" })
        .max(255, { message: "Password must not exceed 255 characters" }),
});

module.exports = signupSchema
