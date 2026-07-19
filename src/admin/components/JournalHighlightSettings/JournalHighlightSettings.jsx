import {
  useEffect,
  useMemo,
  useState,
} from "react";

import "../../styles/homepage-settings.css";

const JOURNAL_KEY =
  "rohit-photography-journal";


/* =========================
   GET ORDERED FEATURED POSTS
========================= */

function getOrderedFeaturedPosts(
  posts
) {
  return posts
    .filter(
      (post) =>
        post.status ===
          "Published" &&
        post.featured ===
          true
    )
    .sort((a, b) => {
      const orderA =
        typeof a.homepageOrder ===
        "number"
          ? a.homepageOrder
          : Number.MAX_SAFE_INTEGER;

      const orderB =
        typeof b.homepageOrder ===
        "number"
          ? b.homepageOrder
          : Number.MAX_SAFE_INTEGER;

      return orderA - orderB;
    });
}


/* =========================
   APPLY HOMEPAGE ORDER
========================= */

function applyHomepageOrder(
  allPosts,
  orderedFeatured
) {
  const orderMap =
    new Map();

  orderedFeatured.forEach(
    (post, index) => {
      orderMap.set(
        post.id,
        index
      );
    }
  );

  return allPosts.map(
    (post) => {
      if (
        !orderMap.has(
          post.id
        )
      ) {
        return post;
      }

      return {
        ...post,

        homepageOrder:
          orderMap.get(
            post.id
          ),
      };
    }
  );
}


/* =========================
   INITIALIZE HOMEPAGE ORDER
========================= */

function initializeHomepageOrder(
  posts
) {
  if (!Array.isArray(posts)) {
    return [];
  }

  const featured =
    getOrderedFeaturedPosts(
      posts
    );

  return applyHomepageOrder(
    posts,
    featured
  );
}


/* =========================
   COMPONENT
========================= */

