import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Aditi & Akshay",
    location: "Pune",
    review:
      "Rohit captured our wedding exactly as we lived it. Every photograph feels natural, emotional and timeless."
  },
  {
    id: 2,
    name: "Rahul Sharma",
    location: "Corporate Client",
    review:
      "Professional from start to finish. The final images exceeded every expectation and perfectly represented our brand."
  },
  {
    id: 3,
    name: "Chef Arjun",
    location: "Restaurant Owner",
    review:
      "His eye for light and composition transformed our menu and social media presence completely."
  }
];

export default function Testimonials() {
  return (
    <section className="testimonials">

      <div className="testimonials-container">

        <div className="testimonials-header">

          <span>KIND WORDS</span>

          <h2>
            Trusted By
            <br />
            Wonderful People
          </h2>

        </div>

        <div className="testimonial-grid">

          {testimonials.map((item) => (

            <div
              key={item.id}
              className="testimonial-card"
            >

              <p className="testimonial-review">

                “{item.review}”

              </p>

              <h3>

                {item.name}

              </h3>

              <span>

                {item.location}

              </span>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}