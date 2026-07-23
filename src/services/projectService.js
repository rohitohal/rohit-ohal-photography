import { supabase } from
  "../lib/supabase";


/* ==========================================
   TABLE
========================================== */

const TABLE =
  "projects";


/* ==========================================
   NORMALIZE PROJECT

   Supabase snake_case
   →
   React camelCase
========================================== */

function normalizeProject(
  project
) {

  if (!project) {
    return null;
  }


  return {

    id:
      project.id,

    title:
      project.title || "",

    slug:
      project.slug || "",

    category:
      project.category || "",

    location:
      project.location || "",

    date:
      project.date || "",

    description:
      project.description || "",

    story:
      project.story || "",

    cover:
      project.cover || "",

    images:
      Array.isArray(
        project.images
      )
        ? project.images
        : [],

    gallery:
      Array.isArray(
        project.gallery
      )
        ? project.gallery
        : [],

    masonry:
      project.masonry || "",

    status:
      project.status || "Draft",

    featuredHomepage:
      Boolean(
        project.featured_homepage
      ),

    homepageOrder:
      typeof project.homepage_order ===
        "number"
        ? project.homepage_order
        : null,

    featuredPortfolio:
      Boolean(
        project.featured_portfolio
      ),

    portfolioOrder:
      typeof project.portfolio_order ===
        "number"
        ? project.portfolio_order
        : null,

    order:
      typeof project.project_order ===
        "number"
        ? project.project_order
        : 0,

    createdAt:
      project.created_at || null,

    updatedAt:
      project.updated_at || null,

  };

}


/* ==========================================
   PREPARE PROJECT

   React camelCase
   →
   Supabase snake_case
========================================== */

function prepareProject(
  project
) {

  return {

    title:
      project.title?.trim() || "",

    slug:
      project.slug?.trim() || "",

    category:
      project.category?.trim() || "",

    location:
      project.location?.trim() || "",

    date:
      project.date || null,

    description:
      project.description || "",

    story:
      project.story || "",

    cover:
      project.cover?.trim() || "",

    images:
      Array.isArray(
        project.images
      )
        ? project.images
        : [],

    gallery:
      Array.isArray(
        project.gallery
      )
        ? project.gallery
        : [],

    masonry:
      project.masonry || "",

    status:
      project.status || "Draft",

    featured_homepage:
      Boolean(
        project.featuredHomepage
      ),

    homepage_order:
      typeof project.homepageOrder ===
        "number"
        ? project.homepageOrder
        : null,

    featured_portfolio:
      Boolean(
        project.featuredPortfolio
      ),

    portfolio_order:
      typeof project.portfolioOrder ===
        "number"
        ? project.portfolioOrder
        : null,

    project_order:
      typeof project.order ===
        "number"
        ? project.order
        : 0,

  };

}


/* ==========================================
   GET ALL PROJECTS

   ADMIN
========================================== */

export async function getAllProjects() {

  const {
    data,
    error,
  } =
    await supabase
      .from(TABLE)
      .select("*")
      .order(
        "project_order",
        {
          ascending: true,
        }
      );


  if (error) {

    console.error(
      "Failed to load projects:",
      error
    );

    throw error;

  }


  return (
    data || []
  ).map(
    normalizeProject
  );

}


/* ==========================================
   GET PUBLISHED PROJECTS

   PUBLIC
========================================== */

export async function getPublishedProjects() {

  const {
    data,
    error,
  } =
    await supabase
      .from(TABLE)
      .select("*")
      .eq(
        "status",
        "Published"
      )
      .order(
        "project_order",
        {
          ascending: true,
        }
      );


  if (error) {

    console.error(
      "Failed to load published projects:",
      error
    );

    throw error;

  }


  return (
    data || []
  ).map(
    normalizeProject
  );

}


/* ==========================================
   GET PUBLISHED PROJECT BY SLUG

   PUBLIC
========================================== */

export async function getPublishedProjectBySlug(
  slug
) {

  if (!slug) {
    return null;
  }


  const {
    data,
    error,
  } =
    await supabase
      .from(TABLE)
      .select("*")
      .eq(
        "slug",
        slug
      )
      .eq(
        "status",
        "Published"
      )
      .maybeSingle();


  if (error) {

    console.error(
      "Failed to load project:",
      error
    );

    throw error;

  }


  return normalizeProject(
    data
  );

}


/* ==========================================
   CREATE PROJECT

   ADMIN
========================================== */

export async function createProject(
  project
) {

  const payload =
    prepareProject(
      project
    );


  const {
    data,
    error,
  } =
    await supabase
      .from(TABLE)
      .insert(payload)
      .select()
      .single();


  if (error) {

    console.error(
      "Failed to create project:",
      error
    );

    throw error;

  }


  return normalizeProject(
    data
  );

}


/* ==========================================
   UPDATE PROJECT

   ADMIN
========================================== */

