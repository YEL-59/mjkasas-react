import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "@/lib/axios.config";
import toast from "react-hot-toast";

// Utility: remove stray backticks and trim
const cleanString = (s) => (typeof s === "string" ? s.replace(/`/g, "").trim() : "");

// GET /manager/inspections/:id
// Usage: const { details, isLoading } = useManagerInspectionDetails({ id })
export const useManagerInspectionDetails = ({ id, enabled = true } = {}) => {
  const query = useQuery({
    queryKey: ["manager-inspection-details", id],
    enabled: Boolean(id) && enabled,
    queryFn: async () => {
      const res = await axiosPrivate.get(`/manager/inspections/${id}`);
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
        .map((g) => cleanString(g?.image_path));
      const afterPhotos = galleries
        .filter((g) => g?.type === "after")
        .map((g) => cleanString(g?.image_path));

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
          avatar: cleanString(manager?.avatar),
          role: manager?.role,
          status: manager?.status,
          completedWorkOrdersCount: manager?.completed_work_orders_count,
        },
        technician: {
          id: technician?.id,
          name: technician?.name,
          handle: technician?.handle,
          email: technician?.email,
          avatar: cleanString(technician?.avatar),
          role: technician?.role,
          status: technician?.status,
          completedWorkOrdersCount: technician?.completed_work_orders_count,
        },
        inspector: {
          id: inspector?.id,
          name: inspector?.name,
          handle: inspector?.handle,
          email: inspector?.email,
          avatar: cleanString(inspector?.avatar),
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