import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute, { PublicRoute } from "./components/PrivateRoute";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicRoute><Register/></PublicRoute>} />
        <Route path='/login' element={<PublicRoute><Login/></PublicRoute>} />
        <Route path='/home' element={<PrivateRoute children={<Home/>} />} />
        <Route path='/profile'>
          <Route path="edit" element={<PrivateRoute children={<EditProfile/>} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
