import { useNavigate } from "react-router";
import Auth from "../Auth";
import "./login.css";

import { useState, useEffect } from 'react';
import StringFunction from "../../../../methods/StringFunction";
import authAxios from "../../../../Axios/authAxios";
import StorageFunction from "../../../../methods/StorageFunction";

function Login() {

    const [formDataLog, setFormDataLog] = useState(null);
    const [loadStatus, setLoadStatus] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);

    const Navigate = useNavigate();

    const handleLog = async ()=>{
        const dataToFecth = StringFunction.parseDataAuth({...formDataLog});
        setLoadStatus(true);

        // const authStatus = await isAuth();

        try {
            authAxios.login(
                dataToFecth,
                (data)=>{
                    console.log(data);
                    StorageFunction.setIdSession(data);
                    setLoadStatus(false);
                    setErrorStatus(false);
                    Navigate(`/home/${data}/feed`);
                },
                (err)=>{
                    setLoadStatus(false);
                    setErrorStatus(true);
                }
            )
        } catch (error) {
            setLoadStatus(false);
            setErrorStatus(true);
        }
    }

    useEffect(()=>{
        if (formDataLog!==null) {
            if (StringFunction.isValidateUsername(formDataLog.username)) {
                handleLog();
            }else{
                setErrorStatus(true);
            }
        }
    }, [formDataLog])

    return <Auth title={'Sign in'} setData={setFormDataLog} handleSubmit={handleLog} loadStatus={loadStatus} errorStatus={errorStatus}/>
}

export default Login;