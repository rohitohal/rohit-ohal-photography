import StatCard from "../components/StatCard/StatCard";

import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-page">

      <div className="dashboard-header">

        <div>
          <span className="dashboard-overline">
            ADMIN PANEL
          </span>

          <h1>
            Welcome back, Rohit
          </h1>

          <p>
            Manage projects, media, journals and your website
            from one place.
          </p>
        </div>

      </div>

      <div className="stats-grid">

        <StatCard
          title="Projects"
          value="0"
          type="projects"
          change="+0"
        />

        <StatCard
          title="Images"
          value="0"
          type="images"
          change="+0"
        />

        <StatCard
          title="Journal Posts"
          value="0"
          type="journal"
          change="+0"
        />

        <StatCard
          title="Storage Used"
          value="0 GB"
          type="storage"
          change="0%"
        />

      </div>

      <div className="dashboard-grid">

        <section className="dashboard-panel">

          <h2>Recent Activity</h2>

          <div className="empty-state">
            Activity will appear here once you start using
            the admin panel.
          </div>

        </section>

        <section className="dashboard-panel">

          <h2>Quick Actions</h2>

          <div className="quick-actions">

            <button>
              New Project
            </button>

            <button>
              Upload Images
            </button>

            <button>
              New Journal Post
            </button>

            <button>
              Homepage Hero
            </button>

          </div>

        </section>

      </div>

    </div>
  );
}