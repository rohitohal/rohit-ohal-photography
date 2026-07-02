import "./SectionTitle.css";

export default function SectionTitle({

    label,

    title,

    highlight,

    center=false

}){

    return(

        <div className={`section-title ${center ? "center" : ""}`}>

            <span>

                {label}

            </span>

            <h2>

                {title}

                {highlight && (

                    <>
                        <br/>

                        <em>{highlight}</em>

                    </>

                )}

            </h2>

        </div>

    );

}