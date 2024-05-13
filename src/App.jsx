import './App.css';
import SearchInput from "./Components/SearchInput";
import {delayedFetch} from "./helper";
import {useState} from "react";
import FeatureCategory from "./Components/FeatureCategory";
import Feature from "./Components/Feature";

//TODO Feature matches on keywords and display name

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [filteredJson, setFilteredJson] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredFeatures, setFilteredFeatures] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const date = await fetchWildLifeData(searchQuery);




        setSearchQuery("")
    }

    function fetchCategories() {

    }

    const fetchWildLifeData = async (searchQuery) => {
        setIsLoading(true)
        const res = await delayedFetch("./ipac_response.json", 1000);

        let featureCategories = res.data.featureCategories.reduce((prev, curr) => (
            {
                ...prev,
                [curr.sid.id] : {
                    ...curr,
                    features:[]
                }
                }) , {});

        const filteredFeaturesArr = getFilteredFeatures(res.data.features, searchQuery);

        for(const x of filteredFeaturesArr) {
            const sid = x.categorySid.id;

            featureCategories[sid].features.push(x);
        }

        setFilteredFeatures(Object.values(featureCategories).toSorted((a,b) => a.sortOrder - b.sortOrder))

        setIsLoading(false)
    }

    // First get list of features that have been matches by the query, can be matchedd by displayName OR epkeyword

    function getFilteredFeatures(featureData, searchQuery) {
        return featureData.filter((jsonEntry) =>  {
            const keywordsArr = jsonEntry.epKeywords.map(x => x.toLowerCase());
            const displayName = jsonEntry.displayName;

            const isSearchQueryInKeyword = keywordsArr.filter(keyword => keyword.includes(searchQuery))

            return displayName.includes(searchQuery) || isSearchQueryInKeyword.length
        })
    }

    function filterData(data, query) {
        return data;
    }


    return (
    <div className="App ">
        <SearchInput submitHandlerFn = {handleSubmit} searchQueryHandler = {setSearchQuery} query = {searchQuery}/>
        <main>
            {isLoading ? <h1 className = "mt-5">LOADING</h1> : filteredFeatures.map(
                x => <FeatureCategory
                    key={x.sid.id}
                    name={x.name}
                    description={x.optionalDescription}
                    featuresArr={x.features}
                />) }
        </main>
    </div>
  );
}

export default App;
