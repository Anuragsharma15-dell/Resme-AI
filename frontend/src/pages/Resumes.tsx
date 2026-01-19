import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Edit, Share2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Resumes = () => {
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("resumes", { body: { action: "list" } });
      if (error) throw error;
      setResumes(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load resumes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this resume permanently?")) return;
    try {
      const { error } = await supabase.functions.invoke("resumes", { body: { action: "delete", id } });
      if (error) throw error;
      toast.success("Deleted");
      load();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const handleEdit = (item: any) => {
    localStorage.setItem("editingResume", JSON.stringify(item));
    navigate("/create");
  };

  const handleShare = async (id: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("sharing", { body: { action: "create", resumeId: id } });
      if (error) throw error;
      await navigator.clipboard.writeText(data.url);
      toast.success("Share link copied");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create share link");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Resumes</h1>
        <Link to="/create">
          <Button variant="gradient">New Resume</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {resumes.length === 0 && !loading && (
          <div className="p-6 rounded-lg bg-secondary/40 text-muted-foreground">No resumes yet.</div>
        )}
        {resumes.map((r) => (
          <div key={r.id} className="p-4 rounded-xl glass-card flex items-center justify-between">
            <div>
              <div className="font-medium">{r.name || "Untitled"}</div>
              <div className="text-sm text-muted-foreground">{r.template || "—"} • {r.views || 0} views</div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => handleEdit(r)}><Edit className="w-4 h-4" /></Button>
              <Button variant="ghost" onClick={() => handleShare(r.id)}><Share2 className="w-4 h-4" /></Button>
              <Button variant="ghost" onClick={() => handleDelete(r.id)}><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resumes;
