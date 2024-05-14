import Feature from "./Feature";
import {useState} from "react";
import {Paginate} from "./Paginate";

export default function FeatureCategory({name, featuresArr, description}) {
    const [filterData, setFilterData] = useState([]);

    if(! featuresArr.length) return '';

    return(
        <div className="text-left text-white ml-20 mr-20 mt-5 mb-5">
            <h1 className="text-2xl text-left font-bold">{name}</h1>
            <h2 className="text-l">{description ?? <i>No Description Provided...</i>}</h2>
            <ul className="h-[400px]">
                {filterData.map(feature => <Feature description={feature.optionalDescription} keywords={feature.epKeywords} name={feature.displayName}/>)}
            </ul>
            <Paginate data= {featuresArr} setFilterData={setFilterData} featureCategoryName = {name}/>
            <hr/>
        </div>

    )
}

