import { useState } from "react";

import SEOHead from "../components/common/SEOHead";
import PageHero from "../components/common/PageHero";

import heroImage from "../assets/images/hero.jpg";


/* =========================
   DEFAULT WEBSITE SETTINGS
========================= */

const defaultSettings = {
  businessName: "Rohit Ohal Photography",
  email: "hello@rohitohal.com",
  phone: "+91 70209 98403",
  location: "Pune, Maharashtra, India",

  instagram: "",
  facebook: "",

  workingDays: "Monday – Sunday",
  workingHours: "10:00 AM – 8:00 PM",
};


/* =========================
   DEFAULT CONTACT HERO
========================= */

const defaultContactHero = {
  title:
    "Let's Create Something Beautiful",

  description:
    "Whether you're planning a wedding, portrait session, commercial project or destination wedding, I'd love to hear your story.",

  image: "",
};


/* =========================
   DEFAULT CONTACT CONTENT
========================= */

const defaultContactContent = {
  label:
    "GET IN TOUCH",

  headingLine1:
    "Let's Tell",

  headingLine2:
    "Your Story.",

  description:
    "Every great photograph begins with a conversation. Tell me about your vision, your celebration and the moments that matter most. Together we'll create photographs that you'll cherish for a lifetime.",
};


/* =========================
   DEFAULT CONTACT FORM
========================= */

const defaultContactForm = {
  services: [
    "Wedding Photography",
    "Pre Wedding",
    "Engagement",
    "Portrait Photography",
    "Commercial Photography",
    "Industrial Photography",
    "Event Photography",
    "Food Photography",
  ],

  budgets: [
    "Below ₹50,000",
    "₹50,000 – ₹1,00,000",
    "₹1,00,000 – ₹2,00,000",
    "₹2,00,000 – ₹5,00,000",
    "Above ₹5,00,000",
  ],

  referralSources: [
    "Google Search",
    "Instagram",
    "Facebook",
    "Friend / Family",
    "Previous Client",
    "Wedding Planner",
    "Other",
  ],

  messagePlaceholder:
    "Tell me about your wedding or project...",

  submitButtonText:
    "Send Inquiry",
};


