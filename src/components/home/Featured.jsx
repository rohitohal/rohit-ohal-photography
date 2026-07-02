export default function Featured() {
  const cards = [
    {
      title: "Wedding Stories",
      category: "WEDDINGS",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
    },
    {
      title: "Portraits",
      category: "PORTRAITS",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    },
    {
      title: "Events",
      category: "EVENTS",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80",
    },
    {
      title: "Food",
      category: "FOOD",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    },
    {
      title: "Industrial",
      category: "INDUSTRIAL",
      image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&q=80",
    },
  ];

  return (
    <section className="featured">

      <div className="container">

        <div className="featured-heading">

          <span>OUR DISCIPLINES</span>

          <h2>
            One eye,
            <br />
            <em>many languages.</em>
          </h2>

        </div>

        <div className="featured-grid">

          {cards.map((card) => (
            <div className="featured-card" key={card.title}>

              <img src={card.image} alt={card.title} />

              <div className="featured-overlay">

                <span>{card.category}</span>

                <h3>{card.title}</h3>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}