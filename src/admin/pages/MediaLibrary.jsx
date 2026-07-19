import {
  useEffect,
  useMemo,
  useState,
} from "react";

import MediaGrid from "../components/MediaGrid/MediaGrid";

import "../styles/media-library.css";
import "../styles/media-grid.css";

const MEDIA_KEY =
  "rohit-photography-media";

const FOLDERS_KEY =
  "rohit-photography-media-folders";

export default function MediaLibrary() {
  /* =========================
     MEDIA ITEMS
  ========================= */

  const [mediaItems, setMediaItems] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            MEDIA_KEY
          );

        if (!saved) {
          return [];
        }

        const parsed =
          JSON.parse(saved);

        return Array.isArray(parsed)
          ? parsed
          : [];
      } catch (error) {
        console.error(
          "Failed to load media:",
          error
        );

        return [];
      }
    });

  /* =========================
     FOLDERS
  ========================= */

  const [folders, setFolders] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            FOLDERS_KEY
          );

        if (!saved) {
          return [];
        }

        const parsed =
          JSON.parse(saved);

        return Array.isArray(parsed)
          ? parsed
          : [];
      } catch (error) {
        console.error(
          "Failed to load folders:",
          error
        );

        return [];
      }
    });

  /* =========================
     ACTIVE FOLDER
  ========================= */

  const [
    activeFolder,
    setActiveFolder,
  ] = useState("all");

  /* =========================
     SEARCH + SORT
  ========================= */

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  const [
    sortOrder,
    setSortOrder,
  ] = useState("newest");

  /* =========================
     SAVE MEDIA
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      MEDIA_KEY,
      JSON.stringify(mediaItems)
    );
  }, [mediaItems]);

  /* =========================
     SAVE FOLDERS
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      FOLDERS_KEY,
      JSON.stringify(folders)
    );
  }, [folders]);

  /* =========================
     CREATE FOLDER
  ========================= */

  const handleCreateFolder =
    () => {
      const folderName =
        window.prompt(
          "Enter folder name:"
        );

      if (!folderName) {
        return;
      }

      const cleanName =
        folderName.trim();

      if (!cleanName) {
        return;
      }

      const exists =
        folders.some(
          (folder) =>
            folder
              .toLowerCase() ===
            cleanName
              .toLowerCase()
        );

      if (exists) {
        alert(
          "A folder with this name already exists."
        );

        return;
      }

      setFolders(
        (prev) => [
          ...prev,
          cleanName,
        ]
      );

      /*
       * Automatically open
       * newly created folder.
       */

      setActiveFolder(
        cleanName
      );

      setSearchQuery("");
    };

  /* =========================
     OPEN FOLDER
  ========================= */

  const handleFolderChange =
    (folder) => {
      setActiveFolder(
        folder
      );

      setSearchQuery("");
    };

    /* =========================
   RENAME FOLDER
========================= */

const handleRenameFolder = (
  oldFolderName
) => {
  if (
    !oldFolderName ||
    oldFolderName ===
      "Uncategorized"
  ) {
    return;
  }

  const newFolderName =
    window.prompt(
      "Enter new folder name:",
      oldFolderName
    );

  if (!newFolderName) {
    return;
  }

  const cleanName =
    newFolderName.trim();

  if (!cleanName) {
    return;
  }

  if (
    cleanName ===
    oldFolderName
  ) {
    return;
  }

  const exists =
    folders.some(
      (folder) =>
        folder
          .toLowerCase() ===
        cleanName
          .toLowerCase()
    );

  if (exists) {
    alert(
      "A folder with this name already exists."
    );

    return;
  }

  /* Rename folder */

  setFolders((prev) =>
    prev.map((folder) =>
      folder ===
      oldFolderName
        ? cleanName
        : folder
    )
  );

  /* Move images to renamed folder */

  setMediaItems((prev) =>
    prev.map((item) => {
      const itemFolder =
        item.folder ||
        item.category ||
        "Uncategorized";

      if (
        itemFolder !==
        oldFolderName
      ) {
        return item;
      }

      return {
        ...item,

        folder:
          cleanName,

        category:
          cleanName,
      };
    })
  );

  /* Keep renamed folder open */

  if (
    activeFolder ===
    oldFolderName
  ) {
    setActiveFolder(
      cleanName
    );
  }
};

