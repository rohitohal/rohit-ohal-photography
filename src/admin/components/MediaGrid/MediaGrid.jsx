import MediaCard from "../MediaCard/MediaCard";

export default function MediaGrid({
  mediaItems = [],
}) {
  return (
    <div className="media-grid">

      {mediaItems.length === 0 && (
        <div
          style={{
            width: "100%",
            background: "#fff",
            padding: "80px",
            borderRadius: "24px",
            textAlign: "center",
            border: "1px solid #ece8df",
          }}
        >
          <h2>No Images Uploaded Yet</h2>

          <p>
            Upload your first image using the
            Upload Images button above.
          </p>
        </div>
      )}

      {mediaItems.map((image) => (
        <MediaCard
          key={image.id}
          image={{
            id: image.id,
            name:
              image.filename ||
              image.publicId ||
              "Untitled Image",

            size: image.bytes
              ? `${(
                  image.bytes /
                  1024 /
                  1024
                ).toFixed(2)} MB`
              : "Unknown",

            category:
              image.category ||
              "Uncategorized",

            image:
              image.url,
          }}
        />
      ))}

    </div>
  );
}