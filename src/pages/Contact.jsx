import PageHero from "../components/common/PageHero";
import heroImage from "../assets/images/hero.jpg";

export default function Contact() {
  return (
    <>
      <PageHero
        title="Let's Create Something Beautiful"
        subtitle="Whether you're planning a wedding, portrait session, commercial project or destination wedding, I'd love to hear your story."
        image={heroImage}
      />

      <section className="contact-section">
        <div className="contact-container">

          {/* Contact Information */}

          <div className="contact-info">

            <span>GET IN TOUCH</span>

            <h2>
              Let's Tell
              <br />
              Your Story.
            </h2>

            <p>
              Every great photograph begins with a conversation.
              Tell me about your vision, your celebration and the
              moments that matter most. Together we'll create
              photographs that you'll cherish for a lifetime.
            </p>

            <div className="contact-card">
              <h4>Email</h4>

              <a
                href="mailto:hello@rohitohal.com"
                className="contact-link"
              >
                hello@rohitohal.com
              </a>
            </div>

            <div className="contact-card">
              <h4>Phone</h4>

              <a
                href="tel:+917020998403"
                className="contact-link"
              >
                +91 70209 98403
              </a>
            </div>

            <div className="contact-card">
              <h4>Studio</h4>

              <a
                href="https://maps.google.com/?q=Pune,Maharashtra,India"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                Pune, Maharashtra, India
              </a>
            </div>

            <div className="contact-card">
              <h4>Working Hours</h4>

              <p>Monday – Sunday</p>

              <p>10:00 AM – 8:00 PM</p>
            </div>

          </div>

          {/* Contact Form */}

          <div className="contact-form-wrapper">

            <form className="contact-form">

              <input
                type="text"
                placeholder="Your Name"
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                required
              />

              <input
                type="tel"
                placeholder="Phone Number"
                required
              />

              <input
                type="date"
                required
              />

              <input
                type="text"
                placeholder="Event Location"
              />

              <select defaultValue="" required>
                <option value="" disabled>
                  Select Photography Service
                </option>

                <option>Wedding Photography</option>
                <option>Pre Wedding</option>
                <option>Engagement</option>
                <option>Portrait Photography</option>
                <option>Commercial Photography</option>
                <option>Industrial Photography</option>
                <option>Event Photography</option>
                <option>Food Photography</option>
              </select>

              <select defaultValue="">
                <option value="" disabled>
                  Approximate Budget
                </option>

                <option>Below ₹50,000</option>
                <option>₹50,000 – ₹1,00,000</option>
                <option>₹1,00,000 – ₹2,00,000</option>
                <option>₹2,00,000 – ₹5,00,000</option>
                <option>Above ₹5,00,000</option>
              </select>

              <select defaultValue="">
                <option value="" disabled>
                  How did you hear about me?
                </option>

                <option>Google Search</option>
                <option>Instagram</option>
                <option>Facebook</option>
                <option>Friend / Family</option>
                <option>Previous Client</option>
                <option>Wedding Planner</option>
                <option>Other</option>
              </select>

              <textarea
                rows={7}
                placeholder="Tell me about your wedding or project..."
              ></textarea>

              <button
                type="submit"
                className="btn btn-dark btn-full"
              >
                Send Inquiry
              </button>

            </form>

          </div>

        </div>
      </section>
    </>
  );
}