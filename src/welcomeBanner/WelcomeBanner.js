import mainImage from "../imgs/breweries.jpg"

export default function WelcomeBanner() {
    return (
        <div className="container pt-4 welcome_banner">
            <div className="px-3">
                <h1>Welcome to Breweries info!</h1>
                <p className="lead">
                    This web-site is a React application that allows searching the
                    information on breweries, cideries, brewpubs, and bottle shops.
            </p>
                <p className="lead">
                    <img alt="home-img" className="home-img" src={mainImage} />
                </p>
            </div>
        </div>
    )
}