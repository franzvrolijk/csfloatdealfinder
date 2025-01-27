import "./App.css";
import { useState, useEffect } from "react";
import Entry from "./Entry";

function App() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayLowVolume, setDisplayLowVolume] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`https://knifescoutapi-bwfsegb8h2hfc5g0.northeurope-01.azurewebsites.net/api/csfloat/baseprice`, { method: "GET", mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="App">
        <div className="header">
          <h1>KnifeScout</h1>
          <div className="checkbox-wrapper">
            <label htmlFor="displayLowVolume">Display low volume items:</label>
            <input id="displayLowVolume" className="checkbox" type="checkbox" value={displayLowVolume} onChange={(e) => setDisplayLowVolume(!displayLowVolume)}></input>
          </div>
        </div>
        {!loading && (
          <div className="entryContainer">
            {entries.map((e) => (
              <Entry entry={e} displayLowVolume={displayLowVolume} key={e.id}></Entry>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
