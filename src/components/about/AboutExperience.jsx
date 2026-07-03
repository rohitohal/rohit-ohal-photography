export default function AboutExperience() {
  const stats = [
    {
      number: "10+",
      title: "Years of Experience",
      description:
        "Capturing weddings, portraits and commercial stories with consistency and artistic vision.",
    },
    {
      number: "500+",
      title: "Stories Documented",
      description:
        "Every celebration, portrait and project is approached with the same passion and attention to detail.",
    },
    {
      number: "Fine Arts",
      title: "Creative Foundation",
      description:
        "A background in Fine Arts shapes every composition, colour palette and visual narrative.",
    },
    {
      number: "Worldwide",
      title: "Available to Travel",
      description:
        "Based in Pune, India and available for destination weddings and assignments around the world.",
    },
  ];

  return (
    <section className="about-experience">
      <div className="about-container">

        <span>EXPERIENCE</span>

        <h2>
          Built On Experience.
          <br />
          Driven By Passion.
        </h2>

        <div className="experience-grid">
          {stats.map((item) => (
            <div
              className="experience-card"
              key={item.title}
            >
              <h3>{item.number}</h3>

              <h4>{item.title}</h4>

              <p>{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}