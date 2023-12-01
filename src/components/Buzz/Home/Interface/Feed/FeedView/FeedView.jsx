import TemplateFeed from "../TemplateFeed";
import "./feedView.css"

function FeedView({user, allFeeds, setAllFeeds}) {
    return (
        <section className="feed-view">
            {
                allFeeds.map((feed)=>{
                    return <TemplateFeed user={user} feed={feed} feeds={allFeeds} setFeed={setAllFeeds}/>
                })
            }
        </section>
    )
}

export default FeedView;