import logo from './logo.svg';
import Login from './component/Login'
import Register from './component/Register'
import Home from './component/Home'
import ForgotPassword from './component/ForgotPassword'
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
    
      <Routes>
        <Route path="/"  element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/home" element={<Home />} />
       
      </Routes>
    
    </div>
  );
}

export default App;
