export default function Journal() {
  const posts = [
    {
      title: "Why I shoot weddings on a single 35mm lens.",
      category: "JOURNAL",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=80",
      featured: true,
    },
    {
      title: "Photographing Kyoto people at sunrise.",
      category: "TRAVEL",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
    },
    {
      title: "Why I stopped chasing perfect light.",
      category: "THOUGHTS",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    },
  ];

  return (
    <section className="journal">
      <div className="container">

        <div className="journal-header">
          <span>JOURNAL</span>
          <h2>Field Notes</h2>
        </div>

        <div className="journal-grid">

          <article className="journal-feature">

            <img src={posts[0].image} alt={posts[0].title} />

            <div className="journal-content">

              <span>{posts[0].category}</span>

              <h3>{posts[0].title}</h3>

              <a href="#">READ →</a>

            </div>

          </article>

          <div className="journal-sidebar">

            {posts.slice(1).map((post) => (

              <article className="journal-small" key={post.title}>

                <img src={post.image} alt={post.title} />

                <div>

                  <span>{post.category}</span>

                  <h4>{post.title}</h4>

                  <a href="#">READ →</a>

                </div>

              </article>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}