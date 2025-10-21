import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { z } from "zod";

import {
  signInSchema,
  signUpSchema,
  forgotPasswordSchema,
  otpVerificationSchema,
  resendOtpSchema,
} from "@/schemas/auth.schemas";
import { axiosPrivate, axiosPublic } from "@/lib/axios.config";
import { useUser } from "@/context/UserContext";

// SignUp Hook - Role-based API calls
export const useSignUp = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "technician", // Default to technician, but user can change
    },
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data) => {
      const { role, ...userData } = data;

      // Choose API endpoint based on role
      const endpoint =
        role === "manager"
          ? "/auth/register-manager"
          : "/auth/register-technician";

      // Send all user data including password_confirmation to the API
      const res = await axiosPublic.post(endpoint, userData);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message || "Sign Up Successful");
        navigate("/auth/sign-in");
      } else {
        toast.error(data?.message || "Sign Up failed!");
      }
    },
    onError: (error) => {
      const responseData = error?.response?.data;
      const message =
        responseData?.message || error.message || "Failed to sign up";

      // Handle field-specific errors
      if (responseData?.error?.password) {
        form.setError("password", { message: responseData.error.password[0] });
      } else if (responseData?.error?.email) {
        form.setError("email", { message: responseData.error.email[0] });
      } else if (responseData?.error?.name) {
        form.setError("name", { message: responseData.error.name[0] });
      } else if (message.toLowerCase().includes("email")) {
        form.setError("email", { message });
      } else if (message.toLowerCase().includes("name")) {
        form.setError("name", { message });
      } else {
        toast.error(message);
      }
    },
  });

  return { form, mutate, isPending, isError };
};

// SignIn Hook - Clean version without role selection
export const useSignIn = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useUser();
  const redirectUrl = params.get("redirect");

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (credentials) => {
      const res = await axiosPublic.post("/auth/login", credentials);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message || "Sign In Successful");

        const token = data?.data?.token;
        const user = data?.data?.user;
        const userRole = user?.role; // Use role from API response

        // Save token
        localStorage.setItem("token", token);

        // Update context with API response role
        login(userRole || "manager", user);

        // Redirect based on user's actual role
        if (redirectUrl) {
          navigate(redirectUrl);
        } else if (userRole === "manager") {
          navigate("/");
        } else {
          navigate("/technician");
        }
      } else {
        toast.error(data?.message || "Login failed!");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to sign in";

      if (message.toLowerCase().includes("email")) {
        form.setError("email", { message });
      } else {
        toast.error(message);
      }
    },
  });

  return { form, mutate, isPending, isError };
};

// Forgot Password Hook
export const useForgotPassword = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      operation: "password",
    },
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosPublic.post(
        "/auth/forget-password/otp-send",
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message || "OTP sent successfully");
        // Navigate to OTP verification page with email
        navigate("/auth/otp-verification", {
          state: { email: form.getValues("email") },
        });
      } else {
        toast.error(data?.message || "Failed to send OTP");
      }
    },
    onError: (error) => {
      const responseData = error?.response?.data;
      const message =
        responseData?.message || error.message || "Failed to send OTP";

      if (responseData?.error?.email) {
        form.setError("email", { message: responseData.error.email[0] });
      } else if (message.toLowerCase().includes("email")) {
        form.setError("email", { message });
      } else {
        toast.error(message);
      }
    },
  });

  return { form, mutate, isPending, isError };
};

// OTP Verification Hook
export const useOtpVerification = (email) => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: {
      email: email || "",
      otp: "",
      operation: "password",
    },
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosPublic.post(
        "/auth/forget-password/otp-match",
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message || "OTP verified successfully");
        // Navigate to set password page
        navigate("/auth/set-password", {
          state: { email: form.getValues("email") },
        });
      } else {
        toast.error(data?.message || "OTP verification failed");
      }
    },
    onError: (error) => {
      const responseData = error?.response?.data;
      const message =
        responseData?.message || error.message || "Failed to verify OTP";

      if (responseData?.error?.otp) {
        form.setError("otp", { message: responseData.error.otp[0] });
      } else if (message.toLowerCase().includes("otp")) {
        form.setError("otp", { message });
      } else {
        toast.error(message);
      }
    },
  });

  return { form, mutate, isPending, isError };
};

// Resend OTP Hook
export const useResendOtp = (email) => {
  const form = useForm({
    resolver: zodResolver(resendOtpSchema),
    defaultValues: {
      email: email || "",
      operation: "password",
    },
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosPublic.post("/auth/forget-password/otp-resend", data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message || "OTP resent successfully");
      } else {
        toast.error(data?.message || "Failed to resend OTP");
      }
    },
    onError: (error) => {
      const message = error?.response?.data?.message || error.message || "Failed to resend OTP";
      toast.error(message);
    },
  });

  return { form, mutate, isPending, isError };
};

// Reset Password Hook
export const useResetPassword = (email) => {
  const navigate = useNavigate();
  
  // Create a schema for reset password validation
  const resetPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string()
  }).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email || "",
      password: "",
      password_confirmation: "",
    },
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosPublic.post("/auth/forget-password/reset-password", data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message || "Password reset successful");
        navigate("/auth/sign-in");
      } else {
        toast.error(data?.message || "Failed to reset password");
      }
    },
    onError: (error) => {
      const responseData = error?.response?.data;
      const message = responseData?.message || error.message || "Failed to reset password";

      if (responseData?.error?.password) {
        form.setError("password", { message: responseData.error.password[0] });
      } else if (responseData?.error?.email) {
        form.setError("email", { message: responseData.error.email[0] });
      } else if (message.toLowerCase().includes("password")) {
        form.setError("password", { message });
      } else {
        toast.error(message);
      }
    },
  });

  return { form, mutate, isPending, isError };
};
