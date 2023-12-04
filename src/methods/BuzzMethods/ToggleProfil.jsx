import './toggleProfile.css';

import { FaUserCircle } from "react-icons/fa"
import { useNavigate, useParams } from "react-router"

function profilValue(user) {

    const Navigate = useNavigate();
    const {id} = useParams();
    
    const goProfile = (idProfil)=>{
        const pth = `/home/${id}/profil/${idProfil}`;
        Navigate(pth);
    }

    if (user?.pathProfile) {
        return <img src={user.pathProfile} alt={user?.username} className="userCircle" onClick={()=>goProfile(user?.id)} style={{cursor: 'pointer'}}/>
    }else{
        return <FaUserCircle className="userCircle" onClick={()=>goProfile(user?.id)} style={{cursor: 'pointer'}}/>
    }
}

export default {
    profilValue
}