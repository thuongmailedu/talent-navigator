import { LayoutDashboard, Users, TrendingUp, GraduationCap, UserCheck, Heart, AlertTriangle } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Tổng quan", url: "/", icon: LayoutDashboard },
  { title: "Năng lực", url: "/skills", icon: TrendingUp },
  { title: "Hiệu suất", url: "/performance", icon: Users },
  { title: "Đào tạo", url: "/learning", icon: GraduationCap },
  { title: "Kế nhiệm", url: "/succession", icon: UserCheck },
  { title: "Gắn kết", url: "/engagement", icon: Heart },
  { title: "Cảnh báo", url: "/alerts", icon: AlertTriangle },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Users className="h-6 w-6 text-primary-foreground" />
          </div>
          {open && (
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">Talent HRM</h2>
              <p className="text-xs text-sidebar-foreground/70">Quản trị tài năng</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Phân tích</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end={item.url === "/"}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
