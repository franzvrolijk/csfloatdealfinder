import { useState } from "react";

function EntryDetails({ entry, buffCookie }) {
  const [error, setError] = useState(false);
  const [secondCheapest, setSecondCheapest] = useState(undefined);
  const [buffError, setBuffError] = useState(false);
  const [buffPrice, setBuffPrice] = useState(undefined);

  const baseUrl = "https://csskinfinderapi20231225221304.azurewebsites.net";

  const getBuff = (entry) => {
    fetch(`${baseUrl}/api/buff/${entry.name}/${encodeURIComponent(buffCookie)}`, { method: "GET", mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        setBuffPrice(data);
        setBuffError(false);
      })
      .catch(() => {
        setBuffPrice(undefined);
        setBuffError(true);
      });
  };

  const getSecondCheapest = (entry) => {
    fetch(`${baseUrl}/api/csFloat/secondCheapest/${entry.name}`, { method: "GET", mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        setSecondCheapest(data);
        setError(false);
      })
      .catch(() => {
        setSecondCheapest(undefined);
        setError(true);
      });
  };

  return (
    <>
      {!secondCheapest && !error && (
        <button
          className="btn"
          onClick={() => {
            getSecondCheapest(entry);
            getBuff(entry);
          }}
        >
          Check relative discounts
        </button>
      )}
      {!!secondCheapest && !error && (
        <div className="secondCheapestContainer">
          <p>2nd cheapest: ${secondCheapest.price}</p>
          <p data-title="Discount relative to second cheapest offer">Relative discount: {(100 - (entry.price / secondCheapest.price) * 100).toFixed(2)}%</p>
          <p data-title={`Profit if resold for $${secondCheapest.price}`}>Flip profit: ${((secondCheapest.price - entry.price) * 0.9555).toFixed(2)}</p>
        </div>
      )}
      {error && (
        <div className="secondCheapestContainer">
          <p>Could not find second cheapest</p>
        </div>
      )}
      {!!buffPrice && !buffError && (
        <div className="buffContainer">
          <p>Buff price: ${buffPrice.toFixed(2)}</p>
          <p data-title="Discount relative to Buff price">Relative discount: {(100 - (entry.price / buffPrice) * 100).toFixed(2)}%</p>
          <p data-title={`Profit if resold for $${buffPrice}`}>Flip profit: ${((buffPrice - entry.price) * 0.9555).toFixed(2)}</p>
        </div>
      )}
      {buffError && (
        <div className="buffContainer">
          <p>Could not find buff prices</p>
        </div>
      )}
    </>
  );
}

export default EntryDetails;
