import "./PageHeader.css";

export default function PageHeader({

    image,

    subtitle,

    title

}){

    return(

        <section
            className="page-header"
            style={{
                backgroundImage:`url(${image})`
            }}
        >

            <div className="page-overlay"/>

            <div className="page-header-content">

                <span>{subtitle}</span>

                <h1>{title}</h1>

            </div>

        </section>

    );

}