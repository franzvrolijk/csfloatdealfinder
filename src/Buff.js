import { useState } from "react";

function Buff({ entry, buffCookie }) {
  const [error, setError] = useState(false);
  const [buffPrice, setBuffPrice] = useState(undefined);

  const getBuff = (entry) => {
    fetch(`http://localhost:5225/api/buff/${entry.name}/${encodeURIComponent(buffCookie)}`, { method: "GET", mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        setBuffPrice(data);
        setError(false);
      })
      .catch(() => {
        setBuffPrice(undefined);
        setError(true);
      });
  };

  return (
    <>
      {!buffPrice && !error && (
        <button className="btn" onClick={() => getBuff(entry)}>
          Check Buff price
        </button>
      )}
      {!!buffPrice && !error && (
        <div className="buffContainer">
          <p>Buff price: ${buffPrice.toFixed(2)}</p>
          <p data-title="Discount relative to Buff price">Relative discount: {(100 - (entry.price / buffPrice) * 100).toFixed(2)}%</p>
          <p data-title={`Profit if resold for $${buffPrice}`}>Flip profit: ${((buffPrice - entry.price) * 0.9555).toFixed(2)}</p>
        </div>
      )}
      {error && (
        <div className="buffContainer">
          <p>Could not find buff prices</p>
        </div>
      )}
    </>
  );
}

export default Buff;
