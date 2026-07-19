import MediaCard from "../MediaCard/MediaCard";

export default function MediaGrid({
  mediaItems = [],
  folders = [],
  onDelete,
  onMove,
}) {
  return (
    <div className="media-grid">

      {/* =========================
          EMPTY STATE
      ========================= */}

      {mediaItems.length === 0 && (

        <div
          style={{
            width: "100%",
            background: "#fff",
            padding: "80px",
            borderRadius: "24px",
            textAlign: "center",
            border:
              "1px solid #ece8df",
          }}
        >

          <h2>
            No Images Found
          </h2>

          <p>
            Upload an image or
            change your search
            filters.
          </p>

        </div>

      )}


      {/* =========================
          MEDIA CARDS
      ========================= */}

      {mediaItems.map(
        (image) => {

          const imageId =
            image.id ||
            image.publicId;

          const imageFolder =
            image.folder ||
            image.category ||
            "Uncategorized";

          return (

            <MediaCard
              key={
                imageId
              }

              image={{
                id:
                  imageId,

                publicId:
                  image.publicId,

                name:
                  image.filename ||
                  image.publicId ||
                  "Untitled Image",

                size:
                  image.bytes
                    ? `${(
                        image.bytes /
                        1024 /
                        1024
                      ).toFixed(
                        2
                      )} MB`
                    : "Unknown",

                category:
                  imageFolder,

                folder:
                  imageFolder,

                image:
                  image.url,

                width:
                  image.width,

                height:
                  image.height,

                format:
                  image.format,
              }}

              folders={
                folders
              }

              onDelete={
                onDelete
              }

              onMove={
                onMove
              }
            />

          );
        }
      )}

    </div>
  );
}