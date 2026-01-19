import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Analytics = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("analytics", { body: { action: "summary" } });
      if (error) throw error;
      setMetrics(data || {});
    } catch (err) {
      console.error(err);
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Overview of your resumes performance</p>
      </div>

      {loading && <div className="p-4">Loading…</div>}

      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-4 rounded-xl">
            <div className="text-sm text-muted-foreground">Total Views</div>
            <div className="text-2xl font-bold">{metrics.totalViews || 0}</div>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <div className="text-sm text-muted-foreground">Unique Visitors</div>
            <div className="text-2xl font-bold">{metrics.uniqueVisitors || 0}</div>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <div className="text-sm text-muted-foreground">Avg. Score</div>
            <div className="text-2xl font-bold">{metrics.avgScore || 0}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
