import {
  useEffect,
  useState,
} from "react";

import {
  disciplines,
} from "../../../data/disciplines";

import {
  supabase,
} from "../../../lib/supabase";

import "../../styles/homepage-settings.css";


/* =========================
   SUPABASE SETTING KEY
========================= */

const SETTING_KEY =
  "homepage_disciplines";


/* =========================
   LEGACY STORAGE KEY
========================= */

const LEGACY_KEY =
  "rohit-photography-homepage-disciplines";


/* =========================
   DEFAULT DISCIPLINES
========================= */

const defaultSelectedDisciplines =
  disciplines.map(
    (
      discipline
    ) =>
      discipline.id
  );


/* =========================
   NORMALIZE SETTINGS
========================= */

function normalizeSelected(
  value
) {

  /*
   * Current format:
   *
   * ["weddings", "portraits", ...]
   */

  if (
    Array.isArray(
      value
    )
  ) {

    return value;

  }


  /*
   * Also support an object format
   * if one is ever stored:
   *
   * {
   *   selected: [...]
   * }
   */

  if (
    value &&
    typeof value ===
      "object" &&
    Array.isArray(
      value.selected
    )
  ) {

    return value.selected;

  }


  return [
    ...defaultSelectedDisciplines,
  ];

}


/* =========================
   LOAD LEGACY SETTINGS
========================= */

function getLegacySettings() {

  try {

    const saved =
      localStorage.getItem(
        LEGACY_KEY
      );


    if (
      !saved
    ) {

      return null;

    }


    return normalizeSelected(
      JSON.parse(
        saved
      )
    );


  } catch (
    error
  ) {

    console.error(
      "Failed to load legacy Homepage Disciplines:",
      error
    );


    return null;

  }

}


/* =========================
   DISCIPLINE SETTINGS
========================= */

export default function DisciplineSettings() {

  /* =========================
     SELECTED DISCIPLINES
  ========================= */

  const [
    selected,
    setSelected,
  ] =
    useState([
      ...defaultSelectedDisciplines,
    ]);


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
         * Supabase record exists.
         *
         * Important:
         * An empty array is valid.
         * It means no disciplines
         * should appear.
         */

        if (
          data &&
          data.setting_value !==
            null &&
          data.setting_value !==
            undefined
        ) {

          setSelected(
            normalizeSelected(
              data.setting_value
            )
          );


          return;

        }


        /*
         * No Supabase record yet.
         * Try old localStorage data.
         */

        const legacySelected =
          getLegacySettings();


        if (
          legacySelected
        ) {

          setSelected(
            legacySelected
          );


          setMessage({

            type:
              "info",

            text:
              "Existing Homepage Disciplines were loaded. Click Save Disciplines to migrate them to Supabase.",

          });


          return;

        }


        setSelected([
          ...defaultSelectedDisciplines,
        ]);


      } catch (
        error
      ) {

        console.error(
          "Failed to load Homepage Disciplines:",
          error
        );


        if (
          mounted
        ) {

          const legacySelected =
            getLegacySettings();


          if (
            legacySelected
          ) {

            setSelected(
              legacySelected
            );

          }


          setMessage({

            type:
              "error",

            text:
              "Unable to load Homepage Disciplines from Supabase.",

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
     TOGGLE DISCIPLINE
  ========================= */

  function handleToggle(
    disciplineId
  ) {

    setSelected(
      (
        previous
      ) => {

        if (
          previous.includes(
            disciplineId
          )
        ) {

          return previous.filter(
            (
              id
            ) =>
              id !==
              disciplineId
          );

        }


        return [

          ...previous,

          disciplineId,

        ];

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


      /*
       * Store the array directly.
       *
       * Example:
       *
       * [
       *   "weddings",
       *   "portraits",
       *   "industrial"
       * ]
       */

      const payload =
        Array.isArray(
          selected
        )
          ? selected
          : [];


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


      setMessage({

        type:
          "success",

        text:
          "Homepage disciplines saved successfully.",

      });


    } catch (
      error
    ) {

      console.error(
        "Failed to save Homepage Disciplines:",
        error
      );


      setMessage({

        type:
          "error",

        text:
          error?.message ||
          "Unable to save Homepage Disciplines.",

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
            FEATURED DISCIPLINES
          </span>


          <h2>
            Homepage Disciplines
          </h2>


          <p>
            Loading Homepage Disciplines...
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
          FEATURED DISCIPLINES
        </span>


        <h2>
          Homepage Disciplines
        </h2>


        <p>
          Choose which photography
          disciplines appear on the
          homepage.
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


        {/* DISCIPLINES */}

        {disciplines.map(
          (
            discipline
          ) => (

            <label
              key={
                discipline.id
              }
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                gap:
                  "12px",

                padding:
                  "16px",

                border:
                  "1px solid #ece8df",

                borderRadius:
                  "12px",

                cursor:
                  "pointer",
              }}
            >

              <input
                type="checkbox"
                checked={
                  selected.includes(
                    discipline.id
                  )
                }
                onChange={() =>
                  handleToggle(
                    discipline.id
                  )
                }
              />


              <span>

                {
                  discipline.title
                }

              </span>

            </label>

          )
        )}


        {/* SAVE */}

        <button
          type="button"
          className="media-button"
          onClick={
            handleSave
          }
          disabled={
            saving
          }
        >

          {
            saving
              ? "Saving..."
              : "Save Disciplines"
          }

        </button>

      </div>

    </div>

  );

}