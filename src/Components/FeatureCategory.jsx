import Feature from "./Feature";

export default function FeatureCategory({name, featuresArr, description}) {
    if(! featuresArr.length) return '';

    return(
        <div className="text-left text-white m-5">
            <h1 className="text-2xl text-left font-bold">{name}</h1>
            <h2 className="text-l">{description}</h2>
            <ul>
                {featuresArr.map(feature => <Feature description={feature.optionalDescription} keywords={feature.epKeywords} name={feature.displayName}/>)}
            </ul>
            <hr/>
        </div>

    )
}

