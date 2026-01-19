import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Sharing = () => {
  const [links, setLinks] = useState<any[]>([]);

  const load = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("sharing", { body: { action: "list" } });
      if (error) throw error;
      setLinks(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch links");
    }
  };

  useEffect(() => { load(); }, []);

  const revoke = async (id: string) => {
    try {
      const { error } = await supabase.functions.invoke("sharing", { body: { action: "delete", id } });
      if (error) throw error;
      toast.success("Revoked");
      load();
    } catch (err) {
      console.error(err);
      toast.error("Failed to revoke");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Sharing</h1>
      <div className="space-y-3">
        {links.length === 0 && <div className="p-4 rounded-lg bg-secondary/40">No active share links.</div>}
        {links.map((l) => (
          <div key={l.id} className="glass-card p-4 rounded-xl flex items-center justify-between">
            <div>
              <div className="font-medium">{l.resumeName || "Resume"}</div>
              <a className="text-sm text-accent" href={l.url} target="_blank" rel="noreferrer">{l.url}</a>
            </div>
            <div>
              <Button variant="ghost" onClick={() => navigator.clipboard.writeText(l.url)}>Copy</Button>
              <Button variant="ghost" onClick={() => revoke(l.id)}>Revoke</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sharing;
