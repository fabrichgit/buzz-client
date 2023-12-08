import { useEffect, useState } from "preact/hooks";
import StorageFunction from "../methods/StorageFunction";
import constants from "../Contants/constants";
import axios from "axios";

async function User (Id) {
        let u = await axios.get(constants.pathToServer(`/api/users/${Id}`))
                .then((response)=>{return response.data});
        return u;
}

function useUser(id = StorageFunction.getIdSession()) {
    const [user, setUser] = useState();
    useEffect(()=>{
        User(id).then(response=>{setUser(response)});
    }, [])
    return {user, setUser};
}

export default useUser;