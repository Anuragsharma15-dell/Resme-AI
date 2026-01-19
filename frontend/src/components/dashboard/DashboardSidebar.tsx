import { Link, useLocation } from "react-router-dom";
import { 
  Sparkles, LayoutDashboard, FileText, Settings, HelpCircle,
  LogOut, ChevronLeft, Palette, BarChart3, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const DashboardSidebar = () => {
  const navigate  = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: FileText, label: "Resumes", href: "/Resumes" },
    { icon: Palette, label: "Templates", href: "/templates" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: Share2, label: "Sharing", href: "/sharing" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <aside className={`${collapsed ? "w-20" : "w-64"} min-h-screen glass-card border-r border-border transition-all duration-300 flex flex-col`}>
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold">
              Resume<span className="gradient-text">AI</span>
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              location.pathname === item.href
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-border space-y-2">
        <Link
          to="/help"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
        >
          <HelpCircle className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Help</span>}
        </Link>
        <button  onClick={()=> navigate('/login')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
          <LogOut  className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Log out</span>}
        </button> 
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
