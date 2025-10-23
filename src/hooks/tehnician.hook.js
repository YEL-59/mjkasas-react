import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "@/lib/axios.config";

// Fetch technician work orders (paginated)
export const useTechnicianWorkOrders = ({
  page = 1,
  perPage = 10,
  enabled = true,
} = {}) => {
  const query = useQuery({
    queryKey: ["technician-work-orders", { page, perPage }],
    enabled,
    queryFn: async () => {
      const res = await axiosPrivate.get("/technician/work-order", {
        params: { per_page: perPage, page },
      });
      return res.data;
    },
  });

  const raw = query.data;
  const list = raw?.data?.data || [];
  const pageInfo = {
    currentPage: raw?.data?.current_page ?? page,
    lastPage: raw?.data?.last_page ?? 1,
    total: raw?.data?.total ?? list.length,
    perPage: raw?.data?.per_page ?? perPage,
  };

  return { ...query, workOrders: list, pageInfo };
};

// Fetch single work order details
export const useTechnicianWorkOrderDetails = (id, { enabled = true } = {}) => {
  const query = useQuery({
    queryKey: ["technician-work-order", id],
    enabled: enabled && !!id,
    queryFn: async () => {
      const res = await axiosPrivate.get(`/technician/work-order/${id}`);
      return res.data;
    },
  });

  const raw = query.data;
  const workOrder = raw?.data || null;
  return { ...query, workOrder };
};

// Upload after images for a work order
export const useUploadAfterImage = () => {
  return useMutation({
    mutationFn: async ({ workOrderId, image, note }) => {
      const form = new FormData();
      if (image) form.append("image", image);
      if (note != null) form.append("note", note);
      const res = await axiosPrivate.post(
        `/technician/work-order/${workOrderId}/upload-image/after`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data;
    },
  });
};

// Delete a gallery image by id
export const useDeleteGalleryImage = () => {
  return useMutation({
    mutationFn: async ({ imageId }) => {
      const res = await axiosPrivate.delete(
        `/technician/work-order/image/${imageId}/delete`
      );
      return res.data;
    },
  });
};

// Find technician by name
export const useFindTechnician = (name, { enabled = false } = {}) => {
  const query = useQuery({
    queryKey: ["find-technician", name],
    enabled: enabled && !!name && name.length > 1,
    queryFn: async () => {
      const res = await axiosPrivate.get("/technician/user/find-technician", {
        params: { name },
      });
      return res.data;
    },
  });
  return query;
};

// Assign technician to a work order
export const useAssignTechnician = () => {
  return useMutation({
    mutationFn: async ({ workOrderId, technicianId, work_hour }) => {
      const form = new FormData();
      form.append("technician", technicianId);
      if (work_hour != null) form.append("work_hour", String(work_hour));
      const res = await axiosPrivate.post(
        `/technician/work-order/${workOrderId}/assign/technician`,
        form
      );
      return res.data;
    },
  });
};

// Update technician work hours on a work order
export const useUpdateWorkHour = () => {
  return useMutation({
    mutationFn: async ({ workOrderId, technicianId, work_hour }) => {
      const form = new FormData();
      form.append("work_hour", String(work_hour));
      const res = await axiosPrivate.post(
        `/technician/work-order/${workOrderId}/assign/${technicianId}/work_hour`,
        form
      );
      return res.data;
    },
  });
};

// Complete a work order with signature and note
export const useCompleteWorkOrder = () => {
  return useMutation({
    mutationFn: async ({ workOrderId, signatureFile, complete_note }) => {
      // Debug logging
      console.log("Complete work order - received values:", {
        workOrderId,
        signatureFile: signatureFile ? "File present" : "No file",
        complete_note,
      });

      const form = new FormData();
      // Add _method field for Laravel API compatibility
      form.append("_method", "PATCH");
      if (signatureFile) form.append("signature", signatureFile);
      // Always append complete_note; backend requires the field
      form.append("complete_note", String(complete_note ?? ""));
      
      // Debug FormData contents
      console.log("FormData contents for work order completion:");
      for (let [key, value] of form.entries()) {
        console.log(`${key}:`, value);
      }
      
      // Let axios set proper multipart boundaries automatically
      // Try POST with _method=PATCH for Laravel compatibility
      const res = await axiosPrivate.post(
        `/technician/work-order/${workOrderId}/complete`,
        form
      );
      return res.data;
    },
  });
};

// Completed orders: fetch technician completed work orders
export const useTechnicianCompletedOrders = ({
  page = 1,
  perPage = 5,
  enabled = true,
} = {}) => {
  const query = useQuery({
    queryKey: ["technician-completed-orders", { page, perPage }],
    enabled,
    queryFn: async () => {
      const res = await axiosPrivate.get("/technician/complete-order", {
        params: { per_page: perPage, page },
      });
      return res.data;
    },
  });

  const raw = query.data;
  const list = raw?.data?.data || [];
  const pageInfo = {
    currentPage: raw?.data?.current_page ?? page,
    lastPage: raw?.data?.last_page ?? 1,
    total: raw?.data?.total ?? list.length,
    perPage: raw?.data?.per_page ?? perPage,
  };

  return { ...query, completedOrders: list, pageInfo };
};

// Dashboard summary: assigned, pending, overdue, completion_rate
export const useTechnicianDashboardSummary = ({ enabled = true } = {}) => {
  const query = useQuery({
    queryKey: ["technician-dashboard-summary"],
    enabled,
    queryFn: async () => {
      const res = await axiosPrivate.get("/technician/dashboard");
      return res.data;
    },
  });
  const summary = query.data?.data || null;
  return { ...query, summary };
};

// Upcoming deadlines list
export const useTechnicianUpcomingDeadlines = ({ enabled = true } = {}) => {
  const query = useQuery({
    queryKey: ["technician-dashboard-deadlines"],
    enabled,
    queryFn: async () => {
      const res = await axiosPrivate.get("/technician/dashboard/deadlines");
      return res.data;
    },
  });
  const deadlines = Array.isArray(query.data?.data) ? query.data?.data : [];
  return { ...query, deadlines };
};

// Newly assigned tasks list
export const useTechnicianNewAssign = ({ enabled = true } = {}) => {
  const query = useQuery({
    queryKey: ["technician-dashboard-new-assign"],
    enabled,
    queryFn: async () => {
      const res = await axiosPrivate.get("/technician/dashboard/new-assign");
      return res.data;
    },
  });
  const tasks = Array.isArray(query.data?.data) ? query.data?.data : [];
  return { ...query, tasks };
};
