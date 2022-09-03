import { Routes, Route } from "react-router-dom";
// import { useState, useEffect } from "react";
import Home from "./Pages/Home";
import Header from "./components/Header";
import "./App.css";
// import Pair from "./Pair";
// import AskBid from "./AskBid";
// import { allPairsUrl } from "./api/apiUrls";

function App() {
  // const [newPairs, setNewPairs] = useState([]);

  // const getAllPairs = async (url) => {
  //   const dataPairs = await fetch(url)
  //     .then((data) => data.json())
  //     .then((data) => data);
  //   const newPairs = dataPairs.filter((obj) => obj.symbol.includes("USDT"));
  //   const listPairs = newPairs.slice(0, 12);

  //   setNewPairs(listPairs);
  //   // console.log("getPair");
  // };

  // useEffect(() => {
  //   getAllPairs(allPairsUrl);
  // }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home searchVal={searchVal} />}></Route> */}
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/posts" element={<PostsList />}></Route>
        <Route path="/posts/:id" element={<PostEdit />}></Route> */}

        {/* <Route path="*" element={<NotFound />}></Route> */}
      </Routes>
    </div>
    // <div className="App">
    //   {newPairs.map((obj) => (
    //     <Pair name={obj.symbol} key={obj.symbol} />
    //   ))}

    //   <AskBid />
    // </div>
  );
}

export default App;
