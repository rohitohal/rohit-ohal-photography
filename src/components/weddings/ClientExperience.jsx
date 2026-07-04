const experiences = [
  {
    title: "Personal Approach",
    text: "Every wedding is unique. I work closely with every couple to understand their story and create photographs that feel authentic."
  },
  {
    title: "Timeless Editing",
    text: "Natural colours, elegant tones and consistent editing ensure your photographs remain beautiful for decades."
  },
  {
    title: "Complete Coverage",
    text: "From intimate moments to grand celebrations, every important detail is documented with care."
  }
];

export default function ClientExperience() {
  return (
    <section className="client-experience">

      <div className="container">

        <div className="section-header">
          <span>THE EXPERIENCE</span>

          <h2>
            More Than Photography
          </h2>

          <p>
            Every celebration deserves an experience that feels effortless from the first conversation to the final delivery.
          </p>
        </div>

        <div className="experience-grid">

          {experiences.map((item) => (

            <div
              key={item.title}
              className="experience-card"
            >
              <h3>{item.title}</h3>

              <p>{item.text}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}