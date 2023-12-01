import './toggleProfile.css';

import { FaUserCircle } from "react-icons/fa"
import { useNavigate } from "react-router"

function profilValue(user) {

    const Navigate = useNavigate();

    if (user?.pathProfile) {
        return <img src={user.pathProfile} alt={user?.username} className="userCircle"/>
    }else{
        return <FaUserCircle className="userCircle" onClick={()=>{Navigate("/home/profil")}} style={{cursor: 'pointer'}}/>
    }
}

export default {
    profilValue
}