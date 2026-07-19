import {
  useEffect,
  useState,
} from "react";

import ImagePicker from "../ImagePicker/ImagePicker";
import GalleryPicker from "../GalleryPicker/GalleryPicker";

import "../../styles/create-project-modal.css";


/* =========================
   EMPTY PROJECT
========================= */

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


/* =========================
   CREATE SAFE SLUG
========================= */

function createSlug(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}


export default function CreateProjectModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}) {

  /* =========================
     FORM DATA
  ========================= */

  const [
    formData,
    setFormData,
  ] = useState(emptyForm);


  /* =========================
     IMAGE PICKERS
  ========================= */

  const [
    isImagePickerOpen,
    setIsImagePickerOpen,
  ] = useState(false);

  const [
    isGalleryPickerOpen,
    setIsGalleryPickerOpen,
  ] = useState(false);


  /* =========================
     LOAD PROJECT FOR EDITING
  ========================= */

  useEffect(() => {

    if (!isOpen) {
      return;
    }

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

        location:
          initialData.location ||
          "",

        date:
          initialData.date ||
          "",

        description:
          initialData.description ||
          "",

        cover:
          initialData.cover ||
          "",

        gallery:
          Array.isArray(
            initialData.gallery
          )
            ? initialData.gallery
            : [],

        status:
          initialData.status ||
          "Draft",

        featuredHomepage:
          initialData.featuredHomepage ===
          true,

        featuredPortfolio:
          initialData.featuredPortfolio ===
          true,
      });

    } else {

      setFormData({
        ...emptyForm,
        gallery: [],
      });

    }

  }, [
    initialData,
    isOpen,
  ]);


  /* =========================
     AUTOMATIC SLUG

     Only generate automatically
     when creating a NEW project.

     Editing an existing project's
     title will NOT change its URL.
  ========================= */

  useEffect(() => {

    if (
      !isOpen ||
      initialData
    ) {
      return;
    }

    const generatedSlug =
      createSlug(
        formData.title
      );

    setFormData(
      (prev) => ({
        ...prev,
        slug:
          generatedSlug,
      })
    );

  }, [
    formData.title,
    initialData,
    isOpen,
  ]);


  /* =========================
     DO NOT RENDER
  ========================= */

  if (!isOpen) {
    return null;
  }


  /* =========================
     HANDLE INPUT CHANGE
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


    /* =========================
       STATUS CHANGE
    ========================= */

    if (
      name === "status"
    ) {

      setFormData(
        (prev) => ({
          ...prev,

          status:
            value,

          /*
           * Draft projects should
           * not remain featured
           * on the public homepage.
           */

          featuredHomepage:
            value === "Draft"
              ? false
              : prev.featuredHomepage,
        })
      );

      return;
    }


    /* =========================
       SLUG CHANGE
    ========================= */

    if (
      name === "slug"
    ) {

      setFormData(
        (prev) => ({
          ...prev,

          slug:
            createSlug(
              value
            ),
        })
      );

      return;
    }


    /* =========================
       NORMAL INPUT
    ========================= */

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
     HANDLE SUBMIT
  ========================= */

  const handleSubmit = (
    event
  ) => {

    event.preventDefault();


    /* =========================
       TITLE VALIDATION
    ========================= */

    const cleanTitle =
      formData.title.trim();

    if (!cleanTitle) {

      alert(
        "Please enter a project title."
      );

      return;
    }


    /* =========================
       SLUG VALIDATION
    ========================= */

    const cleanSlug =
      createSlug(
        formData.slug ||
        cleanTitle
      );

    if (!cleanSlug) {

      alert(
        "Please enter a valid project slug."
      );

      return;
    }


    /* =========================
       PUBLISHED PROJECT
       VALIDATION
    ========================= */

    if (
      formData.status ===
        "Published" &&
      !formData.cover
    ) {

      alert(
        "Please select a cover image before publishing this project."
      );

      return;
    }


    /* =========================
       CLEAN PROJECT DATA
    ========================= */

    const projectData = {

      ...formData,

      title:
        cleanTitle,

      slug:
        cleanSlug,

      location:
        formData.location.trim(),

      description:
        formData.description.trim(),

      gallery:
        Array.isArray(
          formData.gallery
        )
          ? formData.gallery
          : [],

      /*
       * Only Published projects
       * can appear as Featured
       * Projects on the homepage.
       */

      featuredHomepage:
        formData.status ===
        "Published"
          ? formData.featuredHomepage
          : false,
    };


    /* =========================
       SAVE PROJECT
    ========================= */

    onSave(
      projectData
    );


    /* =========================
       RESET FORM
    ========================= */

    setFormData({
      ...emptyForm,
      gallery: [],
    });

    setIsImagePickerOpen(
      false
    );

    setIsGalleryPickerOpen(
      false
    );
  };


  /* =========================
     CLOSE MODAL
  ========================= */

  const handleClose = () => {

    setIsImagePickerOpen(
      false
    );

    setIsGalleryPickerOpen(
      false
    );

    onClose();
  };


  /* =========================
     RENDER
  ========================= */

  return (
    <>

      <div className="project-modal-overlay">

        <div className="project-modal">


          {/* =========================
              HEADER
          ========================= */}

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
              type="button"
              className="modal-close"
              onClick={
                handleClose
              }
              aria-label="Close project editor"
            >
              ×
            </button>

          </div>


          {/* =========================
              PROJECT FORM
          ========================= */}

          <form
            className="project-form"
            onSubmit={
              handleSubmit
            }
          >


            {/* =========================
                BASIC INFORMATION
            ========================= */}

            <div className="form-grid">


              {/* PROJECT TITLE */}

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


              {/* SLUG */}

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
                  onChange={
                    handleChange
                  }
                  placeholder="aditi-rahul-wedding"
                  required
                />

                <small
                  style={{
                    color:
                      "#777",
                  }}
                >
                  Used in the project URL.
                  Avoid changing this after
                  publishing.
                </small>

              </div>


              {/* DISCIPLINE */}

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

                  <option value="Wedding">
                    Wedding
                  </option>

                  <option value="Portrait">
                    Portrait
                  </option>

                  <option value="Events">
                    Events
                  </option>

                  <option value="Industrial">
                    Industrial
                  </option>

                  <option value="Food & Beverage">
                    Food & Beverage
                  </option>

                  <option value="Editorial">
                    Editorial
                  </option>

                </select>

              </div>


              {/* LOCATION */}

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


              {/* DATE */}

              <div className="form-group">

                <label>
                  Date
                </label>

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


              {/* STATUS */}

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

            </div>


            {/* =========================
                DESCRIPTION
            ========================= */}

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


            {/* =========================
                COVER IMAGE
            ========================= */}

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
                {formData.cover
                  ? "Change Cover Image"
                  : "Select Cover Image"}
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


            {/* =========================
                GALLERY IMAGES
            ========================= */}

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
                {formData.gallery.length >
                0
                  ? `Manage Gallery (${formData.gallery.length})`
                  : "Select Gallery Images"}
              </button>


              {formData.gallery.length >
                0 && (

                <div
                  style={{
                    display:
                      "grid",

                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(120px, 1fr))",

                    gap:
                      "15px",

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
                        key={`${image}-${index}`}
                        src={
                          image
                        }
                        alt={`Gallery ${index + 1}`}
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


            {/* =========================
                FEATURE SETTINGS
            ========================= */}

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
                  disabled={
                    formData.status !==
                    "Published"
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


            {formData.status !==
              "Published" && (

              <p
                style={{
                  margin:
                    "8px 0 0",

                  color:
                    "#777",

                  fontSize:
                    "13px",
                }}
              >
                Publish this project to
                feature it on the homepage.
              </p>

            )}


            {/* =========================
                ACTIONS
            ========================= */}

            <div className="modal-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={
                  handleClose
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
                  : formData.status ===
                    "Published"
                    ? "Publish Project"
                    : "Save Draft"}

              </button>

            </div>

          </form>

        </div>

      </div>


      {/* =========================
          COVER IMAGE PICKER
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


      {/* =========================
          GALLERY PICKER
      ========================= */}

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