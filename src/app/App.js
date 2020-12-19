import './App.css';
import Header from "../header/Header"
import "bootstrap/dist/css/bootstrap.min.css";
import BreweryInfo from "../breweryInfo/BreweryInfo";
import WelcomeBanner from "../welcomeBanner/WelcomeBanner";
import Search from "../search/Search";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter  basename="/breweriesInfo">
      <Route path="/" component={Header} />
      <Route exact path="/" component={WelcomeBanner} />
      <Route path="/search" component={Search} />
      <Route
        path="/breweryInfo/:id"
        render={({ match }) => <BreweryInfo id={match.params.id} />}
      />
    </BrowserRouter>
  );
}

export default App;