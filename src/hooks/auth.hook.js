import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import { signInSchema } from "@/schemas/auth.schemas";
import { axiosPublic } from "@/lib/axios.config";
import { useUser } from "@/context/UserContext";

export const useSignIn = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useUser(); // context
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

        // Save token
        localStorage.setItem("token", token);

        // ✅ Update context directly here
        login(user?.role || "manager", user);

        // ✅ Redirect automatically
        if (redirectUrl) {
          navigate(redirectUrl);
        } else if (user?.role === "manager") {
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
