import { useEffect, useMemo } from "preact/hooks";
import BubbleMenuCss from "../../../methods/CssJsx/BubbleMenuCss";
import Interface from "./Interface/Interface";
import Navbar from "./Navbar/Navbar";
import Tips from "./Tips/Tips";
import Topbar from "./TopBar/TopBar";
import "./home.css";

import { useState } from "react";
import useUser from "../../../hooks/useUser";

function Home() {
    const {user, setUser} = useUser();
    
    const [bubbleStyle, setBubbleStyle] = useState(BubbleMenuCss.bubbleProperty.initialBubble);
    const showMenu = ()=>{
        BubbleMenuCss.styleController.finalize(setBubbleStyle);
    }

    const hideMenu = ()=>{
        console.log('must be hidden');
        BubbleMenuCss.styleController.initialize(setBubbleStyle);
    }

    return (
        <section id="home">
            <Topbar showMenu={showMenu} hideMenu={hideMenu} bubbleStyle={bubbleStyle}/>
            <main id="mainbottom">
                <Navbar/>
                <Interface hideMenu={hideMenu} bubbleStyle={bubbleStyle} user={user}/>
                <Tips/>
            </main>
        </section>
    );
}
export default Home;