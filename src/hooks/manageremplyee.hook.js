import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "@/lib/axios.config";
import toast from "react-hot-toast";

const cleanUrl = (s) => (typeof s === "string" ? s.replace(/`/g, "").trim() : "");

// GET: /api/v1/manager/user (paginated)
// Robust select handles API placing payload under data or error
export const useManagerUsers = ({ page = 1, perPage = 15, enabled = true } = {}) => {
  const query = useQuery({
    queryKey: ["manager-users", { page, perPage }],
    enabled,
    queryFn: async () => {
      const res = await axiosPrivate.get("/manager/user", {
        params: { page, per_page: perPage },
      });
      return res.data;
    },
    select: (raw) => {
      // Some responses return payload under raw.error; prefer raw.data if available
      const payload = raw?.data ?? raw?.error ?? null;
      const list = Array.isArray(payload?.data) ? payload.data : [];
      const pageInfo = {
        currentPage: payload?.current_page ?? page,
        lastPage: payload?.last_page ?? 1,
        total: payload?.total ?? list.length,
        perPage: payload?.per_page ?? perPage,
      };

      const employees = list.map((u) => ({
        id: u?.id,
        fullName: u?.name || "—",
        email: u?.email || "—",
        phone: u?.profile?.phone || "—",
        employeeId: u?.profile?.employ_id || "—",
        department: u?.profile?.department || "—",
        position:
          u?.profile?.position || (u?.role === "manager" ? "Manager" : "Technician"),
        avatar:
          cleanUrl(u?.avatar) ||
          "https://mjkasas.softvencefsd.xyz/assets/img/user_placeholder.png",
      }));

      return { raw, payload, employees, pageInfo };
    },
    staleTime: 60_000,
    keepPreviousData: true,
    retry: 1,
    onError: (error) => {
      const msg = error?.response?.data?.message || "Failed to load employees";
      toast.error(msg);
    },
  });

  return query;
};

// POST: /api/v1/manager/user - create employee
export const useCreateManagerUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, email, phone, department, position }) => {
      const payload = { name, email, phone, department, position };
      const res = await axiosPrivate.post("/manager/user", payload, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Employee created successfully");
      queryClient.invalidateQueries({ queryKey: ["manager-users"] });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || "Failed to create employee";
      toast.error(msg);
    },
  });
};

// PATCH via POST: /api/v1/manager/user/:id with _method=PATCH - update employee
export const useUpdateManagerUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name, email, phone, department, position }) => {
      const payload = {
        _method: "PATCH",
        name,
        email,
        phone,
        department,
        position,
      };
      const res = await axiosPrivate.post(`/manager/user/${id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Employee updated successfully");
      queryClient.invalidateQueries({ queryKey: ["manager-users"] });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || "Failed to update employee";
      toast.error(msg);
    },
  });
};

// DELETE: /api/v1/manager/user/:id - delete employee
export const useDeleteManagerUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }) => {
      const res = await axiosPrivate.delete(`/manager/user/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Employee deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["manager-users"] });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || "Failed to delete employee";
      toast.error(msg);
    },
  });
};