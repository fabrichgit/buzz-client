import axios from "axios"
import constants from "../Contants/constants"

const register = (user, success, fail)=>{
    axios.post(constants.pathToServer('/api/auth/register'), user)
        .then((response)=>{
            success(response.data);
        })
        .catch((err)=>{
            fail(err);
            console.error(err);
        })
}

const login = (user, success, fail)=>{
    axios.post(constants.pathToServer('/api/auth/login'), user)
        .then((response)=>{
            success(response.data);
        })
        .catch((err)=>{
            fail(err);
            console.log(err);
        })
}

export default {
    login, register
}