import React, { useState } from "react"
import { Link } from "react-router-dom"

const CLASS_ACTIVE = "active";

export default function Header() {
    const [isHighlightedHome, setIsHighlightedHome] = useState(false)
    const [isHighlightedSearch, setIsHighlightedSearch] = useState(false)

    const highlightHome = () => { setIsHighlightedHome(true); setIsHighlightedSearch(false) };
    const highlightSearch = () => { setIsHighlightedSearch(true); setIsHighlightedHome(false) };
    const clickOnBrand = () => { setIsHighlightedSearch(false); setIsHighlightedHome(false) }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
            <Link onClick={clickOnBrand} className="navbar-brand" to="/">Breweries info</Link>
            <button className="navbar-toggler" type="button">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link
                        onClick={highlightHome}
                        className={`nav-item nav-link ${isHighlightedHome ? CLASS_ACTIVE : null}`}
                        to="/"
                    >Home
                    </Link>
                    <Link
                        onClick={highlightSearch}
                        className={`nav-item nav-link ${isHighlightedSearch ? CLASS_ACTIVE : null}`}
                        to="/search"
                    >Search
                    </Link>
                </div>
            </div>
        </nav>
    )
}