import { AiTwotoneHeart } from "react-icons/ai";
import ToggleProfil from "../../../../../methods/BuzzMethods/ToggleProfil";
import { CgComment, CgDetailsMore } from "react-icons/cg";

import "./templateFeed.css";
import StorageFunction from "../../../../../methods/StorageFunction";
import { useState } from "preact/hooks";
import axios from "axios";
import constants from "../../../../../Contants/constants";

function TemplateFeed({user, feed, feeds, setFeed}) {

    const [isReacted, setIsReacted] = useState();
    const [loadReact, setLoadReact] = useState([]);

    const reacting = (feed, user)=>{
        if (!feed.reactions?.includes(user?.id)) {
            try {
                let cloneState = [...loadReact];
                cloneState.push(feed.id);
                setLoadReact(cloneState);
                console.log(loadReact);

                axios.post(constants.pathToServer(`/api/feed/react/${feed.id}/${user.id}`), null)
                    .then((response)=>{
                        console.log(response.data);
                        
                        const feedsClone = [...feeds];
                        feedsClone.map(post=>{
                            if (post.id===feed.id) {
                                post.reactions.push(user?.id);
                            }
                        })
                        setFeed(feedsClone);

                        const cloneFilter = [];
                        for(const load of loadReact){
                            if (load!==feed.id) {
                              cloneFilter.push(load);
                            }
                        }
                        setLoadReact(cloneFilter);
                        console.log(loadReact);
                    })
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="one-feed" key={feed.id}>
            <div className="info">
                {ToggleProfil.profilValue(feed.from)}
                <div className="info-text">
                    <div className="name">
                        <div className="info-name">{StorageFunction.getIdSession()===feed.from.id?'YOU':feed.from.username}</div>
                        {
                            feed.mood &&
                            <div className="info-mood">feels {feed.mood}</div>
                        }
                    </div>
                    <div className="when">{feed.when}</div>
                </div>
                <div className="option">
                    <CgDetailsMore className="icon"/>
                </div>
            </div>
            {
                feed.text &&
                <div className="text">{feed.text}</div>
            }
            {
                feed.image &&
                <img src={feed.image} alt={feed.from} className="image-feed"/>
            }
            <div className="actions">
                {
                    !loadReact.includes(feed.id) ?
                    <div className="like" onClick={()=>reacting(feed, user)}>
                        <div className="count">{feed.reactions?.length}</div>
                        <AiTwotoneHeart className="icon" style={feed.reactions?.includes(user?.id)?{fill: 'rgb(34, 185, 185)'}:{fill: 'white'}}/>
                    </div>  :
                    <div className="spinner"></div>
                }
                {
                    false &&
                    <div className="comment">
                        <div className="count"></div>
                        <CgComment className="icon"/>
                    </div>
                }
            </div>
        </div>
    )
}

export default TemplateFeed;