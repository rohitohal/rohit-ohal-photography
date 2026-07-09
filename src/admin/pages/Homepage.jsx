export default function Homepage() {
  return (
    <div className="admin-page">

      <div className="admin-page-header">

        <span className="admin-page-overline">
          HOMEPAGE MANAGEMENT
        </span>

        <h1>
          Homepage Manager
        </h1>

        <p>
          Control everything that appears on the public homepage
          from one central place.
        </p>

      </div>

      <div className="admin-section-grid">

        <div className="admin-card">
          <h2>Hero Slider</h2>

          <p>
            Manage homepage hero slides, titles, subtitles and CTA buttons.
          </p>

          <button>
            Manage Hero Slides
          </button>
        </div>

        <div className="admin-card">
          <h2>Featured Disciplines</h2>

          <p>
            Select which disciplines appear on the homepage and their order.
          </p>

          <button>
            Manage Disciplines
          </button>
        </div>

        <div className="admin-card">
          <h2>Featured Projects</h2>

          <p>
            Choose featured galleries and portfolio projects.
          </p>

          <button>
            Manage Projects
          </button>
        </div>

        <div className="admin-card">
          <h2>Journal Highlights</h2>

          <p>
            Control featured articles and homepage journal content.
          </p>

          <button>
            Manage Journal
          </button>
        </div>

        <div className="admin-card">
          <h2>Call To Action</h2>

          <p>
            Edit homepage CTA titles, text and button labels.
          </p>

          <button>
            Edit CTA
          </button>
        </div>

        <div className="admin-card">
          <h2>SEO Overview</h2>

          <p>
            Configure homepage metadata and social sharing information.
          </p>

          <button>
            Open SEO Settings
          </button>
        </div>

      </div>

    </div>
  );
}