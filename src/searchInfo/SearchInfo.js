import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import TableHeader from "../table/TableHeader";
import TableRow from "../table/TableRow";

const STYLE_FOCUSED_HEADER_DOWN = "focused_header_down";
const STRING_ID = "id";
const STRING_NAME = "name";
const STRING_LOCATION = "location";
const SYMBOL_SHARP = "#";
const HEADERS = [
    { value: "#", isSortedFromAToB: false, isSortedFromBToA: false },
    { value: "Name", isSortedFromAToB: false, isSortedFromBToA: false },
    { value: "Location", isSortedFromAToB: false, isSortedFromBToA: false },
    { value: "", isSortedFromAToB: false, isSortedFromBToA: false }
];

export default function SearchInfo(props) {
    const [headers, setHeaders] = useState(HEADERS);
    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {
        setSearchResult(props.searchResult);
        setHeaders(() => {
            const newHeaders = HEADERS.map(item => {
                item.isSortedFromBToA = false;
                item.isSortedFromAToB = false;
                return item;
            })
            return newHeaders
        })
    }, [props.searchResult])
    const chooseTypeOfSort = (targetId, stringTitle) => {
        if (targetId === STYLE_FOCUSED_HEADER_DOWN) {
            return sortListAndChangeHeaders(stringTitle)
        }
        sortListAndChangeHeaders(stringTitle, true)
    }
    const sortListAndChangeHeaders = (key, isReverseSort = false) => {
        setSearchResult(() => {
            const sort = searchResult.sort((a, b) => {
                if (a[key] > b[key]) {
                    return isReverseSort ? 1 : -1;
                }
                if (a[key] < b[key]) {
                    return isReverseSort ? -1 : 1;
                }
                return 0;
            })
            key = key === STRING_ID ? SYMBOL_SHARP : key;
            const newHeaders = headers.map(item => {
                const itemValue = item.value.toLowerCase()
                if (isReverseSort) {
                    item.isSortedFromBToA = false;
                    item.isSortedFromAToB = itemValue === key;
                }
                else {
                    item.isSortedFromBToA = itemValue === key;
                    item.isSortedFromAToB = false;
                }
                return item;
            })
            setHeaders(newHeaders)
            return sort
        })
    }
    const sortByClick = (e) => {
        const target = e.target.innerText;
        const targetId = e.target.id;
        switch (target) {
            case HEADERS[0].value:
                chooseTypeOfSort(targetId, STRING_ID);
                break;
            case HEADERS[1].value:
                chooseTypeOfSort(targetId, STRING_NAME);
                break;
            case HEADERS[2].value:
                chooseTypeOfSort(targetId, STRING_LOCATION);
                break;
            default:
                break;
        }
    }
    return (
        <div className="results_container container pt-4 ">
            {searchResult.length
                ? <table className="table table-hover">
                    <TableHeader headers={headers} sortByClick={sortByClick} />
                    <TableRow searchResult={searchResult} />
                </table>
                : <Spinner />
            }
        </div>
    )
}