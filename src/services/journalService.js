import { supabase } from
  "../lib/supabase";


/* ==========================================
   TABLE
========================================== */

const TABLE =
  "journal_posts";


/* ==========================================
   NORMALIZE POST

   Converts Supabase snake_case fields
   into the format used by our React UI.
========================================== */

function normalizePost(
  post
) {

  if (
    !post
  ) {

    return null;

  }


  return {

    id:
      post.id,

    title:
      post.title || "",

    slug:
      post.slug || "",

    category:
      post.category || "",

    excerpt:
      post.excerpt || "",

    content:
      post.content || "",

    cover:
      post.cover || "",

    status:
      post.status || "Draft",

    featured:
      Boolean(
        post.featured
      ),

    homepageOrder:
      typeof post.homepage_order ===
        "number"
        ? post.homepage_order
        : null,

    createdAt:
      post.created_at || null,

    updatedAt:
      post.updated_at || null,

  };

}


/* ==========================================
   PREPARE POST FOR DATABASE

   Converts React camelCase fields
   into Supabase snake_case fields.
========================================== */

function preparePost(
  post
) {

  return {

    title:
      post.title?.trim() || "",

    slug:
      post.slug?.trim() || "",

    category:
      post.category?.trim() || "",

    excerpt:
      post.excerpt?.trim() || "",

    content:
      post.content || "",

    cover:
      post.cover?.trim() || "",

    status:
      post.status || "Draft",

    featured:
      Boolean(
        post.featured
      ),

    homepage_order:
      typeof post.homepageOrder ===
        "number"
        ? post.homepageOrder
        : null,

  };

}


/* ==========================================
   GET ALL POSTS

   ADMIN ONLY
========================================== */

export async function getAllPosts() {

  const {
    data,
    error,
  } =
    await supabase
      .from(
        TABLE
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


  if (
    error
  ) {

    console.error(
      "Failed to load journal posts:",
      error
    );


    throw error;

  }


  return (
    data || []
  ).map(
    normalizePost
  );

}


/* ==========================================
   GET PUBLISHED POSTS

   PUBLIC
========================================== */

export async function getPublishedPosts() {

  const {
    data,
    error,
  } =
    await supabase
      .from(
        TABLE
      )
      .select(
        "*"
      )
      .eq(
        "status",
        "Published"
      )
      .order(
        "created_at",
        {
          ascending:
            false,
        }
      );


  if (
    error
  ) {

    console.error(
      "Failed to load published journal posts:",
      error
    );


    throw error;

  }


  return (
    data || []
  ).map(
    normalizePost
  );

}


/* ==========================================
   GET PUBLISHED POST BY SLUG

   PUBLIC
========================================== */

export async function getPublishedPostBySlug(
  slug
) {

  if (
    !slug
  ) {

    return null;

  }


  const {
    data,
    error,
  } =
    await supabase
      .from(
        TABLE
      )
      .select(
        "*"
      )
      .eq(
        "slug",
        slug
      )
      .eq(
        "status",
        "Published"
      )
      .maybeSingle();


  if (
    error
  ) {

    console.error(
      "Failed to load journal post:",
      error
    );


    throw error;

  }


  return normalizePost(
    data
  );

}


/* ==========================================
   CREATE POST

   ADMIN ONLY
========================================== */

export async function createPost(
  post
) {

  const payload =
    preparePost(
      post
    );


  const {
    data,
    error,
  } =
    await supabase
      .from(
        TABLE
      )
      .insert(
        payload
      )
      .select()
      .single();


  if (
    error
  ) {

    console.error(
      "Failed to create journal post:",
      error
    );


    throw error;

  }


  return normalizePost(
    data
  );

}


/* ==========================================
   UPDATE POST

   ADMIN ONLY
========================================== */

export async function updatePost(
  id,
  post
) {

  if (
    !id
  ) {

    throw new Error(
      "Journal post ID is required."
    );

  }


  const payload = {

    ...preparePost(
      post
    ),

    updated_at:
      new Date().toISOString(),

  };


  const {
    data,
    error,
  } =
    await supabase
      .from(
        TABLE
      )
      .update(
        payload
      )
      .eq(
        "id",
        id
      )
      .select()
      .single();


  if (
    error
  ) {

    console.error(
      "Failed to update journal post:",
      error
    );


    throw error;

  }


  return normalizePost(
    data
  );

}


/* ==========================================
   DELETE POST

   ADMIN ONLY
========================================== */

export async function deletePost(
  id
) {

  if (
    !id
  ) {

    throw new Error(
      "Journal post ID is required."
    );

  }


  const {
    error,
  } =
    await supabase
      .from(
        TABLE
      )
      .delete()
      .eq(
        "id",
        id
      );


  if (
    error
  ) {

    console.error(
      "Failed to delete journal post:",
      error
    );


    throw error;

  }


  return true;

}


/* ==========================================
   UPDATE HOMEPAGE HIGHLIGHTS

   ADMIN ONLY

   Saves featured state and homepage order
   for multiple Journal posts.
========================================== */

export async function updateHomepageHighlights(
  posts
) {

  if (
    !Array.isArray(
      posts
    )
  ) {

    throw new Error(
      "Journal posts must be an array."
    );

  }


  const updates =
    posts.map(
      (
        post
      ) => {

        if (
          !post?.id
        ) {

          return Promise.reject(
            new Error(
              "Journal post ID is required."
            )
          );

        }


        return supabase
          .from(
            TABLE
          )
          .update({

            featured:
              Boolean(
                post.featured
              ),

            homepage_order:
              post.featured &&
              typeof post.homepageOrder ===
                "number"
                ? post.homepageOrder
                : null,

            updated_at:
              new Date().toISOString(),

          })
          .eq(
            "id",
            post.id
          )
          .select()
          .single();

      }
    );


  const results =
    await Promise.all(
      updates
    );


  const failedResult =
    results.find(
      (
        result
      ) =>
        result.error
    );


  if (
    failedResult
  ) {

    console.error(
      "Failed to update Journal homepage highlights:",
      failedResult.error
    );


    throw failedResult.error;

  }


  return results
    .map(
      (
        result
      ) =>
        normalizePost(
          result.data
        )
    );

}