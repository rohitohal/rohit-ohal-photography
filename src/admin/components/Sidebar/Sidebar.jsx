import {
  LayoutDashboard,
  FolderKanban,
  Images,
  BookOpen,
  MonitorSmartphone,
  Search,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    path: "/admin/projects",
  },
  {
    title: "Media Library",
    icon: Images,
    path: "/admin/media",
  },
  {
    title: "Journal",
    icon: BookOpen,
    path: "/admin/journal",
  },
  {
    title: "Homepage",
    icon: MonitorSmartphone,
    path: "/admin/homepage",
  },
  {
    title: "SEO",
    icon: Search,
    path: "/admin/seo",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="admin-sidebar">

      <div className="admin-sidebar-top">

        <h1 className="admin-logo">
          Rohit Ohal
        </h1>

        <span className="admin-logo-subtitle">
          Photography Admin
        </span>

      </div>

      <nav className="admin-nav">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "admin-nav-item active"
                  : "admin-nav-item"
              }
            >
              <Icon size={18} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}

      </nav>

      <div className="admin-sidebar-bottom">

        <button className="admin-logout-button">

          <LogOut size={18} />

          <span>Logout</span>

        </button>

      </div>

    </aside>
  );
}