import React from "react";
import "./App.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Components/Pages/Home/Home";
import View from "./Components/Pages/User/View";
import Edit from "./Components/Pages/User/Edit";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}
export default App;
