import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosPrivate } from "@/lib/axios.config";

// Helper: map UI form values to API payload
const mapToApiPayload = (values) => {
  // Map enums and formatting
  const jobType = values.jobType; // Expecting exact API values
  const category = values.category === "construction" || values.category === "Construction"
    ? "Construction"
    : values.category === "janitorial" || values.category === "Janitorial"
    ? "Janitorial"
    : values.category;

  const orderType = values.orderType === "billable" || values.orderType === "Bilable"
    ? "Bilable"
    : values.orderType === "non-billable" || values.orderType === "Non bilable"
    ? "Non bilable"
    : values.orderType;

  const priority = values.priority === "urgent" || values.priority === "Urgent" ? "Urgent" : "Normal";

  const hazardousCleanup = values.hazardousCleanup === "yes" || values.hazardousCleanup === true ? 1 : 0;

  // Dates: format as YYYY-M-D (to match example)
  const formatDate = (d) => {
    if (!d) return "";
    try {
      const dateObj = typeof d === "string" ? new Date(d) : d;
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1; // 1-based
      const day = dateObj.getDate();
      return `${year}-${month}-${day}`;
    } catch {
      return "";
    }
  };

  // Reminder options
  const oneWeek = values?.recurringOptions?.oneWeek ? "1" : undefined;
  const twoWeek = values?.recurringOptions?.twoWeeks ? "2" : undefined;
  const sixHour = values?.recurringOptions?.sixHours ? "3" : undefined;

  // Technician (nullable numeric id)
  let technician = undefined;
  if (values.technician) {
    const n = Number(values.technician);
    technician = Number.isFinite(n) ? String(n) : undefined;
  } else if (values.assignTo) {
    const n = Number(values.assignTo);
    technician = Number.isFinite(n) ? String(n) : undefined;
  }

  return {
    fequency_job_type: category, // best-effort mapping based on provided API spec
    title: values.title,
    description: values.description,
    job_type: jobType,
    hourly_rate: values.hourlyRate != null ? String(values.hourlyRate) : undefined,
    due_date: formatDate(values.dueDate),
    follow_up_date: formatDate(values.followUpDate),
    location: values.location,
    technician, // optional
    category,
    hazardous_cleanup: String(hazardousCleanup),
    priority,
    order_type: orderType,
    one_week: oneWeek,
    two_week: twoWeek,
    six_hour: sixHour,
  };
};

// Helper: build FormData including images
const buildFormData = (payload, photos = []) => {
  const fd = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      fd.append(key, value);
    }
  });

  // Append images and descriptions
  photos.forEach((p) => {
    if (p?.file) {
      fd.append("image[]", p.file);
      fd.append("image_descriptions[]", p.description || "");
    }
  });
  return fd;
};

export const useCreateWorkOrder = () => {
  const mutation = useMutation({
    mutationFn: async ({ values, photos }) => {
      const payload = mapToApiPayload(values);
      const formData = buildFormData(payload, photos);
      const res = await axiosPrivate.post("/manager/work-order", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message || "Work order created");
      } else {
        toast.error(data?.message || "Failed to create work order");
      }
    },
    onError: (error) => {
      const resp = error?.response?.data;
      const message = resp?.message || error.message || "Failed to create work order";
      toast.error(message);
    },
  });

  const { mutate, isPending, isError } = mutation;
  return { mutate, isPending, isError };
};

// Paginated: fetch manager work orders
export const useManagerWorkOrders = ({ page = 1, perPage = 5, enabled = true }) => {
  const query = useQuery({
    queryKey: ["manager-work-orders", { page, perPage }],
    enabled,
    queryFn: async () => {
      const res = await axiosPrivate.get("/manager/work-order", {
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
  };

  return { ...query, workOrders: list, pageInfo };
};
// Single: fetch manager work order detail
export const useManagerWorkOrderDetail = ({ id, enabled = true }) => {
  const query = useQuery({
    queryKey: ["manager-work-order-detail", { id }],
    enabled: enabled && !!id,
    queryFn: async () => {
      const res = await axiosPrivate.get(`/manager/work-order/${id}`);
      return res.data;
    },
  });

  return { ...query, detail: query.data?.data };
};

export const useDeleteWorkOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (workOrderId) => {
            const response = await axiosPrivate.delete(`/manager/work-order/${workOrderId}`);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Work order deleted successfully");
            // Invalidate work orders list to trigger refetch
            queryClient.invalidateQueries({ queryKey: ['managerWorkOrders'] });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete work order");
        },
    });
};