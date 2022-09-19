import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Orders from "./Pages/Orders";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
      </Routes>
    </div>
  );
}

export default App;
