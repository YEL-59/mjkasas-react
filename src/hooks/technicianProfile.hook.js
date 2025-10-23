import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosPrivate } from "@/lib/axios.config";

// GET: /api/v1/technician/user/auth
export const useTechnicianAuthUser = ({ enabled = true } = {}) => {
  const query = useQuery({
    queryKey: ["technician-auth-user"],
    enabled,
    queryFn: async () => {
      const res = await axiosPrivate.get("/technician/user/auth");
      return res.data;
    },
  });
  const user = query.data?.data || null;
  return { ...query, user };
};

// PUT: /api/v1/technician/user/auth (multipart for avatar)
export const useUpdateTechnicianAuthUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, email, phone, avatarFile }) => {
      const form = new FormData();
      if (name != null) form.append("name", name);
      if (email != null) form.append("email", email);
      if (phone != null) form.append("phone", phone);
      if (avatarFile) form.append("avatar", avatarFile);
      const res = await axiosPrivate.put("/technician/user/auth", form);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["technician-auth-user"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    },
  });
};

// PATCH: /api/v1/technician/user/auth/password (multipart)
export const useUpdateTechnicianPassword = () => {
  return useMutation({
    mutationFn: async ({
      old_password,
      new_password,
      new_password_confirmation,
    }) => {
      // Debug logging
      console.log("Hook received values:", {
        old_password,
        new_password,
        new_password_confirmation,
      });

      // Try sending as JSON instead of FormData
      const payload = {
        old_password,
        new_password,
        new_password_confirmation,
      };
      
      console.log("Sending JSON payload:", payload);

      const res = await axiosPrivate.patch(
        "/technician/user/auth/password",
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Password updated successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update password"
      );
    },
  });
};