export default function JournalHighlightSettings() {

  /* =========================
     LOAD JOURNAL POSTS
  ========================= */

  const [posts, setPosts] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            JOURNAL_KEY
          );

        if (!saved) {
          return [];
        }

        const parsed =
          JSON.parse(saved);

        if (
          !Array.isArray(parsed)
        ) {
          return [];
        }

        return initializeHomepageOrder(
          parsed
        );

      } catch (error) {
        console.error(
          "Failed to load journal posts:",
          error
        );

        return [];
      }
    });


  /* =========================
     SAVE JOURNAL POSTS
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      JOURNAL_KEY,
      JSON.stringify(posts)
    );
  }, [posts]);


  /* =========================
     PUBLISHED POSTS
  ========================= */

  const publishedPosts =
    useMemo(() => {
      return posts.filter(
        (post) =>
          post.status ===
          "Published"
      );
    }, [posts]);


  /* =========================
     FEATURED POSTS
  ========================= */

  const featuredPosts =
    useMemo(() => {
      return getOrderedFeaturedPosts(
        posts
      );
    }, [posts]);


  /* =========================
     AVAILABLE POSTS
  ========================= */

  const availablePosts =
    useMemo(() => {
      return publishedPosts.filter(
        (post) =>
          post.featured !==
          true
      );
    }, [publishedPosts]);


  /* =========================
     TOGGLE FEATURED
  ========================= */

  const toggleFeatured = (
    postId
  ) => {
    setPosts((prev) => {

      const selectedPost =
        prev.find(
          (post) =>
            post.id ===
            postId
        );

      if (!selectedPost) {
        return prev;
      }


      /* =========================
         REMOVE FROM HOMEPAGE
      ========================= */

      if (
        selectedPost.featured ===
        true
      ) {

        const updated =
          prev.map(
            (post) =>
              post.id ===
              postId
                ? {
                    ...post,

                    featured:
                      false,

                    homepageOrder:
                      undefined,
                  }
                : post
          );

        const remainingFeatured =
          getOrderedFeaturedPosts(
            updated
          );

        return applyHomepageOrder(
          updated,
          remainingFeatured
        );
      }


      /* =========================
         ADD TO HOMEPAGE
      ========================= */

      const currentFeatured =
        getOrderedFeaturedPosts(
          prev
        );

      return prev.map(
        (post) =>
          post.id ===
          postId
            ? {
                ...post,

                featured:
                  true,

                homepageOrder:
                  currentFeatured.length,
              }
            : post
      );
    });
  };


  /* =========================
     MOVE UP
  ========================= */

  const handleMoveUp = (
    postId
  ) => {
    setPosts((prev) => {

      const featured =
        getOrderedFeaturedPosts(
          prev
        );

      const index =
        featured.findIndex(
          (post) =>
            post.id ===
            postId
        );

      if (index <= 0) {
        return prev;
      }

      const reordered = [
        ...featured,
      ];

      [
        reordered[index - 1],
        reordered[index],
      ] = [
        reordered[index],
        reordered[index - 1],
      ];

      return applyHomepageOrder(
        prev,
        reordered
      );
    });
  };


  /* =========================
     MOVE DOWN
  ========================= */

  const handleMoveDown = (
    postId
  ) => {
    setPosts((prev) => {

      const featured =
        getOrderedFeaturedPosts(
          prev
        );

      const index =
        featured.findIndex(
          (post) =>
            post.id ===
            postId
        );

      if (
        index === -1 ||
        index ===
          featured.length - 1
      ) {
        return prev;
      }

      const reordered = [
        ...featured,
      ];

      [
        reordered[index],
        reordered[index + 1],
      ] = [
        reordered[index + 1],
        reordered[index],
      ];

      return applyHomepageOrder(
        prev,
        reordered
      );
    });
  };


  /* =========================
     RENDER POST CARD
  ========================= */

  const renderPostCard = (
    post,
    isFeatured,
    featuredIndex = -1
  ) => {

    return (
      <div
        key={
          post.id ||
          post.slug
        }
        style={{
          border:
            isFeatured
              ? "2px solid #b58b43"
              : "1px solid #ece8df",

          borderRadius:
            "16px",

          overflow:
            "hidden",

          background:
            "#fff",
        }}
      >

        {/* COVER */}

        {post.cover ? (

          <img
            src={
              post.cover
            }
            alt={
              post.title
            }
            style={{
              display:
                "block",

              width:
                "100%",

              height:
                "160px",

              objectFit:
                "cover",
            }}
          />

        ) : (

          <div
            style={{
              width:
                "100%",

              height:
                "160px",

              background:
                "#f3f1ec",

              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              color:
                "#999",
            }}
          >
            No Cover Image
          </div>

        )}


        {/* CONTENT */}

        <div
          style={{
            padding:
              "16px",
          }}
        >

          <span
            style={{
              color:
                "#b58b43",

              fontSize:
                "11px",

              letterSpacing:
                "1px",

              textTransform:
                "uppercase",
            }}
          >
            {post.category ||
              "Journal"}
          </span>


          <h3
            style={{
              margin:
                "8px 0 15px",

              fontSize:
                "18px",
            }}
          >
            {post.title ||
              "Untitled Article"}
          </h3>


          {/* =========================
              HOMEPAGE POSITION
          ========================= */}

          {isFeatured && (

            <p
              style={{
                margin:
                  "0 0 10px",

                color:
                  "#777",

                fontSize:
                  "13px",
              }}
            >
              Homepage position:{" "}
              {featuredIndex + 1}
            </p>

          )}


          {/* =========================
              ORDER CONTROLS
          ========================= */}

          {isFeatured && (

            <div
              style={{
                display:
                  "flex",

                gap:
                  "8px",

                marginBottom:
                  "10px",
              }}
            >

              {/* MOVE UP */}

              <button
                type="button"
                disabled={
                  featuredIndex ===
                  0
                }
                onClick={() =>
                  handleMoveUp(
                    post.id
                  )
                }
                style={{
                  flex:
                    1,

                  padding:
                    "10px",

                  border:
                    "1px solid #ddd",

                  borderRadius:
                    "8px",

                  background:
                    "#fff",

                  cursor:
                    featuredIndex ===
                    0
                      ? "not-allowed"
                      : "pointer",

                  opacity:
                    featuredIndex ===
                    0
                      ? 0.4
                      : 1,
                }}
              >
                ↑ Move Up
              </button>


              {/* MOVE DOWN */}

              <button
                type="button"
                disabled={
                  featuredIndex ===
                  featuredPosts.length -
                    1
                }
                onClick={() =>
                  handleMoveDown(
                    post.id
                  )
                }
                style={{
                  flex:
                    1,

                  padding:
                    "10px",

                  border:
                    "1px solid #ddd",

                  borderRadius:
                    "8px",

                  background:
                    "#fff",

                  cursor:
                    featuredIndex ===
                    featuredPosts.length -
                      1
                      ? "not-allowed"
                      : "pointer",

                  opacity:
                    featuredIndex ===
                    featuredPosts.length -
                      1
                      ? 0.4
                      : 1,
                }}
              >
                ↓ Move Down
              </button>

            </div>

          )}


          {/* =========================
              FEATURE BUTTON
          ========================= */}

          <button
            type="button"
            onClick={() =>
              toggleFeatured(
                post.id
              )
            }
            style={{
              width:
                "100%",

              padding:
                "11px 14px",

              border:
                isFeatured
                  ? "1px solid #b58b43"
                  : "1px solid #ddd",

              borderRadius:
                "10px",

              background:
                isFeatured
                  ? "#f8f3e9"
                  : "#fff",

              color:
                isFeatured
                  ? "#8a672f"
                  : "#222",

              cursor:
                "pointer",

              fontWeight:
                "500",
            }}
          >
            {isFeatured
              ? "✓ Featured"
              : "Feature on Homepage"}
          </button>

        </div>

      </div>
    );
  };


  /* =========================
     RENDER
  ========================= */

  return (
    <div className="homepage-settings-card">

      {/* HEADER */}

      <div className="homepage-settings-header">

        <span className="homepage-overline">
          FROM THE JOURNAL
        </span>

        <h2>
          Journal Highlights
        </h2>

        <p>
          Select which published
          journal posts appear on
          your homepage and control
          their display order.
        </p>

        <p
          style={{
            marginTop:
              "10px",

            color:
              "#777",

            fontSize:
              "14px",
          }}
        >
          {featuredPosts.length}{" "}
          articles currently featured
        </p>

      </div>


      {/* =========================
          EMPTY STATE
      ========================= */}

      {publishedPosts.length ===
        0 && (

        <div
          style={{
            padding:
              "40px",

            background:
              "#f8f8f8",

            borderRadius:
              "16px",

            textAlign:
              "center",
          }}
        >

          <h3>
            No Published Articles
          </h3>

          <p>
            Publish a journal post
            first before featuring
            it on the homepage.
          </p>

        </div>

      )}


      {/* =========================
          HOMEPAGE ORDER
      ========================= */}

      {featuredPosts.length >
        0 && (

        <div
          style={{
            marginBottom:
              "40px",
          }}
        >

          <h3
            style={{
              margin:
                "0 0 8px",

              fontSize:
                "20px",
            }}
          >
            Homepage Order
          </h3>


          <p
            style={{
              margin:
                "0 0 20px",

              color:
                "#777",

              fontSize:
                "14px",
            }}
          >
            Use Move Up and Move Down
            to control the order of
            journal articles shown on
            your homepage.
          </p>


          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(auto-fill, minmax(220px, 1fr))",

              gap:
                "20px",
            }}
          >

            {featuredPosts.map(
              (
                post,
                index
              ) =>
                renderPostCard(
                  post,
                  true,
                  index
                )
            )}

          </div>

        </div>

      )}


      {/* =========================
          AVAILABLE ARTICLES
      ========================= */}

      {availablePosts.length >
        0 && (

        <div>

          <h3
            style={{
              margin:
                "0 0 20px",

              fontSize:
                "20px",
            }}
          >
            Available Articles
          </h3>


          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(auto-fill, minmax(220px, 1fr))",

              gap:
                "20px",
            }}
          >

            {availablePosts.map(
              (post) =>
                renderPostCard(
                  post,
                  false
                )
            )}

          </div>

        </div>

      )}

    </div>
  );
}