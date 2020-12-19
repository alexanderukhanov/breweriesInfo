import { useEffect, useState } from "react";
import DataService from "../services/DataService";
import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import BreweryParagraph from "./BreweryParagraph"

export default function BreweryInfo(props) {
    const [breweryInfo, setBreweryInfo] = useState([]);
    useEffect(() => {
        const dataService = new DataService()
        dataService
            .getBreweryInfo(props.id)
            .then(data => {
                const filtratedData = [
                    `${data.brewery_type[0].toUpperCase()}${data.brewery_type.slice(1)}`,
                    data.country,
                    `${data.street}, ${data.city}, ${data.state}, ${data.postal_code}`,
                    data.phone,
                    <a
                        aria-label="Brewery website"
                        href={data.website_url}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        {data.website_url}
                    </a>
                ]
                setBreweryInfo(filtratedData)
            })
    }, [props.id])
    return breweryInfo.length
        ?
        <div className="container pt-4">
            <div className="px-3">
                <h1>{breweryInfo.name}</h1>
                <div className="lead">
                    {breweryInfo.map((value, i) => <BreweryParagraph value={value} key={i} i={i} />)}
                    <Link to="/search" className="btn btn-primary">Go back</Link>
                </div>
            </div>
        </div>
        : <Spinner />
}