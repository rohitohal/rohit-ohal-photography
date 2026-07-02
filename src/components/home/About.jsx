export default function About() {
  return (
    <section className="about">

      <div className="container about-container">

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=80"
            alt="Photographer"
          />
        </div>

        <div className="about-content">

          <span className="section-label">
            ABOUT ME
          </span>

          <h2>
            A photographer,
            <br />
            <em>based in Pune.</em>
          </h2>

          <p>
            Photography is more than taking photographs.
            It is storytelling, emotion and preserving
            moments that deserve to be remembered.
          </p>

          <div className="about-stats">

            <div>
              <h3>10+</h3>
              <span>Years Experience</span>
            </div>

            <div>
              <h3>500+</h3>
              <span>Weddings</span>
            </div>

            <div>
              <h3>25+</h3>
              <span>Awards</span>
            </div>

          </div>

          <button className="about-btn">
            MORE ABOUT ROHIT
          </button>

        </div>

      </div>

    </section>
  );
}