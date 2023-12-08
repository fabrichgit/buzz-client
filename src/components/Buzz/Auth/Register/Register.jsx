import { useNavigate } from "react-router";
import Auth from "../Auth";
import "./register.css";
import { useState, useEffect } from 'react';

import StringFunction from "../../../../methods/StringFunction";
import StorageFunction from "../../../../methods/StorageFunction";
import authAxios from "../../../../Axios/authAxios";

function Register() {

    const [formDataRegis, setFormDataRegis] = useState(null);
    const [loadStatus, setLoadStatus] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);

    const Navigate = useNavigate();

    const handleRegister = ()=>{
        const dataToFecth = StringFunction.parseDataAuth({...formDataRegis});
        setLoadStatus(true);
        setFormDataRegis(null);

        authAxios.register(dataToFecth,
            (data)=>{
            console.log(data);
            StorageFunction.setIdSession(data);
            setLoadStatus(false);
            setErrorStatus(false);
            Navigate(`/buzz-deploy/home/${data}/profil/${data}/infowall`);
            },
            (err)=>{
                setErrorStatus(true);
                setLoadStatus(false);
            }
        )
    }

    useEffect(()=>{
        if (formDataRegis!==null) {
            if (formDataRegis.password===formDataRegis.confirmPassword && StringFunction.isValidateUsername(formDataRegis.username)) {
                handleRegister();
            }else{
                setErrorStatus(true);
                setFormDataRegis(null);
            }
        }
    },[formDataRegis])

    return <Auth title={'Sign up'} setData={setFormDataRegis} handleSubmit={handleRegister} loadStatus={loadStatus} errorStatus={errorStatus}/>
}

export default Register;