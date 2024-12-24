import { Route, Routes } from 'react-router-dom';
import './App.css'
import CreateUserPage from './pages/User/User';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Farm from './pages/Farms/Farms';
import FarmDetails from './pages/Farms/FarmDetails';
import Crop from './pages/Crops/Crop';
import CropDetails from './pages/Crops/CropDetails';

function App() {

  return (
    <Routes>
      <Route path='/' element={<CreateUserPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/farms' element={<Farm />} />
      <Route path='/farms/:id' element={<FarmDetails />} />
      <Route path='/crops' element={<Crop />} />
      <Route path='/crops/:id' element={<CropDetails />} />


    </Routes>
  )
}

export default App;


