import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Coins from "./pages/Coins";
import { CoinsProvider } from "./components/ContextProvider"; // Import CoinsProvider instead of CoinsContext
import SinglePage from "./pages/SinglePage";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CoinsProvider> 
      <div>
        <Router>
          <Header setIsOpen={setIsOpen} />
          <Routes>
            <Route
              path="/"
              element={<Coins isOpen={isOpen} setIsOpen={setIsOpen} />}
            />
            <Route
              path="/coins/:code"
              element={<SinglePage/>}
            />
          </Routes>
        </Router>
      </div>
    </CoinsProvider>
  );
}

export default App;
