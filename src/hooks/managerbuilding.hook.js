import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "@/lib/axios.config";
import toast from "react-hot-toast";

// GET: /api/v1/manager/buildings (baseURL configured in axiosPrivate)
// Returns pagination object and a convenience array of buildings.
export const useManagerBuildings = ({ page = 1, params = {}, enabled = true } = {}) => {
  const query = useQuery({
    queryKey: ["manager-buildings", page, params],
    enabled,
    queryFn: async () => {
      const res = await axiosPrivate.get("/manager/buildings", {
        params: { page, ...params },
      });
      return res.data; // { success, code, message, data: { ...pagination } }
    },
    keepPreviousData: true,
    staleTime: 60_000,
  });

  const pageData = query.data?.data || null; // pagination payload
  const buildings = pageData?.data || []; // array of buildings

  return { ...query, pageData, buildings };
};

// POST: /api/v1/manager/buildings
// Create a new building record
export const useCreateManagerBuilding = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      // Expecting keys: company_name, tex_rate, name, address_line_one, address_line_tow,
      // mobile, email, note, contact_name, contact_address, contact_email, contact_note
      const res = await axiosPrivate.post("/manager/buildings", payload, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Building created successfully");
      queryClient.invalidateQueries({ queryKey: ["manager-buildings"] });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || "Failed to create building";
      toast.error(msg);
    },
  });
};

export const useDeleteManagerBuilding = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }) => {
      const res = await axiosPrivate.delete(`/manager/buildings/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Building deleted");
      queryClient.invalidateQueries({ queryKey: ["manager-buildings"] });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || "Failed to delete building";
      toast.error(msg);
    },
  });
};