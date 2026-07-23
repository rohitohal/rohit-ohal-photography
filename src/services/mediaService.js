import {
  supabase,
} from "../lib/supabase";


/* ==========================================
   TABLE NAMES
========================================== */

const MEDIA_TABLE =
  "media_items";

const FOLDERS_TABLE =
  "media_folders";


/* ==========================================
   NORMALIZE MEDIA ITEM

   Supabase:
   snake_case

   React Media Library:
   camelCase
========================================== */

function normalizeMediaItem(
  item
) {

  if (!item) {
    return null;
  }


  const folder =
    item.folder ||
    "Uncategorized";


  return {

    id:
      item.id,

    publicId:
      item.public_id ||
      "",

    url:
      item.url ||
      "",

    filename:
      item.filename ||
      "",

    format:
      item.format ||
      "",

    width:
      item.width ??
      null,

    height:
      item.height ??
      null,

    bytes:
      item.bytes ??
      null,

    folder,

    /*
     * Keep category for compatibility
     * with the existing Media Library.
     */

    category:
      folder,

    createdAt:
      item.cloudinary_created_at ||
      item.created_at ||
      null,

    updatedAt:
      item.updated_at ||
      null,

  };

}


/* ==========================================
   PREPARE MEDIA ITEM

   React Media Library:
   camelCase

   Supabase:
   snake_case
========================================== */

function prepareMediaItem(
  item
) {

  if (!item) {
    return null;
  }


  const publicId =
    item.publicId ||
    item.public_id ||
    null;


  const url =
    item.url ||
    item.secure_url ||
    null;


  const folder =
    item.folder ||
    item.category ||
    "Uncategorized";


  return {

    public_id:
      publicId,

    url,

    filename:
      item.filename ||
      item.original_filename ||
      null,

    format:
      item.format ||
      null,

    width:
      item.width !==
        undefined &&
      item.width !==
        null
        ? Number(
            item.width
          )
        : null,

    height:
      item.height !==
        undefined &&
      item.height !==
        null
        ? Number(
            item.height
          )
        : null,

    bytes:
      item.bytes !==
        undefined &&
      item.bytes !==
        null
        ? Number(
            item.bytes
          )
        : null,

    folder,

    cloudinary_created_at:
      item.createdAt ||
      item.created_at ||
      null,

  };

}


/* ==========================================
   GET ALL MEDIA
========================================== */

export async function getAllMedia() {

  const {
    data,
    error,
  } =
    await supabase
      .from(
        MEDIA_TABLE
      )
      .select(
        "*"
      )
      .order(
        "created_at",
        {
          ascending:
            false,
        }
      );


  if (error) {

    console.error(
      "Failed to load media:",
      error
    );

    throw error;

  }


  return (
    data ||
    []
  )
    .map(
      normalizeMediaItem
    )
    .filter(
      Boolean
    );

}


/* ==========================================
   GET MEDIA COUNT
========================================== */

export async function getMediaCount() {

  const {
    count,
    error,
  } =
    await supabase
      .from(
        MEDIA_TABLE
      )
      .select(
        "*",
        {
          count:
            "exact",

          head:
            true,
        }
      );


  if (error) {

    console.error(
      "Failed to count media:",
      error
    );

    throw error;

  }


  return (
    count ||
    0
  );

}


/* ==========================================
   SAVE SINGLE MEDIA ITEM
========================================== */

export async function saveMediaItem(
  mediaItem
) {

  const prepared =
    prepareMediaItem(
      mediaItem
    );


  if (
    !prepared ||
    !prepared.public_id ||
    !prepared.url
  ) {

    throw new Error(
      "Media public ID and URL are required."
    );

  }


  const {
    data,
    error,
  } =
    await supabase
      .from(
        MEDIA_TABLE
      )
      .upsert(
        prepared,
        {
          onConflict:
            "public_id",
        }
      )
      .select(
        "*"
      )
      .single();


  if (error) {

    console.error(
      "Failed to save media:",
      error
    );

    throw error;

  }


  return normalizeMediaItem(
    data
  );

}


