import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "@/lib/axios.config";
import toast from "react-hot-toast";

// Remove stray backticks and whitespace from API strings
const clean = (s) => (typeof s === "string" ? s.replace(/`/g, "").trim() : "");

// GET: /api/v1/technician/inspections (paginated)
// Usage: const { inspections, pageInfo, isLoading } = useTechnicianInspections({ page: 1, perPage: 5 })
export const useTechnicianInspections = ({ page = 1, perPage = 5, enabled = true } = {}) => {
  const query = useQuery({
    queryKey: ["technician-inspections", { page, perPage }],
    enabled,
    queryFn: async () => {
      const res = await axiosPrivate.get("/technician/inspections", {
        params: { per_page: perPage, page },
      });
      return res.data;
    },
    select: (raw) => {
      const payload = raw?.data ?? raw ?? {};
      const list = Array.isArray(payload?.data) ? payload.data : [];

      const pageInfo = {
        currentPage: payload?.current_page ?? page,
        lastPage: payload?.last_page ?? 1,
        total: payload?.total ?? list.length,
        perPage: payload?.per_page ?? perPage,
        nextPageUrl: clean(payload?.next_page_url),
        prevPageUrl: clean(payload?.prev_page_url),
        path: clean(payload?.path),
        firstPageUrl: clean(payload?.first_page_url),
        lastPageUrl: clean(payload?.last_page_url),
      };

      const inspections = list.map((it) => ({
        id: it?.id,
        uid: it?.uid,
        customerName: it?.customer_name,
        buildingId: it?.building_id,
        managerId: it?.manager_id,
        technicianId: it?.technician_id,
        inspectorId: it?.inspector_id,
        contactNumber: it?.contact_number,
        dateOfInspection: it?.date_of_inspection,
        dateOfCompletion: it?.date_of_completion,
        status: it?.status,
        completeNote: it?.complete_note,
      }));

      return { raw, payload, inspections, pageInfo };
    },
    staleTime: 60_000,
    keepPreviousData: true,
    retry: 1,
    onError: (error) => {
      const msg = error?.response?.data?.message || "Failed to load technician inspections";
      toast.error(msg);
    },
  });

  const selected = query.data || {};
  const inspections = Array.isArray(selected?.inspections) ? selected.inspections : [];
  const pageInfo = selected?.pageInfo;
  return { ...query, inspections, pageInfo };
};

export const useTechnicianInspectionDetails = ({ id, enabled = true } = {}) => {
  const query = useQuery({
    queryKey: ["technician-inspection-details", { id }],
    enabled: Boolean(id) && enabled,
    queryFn: async () => {
      const res = await axiosPrivate.get(`/technician/inspections/${id}`);
      return res.data;
    },
    select: (raw) => {
      const payload = raw?.data ?? raw ?? {};
      const it = payload?.data ?? payload;

      const building = it?.building || {};
      const manager = it?.manager || {};
      const technician = it?.technician || {};
      const inspector = it?.inspector || {};
      const galleries = Array.isArray(it?.galleries) ? it.galleries : [];

      const beforePhotos = galleries
        .filter((g) => g?.type === "before")
        .map((g) => ({ id: g?.id, image: clean(g?.image_path), description: g?.description || "" }));
      const afterPhotos = galleries
        .filter((g) => g?.type === "after")
        .map((g) => ({ id: g?.id, image: clean(g?.image_path), description: g?.description || "" }));

      const details = {
        id: it?.id,
        uid: it?.uid,
        customerName: it?.customer_name,
        buildingId: it?.building_id,
        managerId: it?.manager_id,
        technicianId: it?.technician_id,
        inspectorId: it?.inspector_id,
        contactNumber: it?.contact_number,
        dateOfInspection: it?.date_of_inspection,
        dateOfCompletion: it?.date_of_completion,
        status: it?.status,
        completeNote: it?.complete_note,
        building: {
          id: building?.id,
          name: building?.name,
          companyName: building?.company_name,
          addressLineOne: building?.address_line_one,
          addressLineTwo: building?.address_line_tow,
          contactName: building?.contact_name,
          contactEmail: building?.contact_email,
          contactAddress: building?.contact_address,
          mobile: building?.mobile,
          note: building?.note,
          texRate: building?.tex_rate,
        },
        manager: {
          id: manager?.id,
          name: manager?.name,
          handle: manager?.handle,
          email: manager?.email,
          avatar: clean(manager?.avatar),
          role: manager?.role,
          status: manager?.status,
          completedWorkOrdersCount: manager?.completed_work_orders_count,
        },
        technician: {
          id: technician?.id,
          name: technician?.name,
          handle: technician?.handle,
          email: technician?.email,
          avatar: clean(technician?.avatar),
          role: technician?.role,
          status: technician?.status,
          completedWorkOrdersCount: technician?.completed_work_orders_count,
        },
        inspector: {
          id: inspector?.id,
          name: inspector?.name,
          handle: inspector?.handle,
          email: inspector?.email,
          avatar: clean(inspector?.avatar),
          role: inspector?.role,
          status: inspector?.status,
          completedWorkOrdersCount: inspector?.completed_work_orders_count,
        },
        beforePhotos,
        afterPhotos,
      };

      return { raw, payload, details };
    },
    staleTime: 60_000,
    retry: 1,
    onError: (error) => {
      const msg = error?.response?.data?.message || "Failed to load inspection details";
      toast.error(msg);
    },
  });

  const selected = query.data || {};
  const details = selected?.details || null;
  return { ...query, details };
};

export const useCompleteInspection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ inspectionId, complete_note }) => {
      const form = new FormData();
      form.append("_method", "PATCH");
      form.append("complete_note", String(complete_note ?? ""));
      const res = await axiosPrivate.post(`/technician/inspections/${inspectionId}`, form);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Inspection completed successfully");
      queryClient.invalidateQueries({ queryKey: ["technician-inspections"] });
      queryClient.invalidateQueries({ queryKey: ["technician-inspection-details"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to complete inspection");
    },
  });
};