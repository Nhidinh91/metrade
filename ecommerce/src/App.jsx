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
import SellingHistory from "./Pages/SellingHistory.jsx";
import PurchaseHistory from "./Pages/PurchaseHistory.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from "./Pages/SignUp.jsx";
import VerifyFail from "./Pages/VerifyFail.jsx";
import VerifySuccess from "./Pages/VerifySuccess.jsx";
import ConfirmSent from "./Pages/ConfirmSent.jsx";
import Verify from "./Pages/Verify.jsx";
import ProductDetail from "./Pages/ProductDetail.jsx";
import MyPage from "./Pages/MyPage.jsx";
import SideBar from "./Components/SideBar.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/verify-fail" element={<VerifyFail />} />
          <Route path="/verify-success" element={<VerifySuccess />} />
          <Route path="/confirm-sent" element={<ConfirmSent />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/" element={<LayoutEcom />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutContact />} />
            <Route path="search-results" element={<SearchResults />} />
            <Route path="/selling-history" element={<SellingHistory />} />
            <Route path="/purchase-history" element={<PurchaseHistory />} />
            <Route path="category" element={<ProductListing />} />
            <Route path="/product/detail/:id" element={<ProductDetail />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="test" element={<SideBar pageName="Test"/>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
