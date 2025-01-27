import "./App.css";
import { useState, useEffect } from "react";
import Entry from "./Entry";

function App() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayLowVolume, setDisplayLowVolume] = useState(false);
  const [buffCookie, setBuffCookie] = useState("");

  useEffect(() => {
    setLoading(true);

    fetch(`https://knifescoutapi-bwfsegb8h2hfc5g0.northeurope-01.azurewebsites.net/api/csFloat/basePrice`, { method: "GET", mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      });

    const cookie = localStorage.getItem("buffCookie");
    if (cookie) setBuffCookie(cookie);
  }, []);

  const setCookie = () => {
    const cookieInput = document.getElementById("cookie");
    const cookieValue = cookieInput.value;
    localStorage.setItem("buffCookie", cookieValue);
    setBuffCookie(cookieValue);
  };

  return (
    <>
      <div className="App">
        <div className="header">
          <h1>KnifeScout</h1>
          <div className="checkbox-wrapper">
            <label htmlFor="displayLowVolume">Display low volume items:</label>
            <input id="displayLowVolume" className="checkbox" type="checkbox" value={displayLowVolume} onChange={(e) => setDisplayLowVolume(!displayLowVolume)}></input>
          </div>
          <div>
            <input id="cookie" className="cookieInput" placeholder="Buff cookie" defaultValue={buffCookie}></input>
            <button onClick={setCookie} className="cookieSet">
              Set
            </button>
          </div>
        </div>
        {!loading && (
          <div className="entryContainer">
            {entries.map((e) => (
              <Entry buffCookie={buffCookie} entry={e} displayLowVolume={displayLowVolume} key={e.id}></Entry>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
