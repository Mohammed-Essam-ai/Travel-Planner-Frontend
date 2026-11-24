import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Base from "./pages/Base";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
