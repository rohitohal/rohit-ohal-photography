import {
  useEffect,
  useMemo,
  useState,
} from "react";

import MediaGrid from "../components/MediaGrid/MediaGrid";

import {
  getAllMedia,
  getMediaFolders,
  saveMediaItem,
  createMediaFolder,
  renameMediaFolder,
  deleteMediaFolder,
  moveMediaItem,
  deleteMediaItem,
} from "../../services/mediaService";

import "../styles/media-library.css";
import "../styles/media-grid.css";


export default function MediaLibrary() {

  /* =========================
     MEDIA
  ========================= */

  const [
    mediaItems,
    setMediaItems,
  ] =
    useState([]);


  /* =========================
     FOLDERS
  ========================= */

  const [
    folders,
    setFolders,
  ] =
    useState([]);


  /* =========================
     ACTIVE FOLDER
  ========================= */

  const [
    activeFolder,
    setActiveFolder,
  ] =
    useState(
      "all"
    );


  /* =========================
     SEARCH
  ========================= */

  const [
    searchQuery,
    setSearchQuery,
  ] =
    useState(
      ""
    );


  /* =========================
     SORT
  ========================= */

  const [
    sortOrder,
    setSortOrder,
  ] =
    useState(
      "newest"
    );


  /* =========================
     LOADING
  ========================= */

  const [
    loading,
    setLoading,
  ] =
    useState(true);


  /* =========================
     ERROR
  ========================= */

  const [
    loadError,
    setLoadError,
  ] =
    useState("");


  /* =========================
     ACTION STATE

     Prevents conflicting
     database operations.
  ========================= */

  const [
    processing,
    setProcessing,
  ] =
    useState(false);


  /* =========================
     LOAD MEDIA LIBRARY
     FROM SUPABASE
  ========================= */

  useEffect(() => {

    let mounted =
      true;


    async function loadMediaLibrary() {

      try {

        setLoading(
          true
        );

        setLoadError(
          ""
        );


        const [
          loadedMedia,
          loadedFolders,
        ] =
          await Promise.all([
            getAllMedia(),
            getMediaFolders(),
          ]);


        if (!mounted) {
          return;
        }


        setMediaItems(
          loadedMedia
        );


        setFolders(
          loadedFolders
        );


      } catch (error) {

        console.error(
          "Failed to load Media Library:",
          error
        );


        if (mounted) {

          setLoadError(
            "Unable to load the Media Library from Supabase."
          );

        }


      } finally {

        if (mounted) {

          setLoading(
            false
          );

        }

      }

    }


    loadMediaLibrary();


    return () => {

      mounted =
        false;

    };

  }, []);


  /* =========================
     CREATE FOLDER
  ========================= */

  const handleCreateFolder =
    async () => {

      if (processing) {
        return;
      }


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
          (
            folder
          ) =>
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


      try {

        setProcessing(
          true
        );


        const createdFolder =
          await createMediaFolder(
            cleanName
          );


        setFolders(
          (
            prev
          ) => [
            ...prev,
            createdFolder,
          ]
        );


        setActiveFolder(
          createdFolder
        );


        setSearchQuery(
          ""
        );


      } catch (error) {

        console.error(
          "Failed to create folder:",
          error
        );


        alert(
          `Unable to create folder.

${
            error?.message ||
            "Unknown error"
          }`
        );


      } finally {

        setProcessing(
          false
        );

      }

    };


  /* =========================
     OPEN FOLDER
  ========================= */

  const handleFolderChange =
    (
      folder
    ) => {

      setActiveFolder(
        folder
      );


      setSearchQuery(
        ""
      );

    };


  /* =========================
     RENAME FOLDER
  ========================= */

  const handleRenameFolder =
    async (
      oldFolderName
    ) => {

      if (
        processing ||
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
          (
            folder
          ) =>
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


      try {

        setProcessing(
          true
        );


        const renamedFolder =
          await renameMediaFolder(
            oldFolderName,
            cleanName
          );


        /*
         * Supabase succeeded.
         * Now update React state.
         */

        setFolders(
          (
            prev
          ) =>
            prev.map(
              (
                folder
              ) =>
                folder ===
                oldFolderName
                  ? renamedFolder
                  : folder
            )
        );


        setMediaItems(
          (
            prev
          ) =>
            prev.map(
              (
                item
              ) => {

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
                    renamedFolder,

                  category:
                    renamedFolder,

                };

              }
            )
        );


        if (
          activeFolder ===
          oldFolderName
        ) {

          setActiveFolder(
            renamedFolder
          );

        }


      } catch (error) {

        console.error(
          "Failed to rename folder:",
          error
        );


        alert(
          `Unable to rename folder.

${
            error?.message ||
            "Unknown error"
          }`
        );


      } finally {

        setProcessing(
          false
        );

      }

    };


  /* =========================
     DELETE FOLDER
  ========================= */

  const handleDeleteFolder =
    async (
      folderName
    ) => {

      if (
        processing ||
        !folderName ||
        folderName ===
          "Uncategorized"
      ) {

        return;

      }


      const imageCount =
        mediaItems.filter(
          (
            item
          ) => {

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


      try {

        setProcessing(
          true
        );


        await deleteMediaFolder(
          folderName
        );


        /*
         * Database succeeded.
         * Remove folder locally.
         */

        setFolders(
          (
            prev
          ) =>
            prev.filter(
              (
                folder
              ) =>
                folder !==
                folderName
            )
        );


        /*
         * mediaService moves
         * affected records to
         * Uncategorized.
         */

        setMediaItems(
          (
            prev
          ) =>
            prev.map(
              (
                item
              ) => {

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

              }
            )
        );


        if (
          activeFolder ===
          folderName
        ) {

          setActiveFolder(
            "all"
          );

        }


      } catch (error) {

        console.error(
          "Failed to delete folder:",
          error
        );


        alert(
          `Unable to delete folder.

${
            error?.message ||
            "Unknown error"
          }`
        );


      } finally {

        setProcessing(
          false
        );

      }

    };


  /* =========================
     CLOUDINARY UPLOAD
  ========================= */

  const openUploadWidget =
    () => {

      if (processing) {
        return;
      }


      if (
        !window.cloudinary
      ) {

        alert(
          "Cloudinary upload widget is not loaded."
        );

        return;

      }


      /*
       * Admin folder assignment.
       *
       * Cloudinary's actual asset
       * folder remains separate.
       */

      const uploadFolder =
        activeFolder ===
        "all"
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

              folder:
                "rohit-ohal-photography",

              sources: [
                "local",
                "url",
                "camera",
              ],

              resourceType:
                "image",

              clientAllowedFormats: [
                "jpg",
                "jpeg",
                "png",
                "webp",
              ],

              maxFiles:
                200,

            },
            async (
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
                !result ||
                result.event !==
                  "success"
              ) {

                return;

              }


              const info =
                result.info;


              const newMedia = {

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

                folder:
                  uploadFolder,

                category:
                  uploadFolder,

              };


              try {

                /*
                 * Cloudinary upload has
                 * completed.

                 * Now save its metadata
                 * to Supabase.
                 */

                const savedMedia =
                  await saveMediaItem(
                    newMedia
                  );


                setMediaItems(
                  (
                    prev
                  ) => {

                    const exists =
                      prev.some(
                        (
                          item
                        ) =>
                          item.publicId ===
                          savedMedia.publicId
                      );


                    if (exists) {

                      return prev.map(
                        (
                          item
                        ) =>
                          item.publicId ===
                          savedMedia.publicId
                            ? savedMedia
                            : item
                      );

                    }


                    return [
                      savedMedia,
                      ...prev,
                    ];

                  }
                );


              } catch (
                saveError
              ) {

                console.error(
                  "Cloudinary upload succeeded but Supabase metadata save failed:",
                  saveError
                );


                alert(
                  `The image uploaded to Cloudinary, but its Media Library record could not be saved to Supabase.

${
                    saveError?.message ||
                    "Unknown error"
                  }`
                );

              }

            }
          );


      widget.open();

    };


  /* =========================
     REMOVE IMAGE

     Removes only the Supabase
     Media Library record.

     Cloudinary image remains.
  ========================= */

  const handleDelete =
    async (
      imageId
    ) => {

      if (
        processing ||
        !imageId
      ) {

        if (!imageId) {

          alert(
            "Unable to remove this image because its ID is missing."
          );

        }


        return;

      }


      const confirmed =
        window.confirm(
          "Remove this image from the Media Library? The original image will remain in Cloudinary."
        );


      if (!confirmed) {
        return;
      }


      try {

        setProcessing(
          true
        );


        await deleteMediaItem(
          imageId
        );


        setMediaItems(
          (
            prev
          ) =>
            prev.filter(
              (
                item
              ) =>
                item.id !==
                imageId
            )
        );


      } catch (error) {

        console.error(
          "Failed to remove media:",
          error
        );


        alert(
          `Unable to remove image.

${
            error?.message ||
            "Unknown error"
          }`
        );


      } finally {

        setProcessing(
          false
        );

      }

    };


  /* =========================
     MOVE IMAGE
  ========================= */

  const handleMoveImage =
    async (
      imageId,
      destinationFolder
    ) => {

      if (
        processing ||
        !imageId ||
        !destinationFolder
      ) {

        return;

      }


      try {

        setProcessing(
          true
        );


        const updatedMedia =
          await moveMediaItem(
            imageId,
            destinationFolder
          );


        setMediaItems(
          (
            prev
          ) =>
            prev.map(
              (
                item
              ) =>
                item.id ===
                imageId
                  ? updatedMedia
                  : item
            )
        );


      } catch (error) {

        console.error(
          "Failed to move image:",
          error
        );


        alert(
          `Unable to move image.

${
            error?.message ||
            "Unknown error"
          }`
        );


      } finally {

        setProcessing(
          false
        );

      }

    };


  /* =========================
     FILTER + SEARCH + SORT
  ========================= */

  const filteredMedia =
    useMemo(
      () => {

        const query =
          searchQuery
            .trim()
            .toLowerCase();


        let items =
          mediaItems.filter(
            (
              item
            ) => {

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


        if (
          sortOrder ===
          "newest"
        ) {

          items.sort(
            (
              a,
              b
            ) =>
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
            (
              a,
              b
            ) =>
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
            (
              a,
              b
            ) =>
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
            (
              a,
              b
            ) =>
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

      },
      [
        mediaItems,
        activeFolder,
        searchQuery,
        sortOrder,
      ]
    );


  /* =========================
     FOLDER COUNT
  ========================= */

  const getFolderCount =
    (
      folder
    ) => {

      return mediaItems.filter(
        (
          item
        ) =>
          (
            item.folder ||
            item.category ||
            "Uncategorized"
          ) ===
          folder
      ).length;

    };


  /* =========================
     LOADING UI
  ========================= */

  if (loading) {

    return (

      <div className="media-library-page">

        <div className="media-library-header">

          <div>

            <span className="media-overline">
              MEDIA LIBRARY
            </span>

            <h1>
              Manage Your Images
            </h1>

            <p>
              Loading Media Library...
            </p>

          </div>

        </div>

      </div>

    );

  }


  /* =========================
     LOAD ERROR
  ========================= */

  if (loadError) {

    return (

      <div className="media-library-page">

        <div className="media-library-header">

          <div>

            <span className="media-overline">
              MEDIA LIBRARY
            </span>

            <h1>
              Manage Your Images
            </h1>

            <p>
              {loadError}
            </p>

          </div>

        </div>

      </div>

    );

  }


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

          <button
            type="button"
            className="media-button secondary"
            onClick={
              handleCreateFolder
            }
            disabled={
              processing
            }
          >
            + Create Folder
          </button>


          <button
            type="button"
            className="media-button primary"
            onClick={
              openUploadWidget
            }
            disabled={
              processing
            }
          >
            Upload Images
          </button>

        </div>

      </div>


      {/* =========================
          FOLDERS
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


        {folders.map(
          (
            folder
          ) => (

            <div
              key={
                folder
              }
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


              <button
                type="button"
                title="Rename Folder"
                disabled={
                  processing
                }
                onClick={(
                  event
                ) => {

                  event
                    .stopPropagation();


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


              <button
                type="button"
                title="Delete Folder"
                disabled={
                  processing
                }
                onClick={(
                  event
                ) => {

                  event
                    .stopPropagation();


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
              event.target.value
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
              event.target.value
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
          COUNT
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
          GRID
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