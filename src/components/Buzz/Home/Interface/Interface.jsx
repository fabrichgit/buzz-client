import BubbleMenu from "./BubbleMenu/BubbleMenu";
import Feed from "./Feed/Feed";
import ProfilWall from "./ProfilWall/ProfilWall";
import "./interface.css";

import { Routes, Route } from 'react-router-dom';

function Interface({user, bubbleStyle, hideMenu}) {
    return (
        <section id="interface">
            <main id="real-screen">
                <Routes>
                    <Route path="/feed" element={<Feed user={user}/>} />
                    <Route path="/profil/:idProfil/*" element={<ProfilWall user={user}/>}/>
                </Routes>   
            </main>
            <BubbleMenu bubbleStyle={bubbleStyle} hideMenu={hideMenu}/>
        </section>
    )
}

export default Interface;