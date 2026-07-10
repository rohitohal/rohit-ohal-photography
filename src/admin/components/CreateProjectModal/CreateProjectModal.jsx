import { useEffect, useState } from "react";

import ImagePicker from "../ImagePicker/ImagePicker";
import GalleryPicker from "../GalleryPicker/GalleryPicker";

import "../../styles/create-project-modal.css";

const emptyForm = {
  title: "",
  slug: "",
  category: "Wedding",
  location: "",
  date: "",
  description: "",
  cover: "",
  gallery: [],
  status: "Draft",
  featuredHomepage: false,
  featuredPortfolio: false,
};

export default function CreateProjectModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}) {
  const [formData, setFormData] = useState(emptyForm);

  const [isImagePickerOpen, setIsImagePickerOpen] =
    useState(false);

  const [isGalleryPickerOpen, setIsGalleryPickerOpen] =
    useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        slug: initialData.slug || "",
        category:
          initialData.category || "Wedding",
        location:
          initialData.location || "",
        date: initialData.date || "",
        description:
          initialData.description || "",
        cover:
          initialData.cover || "",
        gallery:
          initialData.gallery || [],
        status:
          initialData.status || "Draft",
        featuredHomepage:
          initialData.featuredHomepage ||
          false,
        featuredPortfolio:
          initialData.featuredPortfolio ||
          false,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [initialData, isOpen]);

  useEffect(() => {
    if (!initialData) {
      const slug = formData.title
        .toLowerCase()
        .replace(
          /[^a-z0-9\s-]/g,
          ""
        )
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      setFormData((prev) => ({
        ...prev,
        slug,
      }));
    }
  }, [formData.title, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);

    setFormData(emptyForm);
  };

  return (
    <>
      <div className="project-modal-overlay">

        <div className="project-modal">

          <div className="project-modal-header">

            <div>

              <span className="modal-overline">
                {initialData
                  ? "EDIT PROJECT"
                  : "NEW PROJECT"}
              </span>

              <h2>
                {initialData
                  ? "Edit Project"
                  : "Create Project"}
              </h2>

              <p>
                {initialData
                  ? "Update your project information."
                  : "Create a new wedding, portrait, commercial or editorial project."}
              </p>

            </div>

            <button
              className="modal-close"
              onClick={onClose}
            >
              ×
            </button>

          </div>

          <form
            className="project-form"
            onSubmit={handleSubmit}
          >

            <div className="form-grid">

              <div className="form-group">
                <label>
                  Project Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={
                    formData.title
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Aditi & Rahul Wedding"
                  required
                />
              </div>

              <div className="form-group">
                <label>Slug</label>

                <input
                  type="text"
                  name="slug"
                  value={
                    formData.slug
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              <div className="form-group">
                <label>
                  Discipline
                </label>

                <select
                  name="category"
                  value={
                    formData.category
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option>
                    Wedding
                  </option>

                  <option>
                    Portrait
                  </option>

                  <option>
                    Events
                  </option>

                  <option>
                    Industrial
                  </option>

                  <option>
                    Food & Beverage
                  </option>

                  <option>
                    Editorial
                  </option>

                </select>
              </div>

              <div className="form-group">
                <label>
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={
                    formData.location
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Pune"
                />
              </div>

              <div className="form-group">
                <label>Date</label>

                <input
                  type="date"
                  name="date"
                  value={
                    formData.date
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              <div className="form-group">
                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={
                    formData.status
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option>
                    Draft
                  </option>

                  <option>
                    Published
                  </option>

                </select>
              </div>

            </div>

            <div className="form-group">
              <label>
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                placeholder="Project story..."
              />
            </div>

            {/* COVER IMAGE */}

            <div className="form-group">

              <label>
                Cover Image
              </label>

              <button
                type="button"
                className="media-button secondary"
                onClick={() =>
                  setIsImagePickerOpen(
                    true
                  )
                }
              >
                Select Cover Image
              </button>

              {formData.cover && (
                <div
                  style={{
                    marginTop:
                      "20px",
                  }}
                >
                  <img
                    src={
                      formData.cover
                    }
                    alt="Cover Preview"
                    style={{
                      width:
                        "220px",
                      height:
                        "140px",
                      objectFit:
                        "cover",
                      borderRadius:
                        "12px",
                      border:
                        "1px solid #ece8df",
                    }}
                  />
                </div>
              )}

            </div>

            {/* GALLERY IMAGES */}

            <div className="form-group">

              <label>
                Gallery Images
              </label>

              <button
                type="button"
                className="media-button secondary"
                onClick={() =>
                  setIsGalleryPickerOpen(
                    true
                  )
                }
              >
                Select Gallery Images
              </button>

              {formData.gallery.length >
                0 && (
                <div
                  style={{
                    display:
                      "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill,minmax(120px,1fr))",
                    gap: "15px",
                    marginTop:
                      "20px",
                  }}
                >
                  {formData.gallery.map(
                    (
                      image,
                      index
                    ) => (
                      <img
                        key={
                          index
                        }
                        src={
                          image
                        }
                        alt={`Gallery ${index}`}
                        style={{
                          width:
                            "100%",
                          height:
                            "100px",
                          objectFit:
                            "cover",
                          borderRadius:
                            "10px",
                          border:
                            "1px solid #ece8df",
                        }}
                      />
                    )
                  )}
                </div>
              )}

            </div>

            <div className="checkbox-group">

              <label>
                <input
                  type="checkbox"
                  name="featuredHomepage"
                  checked={
                    formData.featuredHomepage
                  }
                  onChange={
                    handleChange
                  }
                />
                Feature on Homepage
              </label>

              <label>
                <input
                  type="checkbox"
                  name="featuredPortfolio"
                  checked={
                    formData.featuredPortfolio
                  }
                  onChange={
                    handleChange
                  }
                />
                Highlight in Portfolio
              </label>

            </div>

            <div className="modal-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-btn"
              >
                {initialData
                  ? "Save Changes"
                  : "Create Project"}
              </button>

            </div>

          </form>

        </div>

      </div>

      <ImagePicker
        isOpen={
          isImagePickerOpen
        }
        onClose={() =>
          setIsImagePickerOpen(
            false
          )
        }
        onSelect={(
          imageUrl
        ) =>
          setFormData(
            (prev) => ({
              ...prev,
              cover:
                imageUrl,
            })
          )
        }
      />

      <GalleryPicker
        isOpen={
          isGalleryPickerOpen
        }
        onClose={() =>
          setIsGalleryPickerOpen(
            false
          )
        }
        selectedImages={
          formData.gallery
        }
        onSelect={(
          images
        ) =>
          setFormData(
            (prev) => ({
              ...prev,
              gallery:
                images,
            })
          )
        }
      />
    </>
  );
}