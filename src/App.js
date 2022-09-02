import { useState, useEffect } from "react";
import "./App.css";
import Pair from "./Pair";
import AskBid from "./AskBid";
import { allPairsUrl } from "./api/apiUrls";
function App() {
  const [newPairs, setNewPairs] = useState([]);

  const getAllPairs = async (url) => {
    const dataPairs = await fetch(url)
      .then((data) => data.json())
      .then((data) => data);
    const newPairs = dataPairs.filter((obj) => obj.symbol.includes("USDT"));
    const listPairs = newPairs.slice(0, 30);

    setNewPairs(listPairs);
    console.log("getPair");
  };

  useEffect(() => {
    getAllPairs(allPairsUrl);
  }, []);

  return (
    <div className="App">
      {newPairs.map((obj) => (
        <Pair name={obj.symbol} key={obj.symbol} />
      ))}

      <AskBid />
    </div>
  );
}

export default App;
