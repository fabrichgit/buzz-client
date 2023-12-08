import { useEffect } from "preact/hooks";
import StorageFunction from "../../methods/StorageFunction";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Home from "./Home/Home";
import "./buzz.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useUser from "../../hooks/useUser";

function Buzz() {
    return (
        <div id="buzzApp">
            <Login/>
            {/* <Router>
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/home/:id/*" element={<Home/>} />
                </Routes>
            </Router> */}
        </div>
    )
}

export default Buzz;