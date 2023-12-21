import "./navbar.css";
import { FaBookOpen } from "react-icons/fa";
import { AiFillSetting, AiFillWechat } from "react-icons/ai";
import { BiSolidHome } from "react-icons/bi";
import { useNavigate } from "react-router";
import useUser from "../../../../hooks/useUser.js";
import ToggleProfil from "../../../../methods/BuzzMethods/ToggleProfil.jsx";

function Navbar() {

    const {user, setUser} = useUser();

    const Navigate = useNavigate();

    const switchTo = (path)=>{
        Navigate(path);
    }

    return (
        <section id="navbar-section">
            <div className="user-btn-container" onClick={()=>Navigate(`/home/${user.id}/profil/${user.id}`)}>
                {ToggleProfil.profilValue(user)}
                <div>
                    <h1>{user?.username}</h1>
                    <div>{user?.bio? user?.bio : "don't have bio"}</div>
                </div>
            </div>
            <div className="navigation-container">
                <div className="list-items">
                    <div className="item" onClick={()=>switchTo(`/home/${user.id}/feed`)}>
                        <BiSolidHome className="icon"/>
                        <div>Feed</div>
                    </div>
                    <div className="item" onClick={()=>switchTo(`/home/${user.id}/chat`)}>
                        <AiFillWechat className="icon"/>
                        <div>Chat</div>
                    </div>
                    <div className="item" onClick={()=>switchTo(`/home/${user.id}/settings`)}>
                        <AiFillSetting className="icon"/>
                        <div>Settings</div>
                    </div>
                    <div className="item" onClick={()=>switchTo(`/home/${user.id}/feedback`)}>
                        <FaBookOpen className="icon"/>
                        <div>Feedback</div>
                    </div>
                </div>
            </div>
            <div className="logout-btn" onClick={()=>switchTo('/login')}>
                <button>Log out</button>
            </div>
        </section>
    )
}

export default Navbar;