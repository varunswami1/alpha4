import { ReactNode, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, X, Home, Users, Leaf, MessageSquare, 
  ShoppingBag, BarChart3, LogOut, Settings, Shield
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const adminNavItems = [
  { label: "Dashboard", icon: Home, href: "/admin/dashboard" },
  { label: "Users", icon: Users, href: "/admin/users" },
  { label: "Plants", icon: Leaf, href: "/admin/plants" },
  { label: "Community", icon: MessageSquare, href: "/admin/community" },
  { label: "Products", icon: ShoppingBag, href: "/admin/products" },
  { label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
];

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        navigate("/admin");
        return;
      }

      try {
        const { data, error } = await supabase
          .rpc('has_role', { _user_id: user.id, _role: 'admin' });

        if (error) throw error;
        
        if (!data) {
          navigate("/admin");
          return;
        }
        
        setIsAdmin(true);
      } catch (error) {
        console.error("Error checking admin role:", error);
        navigate("/admin");
      } finally {
        setLoading(false);
      }
    };

    checkAdminRole();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b z-50 flex items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        
        <div className="flex items-center gap-2 ml-4">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Plantona Admin</span>
        </div>
        
        <div className="ml-auto flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              Exit Admin
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => logout()}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-card border-r transition-transform z-40 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        <nav className="p-4 space-y-2">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                location.pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 pt-16 min-h-screen">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">{title}</h1>
          {children}
        </div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
