import FeedForm from "./FeedForm/FeedForm";
import FeedView from "./FeedView/FeedView";
import "./feed.css";

import { v4 as uuid} from "uuid";
import { useState } from "react";
import DateMethods from "../../../../../methods/Date";
import { useEffect } from "preact/hooks";
import axios from "axios";
import constants from "../../../../../Contants/constants";

function Feed({user}) {

    const [feedToCreate, setFeedCreate] = useState({
        text: null,
        mood: null,
        image: null
    });

    const [allFeeds, setAllFeeds] = useState([]);
    useEffect(()=>{
        setIsLoad('end');
        axios.get(constants.pathToServer(`/api/feed`))
            .then((response)=>{
                const feeds = response.data;
                console.log('feeds', feeds);
                setAllFeeds([...feeds,
                    {
                        id: uuid(),
                        text: 'I am Arthur alias Aquaman, the King of Ocean',
                        image: 'http://localhost:3000/fiction3.jpg',
                        mood: 'angry',
                        from: {username: 'FABRICH'},
                        when: '2023-10-31 10:59'
                    }
                ]);
            })
    }, [])

    const [isLoad, setIsLoad] = useState('end');
    const [isError, setIsError] = useState(false);

    const feedCreateController = {feedToCreate, setFeedCreate}

    const handlePostFeed = async (oneFeed)=>{
        const feedToPost = {...oneFeed, id: uuid(), from: user.id, when: DateMethods.AsString()};
        setIsLoad('go');

        try {

            const imgPosting = async ()=>{
                axios.post('https://api.cloudinary.com/v1_1/cloudfabrich/image/upload', feedToPost.image)
                .then(async (response)=>{
                    console.log(response.data);
                    await postAll(response.data.secure_url);
                })
                .catch((err)=>{
                    console.error(err);
                    setIsLoad('end');
                    setIsError(true);
                    setTimeout(() => {
                        setIsError(false);
                    }, 3000);
                })
            }

            const postAll = async (url)=>{
                feedToPost.image = url;
                axios.post(constants.pathToServer('/api/feed'), feedToPost)
                    .then((response)=>{
                        console.log(response.data)
                        const feedBack = response.data;
                        setAllFeeds([feedBack, ...allFeeds]);
                        setIsLoad('end');
                    })
                    .catch((err)=>{
                        console.error(err);
                        setIsLoad('end');
                        setIsError(true);
                        setTimeout(() => {
                            setIsError(false);
                        }, 3000);
                    });
            }

            if (feedToPost.image) {
                return await imgPosting();
            }else{
                return await postAll();
            }

        } catch (error) {
            setIsLoad('end');
            setIsError(true);
            setTimeout(() => {
                setIsError(false);
            }, 3000);
        }
    }

    return (
        <section id="feeds-section">
            <FeedForm user={user} isLoad={isLoad} feedCreateController={feedCreateController} handlePostFeed={handlePostFeed} isError={isError}/>
            <FeedView user={user} allFeeds={allFeeds} setAllFeeds={setAllFeeds}/>
        </section>
    )
}

export default Feed;