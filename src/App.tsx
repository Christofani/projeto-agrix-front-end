import { Route, Routes } from "react-router-dom";
import CreateUserPage from "./pages/User/User";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Farm from "./pages/Farms/Farms";
import Crop from "./pages/Crops/Crop";
import Fertilizer from "./pages/Fertilizer/Fertilizer";
import EditUserPage from "./pages/User/EditingUser";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<CreateUserPage />} />
      <Route path="/login" element={<Login />} />

      {/* Rotas protegidas, com Layout global */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="farms" element={<Farm />} />
        <Route path="crops" element={<Crop />} />
        <Route path="fertilizers" element={<Fertilizer />} />
        <Route path="edit-user" element={<EditUserPage />} />
      </Route>

      {/* Rota para páginas não encontradas */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
