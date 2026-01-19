import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Settings = () => {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("settings", { body: { action: "get" } });
      if (error) throw error;
      setSettings(data || {});
    } catch (err) {
      console.error(err);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    try {
      const { error } = await supabase.functions.invoke("settings", { body: { action: "save", settings } });
      if (error) throw error;
      toast.success("Saved");
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="max-w-xl space-y-4">
        <div>
          <label className="text-sm font-medium">Display Name</label>
          <Input value={settings.displayName || ""} onChange={(e) => setSettings((s:any)=>({ ...s, displayName: e.target.value }))} />
        </div>
        <div>
          <label className="text-sm font-medium">Default Template</label>
          <Input value={settings.defaultTemplate || ""} onChange={(e) => setSettings((s:any)=>({ ...s, defaultTemplate: e.target.value }))} />
        </div>
        <div className="flex gap-2">
          <Button variant="gradient" onClick={save} disabled={loading}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
