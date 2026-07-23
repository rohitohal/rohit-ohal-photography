import {
  useEffect,
} from "react";


/* ==========================================
   STRUCTURED DATA
========================================== */

export default function StructuredData({
  data,
  id = "structured-data",
}) {

  useEffect(() => {

    /* ========================================
       VALIDATION
    ======================================== */

    if (
      !data ||
      typeof data !== "object"
    ) {

      return;

    }


    /* ========================================
       FIND EXISTING SCRIPT
    ======================================== */

    let script =
      document.getElementById(
        id
      );


    /* ========================================
       CREATE SCRIPT
    ======================================== */

    if (
      !script
    ) {

      script =
        document.createElement(
          "script"
        );


      script.id =
        id;


      script.type =
        "application/ld+json";


      document.head.appendChild(
        script
      );

    }


    /* ========================================
       UPDATE JSON-LD
    ======================================== */

    script.textContent =
      JSON.stringify(
        data
      );


    /* ========================================
       CLEANUP
    ======================================== */

    return () => {

      const currentScript =
        document.getElementById(
          id
        );


      if (
        currentScript
      ) {

        currentScript.remove();

      }

    };

  }, [
    data,
    id,
  ]);


  return null;

}