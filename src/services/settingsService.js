import { supabase } from "../lib/supabase";


/* ==========================================
   TABLE
========================================== */

const TABLE =
  "site_settings";


/* ==========================================
   GET SETTINGS
========================================== */

export async function getSettings(
  settingKey
) {

  if (!settingKey) {
    throw new Error(
      "Setting key is required."
    );
  }


  const {
    data,
    error,
  } =
    await supabase
      .from(TABLE)
      .select(
        "setting_value"
      )
      .eq(
        "setting_key",
        settingKey
      )
      .maybeSingle();


  if (error) {

    console.error(
      `Failed to load settings: ${settingKey}`,
      error
    );

    throw error;

  }


  return (
    data?.setting_value ||
    null
  );

}


/* ==========================================
   SAVE SETTINGS

   ADMIN ONLY
========================================== */

export async function saveSettings(
  settingKey,
  settingValue
) {

  if (!settingKey) {
    throw new Error(
      "Setting key is required."
    );
  }


  if (
    !settingValue ||
    typeof settingValue !== "object" ||
    Array.isArray(settingValue)
  ) {

    throw new Error(
      "Setting value must be an object."
    );

  }


  const {
    data,
    error,
  } =
    await supabase
      .from(TABLE)
      .upsert(
        {
          setting_key:
            settingKey,

          setting_value:
            settingValue,

          updated_at:
            new Date().toISOString(),
        },
        {
          onConflict:
            "setting_key",
        }
      )
      .select(
        "setting_key, setting_value"
      )
      .single();


  if (error) {

    console.error(
      `Failed to save settings: ${settingKey}`,
      error
    );

    throw error;

  }


  return (
    data?.setting_value ||
    settingValue
  );

}