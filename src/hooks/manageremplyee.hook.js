import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "@/lib/axios.config";
import toast from "react-hot-toast";

const cleanUrl = (s) =>
  typeof s === "string" ? s.replace(/`/g, "").trim() : "";

// GET: /api/v1/manager/user (paginated)
// Robust select handles API placing payload under data or error
export const useManagerUsers = ({
  page = 1,
  perPage = 15,
  enabled = true,
} = {}) => {
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
      // Normalize pagination shape: support { data: { data: [...] }} and { data: [...] }
      const payload = raw?.data ?? raw?.error ?? null;
      const pagePayload = payload?.data ?? payload; // prefer nested pagination object if present
      const list = Array.isArray(pagePayload?.data)
        ? pagePayload.data
        : Array.isArray(payload?.data)
        ? payload.data
        : [];

      const pageInfo = {
        currentPage: pagePayload?.current_page ?? page,
        lastPage: pagePayload?.last_page ?? 1,
        total: pagePayload?.total ?? list.length,
        perPage: pagePayload?.per_page ?? perPage,
      };

      const employees = list.map((u) => ({
        id: u?.id,
        fullName: u?.name || "—",
        email: u?.email || "—",
        phone: u?.profile?.phone || "—",
        employeeId: u?.profile?.employ_id || "—",
        department: u?.profile?.department || "—",
        position:
          u?.profile?.position ||
          (u?.role === "manager" ? "Manager" : "Technician"),
        avatar:
          cleanUrl(u?.avatar) ||
          "https://mjkasas.softvencefsd.xyz/assets/img/user_placeholder.png",
        role: u?.role || "—",
        status: Boolean(u?.status),
        completedWorkOrdersCount: Number(u?.completed_work_orders_count ?? 0),
      }));

      return { raw, payload: pagePayload, employees, pageInfo };
    },
    staleTime: 60_000,
    keepPreviousData: true,
    retry: 1,
    onError: (error) => {
      const msg = error?.response?.data?.message || "Failed to load employees";
      toast.error(msg);
    },
  });

  // return query;
  return {
    ...query,
    employees: query.data?.employees || [],
    pageInfo: query.data?.pageInfo || {},
  };
};

// GET: /api/v1/manager/user/:id (single user)
export const useManagerUserDetail = ({ id, enabled = true } = {}) => {
  const query = useQuery({
    queryKey: ["manager-user-detail", { id }],
    enabled: enabled && !!id,
    queryFn: async () => {
      const res = await axiosPrivate.get(`/manager/user/${id}`);
      return res.data;
    },
    select: (raw) => {
      const u = raw?.data ?? null;
      if (!u) return { raw, user: null };
      const user = {
        id: u?.id,
        fullName: u?.name || "—",
        email: u?.email || "—",
        avatar:
          cleanUrl(u?.avatar) ||
          "https://mjkasas.softvencefsd.xyz/assets/img/user_placeholder.png",
        role: u?.role || "—",
        status: Boolean(u?.status),
        completedWorkOrdersCount: Number(u?.completed_work_orders_count ?? 0),
        profile: {
          id: u?.profile?.id,
          phone: u?.profile?.phone || "—",
          employeeId: u?.profile?.employ_id || "—",
          department: u?.profile?.department || "—",
          position: u?.profile?.position || "—",
          gender: u?.profile?.gender || "—",
        },
      };
      return { raw, user };
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || "Failed to load user info";
      toast.error(msg);
    },
    staleTime: 30_000,
  });

  const selected = query.data || {};
  return { ...query, user: selected?.user };
};

// POST: /api/v1/manager/user - create employee
export const useCreateManagerUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, email, phone, department, position }) => {
      console.log("Creating employee with data:", {
        name,
        email,
        phone,
        department,
        position,
      });

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
      console.log("Updating employee with data:", {
        id,
        name,
        email,
        phone,
        department,
        position,
      });

      const form = new FormData();
      form.append("_method", "PATCH");
      form.append("name", name);
      form.append("email", email);
      form.append("phone", phone);
      form.append("department", department);
      form.append("position", position);

      // Debug FormData contents
      console.log("FormData contents:");
      for (let [key, value] of form.entries()) {
        console.log(`${key}:`, value);
      }

      const res = await axiosPrivate.post(`/manager/user/${id}`, form);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Employee updated successfully");
      queryClient.invalidateQueries({ queryKey: ["manager-users"] });
      queryClient.invalidateQueries({ queryKey: ["manager-user-detail"] });
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
