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
            <Router>
                <Routes>
                    <Route path="/buzz-deploy/login" element={<Login/>} />
                    <Route path="/buzz-deploy/register" element={<Register/>} />
                    <Route path="/buzz-deploy/home/:id/*" element={<Home/>} />
                    <Route path="/buzz-deploy" element={<Login/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default Buzz;