export default function Contact() {

  /* =========================
     LOAD WEBSITE SETTINGS
  ========================= */

  const [settings] = useState(() => {

    try {

      const savedSettings =
        localStorage.getItem(
          "rohit-photography-settings"
        );

      if (savedSettings) {

        return {
          ...defaultSettings,
          ...JSON.parse(
            savedSettings
          ),
        };

      }

    } catch (error) {

      console.error(
        "Failed to load website settings:",
        error
      );

    }

    return defaultSettings;

  });


  /* =========================
     LOAD CONTACT HERO
  ========================= */

  const [contactHero] =
    useState(() => {

      try {

        const savedHero =
          localStorage.getItem(
            "rohit-photography-contact-hero"
          );

        if (savedHero) {

          return {
            ...defaultContactHero,
            ...JSON.parse(
              savedHero
            ),
          };

        }

      } catch (error) {

        console.error(
          "Failed to load Contact Hero settings:",
          error
        );

      }

      return defaultContactHero;

    });


  /* =========================
     LOAD CONTACT CONTENT
  ========================= */

  const [contactContent] =
    useState(() => {

      try {

        const savedContent =
          localStorage.getItem(
            "rohit-photography-contact-content"
          );

        if (savedContent) {

          return {
            ...defaultContactContent,
            ...JSON.parse(
              savedContent
            ),
          };

        }

      } catch (error) {

        console.error(
          "Failed to load Contact Content settings:",
          error
        );

      }

      return defaultContactContent;

    });


  /* =========================
     LOAD CONTACT FORM
  ========================= */

  const [contactForm] =
    useState(() => {

      try {

        const savedForm =
          localStorage.getItem(
            "rohit-photography-contact-form"
          );

        if (savedForm) {

          const parsed =
            JSON.parse(
              savedForm
            );

          return {
            ...defaultContactForm,
            ...parsed,

            services:
              Array.isArray(
                parsed.services
              )
                ? parsed.services
                : defaultContactForm.services,

            budgets:
              Array.isArray(
                parsed.budgets
              )
                ? parsed.budgets
                : defaultContactForm.budgets,

            referralSources:
              Array.isArray(
                parsed.referralSources
              )
                ? parsed.referralSources
                : defaultContactForm.referralSources,
          };

        }

      } catch (error) {

        console.error(
          "Failed to load Contact Form settings:",
          error
        );

      }

      return defaultContactForm;

    });


  /* =========================
     HERO IMAGE FALLBACK
  ========================= */

  const contactHeroImage =
    contactHero.image ||
    heroImage;


  /* =========================
     FORM STATE
  ========================= */

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    status,
    setStatus,
  ] = useState({
    type: "",
    message: "",
  });


  /* =========================
     CONTACT LINKS
  ========================= */

  const emailLink =
    `mailto:${settings.email}`;

  const phoneLink =
    `tel:${settings.phone.replace(
      /[^+\d]/g,
      ""
    )}`;

  const mapsLink =
    `https://maps.google.com/?q=${encodeURIComponent(
      settings.location
    )}`;


  /* =========================
     FORM SUBMISSION
  ========================= */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setIsSubmitting(
        true
      );

      setStatus({
        type: "",
        message: "",
      });

      const form =
        e.target;

      const formData =
        new FormData(
          form
        );

      formData.append(
        "access_key",
        import.meta.env
          .VITE_WEB3FORMS_ACCESS_KEY
      );

      formData.append(
        "subject",
        `New Photography Inquiry - ${settings.businessName}`
      );

      formData.append(
        "from_name",
        `${settings.businessName} Website`
      );

      try {

        const response =
          await fetch(
            "https://api.web3forms.com/submit",
            {
              method:
                "POST",

              body:
                formData,
            }
          );

        const data =
          await response.json();

        if (
          data.success
        ) {

          setStatus({
            type:
              "success",

            message:
              "Thank you for your inquiry. I'll get back to you as soon as possible.",
          });

          form.reset();

        } else {

          setStatus({
            type:
              "error",

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
          type:
            "error",

          message:
            "Unable to send your inquiry. Please try again later.",
        });

      } finally {

        setIsSubmitting(
          false
        );

      }

    };


  /* =========================
     RENDER
  ========================= */

  return (
    <>

      {/* =========================
          SEO
      ========================= */}

      <SEOHead
        title={`Contact ${settings.businessName} | Photographer in Pune`}
        description={`Contact ${settings.businessName} for wedding, portrait, commercial, industrial, event and food photography services in ${settings.location} and across India.`}
        image={
          contactHeroImage
        }
      />


      {/* =========================
          PAGE HERO
      ========================= */}

      <PageHero
        title={
          contactHero.title
        }
        description={
          contactHero.description
        }
        image={
          contactHeroImage
        }
      />


      {/* =========================
          CONTACT SECTION
      ========================= */}

      <section className="contact-section">

        <div className="contact-container">


          {/* =========================
              CONTACT INFORMATION
          ========================= */}

          <div className="contact-info">


            {/* SECTION LABEL */}

            <span>
              {
                contactContent.label
              }
            </span>


            {/* HEADING */}

            <h2>

              {
                contactContent.headingLine1
              }

              {contactContent.headingLine2 && (
                <>
                  <br />

                  {
                    contactContent.headingLine2
                  }
                </>
              )}

            </h2>


            {/* INTRODUCTION */}

            <p>
              {
                contactContent.description
              }
            </p>


            {/* EMAIL */}

            <div className="contact-card">

              <h4>
                Email
              </h4>

              <a
                href={
                  emailLink
                }
                className="contact-link"
              >
                {
                  settings.email
                }
              </a>

            </div>


            {/* PHONE */}

            <div className="contact-card">

              <h4>
                Phone
              </h4>

              <a
                href={
                  phoneLink
                }
                className="contact-link"
              >
                {
                  settings.phone
                }
              </a>

            </div>


            {/* LOCATION */}

            <div className="contact-card">

              <h4>
                Studio
              </h4>

              <a
                href={
                  mapsLink
                }
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                {
                  settings.location
                }
              </a>

            </div>


            {/* WORKING HOURS */}

            <div className="contact-card">

              <h4>
                Working Hours
              </h4>

              <p>
                {
                  settings.workingDays
                }
              </p>

              <p>
                {
                  settings.workingHours
                }
              </p>

            </div>

          </div>


          {/* =========================
              CONTACT FORM
          ========================= */}

          <div className="contact-form-wrapper">

            <form
              className="contact-form"
              onSubmit={
                handleSubmit
              }
            >


              {/* NAME */}

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
              />


              {/* EMAIL */}

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
              />


              {/* PHONE */}

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
              />


              {/* EVENT DATE */}

              <input
                type="date"
                name="event_date"
                required
              />


              {/* EVENT LOCATION */}

              <input
                type="text"
                name="event_location"
                placeholder="Event Location"
              />


              {/* =========================
                  PHOTOGRAPHY SERVICE
              ========================= */}

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

                {contactForm.services.map(
                  (
                    service,
                    index
                  ) => (

                    <option
                      key={
                        `${service}-${index}`
                      }
                      value={
                        service
                      }
                    >
                      {
                        service
                      }
                    </option>

                  )
                )}

              </select>


              {/* =========================
                  BUDGET
              ========================= */}

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

                {contactForm.budgets.map(
                  (
                    budget,
                    index
                  ) => (

                    <option
                      key={
                        `${budget}-${index}`
                      }
                      value={
                        budget
                      }
                    >
                      {
                        budget
                      }
                    </option>

                  )
                )}

              </select>


              {/* =========================
                  REFERRAL SOURCE
              ========================= */}

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

                {contactForm.referralSources.map(
                  (
                    source,
                    index
                  ) => (

                    <option
                      key={
                        `${source}-${index}`
                      }
                      value={
                        source
                      }
                    >
                      {
                        source
                      }
                    </option>

                  )
                )}

              </select>


              {/* =========================
                  MESSAGE
              ========================= */}

              <textarea
                name="message"
                rows={7}
                placeholder={
                  contactForm.messagePlaceholder
                }
                required
              />


              {/* =========================
                  FORM STATUS
              ========================= */}

              {status.message && (

                <div
                  className={`contact-form-message ${status.type}`}
                >
                  {
                    status.message
                  }
                </div>

              )}


              {/* =========================
                  SUBMIT BUTTON
              ========================= */}

              <button
                type="submit"
                className="btn btn-dark btn-full"
                disabled={
                  isSubmitting
                }
              >

                {isSubmitting
                  ? "Sending..."
                  : contactForm.submitButtonText}

              </button>

            </form>

          </div>

        </div>

      </section>

    </>
  );
}