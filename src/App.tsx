import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateUserPage from "./pages/User/User";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Farm from "./pages/Farms/Farms";
import Crop from "./pages/Crops/Crop";
import Fertilizer from "./pages/Fertilizer/Fertilizer";
import EditUserPage from "./pages/User/EditingUser";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateUserPage />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farms"
        element={
          <ProtectedRoute>
            <Farm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/crops"
        element={
          <ProtectedRoute>
            <Crop />
          </ProtectedRoute>
        }
      />
      <Route
        path="/fertilizers"
        element={
          <ProtectedRoute>
            <Fertilizer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-user"
        element={
          <ProtectedRoute>
            <EditUserPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
