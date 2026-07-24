import {
  useEffect,
  useState,
} from "react";

import {
  supabase,
} from "../../../lib/supabase";

import "../../styles/homepage-settings.css";


/* =========================
   SUPABASE SETTING KEY
========================= */

const SETTING_KEY =
  "homepage_testimonials";


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


/* =========================
   CLONE DEFAULT TESTIMONIALS
========================= */

function getDefaultTestimonials() {

  return defaultSettings.testimonials.map(
    (
      testimonial
    ) => ({

      ...testimonial,

    })
  );

}


/* =========================
   NORMALIZE SETTINGS
========================= */

function normalizeSettings(
  data
) {

  if (
    !data ||
    typeof data !==
      "object"
  ) {

    return {

      ...defaultSettings,

      testimonials:
        getDefaultTestimonials(),

    };

  }


  return {

    ...defaultSettings,

    ...data,

    testimonials:
      Array.isArray(
        data.testimonials
      )
        ? data.testimonials.map(
            (
              testimonial,
              index
            ) => ({

              id:
                testimonial.id ||
                `testimonial-${index}-${Date.now()}`,

              name:
                testimonial.name ||
                "",

              location:
                testimonial.location ||
                "",

              review:
                testimonial.review ||
                "",

            })
          )
        : getDefaultTestimonials(),

  };

}


/* =========================
   TESTIMONIAL SETTINGS
========================= */