/* ==========================================
   SAVE MULTIPLE MEDIA ITEMS

   Used for:
   - bulk operations
   - one-time localStorage migration
========================================== */

export async function saveMediaItems(
  mediaItems = []
) {

  if (
    !Array.isArray(
      mediaItems
    )
  ) {

    throw new Error(
      "Media items must be an array."
    );

  }


  const prepared =
    mediaItems
      .map(
        prepareMediaItem
      )
      .filter(
        (
          item
        ) =>
          item &&
          item.public_id &&
          item.url
      );


  if (
    prepared.length ===
      0
  ) {

    return [];

  }


  /*
   * Remove duplicate Cloudinary
   * public IDs before upserting.
   */

  const uniqueItems =
    Array.from(
      new Map(
        prepared.map(
          (
            item
          ) => [
            item.public_id,
            item,
          ]
        )
      ).values()
    );


  const {
    data,
    error,
  } =
    await supabase
      .from(
        MEDIA_TABLE
      )
      .upsert(
        uniqueItems,
        {
          onConflict:
            "public_id",
        }
      )
      .select(
        "*"
      );


  if (error) {

    console.error(
      "Failed to save media items:",
      error
    );

    throw error;

  }


  return (
    data ||
    []
  )
    .map(
      normalizeMediaItem
    )
    .filter(
      Boolean
    );

}


/* ==========================================
   MOVE MEDIA ITEM
========================================== */

export async function moveMediaItem(
  id,
  folder
) {

  if (!id) {

    throw new Error(
      "Media ID is required."
    );

  }


  const destinationFolder =
    folder?.trim() ||
    "Uncategorized";


  const {
    data,
    error,
  } =
    await supabase
      .from(
        MEDIA_TABLE
      )
      .update({
        folder:
          destinationFolder,
      })
      .eq(
        "id",
        id
      )
      .select(
        "*"
      )
      .single();


  if (error) {

    console.error(
      "Failed to move media:",
      error
    );

    throw error;

  }


  return normalizeMediaItem(
    data
  );

}


/* ==========================================
   DELETE MEDIA RECORD

   IMPORTANT:
   This removes only the Supabase
   Media Library record.

   It DOES NOT delete the actual
   image from Cloudinary.
========================================== */

export async function deleteMediaItem(
  id
) {

  if (!id) {

    throw new Error(
      "Media ID is required."
    );

  }


  const {
    error,
  } =
    await supabase
      .from(
        MEDIA_TABLE
      )
      .delete()
      .eq(
        "id",
        id
      );


  if (error) {

    console.error(
      "Failed to delete media:",
      error
    );

    throw error;

  }


  return true;

}


/* ==========================================
   GET MEDIA FOLDERS
========================================== */

export async function getMediaFolders() {

  const {
    data,
    error,
  } =
    await supabase
      .from(
        FOLDERS_TABLE
      )
      .select(
        "*"
      )
      .order(
        "name",
        {
          ascending:
            true,
        }
      );


  if (error) {

    console.error(
      "Failed to load media folders:",
      error
    );

    throw error;

  }


  return (
    data ||
    []
  )
    .map(
      (
        folder
      ) =>
        folder.name
    )
    .filter(
      Boolean
    );

}


/* ==========================================
   CREATE MEDIA FOLDER
========================================== */

export async function createMediaFolder(
  name
) {

  const cleanName =
    name?.trim();


  if (!cleanName) {

    throw new Error(
      "Folder name is required."
    );

  }


  const {
    data,
    error,
  } =
    await supabase
      .from(
        FOLDERS_TABLE
      )
      .insert({
        name:
          cleanName,
      })
      .select(
        "*"
      )
      .single();


  if (error) {

    console.error(
      "Failed to create media folder:",
      error
    );

    throw error;

  }


  return data.name;

}


/* ==========================================
   SAVE MULTIPLE MEDIA FOLDERS

   Used for the one-time migration
   from localStorage.
========================================== */

