import axios from "axios"
import constants from "../Contants/constants"
import StorageFunction from "../methods/StorageFunction";

const getUser = (id, success)=>{
    axios.get(constants.pathToServer(`/api/users/${id}`))
        .then((response)=>{
            success(response.data);
        })
        .catch((err)=>{
            console.error(err);
        })
}

export default {
    getUser
}