export default function TestimonialsSettings() {

  /* =========================
     SETTINGS
  ========================= */

  const [
    settings,
    setSettings,
  ] =
    useState({

      ...defaultSettings,

      testimonials:
        getDefaultTestimonials(),

    });


  /* =========================
     LOADING
  ========================= */

  const [
    loading,
    setLoading,
  ] =
    useState(true);


  /* =========================
     SAVING
  ========================= */

  const [
    saving,
    setSaving,
  ] =
    useState(false);


  /* =========================
     MESSAGE
  ========================= */

  const [
    message,
    setMessage,
  ] =
    useState({

      type:
        "",

      text:
        "",

    });


  /* =========================
     LOAD SETTINGS
  ========================= */

  useEffect(() => {

    let mounted =
      true;


    async function loadSettings() {

      try {

        setLoading(
          true
        );


        const {
          data,
          error,
        } =
          await supabase
            .from(
              "site_settings"
            )
            .select(
              "setting_value"
            )
            .eq(
              "setting_key",
              SETTING_KEY
            )
            .maybeSingle();


        if (
          error
        ) {

          throw error;

        }


        if (
          !mounted
        ) {

          return;

        }


        /*
         * Supabase is the single source
         * of truth for Testimonials.
         */

        if (
          data?.setting_value
        ) {

          setSettings(
            normalizeSettings(
              data.setting_value
            )
          );


          return;

        }


        /*
         * No Supabase record exists.
         * Use defaults in the form.
         */

        setSettings({

          ...defaultSettings,

          testimonials:
            getDefaultTestimonials(),

        });


      } catch (
        error
      ) {

        console.error(
          "Failed to load Testimonials settings:",
          error
        );


        if (
          mounted
        ) {

          setMessage({

            type:
              "error",

            text:
              "Unable to load Testimonials settings from Supabase.",

          });

        }


      } finally {

        if (
          mounted
        ) {

          setLoading(
            false
          );

        }

      }

    }


    loadSettings();


    return () => {

      mounted =
        false;

    };

  }, []);


  /* =========================
     HANDLE GENERAL CHANGE
  ========================= */

  function handleChange(
    event
  ) {

    const {
      name,
      value,
    } =
      event.target;


    setSettings(
      (
        previous
      ) => ({

        ...previous,

        [name]:
          value,

      })
    );


    setMessage({

      type:
        "",

      text:
        "",

    });

  }


  /* =========================
     HANDLE TESTIMONIAL CHANGE
  ========================= */

  function handleTestimonialChange(
    index,
    field,
    value
  ) {

    setSettings(
      (
        previous
      ) => {

        const updatedTestimonials =
          previous.testimonials.map(
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

          ...previous,

          testimonials:
            updatedTestimonials,

        };

      }
    );


    setMessage({

      type:
        "",

      text:
        "",

    });

  }


  /* =========================
     ADD TESTIMONIAL
  ========================= */

  function handleAddTestimonial() {

    setSettings(
      (
        previous
      ) => ({

        ...previous,

        testimonials: [

          ...previous.testimonials,

          {
            id:
              `testimonial-${Date.now()}`,

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


    setMessage({

      type:
        "",

      text:
        "",

    });

  }


  /* =========================
     REMOVE TESTIMONIAL
  ========================= */

  function handleRemoveTestimonial(
    index
  ) {

    const confirmed =
      window.confirm(
        "Are you sure you want to remove this testimonial?"
      );


    if (
      !confirmed
    ) {

      return;

    }


    setSettings(
      (
        previous
      ) => ({

        ...previous,

        testimonials:
          previous.testimonials.filter(
            (
              _,
              testimonialIndex
            ) =>
              testimonialIndex !==
              index
          ),

      })
    );


    setMessage({

      type:
        "",

      text:
        "",

    });

  }


  /* =========================
     SAVE SETTINGS
  ========================= */

  async function handleSave() {

    if (
      saving
    ) {

      return;

    }


    try {

      setSaving(
        true
      );


      setMessage({

        type:
          "",

        text:
          "",

      });


      const payload = {

        label:
          settings.label?.trim() ||
          "",

        headingLine1:
          settings.headingLine1?.trim() ||
          "",

        headingLine2:
          settings.headingLine2?.trim() ||
          "",

        testimonials:
          settings.testimonials.map(
            (
              testimonial,
              index
            ) => ({

              id:
                testimonial.id ||
                `testimonial-${Date.now()}-${index}`,

              name:
                testimonial.name?.trim() ||
                "",

              location:
                testimonial.location?.trim() ||
                "",

              review:
                testimonial.review?.trim() ||
                "",

            })
          ),

      };


      const {
        error,
      } =
        await supabase
          .from(
            "site_settings"
          )
          .upsert(
            {

              setting_key:
                SETTING_KEY,

              setting_value:
                payload,

              updated_at:
                new Date()
                  .toISOString(),

            },
            {

              onConflict:
                "setting_key",

            }
          );


      if (
        error
      ) {

        throw error;

      }


      setSettings(
        normalizeSettings(
          payload
        )
      );


      setMessage({

        type:
          "success",

        text:
          "Testimonials saved successfully.",

      });


    } catch (
      error
    ) {

      console.error(
        "Failed to save Testimonials settings:",
        error
      );


      setMessage({

        type:
          "error",

        text:
          error?.message ||
          "Unable to save Testimonials settings.",

      });


    } finally {

      setSaving(
        false
      );

    }

  }


  /* =========================
     LOADING
  ========================= */

  if (
    loading
  ) {

    return (

      <div className="homepage-settings-card">

        <div className="homepage-settings-header">

          <span className="homepage-overline">
            TESTIMONIALS
          </span>


          <h2>
            Testimonials Section
          </h2>


          <p>
            Loading Testimonials settings...
          </p>

        </div>

      </div>

    );

  }


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
          MESSAGE
      ========================= */}

      {message.text && (

        <div
          style={{
            marginBottom:
              "24px",

            padding:
              "12px 16px",

            borderRadius:
              "8px",

            fontSize:
              "14px",

            lineHeight:
              "1.5",

            background:
              message.type ===
              "success"
                ? "#f3faf4"
                : message.type ===
                  "error"
                  ? "#fff4f4"
                  : "#f7f7f7",

            color:
              message.type ===
              "success"
                ? "#347342"
                : message.type ===
                  "error"
                  ? "#b33a3a"
                  : "#555",
          }}
        >

          {
            message.text
          }

        </div>

      )}


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
                {
                  index + 1
                }

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
          disabled={
            saving
          }
          style={{
            marginTop:
              "16px",
          }}
        >

          {
            saving
              ? "Saving..."
              : "Save Testimonials"
          }

        </button>

      </div>

    </div>

  );

}