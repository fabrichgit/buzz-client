import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Home from "./Home/Home";
import "./buzz.css";

import { Routes, Route } from 'react-router-dom';

function Buzz() {
    return (
        <div id="buzzApp">
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/home/:id/*" element={<Home/>} />
                <Route path="/" element={<Login/>}/>
            </Routes>
        </div>
    )
}

export default Buzz;