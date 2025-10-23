import { useQuery } from "@tanstack/react-query";
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