export async function updateProject(
  id,
  project
) {

  if (!id) {

    throw new Error(
      "Project ID is required."
    );

  }


  const payload = {

    ...prepareProject(
      project
    ),

    updated_at:
      new Date().toISOString(),

  };


  const {
    data,
    error,
  } =
    await supabase
      .from(TABLE)
      .update(payload)
      .eq(
        "id",
        id
      )
      .select()
      .single();


  if (error) {

    console.error(
      "Failed to update project:",
      error
    );

    throw error;

  }


  return normalizeProject(
    data
  );

}


/* ==========================================
   DELETE PROJECT

   ADMIN
========================================== */

export async function deleteProject(
  id
) {

  if (!id) {

    throw new Error(
      "Project ID is required."
    );

  }


  const {
    error,
  } =
    await supabase
      .from(TABLE)
      .delete()
      .eq(
        "id",
        id
      );


  if (error) {

    console.error(
      "Failed to delete project:",
      error
    );

    throw error;

  }


  return true;

}


/* ==========================================
   UPDATE PROJECT ORDER

   ADMIN
========================================== */

export async function updateProjectOrder(
  projects
) {

  if (
    !Array.isArray(
      projects
    )
  ) {

    throw new Error(
      "Projects must be an array."
    );

  }


  const results =
    await Promise.all(
      projects.map(
        (
          project,
          index
        ) => {

          if (!project?.id) {

            return Promise.reject(
              new Error(
                "Project ID is required."
              )
            );

          }


          return supabase
            .from(TABLE)
            .update({

              project_order:
                index,

              updated_at:
                new Date().toISOString(),

            })
            .eq(
              "id",
              project.id
            )
            .select()
            .single();

        }
      )
    );


  const failedResult =
    results.find(
      (result) =>
        result.error
    );


  if (failedResult) {

    console.error(
      "Failed to update project order:",
      failedResult.error
    );

    throw failedResult.error;

  }


  return results.map(
    (result) =>
      normalizeProject(
        result.data
      )
  );

}


/* ==========================================
   UPDATE HOMEPAGE FEATURED PROJECTS

   ADMIN
========================================== */

export async function updateHomepageProjects(
  projects
) {

  if (
    !Array.isArray(
      projects
    )
  ) {

    throw new Error(
      "Projects must be an array."
    );

  }


  const results =
    await Promise.all(
      projects.map(
        (project) => {

          if (!project?.id) {

            return Promise.reject(
              new Error(
                "Project ID is required."
              )
            );

          }


          return supabase
            .from(TABLE)
            .update({

              featured_homepage:
                Boolean(
                  project.featuredHomepage
                ),

              homepage_order:
                project.featuredHomepage &&
                typeof project.homepageOrder ===
                  "number"
                  ? project.homepageOrder
                  : null,

              updated_at:
                new Date().toISOString(),

            })
            .eq(
              "id",
              project.id
            )
            .select()
            .single();

        }
      )
    );


  const failedResult =
    results.find(
      (result) =>
        result.error
    );


  if (failedResult) {

    console.error(
      "Failed to update homepage projects:",
      failedResult.error
    );

    throw failedResult.error;

  }


  return results.map(
    (result) =>
      normalizeProject(
        result.data
      )
  );

}


/* ==========================================
   UPDATE FEATURED PORTFOLIO

   ADMIN
========================================== */

export async function updateFeaturedPortfolio(
  projects
) {

  if (
    !Array.isArray(
      projects
    )
  ) {

    throw new Error(
      "Projects must be an array."
    );

  }


  const results =
    await Promise.all(
      projects.map(
        (project) => {

          if (!project?.id) {

            return Promise.reject(
              new Error(
                "Project ID is required."
              )
            );

          }


          return supabase
            .from(TABLE)
            .update({

              featured_portfolio:
                Boolean(
                  project.featuredPortfolio
                ),

              portfolio_order:
                project.featuredPortfolio &&
                typeof project.portfolioOrder ===
                  "number"
                  ? project.portfolioOrder
                  : null,

              updated_at:
                new Date().toISOString(),

            })
            .eq(
              "id",
              project.id
            )
            .select()
            .single();

        }
      )
    );


  const failedResult =
    results.find(
      (result) =>
        result.error
    );


  if (failedResult) {

    console.error(
      "Failed to update featured portfolio:",
      failedResult.error
    );

    throw failedResult.error;

  }


  return results.map(
    (result) =>
      normalizeProject(
        result.data
      )
  );

}
/* ==========================================
   GET HOMEPAGE PROJECTS

   PUBLIC

   Returns only published projects selected
   for the homepage, in homepage order.
========================================== */

export async function getHomepageProjects() {

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
      .eq(
        "featured_homepage",
        true
      )
      .order(
        "homepage_order",
        {
          ascending:
            true,
        }
      );


  if (
    error
  ) {

    console.error(
      "Failed to load homepage projects:",
      error
    );


    throw error;

  }


  return (
    data || []
  ).map(
    normalizeProject
  );

}