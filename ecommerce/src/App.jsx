import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Pages/Login.jsx";
import Main from "./Pages/Main.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
