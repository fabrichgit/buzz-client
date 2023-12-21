import { useState } from "react";

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

    const [info, setInfo] = useState(true);
    const [edit, setEdit] = useState(false);

    const {idProfil, id} = useParams();
    const {user, setUser} = useUser(idProfil);

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
                return <Info setPartState={setPartState} setEdit={setEdit} setInfo={setInfo}/>
            case 'edit':
                return <Edit setPartState={setPartState} setEdit={setEdit} setInfo={setInfo}/>
            default:
                break;
        }
    }

    const partOfWall = ()=>{
        if (partState!=='post') {
            return (
                <>
                    <Pdp user={user} setPartState={setPartState} setEdit={setEdit} setInfo={setInfo}/>
                    <Bar setPartState={setPartState} info={info} edit={edit} setInfo={setInfo} setEdit={setEdit}/>
                    <>{part()}</>
                </>                
            )
        }else{
            return <Post setPartState={setPartState} setEdit={setEdit} setInfo={setInfo}/>
        }
    }

    return (
        <section id="wall-section">
            <>{partOfWall()}</>
        </section>
    )
}

export default ProfilWall;