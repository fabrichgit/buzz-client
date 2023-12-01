import TemplateFeed from "../../Feed/TemplateFeed";
import "./yourPost.css"

function YourPost({feeds, setFeeds, user}) {
    return (
        <section className="feed-view wall">
            {
                feeds.map((feed)=>{
                    return <TemplateFeed user={user} feed={feed} feeds={feeds} setFeed={setFeeds}/>
                })
            }
        </section>
    )
}

export default YourPost;