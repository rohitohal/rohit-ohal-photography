import "./PortfolioGrid.css";
import PortfolioCard from "./PortfolioCard";

export default function PortfolioGrid({

    items=[],

    featured=false,

    onSelect

}){

    return(

        <section className="portfolio-grid">

            {items.map((item)=>(

                <PortfolioCard

                    key={item.id}

                    image={item.cover}

                    title={item.title}

                    category={item.location}

                    featured={featured}

                    onClick={()=>onSelect?.(item)}

                />

            ))}

        </section>

    );

}