import {
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../admin/layouts/AdminLayout";


/* =========================
   PUBLIC PAGES
========================= */

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


/* =========================
   ADMIN PAGES
========================= */

import Dashboard from "../admin/pages/Dashboard";
import Projects from "../admin/pages/Projects";
import MediaLibrary from "../admin/pages/MediaLibrary";
import JournalAdmin from "../admin/pages/Journal";
import HomepageAdmin from "../admin/pages/Homepage";

/*
 * Admin pages are renamed where
 * the public page already uses
 * the same component name.
 */

import AboutAdmin from "../admin/pages/About";
import ContactAdmin from "../admin/pages/Contact";

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


      {/* =========================
          PORTFOLIO
      ========================= */}

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


      {/* =========================
          WEDDINGS
      ========================= */}

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


      {/* =========================
          JOURNAL
      ========================= */}

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


      {/* =========================
          ABOUT
      ========================= */}

      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />


      {/* =========================
          CONTACT
      ========================= */}

      <Route
        path="/contact"
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />


      {/* =========================
          LOGIN
      ========================= */}

      <Route
        path="/login"
        element={
          <Login />
        }
      />


      {/* =========================
          ADMIN - DASHBOARD
      ========================= */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />


      {/* =========================
          ADMIN - PROJECTS
      ========================= */}

      <Route
        path="/admin/projects"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Projects />
            </AdminLayout>
          </ProtectedRoute>
        }
      />


      {/* =========================
          ADMIN - MEDIA LIBRARY
      ========================= */}

      <Route
        path="/admin/media"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <MediaLibrary />
            </AdminLayout>
          </ProtectedRoute>
        }
      />


      {/* =========================
          ADMIN - JOURNAL
      ========================= */}

      <Route
        path="/admin/journal"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <JournalAdmin />
            </AdminLayout>
          </ProtectedRoute>
        }
      />


      {/* =========================
          ADMIN - HOMEPAGE
      ========================= */}

      <Route
        path="/admin/homepage"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <HomepageAdmin />
            </AdminLayout>
          </ProtectedRoute>
        }
      />


      {/* =========================
          ADMIN - ABOUT PAGE
      ========================= */}

      <Route
        path="/admin/about"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AboutAdmin />
            </AdminLayout>
          </ProtectedRoute>
        }
      />


      {/* =========================
          ADMIN - CONTACT PAGE
      ========================= */}

      <Route
        path="/admin/contact"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ContactAdmin />
            </AdminLayout>
          </ProtectedRoute>
        }
      />


      {/* =========================
          ADMIN - SEO
      ========================= */}

      <Route
        path="/admin/seo"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <SEOAdmin />
            </AdminLayout>
          </ProtectedRoute>
        }
      />


      {/* =========================
          ADMIN - SETTINGS
      ========================= */}

      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <SettingsAdmin />
            </AdminLayout>
          </ProtectedRoute>
        }
      />


      {/* =========================
          404 - NOT FOUND
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