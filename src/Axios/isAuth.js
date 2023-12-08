import axios from "axios";
import StorageFunction from "../methods/StorageFunction";
import constants from "../Contants/constants";

async function isAuth(id = StorageFunction.getIdSession()){
    const urlPath = constants.pathToServer(`/api/auth/${id}`);
    const status = await axios.get(urlPath, {id})
        .then((response)=>{
            const data = response.data;
            if (data) {
                return true
            }
                return false;
        })
        .catch((error)=>{
            console.log(error);
            return 'error';
        })
    return {status};
}

export default isAuth;