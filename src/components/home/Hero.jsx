import hero from "../../assets/images/hero.jpg";

export default function Hero() {

  return (

    <section className="hero">

      <img src={hero} alt="Wedding Couple" />

      <div className="hero-overlay"></div>

      <div className="hero-content">

        <p>
          LUXURY WEDDING PHOTOGRAPHER
        </p>

        <h1>

          ROHIT OHAL

          <br />

          PHOTOGRAPHY

        </h1>

        <span>

          Pune • India • Worldwide

        </span>

      </div>

    </section>

  );

}