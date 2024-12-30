import { Route, Routes } from 'react-router-dom';
import './App.css'
import CreateUserPage from './pages/User/User';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Farm from "./pages/Farms/Farms";
import Crop from "./pages/Crops/Crop";

import CreateFarm from "./pages/Farms/CreateFarm";

import Fertilizer from "./pages/Fertilizer/Fertilizer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateUserPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/farms" element={<Farm />} />
      <Route path="/farms/create" element={<CreateFarm />} />
      <Route path="/crops" element={<Crop />} />
      <Route path="/fertilizers" element={<Fertilizer />} />
      <Route path="/fertilizers" element={<Fertilizer />} />
    </Routes>
  );
}

export default App;


