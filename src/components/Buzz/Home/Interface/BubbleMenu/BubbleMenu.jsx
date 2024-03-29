import { FaBookOpen, FaUserCircle } from "react-icons/fa";
import { AiFillSetting, AiFillWechat, AiOutlineSearch } from "react-icons/ai";
import { BiLogOut, BiSolidHome } from "react-icons/bi";


import "./bubbleMenu.css"
import BubbleMenuCss from "../../../../../methods/CssJsx/BubbleMenuCss";
import { useNavigate, useParams } from "react-router";

function BubbleMenu({bubbleStyle, hideMenu}) {

    const Navigate = useNavigate();

    const switchTo = (path)=>{
        Navigate(path);
        hideMenu();
    }

    const {id} = useParams();
    console.log(id);

    return (
        <section id="bubbleMenu" style={bubbleStyle.indexOfBubbleContainer}>
            <div className="container">
                <div className="search">
                    <AiOutlineSearch className="icon" onClick={()=>switchTo(`/home/${id}`)}/>
                </div>
                <div 
                    className={BubbleMenuCss.styleController.isInitial(bubbleStyle)?'profil':'profil showAnimation'}
                    style={bubbleStyle.paddingOpacityOfBubble}
                >
                    <FaUserCircle className="icon" onClick={()=>switchTo(`/home/${id}/profil/${id}`)}/>
                </div>
                <div 
                    className={BubbleMenuCss.styleController.isInitial(bubbleStyle)?'feed':'feed showAnimation'}
                    style={bubbleStyle.paddingOpacityOfBubble}
                >
                    <BiSolidHome className="icon" onClick={()=>switchTo(`/home/${id}/feed`)}/>
                </div>
                <div 
                    className={BubbleMenuCss.styleController.isInitial(bubbleStyle)?'chat':'chat showAnimation'}
                    style={bubbleStyle.paddingOpacityOfBubble}
                >
                    <AiFillWechat className="icon" onClick={()=>{switchTo(`/home/${id}/chat`)}}/>
                </div>
                <div 
                    className={BubbleMenuCss.styleController.isInitial(bubbleStyle)?'setting':'setting showAnimation'}
                    style={bubbleStyle.paddingOpacityOfBubble}
                >
                    <AiFillSetting className="icon" onClick={()=>switchTo(`/home/${id}/settings`)}/>
                </div>
                <div 
                    className={BubbleMenuCss.styleController.isInitial(bubbleStyle)?'feedback':'feedback showAnimation'}
                    style={bubbleStyle.paddingOpacityOfBubble}
                >
                    <FaBookOpen className="icon" onClick={()=>switchTo(`/home/${id}/feedback`)}/>
                </div>
                <div 
                    className={BubbleMenuCss.styleController.isInitial(bubbleStyle)?'logout':'logout showAnimation'}
                    style={bubbleStyle.paddingOpacityOfBubble}
                >
                    <BiLogOut className="icon" onClick={()=>switchTo('/login')}/>
                </div>
            </div>
        </section>
    )
}

export default BubbleMenu;