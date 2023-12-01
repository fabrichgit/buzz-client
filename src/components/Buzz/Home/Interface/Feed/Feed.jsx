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

    useEffect(()=>{
        setIsLoad('end');
    }, [allFeeds])

    const [isLoad, setIsLoad] = useState();

    const feedCreateController = {feedToCreate, setFeedCreate}

    const handlePostFeed = (oneFeed)=>{
        const feedToPost = {...oneFeed, id: uuid(), from: user.id, when: DateMethods.AsString()};
        setIsLoad('go');
        try {
            axios.post(constants.pathToServer('/api/feed'), feedToPost,
                {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    }
                })
                .then((response)=>{
                    console.log(response.data)
                    const feedBack = response.data;
                    setAllFeeds([feedBack, ...allFeeds]);
                });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section id="feeds-section">
            <FeedForm user={user} isLoad={isLoad} feedCreateController={feedCreateController} handlePostFeed={handlePostFeed}/>
            <FeedView user={user} allFeeds={allFeeds} setAllFeeds={setAllFeeds}/>
        </section>
    )
}

export default Feed;