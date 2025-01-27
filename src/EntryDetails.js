import { useState } from "react";

function EntryDetails({ entry, buffCookie }) {
  const [error, setError] = useState(false);
  const [secondCheapest, setSecondCheapest] = useState(undefined);

  const baseUrl = "https://knifescoutapi-bwfsegb8h2hfc5g0.northeurope-01.azurewebsites.net";

  const getSecondCheapest = (entry) => {
    fetch(`${baseUrl}/api/csfloat/secondcheapest/${entry.name}`, { method: "GET", mode: "cors" })
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
    </>
  );
}

export default EntryDetails;
