import { useQuery } from '@tanstack/react-query';
import { axiosPrivate } from '@/lib/axios.config';
import toast from "react-hot-toast";

export const MANAGER_DASHBOARD_KEY = ['manager-dashboard'];

export const useManagerDashboardCounts = () => {
  return useQuery({
    queryKey: MANAGER_DASHBOARD_KEY,
    queryFn: async () => {
      const res = await axiosPrivate.get('/manager/dashboard');
      return res.data;
    },
    select: (data) => {
      const counts = data?.data || {};
      return {
        raw: data,
        total_work_orders: Number(counts.total_work_orders ?? 0),
        pending_work_orders: Number(counts.pending_work_orders ?? 0),
        in_progress_work_orders: Number(counts.in_progress_work_orders ?? 0),
        completed_work_orders: Number(counts.completed_work_orders ?? 0),
      };
    },
    staleTime: 60 * 1000,
    retry: 1,
    onError: (error) => {
      const msg = error?.response?.data?.message || 'Failed to load dashboard counts';
      toast.error(msg);
    },
  });
};

export const useManagerDashboardActivity = ({ granularity = 'year' }) => {
  return useQuery({
    queryKey: ['manager-dashboard-activity', granularity],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/manager/dashboard/activity/${granularity}`);
      return res.data;
    },
    select: (data) => {
      const d = data?.data || { dates: [], counts: [] };
      const points = (d.dates || []).map((dateStr, idx) => {
        const count = Number(d.counts?.[idx] ?? 0);
        const date = new Date(dateStr);
        const label = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        return { dateStr, count, label };
      });
      return { raw: data, points };
    },
    staleTime: 60 * 1000,
    retry: 1,
    onError: (error) => {
      const msg = error?.response?.data?.message || 'Failed to load activity data';
      toast.error(msg);
    },
  });
};
