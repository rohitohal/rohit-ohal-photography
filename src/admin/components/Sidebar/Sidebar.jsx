import "./../../styles/sidebar.css";

import {
  LayoutDashboard,
  FolderKanban,
  GalleryVerticalEnd,
  Images,
  BookOpen,
  MonitorSmartphone,
  UserRound,
  Mail,
  Search,
  Settings,
  LogOut,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { supabase } from "../../../lib/supabase";


/* =========================
   ADMIN MENU ITEMS
========================= */

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
    title: "Disciplines",
    icon: GalleryVerticalEnd,
    path: "/admin/disciplines",
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
    title: "About Page",
    icon: UserRound,
    path: "/admin/about",
  },

  {
    title: "Contact Page",
    icon: Mail,
    path: "/admin/contact",
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

  const navigate =
    useNavigate();


  /* =========================
     LOGOUT
  ========================= */

  const handleLogout =
    async () => {

      try {

        await supabase.auth.signOut();

        navigate(
          "/login"
        );

      } catch (error) {

        console.error(
          "Logout failed:",
          error
        );

      }

    };


  /* =========================
     RENDER
  ========================= */

  return (

    <aside className="admin-sidebar">


      {/* =========================
          LOGO
      ========================= */}

      <div className="admin-sidebar-top">

        <h1 className="admin-logo">
          Rohit Ohal
        </h1>

        <span className="admin-logo-subtitle">
          Photography Admin
        </span>

      </div>


      {/* =========================
          NAVIGATION
      ========================= */}

      <nav className="admin-nav">

        {menuItems.map(
          (item) => {

            const Icon =
              item.icon;

            return (

              <NavLink
                key={
                  item.title
                }
                to={
                  item.path
                }
                className={({
                  isActive,
                }) =>
                  isActive
                    ? "admin-nav-item active"
                    : "admin-nav-item"
                }
              >

                <Icon
                  size={18}
                />

                <span>
                  {item.title}
                </span>

              </NavLink>

            );

          }
        )}

      </nav>


      {/* =========================
          LOGOUT
      ========================= */}

      <div className="admin-sidebar-bottom">

        <button
          type="button"
          className="admin-logout-button"
          onClick={
            handleLogout
          }
        >

          <LogOut
            size={18}
          />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>

  );
}