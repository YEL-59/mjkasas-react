import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  password_confirmation: z.string().min(6, "Confirm password must be at least 6 characters"),
  role: z.enum(["manager", "technician"], {
    required_error: "Please select a role",
  }),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  operation: z.string().default("password"),
});

export const otpVerificationSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
  operation: z.string().default("password"),
});

export const resendOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
  operation: z.string().default("email"),
});