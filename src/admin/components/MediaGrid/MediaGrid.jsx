import MediaCard from "../MediaCard/MediaCard";

const demoImages = [
  {
    id: 1,
    name: "Wedding_Couple_01.jpg",
    size: "5.2 MB",
    category: "Wedding",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  },

  {
    id: 2,
    name: "Portrait_Session_01.jpg",
    size: "3.8 MB",
    category: "Portrait",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
  },

  {
    id: 3,
    name: "Corporate_Event_01.jpg",
    size: "6.1 MB",
    category: "Event",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80",
  },
];

export default function MediaGrid() {
  return (
    <div className="media-grid">
      {demoImages.map((image) => (
        <MediaCard
          key={image.id}
          image={image}
        />
      ))}
    </div>
  );
}