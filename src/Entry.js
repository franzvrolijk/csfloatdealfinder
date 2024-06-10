import Discount from "./Discount";
import EntryDetails from "./EntryDetails";
import { discountEntryColor } from "./styleHelper";
import Buff from "./Buff";

function Entry({ entry, displayLowVolume, buffCookie }) {
  if (!displayLowVolume && entry.tradeVolume < 20) return <></>;

  return (
    <div className="entry" style={{ background: discountEntryColor(entry.discountPercentage) }}>
      <h2>{entry.name}</h2>
      <img src={entry.iconUrl} alt={entry.name} width={300}></img>
      <p>Price: ${entry.price}</p>
      <Discount entry={entry}></Discount>
      <div className="btnContainer">
        <EntryDetails className="infoContainer" entry={entry} buffCookie={buffCookie}></EntryDetails>
        <button onClick={() => window.open(`https://csfloat.com/item/${entry.id}`)} className="btn">
          Buy
        </button>
      </div>
    </div>
  );
}

export default Entry;
