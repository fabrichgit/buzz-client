import { useState } from "react";
import { useNavigate } from "react-router";

import "./profilWall.css";
import "./../Feed/FeedView/feedView.css";

import { useParams } from "react-router";
import { useEffect } from "preact/hooks";
import axios from "axios";
import constants from "../../../../../Contants/constants";
import isAuth from "../../../../../Axios/isAuth";
import useUser from "../../../../../hooks/useUser";
import Bar from "./Bar/Bar";
import Pdp from "./Pdp/Pdp";
import Info from "./Info/Info";
import Edit from "./Edit/Edit";
import Post from "./Post/Post";

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

    const partOfWall = ()=>{
        if (partState!=='post') {
            return (
                <>
                    <Pdp user={user}/>
                    <Bar setPartState={setPartState}/>
                    <>{part()}</>
                </>                
            )
        }else{
            return <Post setPartState={setPartState}/>
        }
    }

    return (
        <section id="wall-section">
            <>{partOfWall()}</>
        </section>
    )
}

export default ProfilWall;