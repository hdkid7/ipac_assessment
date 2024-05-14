import {useState} from "react";

export default function Feature({keywords, name, description}) {
    const keywordStr = keywords.join(", ")

    return(
        <div className="m-5">
            <h3><span className="font-bold">Feature Name:</span> {name}</h3>
            <p><span className="font-bold">Feature Description:</span> {description ?? <i>No Description Provided...</i>}</p>
            <p className="text-sm"><span className="font-bold">Keywords:</span> {keywordStr}</p>
        </div>
    )
}

