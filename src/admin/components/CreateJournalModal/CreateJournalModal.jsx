import { useEffect, useState } from "react";

import ImagePicker from "../ImagePicker/ImagePicker";

import "../../styles/create-journal-modal.css";

const emptyForm = {
  title: "",
  slug: "",
  category: "Wedding",
  excerpt: "",
  content: "",
  cover: "",
  status: "Draft",
  featured: false,
};

export default function CreateJournalModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}) {
  const [formData, setFormData] =
    useState(emptyForm);

  const [
    isImagePickerOpen,
    setIsImagePickerOpen,
  ] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title:
          initialData.title || "",
        slug:
          initialData.slug || "",
        category:
          initialData.category ||
          "Wedding",
        excerpt:
          initialData.excerpt ||
          "",
        content:
          initialData.content ||
          "",
        cover:
          initialData.cover ||
          "",
        status:
          initialData.status ||
          "Draft",
        featured:
          initialData.featured ||
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
        .replace(
          /\s+/g,
          "-"
        )
        .replace(
          /-+/g,
          "-"
        );

      setFormData(
        (prev) => ({
          ...prev,
          slug,
        })
      );
    }
  }, [
    formData.title,
    initialData,
  ]);

  if (!isOpen) return null;

  const handleChange = (
    e
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData(
      (prev) => ({
        ...prev,
        [name]:
          type ===
          "checkbox"
            ? checked
            : value,
      })
    );
  };

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    onSave(formData);

    setFormData(emptyForm);
  };

  return (
    <>
      <div className="journal-modal-overlay">

        <div className="journal-modal">

          <div className="journal-modal-header">

            <div>

              <span className="modal-overline">
                {initialData
                  ? "EDIT ARTICLE"
                  : "NEW ARTICLE"}
              </span>

              <h2>
                {initialData
                  ? "Edit Article"
                  : "Create Article"}
              </h2>

            </div>

            <button
              className="modal-close"
              onClick={
                onClose
              }
            >
              ×
            </button>

          </div>

          <form
            className="journal-form"
            onSubmit={
              handleSubmit
            }
          >

            <div className="form-group">

              <label>
                Title
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
                required
              />

            </div>

            <div className="form-group">

              <label>
                Slug
              </label>

              <input
                type="text"
                name="slug"
                value={
                  formData.slug
                }
                readOnly
              />

            </div>

            <div className="form-group">

              <label>
                Category
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
                  Commercial
                </option>

                <option>
                  Portrait
                </option>

                <option>
                  Travel
                </option>

                <option>
                  Behind The Scenes
                </option>

              </select>

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
                <option value="Draft">
                  Draft
                </option>

                <option value="Published">
                  Published
                </option>

              </select>

            </div>

            <div className="form-group">

              <label>
                Excerpt
              </label>

              <textarea
                rows="3"
                name="excerpt"
                value={
                  formData.excerpt
                }
                onChange={
                  handleChange
                }
              />

            </div>

            <div className="form-group">

              <label>
                Article Content
              </label>

              <textarea
                rows="10"
                name="content"
                value={
                  formData.content
                }
                onChange={
                  handleChange
                }
              />

            </div>

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
                <img
                  src={
                    formData.cover
                  }
                  alt="Preview"
                  className="journal-cover-preview"
                />
              )}

            </div>

            <label className="checkbox-label">

              <input
                type="checkbox"
                name="featured"
                checked={
                  formData.featured
                }
                onChange={
                  handleChange
                }
              />

              Feature Article

            </label>

            <div className="modal-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={
                  onClose
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-btn"
              >
                {initialData
                  ? "Save Changes"
                  : "Create Article"}
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
            (
              prev
            ) => ({
              ...prev,
              cover:
                imageUrl,
            })
          )
        }
      />
    </>
  );
}