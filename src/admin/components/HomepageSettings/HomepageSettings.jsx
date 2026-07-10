import { useEffect, useState } from "react";

import ImagePicker from "../ImagePicker/ImagePicker";

import "../../styles/homepage-settings.css";

const defaultSettings = {
  heroTitle: "Capturing Timeless Stories",
  heroSubtitle:
    "Luxury Wedding Photographer based in Pune, India.",
  heroImage: "",
  buttonText: "View Portfolio",
  buttonLink: "/portfolio",
};

export default function HomepageSettings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(
      "rohit-photography-homepage"
    );

    return saved
      ? JSON.parse(saved)
      : defaultSettings;
  });

  const [isImagePickerOpen, setIsImagePickerOpen] =
    useState(false);

  useEffect(() => {
    localStorage.setItem(
      "rohit-photography-homepage",
      JSON.stringify(settings)
    );
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="homepage-settings-card">

        <div className="homepage-settings-header">

          <span className="homepage-overline">
            HERO SETTINGS
          </span>

          <h2>
            Homepage Hero
          </h2>

        </div>

        <div className="homepage-form">

          <div className="form-group">
            <label>
              Hero Title
            </label>

            <input
              type="text"
              name="heroTitle"
              value={settings.heroTitle}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Hero Subtitle
            </label>

            <textarea
              rows="4"
              name="heroSubtitle"
              value={settings.heroSubtitle}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">

            <label>
              Hero Background Image
            </label>

            <button
              type="button"
              className="media-button secondary"
              onClick={() =>
                setIsImagePickerOpen(true)
              }
            >
              Select Hero Image
            </button>

            {settings.heroImage && (
              <img
                src={settings.heroImage}
                alt="Hero Preview"
                className="hero-preview-image"
              />
            )}

          </div>

          <div className="form-group">
            <label>
              Button Text
            </label>

            <input
              type="text"
              name="buttonText"
              value={settings.buttonText}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Button Link
            </label>

            <input
              type="text"
              name="buttonLink"
              value={settings.buttonLink}
              onChange={handleChange}
            />
          </div>

        </div>

      </div>

      <ImagePicker
        isOpen={isImagePickerOpen}
        onClose={() =>
          setIsImagePickerOpen(false)
        }
        onSelect={(imageUrl) =>
          setSettings((prev) => ({
            ...prev,
            heroImage: imageUrl,
          }))
        }
      />
    </>
  );
}