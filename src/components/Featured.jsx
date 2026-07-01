export default function Featured() {
  return (
    <section className="featured">

      <h2 className="section-title">
        Featured Weddings
      </h2>

      <div className="featured-grid">

        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=900"
            alt="Wedding"
          />

          <h3>Aditi & Rahul</h3>

          <p>Pune</p>
        </div>

        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=900"
            alt="Wedding"
          />

          <h3>Neha & Karan</h3>

          <p>Mumbai</p>
        </div>

        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900"
            alt="Wedding"
          />

          <h3>Riya & Akash</h3>

          <p>Goa</p>
        </div>

      </div>

    </section>
  );
}