import {
  useEffect,
  useRef,
  useState,
} from "react";

import "../styles/settings.css";

import {
  supabase,
} from "../../lib/supabase";


/* ==========================================
   DEFAULT SETTINGS
========================================== */

const defaultSettings = {

  businessName:
    "Rohit Ohal Photography",

  email:
    "hello@rohitohal.com",

  phone:
    "+91 70209 98403",

  location:
    "Pune, Maharashtra, India",

  instagram:
    "",

  facebook:
    "",

  workingDays:
    "Monday – Sunday",

  workingHours:
    "10:00 AM – 8:00 PM",

};


/* ==========================================
   LOCAL STORAGE BACKUP KEYS

   Projects and Journal are now stored
   in Supabase and are intentionally
   excluded from this list.
========================================== */

const backupKeys = [

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


];


/* ==========================================
   SETTINGS
========================================== */

export default function Settings() {

  /* ========================================
     SETTINGS STATE
  ======================================== */

  const [
    settings,
    setSettings,
  ] =
    useState(
      defaultSettings
    );


  const [
    saved,
    setSaved,
  ] =
    useState(false);


  const [
    isSaving,
    setIsSaving,
  ] =
    useState(false);


  /* ========================================
     BACKUP STATE
  ======================================== */

  const [
    backupMessage,
    setBackupMessage,
  ] =
    useState({

      type:
        "",

      text:
        "",

    });


  const [
    isExporting,
    setIsExporting,
  ] =
    useState(false);


  const [
    isRestoring,
    setIsRestoring,
  ] =
    useState(false);


  const fileInputRef =
    useRef(null);


  /* ========================================
     LOAD SETTINGS
  ======================================== */

  useEffect(() => {

    let mounted =
      true;


    async function loadSettings() {

      try {

        const {
          data,
          error,
        } =
          await supabase
            .from(
              "site_settings"
            )
            .select(
              "setting_value"
            )
            .eq(
              "setting_key",
              "global"
            )
            .maybeSingle();


        if (
          error
        ) {

          throw error;

        }


        if (
          !mounted
        ) {

          return;

        }


        if (
          data?.setting_value
        ) {

          const loadedSettings = {

            ...defaultSettings,

            ...data.setting_value,

          };


          setSettings(
            loadedSettings
          );


          /*
           * Temporary local fallback.
           */

          localStorage.setItem(
            "rohit-photography-settings",
            JSON.stringify(
              loadedSettings
            )
          );


          return;

        }


      } catch (
        error
      ) {

        console.error(
          "Failed to load settings from Supabase:",
          error
        );


        /*
         * Temporary fallback:
         * load old local settings.
         */

        const savedSettings =
          localStorage.getItem(
            "rohit-photography-settings"
          );


        if (
          savedSettings &&
          mounted
        ) {

          try {

            setSettings({

              ...defaultSettings,

              ...JSON.parse(
                savedSettings
              ),

            });


          } catch (
            localError
          ) {

            console.error(
              "Failed to load local settings:",
              localError
            );

          }

        }

      }

    }


    loadSettings();


    return () => {

      mounted =
        false;

    };

  }, []);


  /* ========================================
     HANDLE CHANGE
  ======================================== */

  function handleChange(
    event
  ) {

    const {
      name,
      value,
    } =
      event.target;


    setSettings(
      (
        previous
      ) => ({

        ...previous,

        [name]:
          value,

      })
    );


    setSaved(
      false
    );

  }


  /* ========================================
     SAVE SETTINGS
  ======================================== */

  async function handleSave() {

    if (
      isSaving
    ) {

      return;

    }


    try {

      setIsSaving(
        true
      );


      const {
        error,
      } =
        await supabase
          .from(
            "site_settings"
          )
          .upsert(
            {

              setting_key:
                "global",

              setting_value:
                settings,

              updated_at:
                new Date()
                  .toISOString(),

            },
            {

              onConflict:
                "setting_key",

            }
          );


      if (
        error
      ) {

        throw error;

      }


      /*
       * Temporary local fallback.
       */

      localStorage.setItem(
        "rohit-photography-settings",
        JSON.stringify(
          settings
        )
      );


      setSaved(
        true
      );


      setTimeout(
        () => {

          setSaved(
            false
          );

        },
        3000
      );


    } catch (
      error
    ) {

      console.error(
        "Failed to save settings to Supabase:",
        error
      );


      setSaved(
        false
      );


    } finally {

      setIsSaving(
        false
      );

    }

  }


  /* ========================================
     LOAD LOCAL STORAGE BACKUP
  ======================================== */

  function getLocalBackupData() {

    const localData = {};


    backupKeys.forEach(
      (
        key
      ) => {

        const value =
          localStorage.getItem(
            key
          );


        if (
          value ===
          null
        ) {

          return;

        }


        try {

          localData[key] =
            JSON.parse(
              value
            );


        } catch {

          localData[key] =
            value;

        }

      }
    );


    return localData;

  }


  /* ========================================
     EXPORT BACKUP
  ======================================== */

  async function handleExportBackup() {

    if (
      isExporting
    ) {

      return;

    }


    try {

      setIsExporting(
        true
      );


      setBackupMessage({

        type:
          "",

        text:
          "",

      });


      /* ====================================
         PROJECTS
      ==================================== */

      const {
        data:
          projects,

        error:
          projectsError,
      } =
        await supabase
          .from(
            "projects"
          )
          .select(
            "*"
          )
          .order(
            "created_at",
            {
              ascending:
                true,
            }
          );


      if (
        projectsError
      ) {

        throw projectsError;

      }


      /* ====================================
         JOURNAL
      ==================================== */

      const {
        data:
          journalPosts,

        error:
          journalError,
      } =
        await supabase
          .from(
            "journal_posts"
          )
          .select(
            "*"
          )
          .order(
            "created_at",
            {
              ascending:
                true,
            }
          );


      if (
        journalError
      ) {

        throw journalError;

      }


      /* ====================================
         SITE SETTINGS
      ==================================== */

      const {
        data:
          siteSettings,

        error:
          settingsError,
      } =
        await supabase
          .from(
            "site_settings"
          )
          .select(
            "*"
          );


      if (
        settingsError
      ) {

        throw settingsError;

      }


      /* ====================================
         MEDIA ITEMS

         These are Supabase metadata records.
         Actual image files remain in Cloudinary.
      ==================================== */

      const {
        data:
          mediaItems,

        error:
          mediaItemsError,
      } =
        await supabase
          .from(
            "media_items"
          )
          .select(
            "*"
          )
          .order(
            "created_at",
            {
              ascending:
                true,
            }
          );


      if (
        mediaItemsError
      ) {

        throw mediaItemsError;

      }


      /* ====================================
         MEDIA FOLDERS
      ==================================== */

      const {
        data:
          mediaFolders,

        error:
          mediaFoldersError,
      } =
        await supabase
          .from(
            "media_folders"
          )
          .select(
            "*"
          )
          .order(
            "created_at",
            {
              ascending:
                true,
            }
          );


      if (
        mediaFoldersError
      ) {

        throw mediaFoldersError;

      }


      /* ====================================
         LOCAL CMS DATA
      ==================================== */

      const localData =
        getLocalBackupData();


      /* ====================================
         BUILD BACKUP
      ==================================== */

      const backup = {

        version:
          3,

        website:
          "Rohit Ohal Photography",

        createdAt:
          new Date()
            .toISOString(),

        storage: {

          supabase: {

            projects:
              projects || [],

            journalPosts:
              journalPosts || [],

            siteSettings:
              siteSettings || [],

            mediaItems:
              mediaItems || [],

            mediaFolders:
              mediaFolders || [],

          },

          localStorage:
            localData,

        },

      };


      const json =
        JSON.stringify(
          backup,
          null,
          2
        );


      const blob =
        new Blob(
          [
            json,
          ],
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
          .split(
            "T"
          )[0];


      link.href =
        url;


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

        type:
          "success",

        text:
          "Website backup downloaded successfully. Projects, Journal, Site Settings and Media Library metadata were included from Supabase. Cloudinary image files were not copied.",

      });


    } catch (
      error
    ) {

      console.error(
        "Backup export failed:",
        error
      );


      setBackupMessage({

        type:
          "error",

        text:
          "Unable to create the complete website backup. Please try again.",

      });


    } finally {

      setIsExporting(
        false
      );

    }

  }


  /* ========================================
     OPEN RESTORE FILE PICKER
  ======================================== */

  function handleRestoreClick() {

    if (
      isRestoring
    ) {

      return;

    }


    fileInputRef.current
      ?.click();

  }


  /* ========================================
     VALIDATE BACKUP ROWS
  ======================================== */

  function validateRows(
    rows,
    label
  ) {

    if (
      !Array.isArray(
        rows
      )
    ) {

      throw new Error(
        `${label} backup data is invalid.`
      );

    }


    rows.forEach(
      (
        row,
        index
      ) => {

        if (
          !row ||
          typeof row !==
            "object" ||
          Array.isArray(
            row
          )
        ) {

          throw new Error(
            `${label} backup contains an invalid record at position ${index + 1}.`
          );

        }

      }
    );

  }


  /* ========================================
     VALIDATE SUPABASE BACKUP

     Validation happens BEFORE any write
     is made to Supabase.
  ======================================== */

  function validateSupabaseBackup(
    backup
  ) {

    if (
      !backup ||
      typeof backup !==
        "object"
    ) {

      throw new Error(
        "Invalid backup file."
      );

    }


    if (
      backup.version !==
      2 &&
      backup.version !==
      3
    ) {

      throw new Error(
        "Unsupported backup version."
      );

    }


    if (
      !backup.storage ||
      typeof backup.storage !==
        "object"
    ) {

      throw new Error(
        "Backup storage data is missing."
      );

    }


    const supabaseBackup =
      backup.storage.supabase;


    if (
      !supabaseBackup ||
      typeof supabaseBackup !==
        "object"
    ) {

      throw new Error(
        "Supabase backup data is missing."
      );

    }


    validateRows(
      supabaseBackup.projects,
      "Projects"
    );


    validateRows(
      supabaseBackup.journalPosts,
      "Journal"
    );


    validateRows(
      supabaseBackup.siteSettings,
      "Site Settings"
    );


    /*
     * Version 3 adds Supabase Media Library
     * metadata. Version 2 remains supported
     * for older backup files.
     */

    if (
      backup.version ===
      3
    ) {

      validateRows(
        supabaseBackup.mediaItems,
        "Media Items"
      );


      validateRows(
        supabaseBackup.mediaFolders,
        "Media Folders"
      );


      supabaseBackup.mediaItems.forEach(
        (
          item,
          index
        ) => {

          if (
            !item.public_id
          ) {

            throw new Error(
              `Media item ${index + 1} is missing its public_id.`
            );

          }

        }
      );


      supabaseBackup.mediaFolders.forEach(
        (
          folder,
          index
        ) => {

          if (
            !folder.name
          ) {

            throw new Error(
              `Media folder ${index + 1} is missing its name.`
            );

          }

        }
      );

    }


    /*
     * Validate project IDs.
     */

    supabaseBackup.projects.forEach(
      (
        project,
        index
      ) => {

        if (
          !project.id
        ) {

          throw new Error(
            `Project ${index + 1} is missing its ID.`
          );

        }

      }
    );


    /*
     * Validate Journal IDs.
     */

    supabaseBackup.journalPosts.forEach(
      (
        post,
        index
      ) => {

        if (
          !post.id
        ) {

          throw new Error(
            `Journal post ${index + 1} is missing its ID.`
          );

        }

      }
    );


    /*
     * Validate site setting keys.
     */

    supabaseBackup.siteSettings.forEach(
      (
        row,
        index
      ) => {

        if (
          !row.setting_key
        ) {

          throw new Error(
            `Site setting ${index + 1} is missing its setting_key.`
          );

        }

      }
    );


    return supabaseBackup;

  }


  /* ========================================
     RESTORE LOCAL STORAGE
  ======================================== */

  function restoreLocalStorage(
    localData
  ) {

    if (
      !localData ||
      typeof localData !==
        "object"
    ) {

      return;

    }


    backupKeys.forEach(
      (
        key
      ) => {

        if (
          Object.prototype
            .hasOwnProperty
            .call(
              localData,
              key
            )
        ) {

          localStorage.setItem(
            key,
            JSON.stringify(
              localData[
                key
              ]
            )
          );

        }

      }
    );

  }


  /* ========================================
     SAFE SUPABASE UPSERT

     IMPORTANT:

     Existing records with matching IDs
     are updated.

     Missing records are inserted.

     Records that exist in Supabase but
     are not in the backup are NOT deleted.
  ======================================== */

  async function safeUpsertTable(
    tableName,
    rows,
    conflictColumn =
      "id"
  ) {

    validateRows(
      rows,
      tableName
    );


    if (
      rows.length ===
      0
    ) {

      return [];

    }


    const {
      data,
      error,
    } =
      await supabase
        .from(
          tableName
        )
        .upsert(
          rows,
          {
            onConflict:
              conflictColumn,
          }
        )
        .select();


    if (
      error
    ) {

      throw new Error(
        `Failed to restore ${tableName}: ${error.message}`
      );

    }


    return data || [];

  }


  /* ========================================
     VERIFY RESTORED IDs
  ======================================== */

  async function verifyRestoredIds(
    tableName,
    backupRows
  ) {

    if (
      backupRows.length ===
      0
    ) {

      return true;

    }


    const ids =
      backupRows
        .map(
          (
            row
          ) =>
            row.id
        )
        .filter(
          Boolean
        );


    if (
      ids.length ===
      0
    ) {

      return true;

    }


    const {
      data,
      error,
    } =
      await supabase
        .from(
          tableName
        )
        .select(
          "id"
        )
        .in(
          "id",
          ids
        );


    if (
      error
    ) {

      throw new Error(
        `Unable to verify restored ${tableName}: ${error.message}`
      );

    }


    const restoredIds =
      new Set(
        (
          data || []
        ).map(
          (
            row
          ) =>
            row.id
        )
      );


    const missingIds =
      ids.filter(
        (
          id
        ) =>
          !restoredIds.has(
            id
          )
      );


    if (
      missingIds.length >
      0
    ) {

      throw new Error(
        `${tableName} restore verification failed. ${missingIds.length} record(s) could not be verified.`
      );

    }


    return true;

  }


  /* ========================================
     VERIFY RESTORED UNIQUE VALUES
  ======================================== */

  async function verifyRestoredValues(
    tableName,
    backupRows,
    columnName
  ) {

    if (
      backupRows.length ===
      0
    ) {

      return true;

    }


    const values =
      backupRows
        .map(
          (
            row
          ) =>
            row[columnName]
        )
        .filter(
          Boolean
        );


    if (
      values.length ===
      0
    ) {

      return true;

    }


    const {
      data,
      error,
    } =
      await supabase
        .from(
          tableName
        )
        .select(
          columnName
        )
        .in(
          columnName,
          values
        );


    if (
      error
    ) {

      throw new Error(
        `Unable to verify restored ${tableName}: ${error.message}`
      );

    }


    const restoredValues =
      new Set(
        (
          data || []
        ).map(
          (
            row
          ) =>
            row[columnName]
        )
      );


    const missingValues =
      values.filter(
        (
          value
        ) =>
          !restoredValues.has(
            value
          )
      );


    if (
      missingValues.length >
      0
    ) {

      throw new Error(
        `${tableName} restore verification failed. ${missingValues.length} record(s) could not be verified.`
      );

    }


    return true;

  }


  /* ========================================
     RESTORE SITE SETTINGS
  ======================================== */

  async function restoreSiteSettings(
    rows
  ) {

    validateRows(
      rows,
      "Site Settings"
    );


    if (
      rows.length ===
      0
    ) {

      return;

    }


    const {
      error,
    } =
      await supabase
        .from(
          "site_settings"
        )
        .upsert(
          rows,
          {
            onConflict:
              "setting_key",
          }
        );


    if (
      error
    ) {

      throw new Error(
        `Failed to restore Site Settings: ${error.message}`
      );

    }

  }


  /* ========================================
     VERIFY SITE SETTINGS
  ======================================== */

  async function verifySiteSettings(
    rows
  ) {

    if (
      rows.length ===
      0
    ) {

      return true;

    }


    const keys =
      rows
        .map(
          (
            row
          ) =>
            row.setting_key
        )
        .filter(
          Boolean
        );


    const {
      data,
      error,
    } =
      await supabase
        .from(
          "site_settings"
        )
        .select(
          "setting_key"
        )
        .in(
          "setting_key",
          keys
        );


    if (
      error
    ) {

      throw new Error(
        `Unable to verify Site Settings: ${error.message}`
      );

    }


    const restoredKeys =
      new Set(
        (
          data || []
        ).map(
          (
            row
          ) =>
            row.setting_key
        )
      );


    const missingKeys =
      keys.filter(
        (
          key
        ) =>
          !restoredKeys.has(
            key
          )
      );


    if (
      missingKeys.length >
      0
    ) {

      throw new Error(
        `Site Settings restore verification failed. ${missingKeys.length} setting(s) could not be verified.`
      );

    }


    return true;

  }


  /* ========================================
     RESTORE SUPABASE BACKUP

     SAFE RESTORE ORDER:

     1. Validate everything
     2. Upsert Projects
     3. Verify Projects
     4. Upsert Journal
     5. Verify Journal
     6. Upsert Site Settings
     7. Verify Site Settings
     8. Upsert + verify Media Folders (v3)
     9. Upsert + verify Media Items (v3)
     10. Restore localStorage

     No database rows are deleted.
  ======================================== */

  async function restoreSupabaseBackup(
    backup
  ) {

    const supabaseBackup =
      validateSupabaseBackup(
        backup
      );


    const projects =
      supabaseBackup.projects;


    const journalPosts =
      supabaseBackup.journalPosts;


    const siteSettings =
      supabaseBackup.siteSettings;


    const mediaItems =
      backup.version ===
        3
        ? supabaseBackup.mediaItems
        : [];


    const mediaFolders =
      backup.version ===
        3
        ? supabaseBackup.mediaFolders
        : [];


    /* ====================================
       PROJECTS
    ==================================== */

    await safeUpsertTable(
      "projects",
      projects,
      "id"
    );


    await verifyRestoredIds(
      "projects",
      projects
    );


    /* ====================================
       JOURNAL
    ==================================== */

    await safeUpsertTable(
      "journal_posts",
      journalPosts,
      "id"
    );


    await verifyRestoredIds(
      "journal_posts",
      journalPosts
    );


    /* ====================================
       SITE SETTINGS
    ==================================== */

    await restoreSiteSettings(
      siteSettings
    );


    await verifySiteSettings(
      siteSettings
    );


    /* ====================================
       MEDIA FOLDERS

       Restore folders before media items so
       folder references are available first.
    ==================================== */

    if (
      backup.version ===
      3
    ) {

      await safeUpsertTable(
        "media_folders",
        mediaFolders,
        "name"
      );


      await verifyRestoredValues(
        "media_folders",
        mediaFolders,
        "name"
      );


      /* ==================================
         MEDIA ITEMS

         Only metadata + Cloudinary URLs
         are restored. No Cloudinary image
         files are copied or deleted.
      ================================== */

      await safeUpsertTable(
        "media_items",
        mediaItems,
        "public_id"
      );


      await verifyRestoredValues(
        "media_items",
        mediaItems,
        "public_id"
      );

    }


    /* ====================================
       LOCAL CMS

       Only restore after Supabase
       restoration + verification succeeds.
    ==================================== */

    restoreLocalStorage(
      backup.storage
        .localStorage
    );

  }


  /* ========================================
     RESTORE LEGACY VERSION 1 BACKUP

     Old backups only contained localStorage.

     Legacy backups DO NOT overwrite
     Supabase Projects or Journal.
  ======================================== */

  function restoreVersion1(
    backup
  ) {

    if (
      !backup.data ||
      typeof backup.data !==
        "object"
    ) {

      throw new Error(
        "Invalid legacy backup."
      );

    }


    restoreLocalStorage(
      backup.data
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

  }


  /* ========================================
     RESTORE BACKUP
  ======================================== */

  function handleRestoreBackup(
    event
  ) {

    const file =
      event.target
        .files?.[0];


    if (
      !file
    ) {

      return;

    }


    const reader =
      new FileReader();


    reader.onload =
      async (
        readerEvent
      ) => {

        try {

          const backup =
            JSON.parse(
              readerEvent
                .target
                .result
            );


          if (
            !backup ||
            typeof backup !==
              "object"
          ) {

            throw new Error(
              "Invalid backup file."
            );

          }


          /*
           * Validate Supabase backup BEFORE
           * asking for confirmation.
           */

          if (
            backup.version ===
              2 ||
            backup.version ===
              3
          ) {

            validateSupabaseBackup(
              backup
            );

          }


          const confirmed =
            window.confirm(
              "Restore this website backup? Existing matching Projects, Journal posts, Site Settings and Media Library metadata will be updated from the backup. Current records that are not contained in the backup will NOT be deleted. Cloudinary image files will not be modified."
            );


          if (
            !confirmed
          ) {

            event.target.value =
              "";

            return;

          }


          setIsRestoring(
            true
          );


          setBackupMessage({

            type:
              "",

            text:
              "",

          });


          if (
            backup.version ===
              2 ||
            backup.version ===
              3
          ) {

            await restoreSupabaseBackup(
              backup
            );


          } else {

            restoreVersion1(
              backup
            );

          }


          /*
           * Reload global settings from
           * restored Supabase data.
           */

          const {
            data:
              restoredGlobal,

            error:
              restoredGlobalError,
          } =
            await supabase
              .from(
                "site_settings"
              )
              .select(
                "setting_value"
              )
              .eq(
                "setting_key",
                "global"
              )
              .maybeSingle();


          if (
            restoredGlobalError
          ) {

            console.error(
              "Unable to reload restored global settings:",
              restoredGlobalError
            );

          }


          if (
            restoredGlobal
              ?.setting_value
          ) {

            const loadedSettings = {

              ...defaultSettings,

              ...restoredGlobal
                .setting_value,

            };


            setSettings(
              loadedSettings
            );


            localStorage.setItem(
              "rohit-photography-settings",
              JSON.stringify(
                loadedSettings
              )
            );

          }


          setBackupMessage({

            type:
              "success",

            text:
              "Backup restored and verified successfully. Refreshing website...",

          });


          setTimeout(
            () => {

              window.location
                .reload();

            },
            1200
          );


        } catch (
          error
        ) {

          console.error(
            "Backup restore failed:",
            error
          );


          setBackupMessage({

            type:
              "error",

            text:
              error?.message ||
              "Unable to restore this backup.",

          });


        } finally {

          setIsRestoring(
            false
          );


          event.target.value =
            "";

        }

      };


    reader.onerror =
      () => {

        setBackupMessage({

          type:
            "error",

          text:
            "Unable to read the backup file.",

        });


        event.target.value =
          "";

      };


    reader.readAsText(
      file
    );

  }


  /* ========================================
     RENDER
  ======================================== */

  return (

    <div className="settings-page">


      {/* =====================================
          HEADER
      ===================================== */}

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
          onClick={
            handleSave
          }
          disabled={
            isSaving
          }
        >

          {
            isSaving
              ? "Saving..."
              : "Save Changes"
          }

        </button>

      </div>


      {/* =====================================
          SUCCESS MESSAGE
      ===================================== */}

      {saved && (

        <div className="settings-success-message">

          Settings saved successfully.

        </div>

      )}


      <div className="settings-content">


        {/* ===================================
            BUSINESS INFORMATION
        =================================== */}

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


        {/* ===================================
            SOCIAL MEDIA
        =================================== */}

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


        {/* ===================================
            WORKING HOURS
        =================================== */}

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


        {/* ===================================
            BACKUP & RESTORE
        =================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <span className="settings-section-label">

              DATA MANAGEMENT

            </span>


            <h2>
              Backup & Restore
            </h2>


            <p>
              Download a complete backup
              of your CMS data or restore
              your website from a previous
              backup.
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


            {/* EXPORT */}

            <div className="settings-backup-item">

              <div>

                <h3>
                  Export Website Data
                </h3>


                <p>
                  Download projects,
                  journal posts, website
                  settings, homepage data,
                  SEO and Media Library
                  metadata as a JSON backup.
                  Cloudinary image files are
                  not copied.
                </p>

              </div>


              <button
                type="button"
                className="settings-backup-button"
                onClick={
                  handleExportBackup
                }
                disabled={
                  isExporting ||
                  isRestoring
                }
              >

                {
                  isExporting
                    ? "Creating Backup..."
                    : "Export Backup"
                }

              </button>

            </div>


            {/* RESTORE */}

            <div className="settings-backup-item">

              <div>

                <h3>
                  Restore Website Data
                </h3>


                <p>
                  Safely restore CMS and
                  Supabase data from a
                  previously exported
                  backup file.
                </p>

              </div>


              <button
                type="button"
                className="settings-restore-button"
                onClick={
                  handleRestoreClick
                }
                disabled={
                  isRestoring ||
                  isExporting
                }
              >

                {
                  isRestoring
                    ? "Restoring..."
                    : "Restore Backup"
                }

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