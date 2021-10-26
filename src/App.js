import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const App = () => {
  const [fetchedData, setFetchedData] = useState("");
  const [error, setError] = useState({ error: false, message: "" });
  const fetcher = async () => {
    try {
      const data = await fetch("https://api.punkapi.com/v2/beers/random");
      if (data.status !== 200) {
        throw new Error("oops");
      }
      const response = await data.json();
      setFetchedData(response[0]);
    } catch (error) {
      setError({ error: true, message: error.message });
    }
  };

  if (error.error) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div className="container">
      <div className="interface">
        <h1>BrewDog Beer Explorer</h1>
        <button onClick={fetcher}>Discover A New Beer</button>
        <h2>{fetchedData.name}</h2>
        <h3>{fetchedData.tagline}</h3>
        <img src={fetchedData.image_url} style={{ maxHeight: 200 }}></img>
        <p>{fetchedData.brewers_tips}</p>
      </div>
    </div>
  );
};

export default App;
