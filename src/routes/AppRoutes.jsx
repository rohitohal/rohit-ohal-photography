import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Portfolio from "../pages/Portfolio";
import Discipline from "../pages/Discipline";
import Project from "../pages/Project";

import Weddings from "../pages/Weddings";
import WeddingStory from "../pages/WeddingStory";

import Journal from "../pages/Journal";
import About from "../pages/About";
import Contact from "../pages/Contact";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Home */}

      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      {/* Portfolio Landing */}

      <Route
        path="/portfolio"
        element={
          <MainLayout>
            <Portfolio />
          </MainLayout>
        }
      />

      {/* Discipline Pages */}

      <Route
        path="/portfolio/:disciplineSlug"
        element={
          <MainLayout>
            <Discipline />
          </MainLayout>
        }
      />

      {/* Project Pages */}

      <Route
        path="/portfolio/:disciplineSlug/:projectSlug"
        element={
          <MainLayout>
            <Project />
          </MainLayout>
        }
      />

      {/* Legacy Wedding Routes */}

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

      {/* Journal */}

      <Route
        path="/journal"
        element={
          <MainLayout>
            <Journal />
          </MainLayout>
        }
      />

      {/* About */}

      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />

      {/* Contact */}

      <Route
        path="/contact"
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />

    </Routes>
  );
}