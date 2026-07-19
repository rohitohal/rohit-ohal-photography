import { useState } from "react";

import { disciplines } from "../../../data/disciplines";

import "../../styles/homepage-settings.css";

const defaultSelectedDisciplines =
  disciplines.map(
    (discipline) =>
      discipline.id
  );

export default function DisciplineSettings() {
  const [selected, setSelected] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            "rohit-photography-homepage-disciplines"
          );

        if (saved) {
          const parsed =
            JSON.parse(saved);

          return Array.isArray(parsed)
            ? parsed
            : defaultSelectedDisciplines;
        }

        return defaultSelectedDisciplines;
      } catch (error) {
        console.error(
          "Failed to load homepage disciplines:",
          error
        );

        return defaultSelectedDisciplines;
      }
    });

  const [saved, setSaved] =
    useState(false);

  /* =========================
     TOGGLE DISCIPLINE
  ========================= */

  const handleToggle = (
    disciplineId
  ) => {
    setSelected(
      (prev) => {
        if (
          prev.includes(
            disciplineId
          )
        ) {
          return prev.filter(
            (id) =>
              id !==
              disciplineId
          );
        }

        return [
          ...prev,
          disciplineId,
        ];
      }
    );

    setSaved(false);
  };

  /* =========================
     SAVE SETTINGS
  ========================= */

  const handleSave = () => {
    localStorage.setItem(
      "rohit-photography-homepage-disciplines",
      JSON.stringify(
        selected
      )
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

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
          Choose which photography
          disciplines appear on the
          homepage.
        </p>

      </div>

      <div className="homepage-form">

        {disciplines.map(
          (discipline) => (

            <label
              key={
                discipline.id
              }
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                gap: "12px",
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

        <button
          type="button"
          className="media-button"
          onClick={
            handleSave
          }
        >
          Save Disciplines
        </button>

        {saved && (
          <div className="settings-success-message">
            Homepage disciplines
            saved successfully.
          </div>
        )}

      </div>

    </div>
  );
}