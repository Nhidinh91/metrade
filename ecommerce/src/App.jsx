import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LayoutEcom from "./Pages/LayoutEcom.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import AboutContact from "./Pages/AboutContact.jsx";
import SearchResults from "./Pages/SearchResult.jsx";
import ProductListing from "./Pages/ProductListing.jsx";
import NotFound from "./Pages/NotFound.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutEcom />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Home />} />
          <Route path="/about" element={<AboutContact />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/category" element={<ProductListing />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
