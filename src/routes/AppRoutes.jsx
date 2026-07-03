import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Weddings from "../pages/Weddings";
import WeddingStory from "../pages/WeddingStory";
import Journal from "../pages/Journal";
import About from "../pages/About";
import Contact from "../pages/Contact";

export default function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
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

    </Routes>
  );
}