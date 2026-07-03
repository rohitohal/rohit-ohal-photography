import "./WhyChooseMe.css";

const features = [
  {
    number: "01",
    title: "Fine Art Foundation",
    text: "A background in Fine Arts allows every photograph to be composed with balance, light and emotion rather than simply documenting the moment."
  },
  {
    number: "02",
    title: "Story-Driven Approach",
    text: "Every wedding, portrait or commercial assignment is captured as a complete visual story with genuine moments and timeless imagery."
  },
  {
    number: "03",
    title: "Professional Experience",
    text: "More than a decade of experience photographing weddings, portraits, industrial projects and editorial assignments across India."
  },
  {
    number: "04",
    title: "Quality Over Quantity",
    text: "Every image is individually selected, colour graded and refined to maintain a consistent premium standard throughout the final collection."
  }
];

export default function WhyChooseMe() {
  return (
    <section className="why">

      <div className="why-container">

        <div className="why-header">

          <span>WHY CHOOSE ROHIT OHAL</span>

          <h2>
            Photography Built
            <br />
            Around Emotion.
          </h2>

        </div>

        <div className="why-grid">

          {features.map((item) => (

            <div
              className="why-card"
              key={item.number}
            >

              <span className="why-number">

                {item.number}

              </span>

              <h3>

                {item.title}

              </h3>

              <p>

                {item.text}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}