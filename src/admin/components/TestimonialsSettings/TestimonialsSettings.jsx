import {
  useState,
} from "react";

import "../../styles/homepage-settings.css";


/* =========================
   STORAGE KEY
========================= */

const STORAGE_KEY =
  "rohit-photography-homepage-testimonials";


/* =========================
   DEFAULT SETTINGS
========================= */

const defaultSettings = {
  label:
    "KIND WORDS",

  headingLine1:
    "Trusted By",

  headingLine2:
    "Wonderful People",

  testimonials: [
    {
      id: 1,

      name:
        "Aditi & Akshay",

      location:
        "Pune",

      review:
        "Rohit captured our wedding exactly as we lived it. Every photograph feels natural, emotional and timeless.",
    },

    {
      id: 2,

      name:
        "Rahul Sharma",

      location:
        "Corporate Client",

      review:
        "Professional from start to finish. The final images exceeded every expectation and perfectly represented our brand.",
    },

    {
      id: 3,

      name:
        "Chef Arjun",

      location:
        "Restaurant Owner",

      review:
        "His eye for light and composition transformed our menu and social media presence completely.",
    },
  ],
};


export default function TestimonialsSettings() {

  /* =========================
     LOAD SETTINGS
  ========================= */

  const [
    settings,
    setSettings,
  ] = useState(() => {

    try {

      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );


      if (!saved) {

        return {
          ...defaultSettings,

          testimonials:
            defaultSettings.testimonials.map(
              (item) => ({
                ...item,
              })
            ),
        };

      }


      const parsed =
        JSON.parse(
          saved
        );


      return {
        ...defaultSettings,
        ...parsed,

        testimonials:
          Array.isArray(
            parsed.testimonials
          )
            ? parsed.testimonials
            : defaultSettings.testimonials,
      };

    } catch (error) {

      console.error(
        "Failed to load Testimonials settings:",
        error
      );


      return {
        ...defaultSettings,

        testimonials:
          defaultSettings.testimonials.map(
            (item) => ({
              ...item,
            })
          ),
      };

    }

  });


  /* =========================
     SAVED MESSAGE
  ========================= */

  const [
    saved,
    setSaved,
  ] = useState(false);


  /* =========================
     HANDLE GENERAL CHANGE
  ========================= */

  const handleChange = (
    event
  ) => {

    const {
      name,
      value,
    } = event.target;


    setSettings(
      (prev) => ({
        ...prev,

        [name]:
          value,
      })
    );


    setSaved(false);

  };


  /* =========================
     HANDLE TESTIMONIAL CHANGE
  ========================= */

  const handleTestimonialChange = (
    index,
    field,
    value
  ) => {

    setSettings(
      (prev) => {

        const updatedTestimonials =
          prev.testimonials.map(
            (
              testimonial,
              testimonialIndex
            ) =>
              testimonialIndex ===
              index
                ? {
                    ...testimonial,

                    [field]:
                      value,
                  }
                : testimonial
          );


        return {
          ...prev,

          testimonials:
            updatedTestimonials,
        };

      }
    );


    setSaved(false);

  };


  /* =========================
     ADD TESTIMONIAL
  ========================= */

  const handleAddTestimonial =
    () => {

      setSettings(
        (prev) => ({
          ...prev,

          testimonials: [
            ...prev.testimonials,

            {
              id:
                Date.now(),

              name:
                "",

              location:
                "",

              review:
                "",
            },
          ],
        })
      );


      setSaved(false);

    };


  /* =========================
     REMOVE TESTIMONIAL
  ========================= */

  const handleRemoveTestimonial = (
    index
  ) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to remove this testimonial?"
      );


    if (!confirmed) {
      return;
    }


    setSettings(
      (prev) => ({
        ...prev,

        testimonials:
          prev.testimonials.filter(
            (
              _,
              testimonialIndex
            ) =>
              testimonialIndex !==
              index
          ),
      })
    );


    setSaved(false);

  };


  /* =========================
     SAVE SETTINGS
  ========================= */

  const handleSave =
    () => {

      try {

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(
            settings
          )
        );


        setSaved(true);


        setTimeout(
          () => {

            setSaved(false);

          },
          3000
        );

      } catch (error) {

        console.error(
          "Failed to save Testimonials settings:",
          error
        );

      }

    };


  /* =========================
     RENDER
  ========================= */

  return (

    <div className="homepage-settings-card">


      {/* =========================
          HEADER
      ========================= */}

      <div className="homepage-settings-header">

        <span className="homepage-overline">
          TESTIMONIALS
        </span>


        <h2>
          Testimonials Section
        </h2>


        <p>
          Manage client testimonials
          displayed on your homepage.
        </p>

      </div>


      {/* =========================
          FORM
      ========================= */}

      <div className="homepage-form">


        {/* SECTION LABEL */}

        <div className="form-group">

          <label>
            Section Label
          </label>


          <input
            type="text"
            name="label"
            value={
              settings.label
            }
            onChange={
              handleChange
            }
          />

        </div>


        {/* HEADING LINE 1 */}

        <div className="form-group">

          <label>
            Heading Line 1
          </label>


          <input
            type="text"
            name="headingLine1"
            value={
              settings.headingLine1
            }
            onChange={
              handleChange
            }
          />

        </div>


        {/* HEADING LINE 2 */}

        <div className="form-group">

          <label>
            Heading Line 2
          </label>


          <input
            type="text"
            name="headingLine2"
            value={
              settings.headingLine2
            }
            onChange={
              handleChange
            }
          />

        </div>


        {/* =========================
            TESTIMONIAL CARDS
        ========================= */}

        {settings.testimonials.map(
          (
            testimonial,
            index
          ) => (

            <div
              key={
                testimonial.id ||
                index
              }
              style={{
                marginTop:
                  "30px",

                padding:
                  "24px",

                border:
                  "1px solid #ece8df",

                borderRadius:
                  "14px",

                background:
                  "#faf9f6",
              }}
            >


              <h3
                style={{
                  marginTop:
                    0,

                  marginBottom:
                    "20px",
                }}
              >
                Testimonial{" "}
                {index + 1}
              </h3>


              {/* CLIENT NAME */}

              <div className="form-group">

                <label>
                  Client Name
                </label>


                <input
                  type="text"
                  value={
                    testimonial.name ||
                    ""
                  }
                  onChange={(
                    event
                  ) =>
                    handleTestimonialChange(
                      index,
                      "name",
                      event.target.value
                    )
                  }
                />

              </div>


              {/* LOCATION */}

              <div className="form-group">

                <label>
                  Location / Client Type
                </label>


                <input
                  type="text"
                  value={
                    testimonial.location ||
                    ""
                  }
                  onChange={(
                    event
                  ) =>
                    handleTestimonialChange(
                      index,
                      "location",
                      event.target.value
                    )
                  }
                />

              </div>


              {/* REVIEW */}

              <div className="form-group">

                <label>
                  Review
                </label>


                <textarea
                  rows="6"
                  value={
                    testimonial.review ||
                    ""
                  }
                  onChange={(
                    event
                  ) =>
                    handleTestimonialChange(
                      index,
                      "review",
                      event.target.value
                    )
                  }
                />

              </div>


              {/* REMOVE */}

              <button
                type="button"
                onClick={() =>
                  handleRemoveTestimonial(
                    index
                  )
                }
                style={{
                  marginTop:
                    "10px",

                  padding:
                    "9px 14px",

                  border:
                    "1px solid #ddd",

                  borderRadius:
                    "8px",

                  background:
                    "#fff",

                  cursor:
                    "pointer",
                }}
              >
                Remove Testimonial
              </button>

            </div>

          )
        )}


        {/* =========================
            ADD TESTIMONIAL
        ========================= */}

        <button
          type="button"
          className="media-button secondary"
          onClick={
            handleAddTestimonial
          }
          style={{
            marginTop:
              "30px",
          }}
        >
          + Add Testimonial
        </button>


        {/* =========================
            SAVE
        ========================= */}

        <button
          type="button"
          className="media-button"
          onClick={
            handleSave
          }
          style={{
            marginTop:
              "16px",
          }}
        >
          Save Testimonials
        </button>


        {/* =========================
            SUCCESS MESSAGE
        ========================= */}

        {saved && (

          <div className="settings-success-message">

            Testimonials saved
            successfully.

          </div>

        )}

      </div>

    </div>

  );
}