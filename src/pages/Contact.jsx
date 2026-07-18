import { useState } from "react";

import SEOHead from "../components/common/SEOHead";
import PageHero from "../components/common/PageHero";

import heroImage from "../assets/images/hero.jpg";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [status, setStatus] =
    useState({
      type: "",
      message: "",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    setStatus({
      type: "",
      message: "",
    });

    const form = e.target;

    const formData =
      new FormData(form);

    formData.append(
      "access_key",
      import.meta.env
        .VITE_WEB3FORMS_ACCESS_KEY
    );

    formData.append(
      "subject",
      "New Photography Inquiry - Rohit Ohal Photography"
    );

    formData.append(
      "from_name",
      "Rohit Ohal Photography Website"
    );

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await response.json();

      if (data.success) {
        setStatus({
          type: "success",
          message:
            "Thank you for your inquiry. I'll get back to you as soon as possible.",
        });

        form.reset();
      } else {
        setStatus({
          type: "error",
          message:
            data.message ||
            "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error(
        "Contact form error:",
        error
      );

      setStatus({
        type: "error",
        message:
          "Unable to send your inquiry. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Rohit Ohal | Photographer in Pune"
        description="Contact Rohit Ohal Photography for wedding, portrait, commercial, industrial, event and food photography services in Pune, Maharashtra and across India."
        image={heroImage}
      />

      <PageHero
        title="Let's Create Something Beautiful"
        description="Whether you're planning a wedding, portrait session, commercial project or destination wedding, I'd love to hear your story."
        image={heroImage}
      />

      <section className="contact-section">

        <div className="contact-container">

          {/* Contact Information */}

          <div className="contact-info">

            <span>
              GET IN TOUCH
            </span>

            <h2>
              Let's Tell
              <br />
              Your Story.
            </h2>

            <p>
              Every great photograph begins
              with a conversation. Tell me
              about your vision, your
              celebration and the moments
              that matter most. Together
              we'll create photographs that
              you'll cherish for a lifetime.
            </p>

            <div className="contact-card">

              <h4>
                Email
              </h4>

              <a
                href="mailto:hello@rohitohal.com"
                className="contact-link"
              >
                hello@rohitohal.com
              </a>

            </div>

            <div className="contact-card">

              <h4>
                Phone
              </h4>

              <a
                href="tel:+917020998403"
                className="contact-link"
              >
                +91 70209 98403
              </a>

            </div>

            <div className="contact-card">

              <h4>
                Studio
              </h4>

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

              <h4>
                Working Hours
              </h4>

              <p>
                Monday – Sunday
              </p>

              <p>
                10:00 AM – 8:00 PM
              </p>

            </div>

          </div>

          {/* Contact Form */}

          <div className="contact-form-wrapper">

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
              />

              <input
                type="date"
                name="event_date"
                required
              />

              <input
                type="text"
                name="event_location"
                placeholder="Event Location"
              />

              <select
                name="photography_service"
                defaultValue=""
                required
              >

                <option
                  value=""
                  disabled
                >
                  Select Photography Service
                </option>

                <option>
                  Wedding Photography
                </option>

                <option>
                  Pre Wedding
                </option>

                <option>
                  Engagement
                </option>

                <option>
                  Portrait Photography
                </option>

                <option>
                  Commercial Photography
                </option>

                <option>
                  Industrial Photography
                </option>

                <option>
                  Event Photography
                </option>

                <option>
                  Food Photography
                </option>

              </select>

              <select
                name="budget"
                defaultValue=""
              >

                <option
                  value=""
                  disabled
                >
                  Approximate Budget
                </option>

                <option>
                  Below ₹50,000
                </option>

                <option>
                  ₹50,000 – ₹1,00,000
                </option>

                <option>
                  ₹1,00,000 – ₹2,00,000
                </option>

                <option>
                  ₹2,00,000 – ₹5,00,000
                </option>

                <option>
                  Above ₹5,00,000
                </option>

              </select>

              <select
                name="referral_source"
                defaultValue=""
              >

                <option
                  value=""
                  disabled
                >
                  How did you hear about me?
                </option>

                <option>
                  Google Search
                </option>

                <option>
                  Instagram
                </option>

                <option>
                  Facebook
                </option>

                <option>
                  Friend / Family
                </option>

                <option>
                  Previous Client
                </option>

                <option>
                  Wedding Planner
                </option>

                <option>
                  Other
                </option>

              </select>

              <textarea
                name="message"
                rows={7}
                placeholder="Tell me about your wedding or project..."
                required
              />

              {status.message && (
                <div
                  className={`contact-form-message ${status.type}`}
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-dark btn-full"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Sending..."
                  : "Send Inquiry"}
              </button>

            </form>

          </div>

        </div>

      </section>
    </>
  );
}