import {
  useEffect,
  useState,
} from "react";

import ImagePicker from "../ImagePicker/ImagePicker";

import "../../styles/create-journal-modal.css";


/* =========================
   EMPTY FORM
========================= */

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
  /* =========================
     FORM STATE
  ========================= */

  const [
    formData,
    setFormData,
  ] = useState(
    emptyForm
  );


  /* =========================
     IMAGE PICKER STATE
  ========================= */

  const [
    isImagePickerOpen,
    setIsImagePickerOpen,
  ] = useState(false);


  /* =========================
     LOAD EDITING DATA
  ========================= */

  useEffect(() => {
    if (initialData) {
      setFormData({
        title:
          initialData.title ||
          "",

        slug:
          initialData.slug ||
          "",

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
      setFormData({
        ...emptyForm,
      });
    }
  }, [
    initialData,
    isOpen,
  ]);


  /* =========================
     AUTO GENERATE SLUG
  ========================= */

  useEffect(() => {
    /*
     * Only automatically generate
     * the slug when creating
     * a new article.
     *
     * This prevents existing
     * article URLs from changing
     * when editing the title.
     */

    if (!initialData) {
      const slug =
        formData.title
          .toLowerCase()
          .trim()
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
          )
          .replace(
            /^-|-$/g,
            ""
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


  /* =========================
     CLOSE IMAGE PICKER
     WHEN MODAL CLOSES
  ========================= */

  useEffect(() => {
    if (!isOpen) {
      setIsImagePickerOpen(
        false
      );
    }
  }, [isOpen]);


  /* =========================
     DO NOT RENDER
  ========================= */

  if (!isOpen) {
    return null;
  }


  /* =========================
     HANDLE FORM CHANGE
  ========================= */

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

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


  /* =========================
     SELECT COVER IMAGE
  ========================= */

  const handleSelectCover = (
    imageUrl
  ) => {
    setFormData(
      (prev) => ({
        ...prev,
        cover:
          imageUrl,
      })
    );

    setIsImagePickerOpen(
      false
    );
  };


  /* =========================
     REMOVE COVER IMAGE
  ========================= */

  const handleRemoveCover =
    () => {
      setFormData(
        (prev) => ({
          ...prev,
          cover: "",
        })
      );
    };


  /* =========================
     SUBMIT ARTICLE
  ========================= */

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    /*
     * Basic validation
     */

    if (
      !formData.title.trim()
    ) {
      alert(
        "Please enter an article title."
      );

      return;
    }

    if (
      !formData.slug.trim()
    ) {
      alert(
        "Unable to create article slug."
      );

      return;
    }

    /*
     * Clean article data
     */

    const articleData = {
      ...formData,

      title:
        formData.title.trim(),

      slug:
        formData.slug.trim(),

      excerpt:
        formData.excerpt.trim(),

      content:
        formData.content.trim(),
    };

    onSave(
      articleData
    );

    setFormData({
      ...emptyForm,
    });

    setIsImagePickerOpen(
      false
    );
  };


  /* =========================
     RENDER
  ========================= */

  return (
    <>
      <div className="journal-modal-overlay">

        <div className="journal-modal">

          {/* =========================
              HEADER
          ========================= */}

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
              type="button"
              className="modal-close"
              onClick={
                onClose
              }
              aria-label="Close article editor"
            >
              ×
            </button>

          </div>


          {/* =========================
              FORM
          ========================= */}

          <form
            className="journal-form"
            onSubmit={
              handleSubmit
            }
          >

            {/* =========================
                TITLE
            ========================= */}

            <div className="form-group">

              <label>
                Article Title
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
                placeholder="Enter article title"
                required
              />

            </div>


            {/* =========================
                SLUG
            ========================= */}

            <div className="form-group">

              <label>
                Article URL Slug
              </label>

              <input
                type="text"
                name="slug"
                value={
                  formData.slug
                }
                readOnly
              />

              <small
                style={{
                  display:
                    "block",

                  marginTop:
                    "7px",

                  color:
                    "#777",

                  fontSize:
                    "12px",
                }}
              >
                This is automatically
                generated from the
                article title.
              </small>

            </div>


            {/* =========================
                CATEGORY
            ========================= */}

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

                <option value="Wedding">
                  Wedding
                </option>

                <option value="Commercial">
                  Commercial
                </option>

                <option value="Portrait">
                  Portrait
                </option>

                <option value="Travel">
                  Travel
                </option>

                <option value="Behind The Scenes">
                  Behind The Scenes
                </option>

              </select>

            </div>


            {/* =========================
                STATUS
            ========================= */}

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


            {/* =========================
                EXCERPT
            ========================= */}

            <div className="form-group">

              <label>
                Article Excerpt
              </label>

              <textarea
                rows="4"
                name="excerpt"
                value={
                  formData.excerpt
                }
                onChange={
                  handleChange
                }
                placeholder="Write a short introduction or summary of the article..."
              />

              <small
                style={{
                  display:
                    "block",

                  marginTop:
                    "7px",

                  color:
                    "#777",

                  fontSize:
                    "12px",

                  lineHeight:
                    "1.5",
                }}
              >
                This short description
                can appear in journal
                previews and may also be
                used for search engine
                descriptions.
              </small>

            </div>


            {/* =========================
                ARTICLE CONTENT
            ========================= */}

            <div className="form-group">

              <label>
                Article Content
              </label>


              {/* FORMATTING GUIDE */}

              <div
                style={{
                  marginBottom:
                    "12px",

                  padding:
                    "14px 16px",

                  background:
                    "#f8f6f1",

                  border:
                    "1px solid #ece8df",

                  borderRadius:
                    "10px",

                  color:
                    "#666",

                  fontSize:
                    "12px",

                  lineHeight:
                    "1.7",
                }}
              >

                <strong
                  style={{
                    display:
                      "block",

                    marginBottom:
                      "5px",

                    color:
                      "#333",
                  }}
                >
                  Article Formatting
                </strong>

                <div>
                  Leave one blank line
                  between paragraphs.
                </div>

                <div>
                  Use{" "}
                  <strong>
                    ## Heading
                  </strong>{" "}
                  for a section heading.
                </div>

                <div>
                  Use{" "}
                  <strong>
                    ### Subheading
                  </strong>{" "}
                  for a smaller heading.
                </div>

              </div>


              <textarea
                rows="16"
                name="content"
                value={
                  formData.content
                }
                onChange={
                  handleChange
                }
                placeholder={`Write your article here...

This is the opening paragraph of your story.

## The Story Behind The Shoot

Write your next paragraph here.

### Choosing The Location

Continue your article here...`}
                style={{
                  minHeight:
                    "350px",

                  lineHeight:
                    "1.7",

                  resize:
                    "vertical",
                }}
              />

            </div>


            {/* =========================
                COVER IMAGE
            ========================= */}

            <div className="form-group">

              <label>
                Cover Image
              </label>


              {/* SELECT IMAGE */}

              <button
                type="button"
                className="media-button secondary"
                onClick={() =>
                  setIsImagePickerOpen(
                    true
                  )
                }
              >

                {formData.cover
                  ? "Change Cover Image"
                  : "Select Cover Image"}

              </button>


              {/* COVER PREVIEW */}

              {formData.cover && (

                <div
                  style={{
                    marginTop:
                      "16px",
                  }}
                >

                  <img
                    src={
                      formData.cover
                    }
                    alt="Article cover preview"
                    className="journal-cover-preview"
                  />


                  <button
                    type="button"
                    onClick={
                      handleRemoveCover
                    }
                    style={{
                      display:
                        "block",

                      marginTop:
                        "10px",

                      padding:
                        "8px 12px",

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
                    Remove Cover
                  </button>

                </div>

              )}

            </div>


            {/* =========================
                FEATURED ARTICLE
            ========================= */}

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

              Feature Article on Homepage

            </label>


            {/* =========================
                ACTIONS
            ========================= */}

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


      {/* =========================
          IMAGE PICKER
      ========================= */}

      <ImagePicker
        isOpen={
          isImagePickerOpen
        }

        onClose={() =>
          setIsImagePickerOpen(
            false
          )
        }

        onSelect={
          handleSelectCover
        }
      />

    </>
  );
}