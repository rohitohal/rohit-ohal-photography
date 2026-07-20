import { useState } from "react";


/* =========================
   STORAGE KEY
========================= */

const ABOUT_STORY_KEY =
  "rohit-photography-about-story";


/* =========================
   DEFAULT ABOUT STORY
========================= */

const defaultAboutStory = {
  label:
    "MY STORY",

  heading:
    "Turning Moments Into Timeless Memories",

  paragraph1:
    "Photography is more than taking beautiful photographs. It is about preserving genuine emotions, relationships, and moments that can never be recreated.",

  paragraph2:
    "With over 10 years of experience and a background in Fine Arts, I approach every assignment with creativity, technical precision, and a passion for storytelling.",

  paragraph3:
    "Every wedding, portrait, and commercial project is treated with the same commitment—to create timeless images that remain meaningful for generations.",
};


/* =========================
   ABOUT STORY
========================= */

export default function AboutStory() {

  /* =========================
     LOAD CMS DATA
  ========================= */

  const [story] =
    useState(() => {

      try {

        const savedStory =
          localStorage.getItem(
            ABOUT_STORY_KEY
          );

        if (!savedStory) {
          return {
            ...defaultAboutStory,
          };
        }

        const parsedStory =
          JSON.parse(
            savedStory
          );

        if (
          !parsedStory ||
          typeof parsedStory !==
            "object"
        ) {
          return {
            ...defaultAboutStory,
          };
        }

        return {
          ...defaultAboutStory,
          ...parsedStory,
        };

      } catch (error) {

        console.error(
          "Failed to load About Story settings:",
          error
        );

        return {
          ...defaultAboutStory,
        };

      }

    });


  /* =========================
     RENDER
  ========================= */

  return (
    <section className="about-story">

      <div className="about-container">


        {/* =========================
            LEFT SIDE
        ========================= */}

        <div className="about-story-left">

          <span>
            {story.label}
          </span>

          <h2>
            {story.heading}
          </h2>

        </div>


        {/* =========================
            RIGHT SIDE
        ========================= */}

        <div className="about-story-right">

          {story.paragraph1 && (
            <p>
              {story.paragraph1}
            </p>
          )}

          {story.paragraph2 && (
            <p>
              {story.paragraph2}
            </p>
          )}

          {story.paragraph3 && (
            <p>
              {story.paragraph3}
            </p>
          )}

        </div>

      </div>

    </section>
  );
}