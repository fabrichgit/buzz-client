import { FaConnectdevelop,  FaDigitalTachograph, FaJs, FaJsSquare, FaJsfiddle, FaNode, FaNodeJs, FaReact } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import "./tips.css";

function Tips() {
    return (
        <section id="tips-section">
            <div className="tip1">
                <h2 className="head">
                    <div>
                        <span>Buzz</span> is babe !
                    </div>
                    <FaConnectdevelop  className="icon"/>
                </h2>
                <div className="text">
                    <div className="item">
                        <div>Sharing with our friend</div>
                        <div>we can and get the daily or more thing that our friend want to share.</div>
                    </div>
                    <div className="item">
                        <div>React to any feed</div>
                        <div>Show your mood and an emotion more realist, comment and reply.</div>
                    </div>
                    <div className="item">
                        <div>Keep your favorite</div>
                        <div>Let's create an album and save photo on <span>Buzz</span></div>
                    </div>
                </div>
            </div>
            <div className="tip2">
                <div className="text">This app is still on development</div>
                <div className="admin-descr">
                    <img src="http://localhost:3000/IMG_20221007_072911.jpg" alt="" className="admin-image"/>
                    <FaNodeJs style={{fill: 'yellow'}} className="icon"/>
                    <FaReact style={{fill: "blueviolet"}} className="icon"/>
                </div>
                <div className="btn-contact">
                    <button>Contact the Admin</button>
                </div>
            </div>
        </section>
    )
}

export default Tips;