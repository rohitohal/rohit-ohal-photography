export default function MasonryGallery({
  items = [],
  renderItem,
  className = "",
}) {
  return (
    <section className={`masonry-gallery ${className}`}>
      <div className="masonry-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="masonry-item"
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </section>
  );
}