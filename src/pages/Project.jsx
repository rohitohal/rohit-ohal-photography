import { useParams } from "react-router-dom";

import portfolio from "../data/portfolio";
import PageHero from "../components/common/PageHero";

export default function Project() {
  const { projectSlug } = useParams();

  const project = portfolio.find(
    (item) => item.slug === projectSlug
  );

  if (!project) {
    return (
      <div
        style={{
          padding: "200px 20px",
          textAlign: "center",
        }}
      >
        <h1>Project not found</h1>
      </div>
    );
  }

  return (
    <>
      <PageHero
        title={project.title}
        subtitle={`${project.location} • ${project.year}`}
        image={project.cover}
      />

      <section
        style={{
          maxWidth: "1200px",
          margin: "100px auto",
          padding: "0 20px",
        }}
      >
        <h2>{project.title}</h2>

        <p>
          {project.description ||
            "Project description coming soon."}
        </p>

        {project.gallery && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(350px,1fr))",
              gap: "24px",
              marginTop: "50px",
            }}
          >
            {project.gallery.map(
              (image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    borderRadius: "20px",
                  }}
                />
              )
            )}
          </div>
        )}
      </section>
    </>
  );
}