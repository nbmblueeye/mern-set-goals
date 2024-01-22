import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./assets/App.css";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  
  return (
    <Provider store={store}>
     <Router>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<DashBoard/>}/>
                <Route path="/register" element={<Register/>}/>  
                <Route path="/login" element={<Login/>}/> 
            </Route>
        </Routes>
     </Router>
     </Provider> 
  )
}

export default App
