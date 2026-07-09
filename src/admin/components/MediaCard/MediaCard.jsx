import {
  Trash2,
  Star,
  Copy,
  Eye,
} from "lucide-react";

export default function MediaCard({ image }) {
  return (
    <div className="media-card">

      <div className="media-image-wrapper">
        <img
          src={image.image}
          alt={image.name}
        />

        <div className="media-overlay">

          <button>
            <Eye size={18} />
          </button>

          <button>
            <Copy size={18} />
          </button>

          <button>
            <Star size={18} />
          </button>

          <button>
            <Trash2 size={18} />
          </button>

        </div>
      </div>

      <div className="media-card-info">

        <h3>{image.name}</h3>

        <span>{image.category}</span>

        <p>{image.size}</p>

      </div>

    </div>
  );
}