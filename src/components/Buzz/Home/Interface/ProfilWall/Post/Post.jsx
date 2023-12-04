import { useParams } from 'react-router'

import useFeeds from "../../../../../../hooks/useFeeds";
import useUser from "../../../../../../hooks/useUser";
import TemplateFeed from "../../Feed/TemplateFeed";
import "./post.css"
import { BiArrowBack } from 'react-icons/bi';

function Post({setPartState}) {
    const {idProfil, id} = useParams();
    const {user, setUser} = useUser(idProfil);
    const {feeds, setFeeds} = useFeeds();
    console.log(feeds);

    const back = ()=>{
        setPartState('info');
    }

    return (
        <section className="postWall">
            <div className="bar-post">
                <div className="back-btn" onClick={back}>
                    <BiArrowBack style={{transform: 'scaleX(1.5)'}}/>
                    <span>feeds of {idProfil===id?'You':user?.username.toLowerCase()}</span>
                </div>
            </div>
            <div className="posts">
                <div className="post-container">
                {
                feeds.map((feed)=>{
                        return <TemplateFeed user={user} feed={feed} feeds={feeds} setFeed={setFeeds}/>
                })
                }
                </div>
            </div>
        </section>
    )
}

export default Post;