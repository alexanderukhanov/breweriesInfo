import { useEffect, useState } from "react";
import SearchInfo from "../searchInfo/SearchInfo";
import DataService from "../services/DataService";
import { Link } from "react-router-dom";

const INPUT_SEARCH_NAME = "search";
const EMPTY_STRING = "";
const DEFAULT_SEARCH_TABLE = [EMPTY_STRING];

export default function Search() {
    const [searchResult, setSearchResult] = useState(DEFAULT_SEARCH_TABLE);
    const [inputValue, setInputValue] = useState(EMPTY_STRING);
    const [valueOfSearch, setValueOfSearch] = useState(EMPTY_STRING);
    const [notificationIsShown, setNotificationIsShown] = useState(false);
    const [amountNotificationIsShown, setAmountNotificationIsShown] = useState(false);

    const searchBrewery = (e) => setValueOfSearch(() => {
        e.preventDefault();
        setInputValue(EMPTY_STRING)
        return e.target[INPUT_SEARCH_NAME].value
    });
    useEffect(() => {
        const dataService = new DataService();
        if (!valueOfSearch) { return }
        setSearchResult([])
        dataService
            .getBreweries(valueOfSearch)
            .then(data => {
                const editedData = data.map(value => {
                    return {
                        id: value.id,
                        name: value.name,
                        location: `${value.city}, ${value.state}`,
                        link:
                            <Link
                                to={`/breweryInfo/${value.id}`}
                                className="btn btn-primary">
                                See more
                            </Link>
                    }
                });
                if (editedData.length) {
                    setSearchResult(editedData);
                    setAmountNotificationIsShown(true)
                    setNotificationIsShown(false)
                }
                else {
                    setSearchResult(DEFAULT_SEARCH_TABLE);
                    setAmountNotificationIsShown(false);
                    setNotificationIsShown(true);
                }
            })
    }, [valueOfSearch])
    return (
        <>
            <div className="container search_container pt-4">
                <div className="d-flex flex-row justify-content-center align-items-center pt-4 search_title">
                    <h1 id="siteTitle">Search for breweries</h1>
                </div>
                <div>
                    <div className="search-bar-container">
                        <form onSubmit={searchBrewery} className="input-group mb-0">
                            <input
                                required
                                name={INPUT_SEARCH_NAME}
                                type="text"
                                placeholder="Search breweries..."
                                className="form-control"
                                onChange={(e) => setInputValue(e.target.value)}
                                value={inputValue}
                            />
                            <button type="submit" className="btn btn-dark mx-1" href="searchFound.html"
                            >
                                Search
                            </button>
                            <button
                                onClick={() => {
                                    return (
                                        setInputValue(EMPTY_STRING),
                                        setSearchResult(DEFAULT_SEARCH_TABLE),
                                        setNotificationIsShown(false),
                                        setAmountNotificationIsShown(false)
                                    )
                                }}
                                className="btn btn-warning"
                            >
                                Clear
                                </button>
                        </form>
                    </div>
                    {amountNotificationIsShown && searchResult.length
                        ? <div id="amount_notification" className="alert badge-info text-center">
                            <p className="text-center">{`Found ${searchResult.length} breweries`}</p>
                        </div>
                        : null
                    }
                    {notificationIsShown
                        ? <div id="notification" className=" alert alert-dark">
                            <p className="text-center">NO RESULTS</p>
                        </div>
                        : null
                    }

                </div>
            </div>
            <SearchInfo searchResult={searchResult} />
        </>
    )
}