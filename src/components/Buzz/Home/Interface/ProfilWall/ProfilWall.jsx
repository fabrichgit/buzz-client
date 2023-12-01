import { useState } from "react";
import { useNavigate } from "react-router";
import { Routes, Route } from 'react-router-dom';

import "./profilWall.css";
import "./../Feed/FeedView/feedView.css";

import { useParams } from "react-router";
import { useEffect } from "preact/hooks";
import axios from "axios";
import constants from "../../../../../Contants/constants";
import isAuth from "../../../../../Axios/isAuth";
import YourPost from "./YourPost/YourPost";
import useUser from "../../../../../hooks/useUser";
import Bar from "./Bar/Bar";
import Pdp from "./Pdp/Pdp";
import Info from "./Info/Info";
import Edit from "./Edit/Edit";

function ProfilWall() {
    const [feedsMine, setFeedsMine] = useState([]);
    const [partState, setPartState] = useState('info');
    const Navigate = useNavigate();

    const {idProfil, id} = useParams();
    const {user, setUser} = useUser(idProfil);
    const pth = `/home/${id}/profil/${idProfil}`;

    useEffect(async ()=>{
        const authStatus = await isAuth(id);
        if (authStatus) {
            axios.get(constants.pathToServer(`/api/feed/${id}`))
                .then((response)=>{
                    const data = response.data;
                    console.log(data);
                    setFeedsMine(data);
                })
                .catch((error)=>{
                    console.error(error);
                })
        }
    }, []);
    console.log(pth);
    // const switchTo = (e)=>{
    //     e.preventDefault();
    //     const name = e.target.name;
    //     Navigate(window.location.pathname+`/${name}`)
    // }

    const part = ()=>{
        switch (partState) {
            case 'info':
                return <Info/>
            case 'edit':
                return <Edit/>
            default:
                break;
        }
    }

    return (
        <section id="wall-section">
            <Pdp user={user}/>
            <Bar setPartState={setPartState}/>
            {part()}
        </section>
    )
}

export default ProfilWall;