/* =========================
   DELETE FOLDER
========================= */

const handleDeleteFolder = (
  folderName
) => {
  if (
    !folderName ||
    folderName ===
      "Uncategorized"
  ) {
    return;
  }

  const imageCount =
    mediaItems.filter(
      (item) => {
        const itemFolder =
          item.folder ||
          item.category ||
          "Uncategorized";

        return (
          itemFolder ===
          folderName
        );
      }
    ).length;

  const confirmed =
    window.confirm(
      imageCount > 0
        ? `Delete "${folderName}"? ${imageCount} image(s) will be moved to Uncategorized. The original Cloudinary images will NOT be deleted.`
        : `Delete "${folderName}"?`
    );

  if (!confirmed) {
    return;
  }

  /* Remove folder */

  setFolders((prev) =>
    prev.filter(
      (folder) =>
        folder !==
        folderName
    )
  );

  /* Move images to Uncategorized */

  setMediaItems((prev) =>
    prev.map((item) => {
      const itemFolder =
        item.folder ||
        item.category ||
        "Uncategorized";

      if (
        itemFolder !==
        folderName
      ) {
        return item;
      }

      return {
        ...item,

        folder:
          "Uncategorized",

        category:
          "Uncategorized",
      };
    })
  );

  /* Return to All Images */

  if (
    activeFolder ===
    folderName
  ) {
    setActiveFolder(
      "all"
    );
  }
};

  /* =========================
     CLOUDINARY UPLOAD
  ========================= */

  const openUploadWidget =
    () => {
      if (
        !window.cloudinary
      ) {
        alert(
          "Cloudinary upload widget is not loaded."
        );

        return;
      }

      /*
       * If All Images is active,
       * uploads go into Uncategorized.
       */

      const uploadFolder =
        activeFolder === "all"
          ? "Uncategorized"
          : activeFolder;

      const widget =
        window.cloudinary
          .createUploadWidget(
            {
              cloudName:
                "dmwnh8ebd",

              uploadPreset:
                "rohit_photography_uploads",

              multiple:
                true,

              /*
               * Keep your existing
               * Cloudinary folder.
               *
               * Admin folders are
               * handled separately.
               */

              folder:
                "rohit-ohal-photography",

              sources: [
                "local",
                "url",
                "camera",
              ],

              resourceType:
                "image",

              clientAllowedFormats:
                [
                  "jpg",
                  "jpeg",
                  "png",
                  "webp",
                ],

              maxFiles:
                200,
            },

            (
              error,
              result
            ) => {
              if (error) {
                console.error(
                  "Cloudinary upload error:",
                  error
                );

                return;
              }

              if (
                result &&
                result.event ===
                  "success"
              ) {
                const info =
                  result.info;

                const newMedia =
                  {
                    id:
                      info.public_id,

                    publicId:
                      info.public_id,

                    url:
                      info.secure_url,

                    width:
                      info.width,

                    height:
                      info.height,

                    format:
                      info.format,

                    bytes:
                      info.bytes,

                    createdAt:
                      info.created_at,

                    filename:
                      info.original_filename,

                    /*
                     * ADMIN MEDIA
                     * LIBRARY FOLDER
                     */

                    folder:
                      uploadFolder,

                    /*
                     * Keep category
                     * for compatibility
                     * with existing code.
                     */

                    category:
                      uploadFolder,
                  };

                setMediaItems(
                  (prev) => {
                    const exists =
                      prev.some(
                        (
                          item
                        ) =>
                          item.publicId ===
                          newMedia.publicId
                      );

                    if (
                      exists
                    ) {
                      return prev;
                    }

                    return [
                      newMedia,
                      ...prev,
                    ];
                  }
                );
              }
            }
          );

      widget.open();
    };

  /* =========================
     REMOVE IMAGE
  ========================= */

  const handleDelete = (
    imageId
  ) => {
    if (!imageId) {
      alert(
        "Unable to remove this image because its ID is missing."
      );

      return;
    }

    const confirmed =
      window.confirm(
        "Remove this image from the Media Library? The original image will remain in Cloudinary."
      );

    if (
      !confirmed
    ) {
      return;
    }

    setMediaItems(
      (prev) =>
        prev.filter(
          (item) =>
            (
              item.id ||
              item.publicId
            ) !==
            imageId
        )
    );
  };

  /* =========================
     MOVE IMAGE TO FOLDER
  ========================= */

  const handleMoveImage = (
    imageId,
    destinationFolder
  ) => {
    if (!imageId || !destinationFolder) {
      return;
    }

    setMediaItems((prev) =>
      prev.map((item) => {
        const itemId =
          item.id ||
          item.publicId;

        if (itemId !== imageId) {
          return item;
        }

        return {
          ...item,
          folder: destinationFolder,
          category: destinationFolder,
        };
      })
    );
  };

  /* =========================
     FILTER + SEARCH + SORT
  ========================= */

  const filteredMedia =
    useMemo(() => {
      const query =
        searchQuery
          .trim()
          .toLowerCase();

      let items =
        mediaItems.filter(
          (item) => {
            /*
             * FOLDER FILTER
             */

            const itemFolder =
              item.folder ||
              item.category ||
              "Uncategorized";

            const matchesFolder =
              activeFolder ===
                "all" ||
              itemFolder ===
                activeFolder;

            if (
              !matchesFolder
            ) {
              return false;
            }

            /*
             * SEARCH FILTER
             */

            const filename =
              item.filename ||
              "";

            const publicId =
              item.publicId ||
              "";

            const category =
              item.category ||
              "";

            const folder =
              item.folder ||
              "";

            return (
              filename
                .toLowerCase()
                .includes(
                  query
                ) ||
              publicId
                .toLowerCase()
                .includes(
                  query
                ) ||
              category
                .toLowerCase()
                .includes(
                  query
                ) ||
              folder
                .toLowerCase()
                .includes(
                  query
                )
            );
          }
        );

      items = [
        ...items,
      ];

      /*
       * SORTING
       */

      if (
        sortOrder ===
        "newest"
      ) {
        items.sort(
          (a, b) =>
            new Date(
              b.createdAt ||
                0
            ) -
            new Date(
              a.createdAt ||
                0
            )
        );
      }

      if (
        sortOrder ===
        "oldest"
      ) {
        items.sort(
          (a, b) =>
            new Date(
              a.createdAt ||
                0
            ) -
            new Date(
              b.createdAt ||
                0
            )
        );
      }

      if (
        sortOrder ===
        "az"
      ) {
        items.sort(
          (a, b) =>
            (
              a.filename ||
              a.publicId ||
              ""
            ).localeCompare(
              b.filename ||
                b.publicId ||
                ""
            )
        );
      }

      if (
        sortOrder ===
        "za"
      ) {
        items.sort(
          (a, b) =>
            (
              b.filename ||
              b.publicId ||
              ""
            ).localeCompare(
              a.filename ||
                a.publicId ||
                ""
            )
        );
      }

      return items;
    }, [
      mediaItems,
      activeFolder,
      searchQuery,
      sortOrder,
    ]);

  /* =========================
     FOLDER IMAGE COUNT
  ========================= */

  const getFolderCount = (
    folder
  ) => {
    return mediaItems.filter(
      (item) =>
        (
          item.folder ||
          item.category ||
          "Uncategorized"
        ) === folder
    ).length;
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <div className="media-library-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="media-library-header">

        <div>

          <span className="media-overline">
            MEDIA LIBRARY
          </span>

          <h1>
            Manage Your Images
          </h1>

          <p>
            Upload, organize and
            manage all images used
            across your portfolio,
            journal and homepage.
          </p>

        </div>

        <div className="media-actions">

          {/* CREATE FOLDER */}

          <button
            type="button"
            className="media-button secondary"
            onClick={
              handleCreateFolder
            }
          >
            + Create Folder
          </button>

          {/* UPLOAD */}

          <button
            type="button"
            className="media-button primary"
            onClick={
              openUploadWidget
            }
          >
            Upload Images
          </button>

        </div>

      </div>

      {/* =========================
          FOLDER NAVIGATION
      ========================= */}

      <div
        style={{
          display:
            "flex",

          gap:
            "12px",

          flexWrap:
            "wrap",

          marginBottom:
            "30px",
        }}
      >

        {/* ALL IMAGES */}

        <button
          type="button"
          onClick={() =>
            handleFolderChange(
              "all"
            )
          }
          style={{
            padding:
              "12px 18px",

            borderRadius:
              "12px",

            border:
              activeFolder ===
              "all"
                ? "1px solid #b58b43"
                : "1px solid #ddd",

            background:
              activeFolder ===
              "all"
                ? "#f8f3e9"
                : "#fff",

            cursor:
              "pointer",
          }}
        >
          All Images (
          {mediaItems.length}
          )
        </button>

        {/* FOLDERS */}

        {folders.map(
  (folder) => (

    <div
      key={folder}
      style={{
        display:
          "flex",

        alignItems:
          "center",

        border:
          activeFolder ===
          folder
            ? "1px solid #b58b43"
            : "1px solid #ddd",

        background:
          activeFolder ===
          folder
            ? "#f8f3e9"
            : "#fff",

        borderRadius:
          "12px",

        overflow:
          "hidden",
      }}
    >

      {/* OPEN FOLDER */}

      <button
        type="button"
        onClick={() =>
          handleFolderChange(
            folder
          )
        }
        style={{
          padding:
            "12px 16px",

          border:
            "none",

          background:
            "transparent",

          cursor:
            "pointer",
        }}
      >
        📁{" "}
        {folder} (
        {getFolderCount(
          folder
        )}
        )
      </button>


      {/* RENAME */}

      <button
        type="button"
        title="Rename Folder"
        onClick={(event) => {
          event.stopPropagation();

          handleRenameFolder(
            folder
          );
        }}
        style={{
          padding:
            "12px 10px",

          border:
            "none",

          borderLeft:
            "1px solid #ddd",

          background:
            "transparent",

          cursor:
            "pointer",

          fontSize:
            "14px",
        }}
      >
        ✎
      </button>


      {/* DELETE */}

      <button
        type="button"
        title="Delete Folder"
        onClick={(event) => {
          event.stopPropagation();

          handleDeleteFolder(
            folder
          );
        }}
        style={{
          padding:
            "12px 10px",

          border:
            "none",

          borderLeft:
            "1px solid #ddd",

          background:
            "transparent",

          cursor:
            "pointer",

          fontSize:
            "14px",
        }}
      >
        ×
      </button>

    </div>

  )
)}

      </div>

      {/* =========================
          CURRENT FOLDER
      ========================= */}

      <div
        style={{
          marginBottom:
            "20px",
        }}
      >

        <span
          style={{
            color:
              "#777",

            fontSize:
              "13px",

            textTransform:
              "uppercase",

            letterSpacing:
              "1px",
          }}
        >
          Current Folder
        </span>

        <h2
          style={{
            margin:
              "5px 0 0",
          }}
        >
          {activeFolder ===
          "all"
            ? "All Images"
            : activeFolder}
        </h2>

      </div>

      {/* =========================
          TOOLBAR
      ========================= */}

      <div className="media-toolbar">

        <input
          type="text"
          placeholder="Search images..."
          value={
            searchQuery
          }
          onChange={(
            event
          ) =>
            setSearchQuery(
              event.target
                .value
            )
          }
        />

        <select
          value={
            sortOrder
          }
          onChange={(
            event
          ) =>
            setSortOrder(
              event.target
                .value
            )
          }
        >

          <option value="newest">
            Newest First
          </option>

          <option value="oldest">
            Oldest First
          </option>

          <option value="az">
            Name A-Z
          </option>

          <option value="za">
            Name Z-A
          </option>

        </select>

      </div>

      {/* =========================
          MEDIA COUNT
      ========================= */}

      <div
        style={{
          marginBottom:
            "20px",

          color:
            "#777",

          fontSize:
            "14px",
        }}
      >
        Showing{" "}
        {
          filteredMedia.length
        }{" "}
        images
      </div>

      {/* =========================
          MEDIA GRID
      ========================= */}

      <MediaGrid
        mediaItems={
          filteredMedia
        }
        folders={
          folders
        }
        onDelete={
          handleDelete
        }
        onMove={
          handleMoveImage
        }
      />

    </div>
  );
}