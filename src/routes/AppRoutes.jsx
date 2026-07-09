import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../admin/layouts/AdminLayout";

/* Public Pages */

import Home from "../pages/Home";
import Portfolio from "../pages/Portfolio";
import Discipline from "../pages/Discipline";
import Project from "../pages/Project";

import Weddings from "../pages/Weddings";
import WeddingStory from "../pages/WeddingStory";

import Journal from "../pages/Journal";
import JournalPost from "../pages/JournalPost";

import About from "../pages/About";
import Contact from "../pages/Contact";

import NotFound from "../pages/NotFound";

/* Admin Pages */

import Dashboard from "../admin/pages/Dashboard";
import Projects from "../admin/pages/Projects";
import MediaLibrary from "../admin/pages/MediaLibrary";
import JournalAdmin from "../admin/pages/Journal";
import HomepageAdmin from "../admin/pages/Homepage";
import SEOAdmin from "../admin/pages/SEO";
import SettingsAdmin from "../admin/pages/Settings";

export default function AppRoutes() {
  return (
    <Routes>

      {/* =========================
          PUBLIC WEBSITE
      ========================= */}

      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/portfolio"
        element={
          <MainLayout>
            <Portfolio />
          </MainLayout>
        }
      />

      <Route
        path="/portfolio/:disciplineSlug"
        element={
          <MainLayout>
            <Discipline />
          </MainLayout>
        }
      />

      <Route
        path="/portfolio/:disciplineSlug/:projectSlug"
        element={
          <MainLayout>
            <Project />
          </MainLayout>
        }
      />

      <Route
        path="/weddings"
        element={
          <MainLayout>
            <Weddings />
          </MainLayout>
        }
      />

      <Route
        path="/weddings/:slug"
        element={
          <MainLayout>
            <WeddingStory />
          </MainLayout>
        }
      />

      <Route
        path="/journal"
        element={
          <MainLayout>
            <Journal />
          </MainLayout>
        }
      />

      <Route
        path="/journal/:slug"
        element={
          <MainLayout>
            <JournalPost />
          </MainLayout>
        }
      />

      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />

      <Route
        path="/contact"
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />

      {/* =========================
          ADMIN PANEL
      ========================= */}

      <Route
        path="/admin/dashboard"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/projects"
        element={
          <AdminLayout>
            <Projects />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/media"
        element={
          <AdminLayout>
            <MediaLibrary />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/journal"
        element={
          <AdminLayout>
            <JournalAdmin />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/homepage"
        element={
          <AdminLayout>
            <HomepageAdmin />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/seo"
        element={
          <AdminLayout>
            <SEOAdmin />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/settings"
        element={
          <AdminLayout>
            <SettingsAdmin />
          </AdminLayout>
        }
      />

      {/* =========================
          404
      ========================= */}

      <Route
        path="*"
        element={
          <MainLayout>
            <NotFound />
          </MainLayout>
        }
      />

    </Routes>
  );
}