export async function saveMediaFolders(
  folders = []
) {

  if (
    !Array.isArray(
      folders
    )
  ) {

    throw new Error(
      "Folders must be an array."
    );

  }


  const prepared =
    folders
      .map(
        (
          folder
        ) => {

          const name =
            typeof folder ===
              "string"
              ? folder.trim()
              : folder?.name?.trim();


          if (!name) {
            return null;
          }


          return {
            name,
          };

        }
      )
      .filter(
        Boolean
      );


  if (
    prepared.length ===
      0
  ) {

    return [];

  }


  /*
   * Remove duplicate folder names.
   *
   * Comparison is case-insensitive
   * here to avoid sending obvious
   * duplicates during migration.
   */

  const uniqueFolders =
    Array.from(
      new Map(
        prepared.map(
          (
            folder
          ) => [
            folder.name
              .toLowerCase(),

            folder,
          ]
        )
      ).values()
    );


  const {
    data,
    error,
  } =
    await supabase
      .from(
        FOLDERS_TABLE
      )
      .upsert(
        uniqueFolders,
        {
          onConflict:
            "name",
        }
      )
      .select(
        "*"
      );


  if (error) {

    console.error(
      "Failed to save media folders:",
      error
    );

    throw error;

  }


  return (
    data ||
    []
  )
    .map(
      (
        folder
      ) =>
        folder.name
    )
    .filter(
      Boolean
    );

}


/* ==========================================
   RENAME MEDIA FOLDER

   Updates:
   1. media_folders
   2. media_items assigned to it
========================================== */

export async function renameMediaFolder(
  oldName,
  newName
) {

  const cleanOldName =
    oldName?.trim();

  const cleanNewName =
    newName?.trim();


  if (
    !cleanOldName ||
    !cleanNewName
  ) {

    throw new Error(
      "Old and new folder names are required."
    );

  }


  if (
    cleanOldName ===
    cleanNewName
  ) {

    return cleanNewName;

  }


  /*
   * Rename folder record.
   */

  const {
    error:
      folderError,
  } =
    await supabase
      .from(
        FOLDERS_TABLE
      )
      .update({
        name:
          cleanNewName,
      })
      .eq(
        "name",
        cleanOldName
      );


  if (folderError) {

    console.error(
      "Failed to rename media folder:",
      folderError
    );

    throw folderError;

  }


  /*
   * Update every media item
   * currently assigned to it.
   */

  const {
    error:
      mediaError,
  } =
    await supabase
      .from(
        MEDIA_TABLE
      )
      .update({
        folder:
          cleanNewName,
      })
      .eq(
        "folder",
        cleanOldName
      );


  if (mediaError) {

    console.error(
      "Failed to update media folder assignments:",
      mediaError
    );

    throw mediaError;

  }


  return cleanNewName;

}


/* ==========================================
   DELETE MEDIA FOLDER

   Images are NOT deleted.

   Any media assigned to the folder
   is first moved to Uncategorized.
========================================== */

export async function deleteMediaFolder(
  name
) {

  const cleanName =
    name?.trim();


  if (!cleanName) {

    throw new Error(
      "Folder name is required."
    );

  }


  /*
   * Move existing media out
   * of the folder first.
   */

  const {
    error:
      mediaError,
  } =
    await supabase
      .from(
        MEDIA_TABLE
      )
      .update({
        folder:
          "Uncategorized",
      })
      .eq(
        "folder",
        cleanName
      );


  if (mediaError) {

    console.error(
      "Failed to move media from deleted folder:",
      mediaError
    );

    throw mediaError;

  }


  /*
   * Delete folder record.
   */

  const {
    error:
      folderError,
  } =
    await supabase
      .from(
        FOLDERS_TABLE
      )
      .delete()
      .eq(
        "name",
        cleanName
      );


  if (folderError) {

    console.error(
      "Failed to delete media folder:",
      folderError
    );

    throw folderError;

  }


  return true;

}