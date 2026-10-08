import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Case from "./Pages/Case";
import Suspects from "./Pages/Suspects";
import Evidence from "./Pages/Evidence";
import Investigation from "./Pages/Investigation";

import Navigation from "./components/Navigation";
import Chatbot from "./components/Chatbot";

function App() {
  const [selectedSuspect, setSelectedSuspect] = useState(null);

  console.log("App rendering");

  return (
    <BrowserRouter>

      <Navigation />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/case"
          element={<Case />}
        />

        <Route
          path="/suspects"
          element={
            <Suspects
              selectedSuspect={selectedSuspect}
              onSelectSuspect={setSelectedSuspect}
            />
          }
        />

        <Route
          path="/evidence"
          element={<Evidence />}
        />

        <Route
          path="/investigation"
          element={
            <Investigation
              selectedSuspect={selectedSuspect}
            />
          }
        />

      </Routes>

      <Chatbot />

    </BrowserRouter>
  );
}

export default App;