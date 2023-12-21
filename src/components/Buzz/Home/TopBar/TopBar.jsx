import { FaConnectdevelop, FaList, FaSearch } from "react-icons/fa";
import "./topBar.css";
import { AiOutlineClose } from "react-icons/ai";
import ToggleProfil from "../../../../methods/BuzzMethods/ToggleProfil.jsx";
import BubbleMenuCss from "../../../../methods/CssJsx/BubbleMenuCss";
import useUser from "../../../../hooks/useUser.js";

function Topbar({showMenu, hideMenu, bubbleStyle}) {

    const {user, setUser} = useUser();
    
    const toggleIconMenu = ()=>{
        if (BubbleMenuCss.styleController.isInitial(bubbleStyle)) {
            return <FaList className="icon" onClick={()=>{showMenu()}}/>
        }else{
            return <AiOutlineClose className="icon" onClick={()=>{hideMenu()}}/>
        }
    }

    return (
        <section id="topbar">
            <div className="logo-container">
                <FaConnectdevelop style={{fill: 'rgb(17, 122, 122)'}} className="icon"/>
                <div>Buzz</div>
            </div>
            <div className="searchbar-container">
                <div>
                    <FaSearch/>
                    <input type="text" placeholder="Search"/>
                </div>
            </div>
            <div className="right-container">
                {toggleIconMenu()}
                <div>{ToggleProfil.profilValue(user)}</div>
            </div>
        </section>
    )
}

export default Topbar;