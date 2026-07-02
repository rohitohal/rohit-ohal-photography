import "./Image.css";

export default function Image({

    src,

    alt,

    className="",

    loading="lazy"

}){

    return(

        <img

            src={src}

            alt={alt}

            loading={loading}

            className={`image ${className}`}

        />

    );

}