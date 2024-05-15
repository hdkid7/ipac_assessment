import {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons form react-icons
import { IconContext } from "react-icons";

export function Paginate({data, setFilterData, featureCategoryName}) {
    const [page, setPage] = useState(0);
    const numberOfElements = 4;

    useEffect(() => {
        setFilterData(
            data.filter((item, index) => {
                return (index >= page * numberOfElements) & (index < (page + 1) * numberOfElements);
            })
        );
    }, [page]);


    const customAriaLabelBuilder = (prefix, idx) => {
        return `Navigation for ${prefix} - page ${idx}`;
    };

    return (
        <ReactPaginate
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            activeClassName={"active"}
            onPageChange={(event) => setPage(event.selected)}
            pageCount={Math.ceil(data.length / numberOfElements)}
            pageRangeDisplayed={20}
            ariaLabelBuilder={(idx) => customAriaLabelBuilder(featureCategoryName, idx)}
            previousLabel={
                <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                    <AiFillLeftCircle />
                </IconContext.Provider>
            }
            nextLabel={
                <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                    <AiFillRightCircle />
                </IconContext.Provider>
            }
        />
    )
}