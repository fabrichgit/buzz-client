import { useParams } from 'react-router'

import useFeeds from "../../../../../../hooks/useFeeds";
import useUser from "../../../../../../hooks/useUser";
import TemplateFeed from "../../Feed/TemplateFeed";
import "./post.css"
import { BiArrowBack } from 'react-icons/bi';

function Post({setPartState, setEdit, setInfo}) {
    const {idProfil, id} = useParams();
    const {user, setUser} = useUser(idProfil);
    const {feeds, setFeeds} = useFeeds(idProfil);
    console.log(feeds);

    const back = ()=>{
        setPartState('info');
        setEdit(false);
        setInfo(true);
    }

    return (
        <section className="postWall">
            <div className="bar-post">
                <div className="back-btn" onClick={back}>
                    <BiArrowBack className='icon'/>
                    <div>{user?.username.toLowerCase()}</div>
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