import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import AboutContact from "./Pages/AboutContact.jsx";
import SearchResults from "./Pages/SearchResult.jsx";
import SellingHistory from "./Pages/SellingHistory.jsx";
import PurchaseHistory from "./Pages/PurchaseHistory.jsx";
import Profile from "./Pages/Profile.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from "./Pages/SignUp.jsx";
import Resend from "./Pages/VerifyFail.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resend" element={<Resend />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<AboutContact />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/selling-history" element={<SellingHistory />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
