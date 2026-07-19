import {
  useEffect,
  useRef,
  useState,
} from "react";

import "../styles/settings.css";

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
   CMS STORAGE KEYS
========================= */

const backupKeys = [
  /* PROJECTS */
  "rohit-photography-projects",

  /* JOURNAL */
  "rohit-photography-journal",

  /* HOMEPAGE */
  "rohit-photography-homepage",
  "rohit-photography-homepage-about",
  "rohit-photography-homepage-cta",
  "rohit-photography-homepage-disciplines",

  /* ABOUT PAGE */
  "rohit-photography-about-hero",
  "rohit-photography-about-story",
  "rohit-photography-about-philosophy",
  "rohit-photography-about-experience",
  "rohit-photography-about-process",
  "rohit-photography-about-cta",

  /* CONTACT PAGE */
  "rohit-photography-contact-hero",
  "rohit-photography-contact-content",
  "rohit-photography-contact-form",

  /* SEO */
  "rohit-photography-seo",

  /* GLOBAL SETTINGS */
  "rohit-photography-settings",

  /* MEDIA LIBRARY */
  "rohit-photography-media",
];

export default function Settings() {
  const [settings, setSettings] =
    useState(defaultSettings);

  const [saved, setSaved] =
    useState(false);

  const [
    backupMessage,
    setBackupMessage,
  ] = useState({
    type: "",
    text: "",
  });

  const fileInputRef =
    useRef(null);

  /* =========================
     LOAD SETTINGS
  ========================= */

  useEffect(() => {
    const savedSettings =
      localStorage.getItem(
        "rohit-photography-settings"
      );

    if (savedSettings) {
      try {
        setSettings({
          ...defaultSettings,
          ...JSON.parse(savedSettings),
        });
      } catch (error) {
        console.error(
          "Failed to load settings:",
          error
        );
      }
    }
  }, []);

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  /* =========================
     SAVE SETTINGS
  ========================= */

  const handleSave = () => {
    localStorage.setItem(
      "rohit-photography-settings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  /* =========================
     EXPORT BACKUP
  ========================= */

  const handleExportBackup = () => {
    try {
      const backupData = {};

      backupKeys.forEach(
        (key) => {
          const value =
            localStorage.getItem(
              key
            );

          if (value !== null) {
            try {
              backupData[key] =
                JSON.parse(value);
            } catch {
              backupData[key] =
                value;
            }
          }
        }
      );

      const backup = {
        version: 1,

        website:
          "Rohit Ohal Photography",

        createdAt:
          new Date().toISOString(),

        data: backupData,
      };

      const json =
        JSON.stringify(
          backup,
          null,
          2
        );

      const blob =
        new Blob(
          [json],
          {
            type:
              "application/json",
          }
        );

      const url =
        URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      const date =
        new Date()
          .toISOString()
          .split("T")[0];

      link.href = url;

      link.download =
        `rohit-ohal-photography-backup-${date}.json`;

      document.body.appendChild(
        link
      );

      link.click();

      document.body.removeChild(
        link
      );

      URL.revokeObjectURL(
        url
      );

      setBackupMessage({
        type: "success",
        text:
          "Website backup downloaded successfully.",
      });
    } catch (error) {
      console.error(
        "Backup export failed:",
        error
      );

      setBackupMessage({
        type: "error",
        text:
          "Unable to create backup. Please try again.",
      });
    }
  };

  /* =========================
     OPEN FILE PICKER
  ========================= */

  const handleRestoreClick =
    () => {
      fileInputRef.current?.click();
    };

  /* =========================
     RESTORE BACKUP
  ========================= */

  const handleRestoreBackup =
    (e) => {
      const file =
        e.target.files?.[0];

      if (!file) {
        return;
      }

      const reader =
        new FileReader();

      reader.onload = (
        event
      ) => {
        try {
          const backup =
            JSON.parse(
              event.target.result
            );

          if (
            !backup ||
            typeof backup !==
              "object" ||
            !backup.data ||
            typeof backup.data !==
              "object"
          ) {
            throw new Error(
              "Invalid backup file"
            );
          }

          const confirmed =
            window.confirm(
              "Restoring this backup will replace your current CMS data included in the backup file. Do you want to continue?"
            );

          if (!confirmed) {
            e.target.value = "";
            return;
          }

          backupKeys.forEach(
            (key) => {
              if (
                Object.prototype.hasOwnProperty.call(
                  backup.data,
                  key
                )
              ) {
                localStorage.setItem(
                  key,
                  JSON.stringify(
                    backup.data[key]
                  )
                );
              }
            }
          );

          const restoredSettings =
            backup.data[
              "rohit-photography-settings"
            ];

          if (
            restoredSettings &&
            typeof restoredSettings ===
              "object"
          ) {
            setSettings({
              ...defaultSettings,
              ...restoredSettings,
            });
          }

          setBackupMessage({
            type: "success",
            text:
              "Backup restored successfully. Refreshing website...",
          });

          setTimeout(() => {
            window.location.reload();
          }, 1200);
        } catch (error) {
          console.error(
            "Backup restore failed:",
            error
          );

          setBackupMessage({
            type: "error",
            text:
              "Invalid backup file. Please select a valid Rohit Ohal Photography backup.",
          });
        }

        e.target.value = "";
      };

      reader.onerror =
        () => {
          setBackupMessage({
            type: "error",
            text:
              "Unable to read the backup file.",
          });

          e.target.value =
            "";
        };

      reader.readAsText(
        file
      );
    };

  return (
    <div className="settings-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="settings-header">

        <div>

          <span className="settings-overline">
            WEBSITE SETTINGS
          </span>

          <h1>
            Settings
          </h1>

          <p>
            Manage your business
            information, contact
            details and website
            configuration.
          </p>

        </div>

        <button
          type="button"
          className="settings-save-button"
          onClick={handleSave}
        >
          Save Changes
        </button>

      </div>

      {/* =========================
          SUCCESS MESSAGE
      ========================= */}

      {saved && (
        <div className="settings-success-message">
          Settings saved
          successfully.
        </div>
      )}

      <div className="settings-content">

        {/* =========================
            BUSINESS INFORMATION
        ========================= */}

        <section className="settings-card">

          <div className="settings-card-header">

            <span className="settings-section-label">
              GENERAL
            </span>

            <h2>
              Business Information
            </h2>

            <p>
              Basic information
              about your photography
              business.
            </p>

          </div>

          <div className="settings-form">

            <div className="settings-form-group">

              <label>
                Business Name
              </label>

              <input
                type="text"
                name="businessName"
                value={
                  settings.businessName
                }
                onChange={
                  handleChange
                }
                placeholder="Business Name"
              />

            </div>

            <div className="settings-form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={
                  settings.email
                }
                onChange={
                  handleChange
                }
                placeholder="Email Address"
              />

            </div>

            <div className="settings-form-group">

              <label>
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={
                  settings.phone
                }
                onChange={
                  handleChange
                }
                placeholder="Phone Number"
              />

            </div>

            <div className="settings-form-group">

              <label>
                Location
              </label>

              <input
                type="text"
                name="location"
                value={
                  settings.location
                }
                onChange={
                  handleChange
                }
                placeholder="Location"
              />

            </div>

          </div>

        </section>

        {/* =========================
            SOCIAL MEDIA
        ========================= */}

        <section className="settings-card">

          <div className="settings-card-header">

            <span className="settings-section-label">
              SOCIAL
            </span>

            <h2>
              Social Media
            </h2>

            <p>
              Add links to your
              photography social
              media profiles.
            </p>

          </div>

          <div className="settings-form">

            <div className="settings-form-group">

              <label>
                Instagram
              </label>

              <input
                type="url"
                name="instagram"
                value={
                  settings.instagram
                }
                onChange={
                  handleChange
                }
                placeholder="Instagram profile URL"
              />

            </div>

            <div className="settings-form-group">

              <label>
                Facebook
              </label>

              <input
                type="url"
                name="facebook"
                value={
                  settings.facebook
                }
                onChange={
                  handleChange
                }
                placeholder="Facebook page URL"
              />

            </div>

          </div>

        </section>

        {/* =========================
            WORKING HOURS
        ========================= */}

        <section className="settings-card">

          <div className="settings-card-header">

            <span className="settings-section-label">
              AVAILABILITY
            </span>

            <h2>
              Working Hours
            </h2>

            <p>
              Set the business
              availability displayed
              on your website.
            </p>

          </div>

          <div className="settings-form">

            <div className="settings-form-group">

              <label>
                Working Days
              </label>

              <input
                type="text"
                name="workingDays"
                value={
                  settings.workingDays
                }
                onChange={
                  handleChange
                }
                placeholder="Monday – Sunday"
              />

            </div>

            <div className="settings-form-group">

              <label>
                Working Hours
              </label>

              <input
                type="text"
                name="workingHours"
                value={
                  settings.workingHours
                }
                onChange={
                  handleChange
                }
                placeholder="10:00 AM – 8:00 PM"
              />

            </div>

          </div>

        </section>

        {/* =========================
            BACKUP & RESTORE
        ========================= */}

        <section className="settings-card">

          <div className="settings-card-header">

            <span className="settings-section-label">
              DATA MANAGEMENT
            </span>

            <h2>
              Backup & Restore
            </h2>

            <p>
              Download a backup of
              your CMS data or restore
              your website data from a
              previous backup.
            </p>

          </div>

          {backupMessage.text && (
            <div
              className={
                backupMessage.type ===
                "success"
                  ? "settings-success-message"
                  : "settings-error-message"
              }
            >
              {
                backupMessage.text
              }
            </div>
          )}

          <div className="settings-backup-actions">

            <div className="settings-backup-item">

              <div>

                <h3>
                  Export Website Data
                </h3>

                <p>
                  Download your
                  projects, journal,
                  homepage, SEO and
                  website settings as
                  a JSON backup file.
                </p>

              </div>

              <button
                type="button"
                className="settings-backup-button"
                onClick={
                  handleExportBackup
                }
              >
                Export Backup
              </button>

            </div>

            <div className="settings-backup-item">

              <div>

                <h3>
                  Restore Website Data
                </h3>

                <p>
                  Restore CMS data
                  from a previously
                  exported backup
                  file.
                </p>

              </div>

              <button
                type="button"
                className="settings-restore-button"
                onClick={
                  handleRestoreClick
                }
              >
                Restore Backup
              </button>

              <input
                ref={
                  fileInputRef
                }
                type="file"
                accept=".json,application/json"
                onChange={
                  handleRestoreBackup
                }
                style={{
                  display:
                    "none",
                }}
              />

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}