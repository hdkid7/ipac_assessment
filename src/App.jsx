import './App.css';
import SearchInput from "./Components/SearchInput";
import {delayedFetch} from "./helper";
import {useEffect, useRef, useState} from "react";
import FeatureCategory from "./Components/FeatureCategory";
import Spinner from "./Components/Spinner";

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredFeaturesAndCategories, setFilteredFeaturesAndCategories] = useState([]);
    let searchRef = useRef("");

    useEffect(() => {
        const fetchData = async () => {
            await fetchWildLifeData(searchQuery);
        }

        fetchData()

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        searchRef.current = searchQuery.toLowerCase();
        await fetchWildLifeData(searchQuery.toLowerCase());
    }

    const fetchWildLifeData = async (searchQuery) => {
        setIsLoading(true)
        const res = await delayedFetch("./ipac_response.json", 500);

        let featureCategoriesObj = convertFeatureCategoriesArrToObj(res.data.featureCategories);

        const filteredFeaturesArr = getFilteredFeatures(res.data.features, searchQuery);

        for(const x of filteredFeaturesArr) {
            const sid = x.categorySid.id;

            featureCategoriesObj[sid].features.push(x);
        }

        const sortedFeatureAndCategoryArr = removeCategoriesWithNoFeatures(Object.values(featureCategoriesObj).toSorted((a,b) => a.sortOrder - b.sortOrder));

        setFilteredFeaturesAndCategories(sortedFeatureAndCategoryArr)

        setIsLoading(false)
    }

    function removeCategoriesWithNoFeatures(dataArr) {
        return dataArr.filter(x => x.features.length !== 0)
    }

    function convertFeatureCategoriesArrToObj(data) {
        return data.reduce((prev, curr) => (
            {
                ...prev,
                [curr.sid.id] : {
                    ...curr,
                    features:[]
                }
            }) , {});
    }

    function getFilteredFeatures(featureData, searchQuery) {
        return featureData.filter((jsonEntry) =>  {
            const keywordsArr = jsonEntry.epKeywords.map(x => x.toLowerCase());
            const displayName = jsonEntry.displayName;

            const isSearchQueryInKeyword = keywordsArr.filter(keyword => keyword.includes(searchQuery))

            return displayName.includes(searchQuery) || isSearchQueryInKeyword.length
        })
    }

    return (
    <div className="App ">
        <SearchInput submitHandlerFn = {handleSubmit} searchQueryHandler = {setSearchQuery} query = {searchQuery} isLoading={isLoading}/>
        <main>
            {isLoading ? <Spinner/> : <SearchResults filteredFeaturesAndCategories = {filteredFeaturesAndCategories} searchRef={searchRef}/>}
        </main>
    </div>
  );
}

function SearchResults({filteredFeaturesAndCategories, searchRef}) {
    if(searchRef.current && filteredFeaturesAndCategories.length === 0) return <p className="font-xl text-white mt-5">No search results! Consider making your search more broad.</p>;

    return (
        <>
            {searchRef.current && <p className="text-white text-xl mt-5">Search results for: "{searchRef.current}"</p>}
            {filteredFeaturesAndCategories.map(
            x => <FeatureCategory
            key={x.sid.id}
            name={x.name}
            description={x.optionalDescription}
            featuresArr={x.features}/>)}
        </>)
}

export default App;