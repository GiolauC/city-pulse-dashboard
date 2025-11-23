import { LayoutDashboard, FileText, Star, LogOut, User } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import logo from '@/assets/logo.svg';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Demandas', url: '/demands', icon: FileText },
  { title: 'Avaliações', url: '/evaluations', icon: Star },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar
      className={collapsed ? 'w-14' : 'w-60'}
      collapsible
    >
      <div className="flex items-center gap-3 p-4 border-b border-sidebar-border">
        <img src={logo} alt="Sofia Logo" className={`h-8 ${collapsed ? 'mx-auto' : ''}`} />
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sidebar-foreground font-semibold text-sm">
              Gestão Municipal
            </span>
          </div>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-sidebar-foreground/70">
              Menu
            </SidebarGroupLabel>
          )}
          
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="p-4 space-y-2">
          {!collapsed && profile && (
            <div className="text-xs text-sidebar-foreground/70 space-y-1 mb-3">
              <div className="flex items-center gap-2">
                <User className="h-3 w-3" />
                <span className="truncate">{profile.email}</span>
              </div>
              <div className="pl-5 text-sidebar-primary capitalize">
                {profile.role === 'city' ? 'Gestão da Cidade' : 'Gestão do Bairro'}
              </div>
              {profile.city_name && <div className="pl-5">{profile.city_name}</div>}
              {profile.neighborhood_name && <div className="pl-5">{profile.neighborhood_name}</div>}
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Sair</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
