import {
  useEffect,
  useState,
} from "react";

import "../styles/homepage-settings.css";


/* =========================
   STORAGE KEY
========================= */

const STORAGE_KEY =
  "rohit-photography-contact-form";


/* =========================
   DEFAULT SETTINGS
========================= */

const defaultSettings = {
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


/* =========================
   COMPONENT
========================= */

export default function ContactFormSettings() {

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

      if (saved) {

        const parsed =
          JSON.parse(saved);

        return {
          ...defaultSettings,
          ...parsed,

          services:
            Array.isArray(
              parsed.services
            )
              ? parsed.services
              : defaultSettings.services,

          budgets:
            Array.isArray(
              parsed.budgets
            )
              ? parsed.budgets
              : defaultSettings.budgets,

          referralSources:
            Array.isArray(
              parsed.referralSources
            )
              ? parsed.referralSources
              : defaultSettings.referralSources,
        };

      }

    } catch (error) {

      console.error(
        "Failed to load Contact Form settings:",
        error
      );

    }

    return defaultSettings;

  });


  /* =========================
     SAVED MESSAGE
  ========================= */

  const [
    savedMessage,
    setSavedMessage,
  ] = useState("");


  /* =========================
     CLEAR SAVED MESSAGE
  ========================= */

  useEffect(() => {

    if (!savedMessage) {
      return;
    }

    const timer =
      setTimeout(() => {

        setSavedMessage("");

      }, 3000);

    return () =>
      clearTimeout(timer);

  }, [savedMessage]);


  /* =========================
     UPDATE TEXT FIELD
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

  };


  /* =========================
     UPDATE ARRAY ITEM
  ========================= */

  const updateArrayItem = (
    field,
    index,
    value
  ) => {

    setSettings(
      (prev) => {

        const updated =
          [
            ...prev[field],
          ];

        updated[index] =
          value;

        return {
          ...prev,

          [field]:
            updated,
        };

      }
    );

  };


  /* =========================
     ADD ARRAY ITEM
  ========================= */

  const addArrayItem = (
    field
  ) => {

    setSettings(
      (prev) => ({
        ...prev,

        [field]: [
          ...prev[field],
          "",
        ],
      })
    );

  };


  /* =========================
     REMOVE ARRAY ITEM
  ========================= */

  const removeArrayItem = (
    field,
    index
  ) => {

    setSettings(
      (prev) => ({
        ...prev,

        [field]:
          prev[field].filter(
            (
              _item,
              itemIndex
            ) =>
              itemIndex !==
              index
          ),
      })
    );

  };


  /* =========================
     MOVE ITEM UP
  ========================= */

  const moveItemUp = (
    field,
    index
  ) => {

    if (
      index === 0
    ) {
      return;
    }

    setSettings(
      (prev) => {

        const updated =
          [
            ...prev[field],
          ];

        [
          updated[index - 1],
          updated[index],
        ] = [
          updated[index],
          updated[index - 1],
        ];

        return {
          ...prev,

          [field]:
            updated,
        };

      }
    );

  };


  /* =========================
     MOVE ITEM DOWN
  ========================= */

  const moveItemDown = (
    field,
    index
  ) => {

    setSettings(
      (prev) => {

        if (
          index ===
          prev[field].length - 1
        ) {
          return prev;
        }

        const updated =
          [
            ...prev[field],
          ];

        [
          updated[index],
          updated[index + 1],
        ] = [
          updated[index + 1],
          updated[index],
        ];

        return {
          ...prev,

          [field]:
            updated,
        };

      }
    );

  };


  /* =========================
     SAVE SETTINGS
  ========================= */

  const handleSave =
    () => {

      try {

        const cleanedSettings = {
          ...settings,

          services:
            settings.services
              .map(
                (item) =>
                  item.trim()
              )
              .filter(Boolean),

          budgets:
            settings.budgets
              .map(
                (item) =>
                  item.trim()
              )
              .filter(Boolean),

          referralSources:
            settings.referralSources
              .map(
                (item) =>
                  item.trim()
              )
              .filter(Boolean),
        };


        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(
            cleanedSettings
          )
        );


        setSettings(
          cleanedSettings
        );


        setSavedMessage(
          "Contact form settings saved successfully."
        );

      } catch (error) {

        console.error(
          "Failed to save Contact Form settings:",
          error
        );

      }

    };


  /* =========================
     RENDER OPTION LIST
  ========================= */

  const renderOptionList = (
    field,
    title,
    description,
    addButtonText
  ) => {

    const items =
      settings[field];

    return (

      <div
        style={{
          marginBottom:
            "40px",
        }}
      >

        <div
          style={{
            marginBottom:
              "18px",
          }}
        >

          <h3
            style={{
              margin:
                "0 0 6px",

              fontSize:
                "18px",
            }}
          >
            {title}
          </h3>

          <p
            style={{
              margin:
                0,

              color:
                "#777",

              fontSize:
                "14px",

              lineHeight:
                "1.6",
            }}
          >
            {description}
          </p>

        </div>


        {items.map(
          (
            item,
            index
          ) => (

            <div
              key={
                `${field}-${index}`
              }
              style={{
                display:
                  "flex",

                gap:
                  "8px",

                alignItems:
                  "center",

                marginBottom:
                  "10px",
              }}
            >

              <input
                type="text"
                value={
                  item
                }
                onChange={(
                  event
                ) =>
                  updateArrayItem(
                    field,
                    index,
                    event.target
                      .value
                  )
                }
                style={{
                  flex:
                    1,
                }}
              />


              <button
                type="button"
                disabled={
                  index ===
                  0
                }
                onClick={() =>
                  moveItemUp(
                    field,
                    index
                  )
                }
                style={{
                  padding:
                    "10px 12px",

                  border:
                    "1px solid #ddd",

                  borderRadius:
                    "8px",

                  background:
                    "#fff",

                  cursor:
                    index ===
                    0
                      ? "not-allowed"
                      : "pointer",

                  opacity:
                    index ===
                    0
                      ? 0.4
                      : 1,
                }}
                title="Move Up"
              >
                ↑
              </button>


              <button
                type="button"
                disabled={
                  index ===
                  items.length - 1
                }
                onClick={() =>
                  moveItemDown(
                    field,
                    index
                  )
                }
                style={{
                  padding:
                    "10px 12px",

                  border:
                    "1px solid #ddd",

                  borderRadius:
                    "8px",

                  background:
                    "#fff",

                  cursor:
                    index ===
                    items.length - 1
                      ? "not-allowed"
                      : "pointer",

                  opacity:
                    index ===
                    items.length - 1
                      ? 0.4
                      : 1,
                }}
                title="Move Down"
              >
                ↓
              </button>


              <button
                type="button"
                onClick={() =>
                  removeArrayItem(
                    field,
                    index
                  )
                }
                style={{
                  padding:
                    "10px 12px",

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
                Remove
              </button>

            </div>

          )
        )}


        <button
          type="button"
          onClick={() =>
            addArrayItem(
              field
            )
          }
          style={{
            marginTop:
              "8px",

            padding:
              "10px 16px",

            border:
              "1px solid #b58b43",

            borderRadius:
              "8px",

            background:
              "#fff",

            color:
              "#8a672f",

            cursor:
              "pointer",

            fontWeight:
              "500",
          }}
        >
          + {addButtonText}
        </button>

      </div>

    );

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
          INQUIRY FORM
        </span>

        <h2>
          Contact Form Settings
        </h2>

        <p>
          Manage the options and
          text displayed in your
          photography inquiry form.
        </p>

      </div>


      {/* =========================
          SAVED MESSAGE
      ========================= */}

      {savedMessage && (

        <div
          className="settings-success-message"
          style={{
            marginBottom:
              "24px",
          }}
        >
          {savedMessage}
        </div>

      )}


      {/* =========================
          OPTION LISTS
      ========================= */}

      {renderOptionList(
        "services",
        "Photography Services",
        "Manage the photography services clients can select when submitting an inquiry.",
        "Add Service"
      )}


      {renderOptionList(
        "budgets",
        "Budget Options",
        "Manage the approximate budget ranges available in the inquiry form.",
        "Add Budget Option"
      )}


      {renderOptionList(
        "referralSources",
        "Referral Sources",
        "Manage the options shown under How did you hear about me?",
        "Add Referral Source"
      )}


      {/* =========================
          FORM TEXT
      ========================= */}

      <div className="settings-form">

        <div className="settings-form-group">

          <label>
            Message Placeholder
          </label>

          <input
            type="text"
            name="messagePlaceholder"
            value={
              settings.messagePlaceholder
            }
            onChange={
              handleChange
            }
            placeholder="Tell me about your wedding or project..."
          />

        </div>


        <div className="settings-form-group">

          <label>
            Submit Button Text
          </label>

          <input
            type="text"
            name="submitButtonText"
            value={
              settings.submitButtonText
            }
            onChange={
              handleChange
            }
            placeholder="Send Inquiry"
          />

        </div>

      </div>


      {/* =========================
          SAVE BUTTON
      ========================= */}

      <div
        style={{
          marginTop:
            "24px",
        }}
      >

        <button
          type="button"
          className="settings-save-button"
          onClick={
            handleSave
          }
        >
          Save Form Settings
        </button>

      </div>

    </div>

  );
}