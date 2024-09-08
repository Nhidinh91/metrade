import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import AboutContact from "./Pages/AboutContact.jsx";
import SearchResults from "./Pages/SearchResult.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Home />} />
        <Route path="/about" element={<AboutContact />} />
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;
